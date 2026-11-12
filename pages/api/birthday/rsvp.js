import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export const config = { api: { bodyParser: { sizeLimit: '8kb' } } };

function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const { id, name, attendance, adults, children, message = '', website = '' } = body;
  if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return null;
  if (typeof name !== 'string' || !name.trim() || name.length > 120) return null;
  if (!['yes', 'no'].includes(attendance) || typeof message !== 'string' || message.length > 500 || typeof website !== 'string' || website) return null;
  if (!Number.isInteger(adults) || !Number.isInteger(children)) return null;
  if (attendance === 'yes' && (adults < 1 || adults > 10 || children < 0 || children > 10)) return null;
  if (attendance === 'no' && (adults !== 0 || children !== 0)) return null;
  return { id, event: 'sena-first-birthday-2026', name: name.trim(), attendance, adults, children, message: message.trim() };
}

// A separate file per request makes retries idempotent without rewriting other RSVPs.
async function saveLocal(record) {
  const directory = path.join(process.cwd(), '.data', 'birthday-rsvp');
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
  const target = path.join(directory, `${record.id}.json`);
  const temporary = path.join(directory, `.${randomUUID()}.tmp`);
  try {
    await fs.writeFile(temporary, JSON.stringify(record, null, 2), { mode: 0o600, flag: 'wx' });
    try {
      await fs.link(temporary, target);
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
      const previous = JSON.parse(await fs.readFile(target, 'utf8'));
      for (const key of ['name', 'attendance', 'adults', 'children', 'message']) {
        if (previous[key] !== record[key]) return { ok: false, conflict: true };
      }
    }
    return { ok: true };
  } finally {
    await fs.unlink(temporary).catch(() => {});
  }
}

async function saveToSheets(record) {
  const endpoint = process.env.GOOGLE_SHEETS_RSVP_URL;
  const secret = process.env.GOOGLE_SHEETS_RSVP_SECRET;
  if (!endpoint || !secret) return { ok: false, unavailable: true };
  const url = new URL(endpoint);
  if (url.protocol !== 'https:' || url.hostname !== 'script.google.com' || !url.pathname.endsWith('/exec')) {
    return { ok: false, unavailable: true };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, ...record }),
      signal: controller.signal,
      redirect: 'follow',
    });
    if (!response.ok) throw new Error('Sheets endpoint failed');
    const result = await response.json();
    return { ok: result.ok === true && result.id === record.id, conflict: result.code === 'conflict' };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Gunakan formulir undangan untuk mengirim RSVP.' });
  }
  if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ ok: false, error: 'Format pengiriman tidak didukung.' });
  const record = validate(req.body);
  if (!record) return res.status(400).json({ ok: false, error: 'Periksa nama, kehadiran, dan jumlah tamu, lalu kirim kembali.' });
  record.submittedAt = new Date().toISOString();
  const useSheets = Boolean(process.env.GOOGLE_SHEETS_RSVP_URL);
  // Production must never acknowledge a response that only lives on ephemeral disk.
  if (!useSheets && process.env.NODE_ENV !== 'development') {
    return res.status(503).json({ ok: false, error: 'Formulir konfirmasi belum tersedia. Silakan coba kembali nanti.' });
  }
  try {
    const result = useSheets ? await saveToSheets(record) : await saveLocal(record);
    if (result.conflict) return res.status(409).json({ ok: false, error: 'Konfirmasi sebelumnya sudah diterima. Muat ulang halaman sebelum mengirim jawaban berbeda.' });
    if (!result.ok) return res.status(503).json({ ok: false, error: 'Konfirmasi belum bisa disimpan. Tunggu sebentar lalu coba lagi.' });
    return res.status(200).json({ ok: true, id: record.id, storage: useSheets ? 'google-sheets' : 'local' });
  } catch (_) {
    return res.status(503).json({ ok: false, error: 'Konfirmasi belum bisa disimpan. Periksa koneksi dan coba lagi.' });
  }
}
