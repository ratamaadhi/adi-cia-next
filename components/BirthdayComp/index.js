import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiArrowDown, FiArrowRight, FiCalendar, FiCheck, FiMapPin, FiShare2 } from 'react-icons/fi';
import styles from '../../styles/Birthday.module.css';

const asset = '/birthday/sena';
const storageKey = 'sena-birthday-rsvp-v1';
function createRequestId() {
  const bytes = window.crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
}
const gallery = [
  { file: 'sena-playing', caption: 'Mainan favoritku', alt: 'Sena mengangkat kendaraan mainan', className: 'photoPlaying' },
  { file: 'sena-party', caption: 'Siap tiup lilin!', alt: 'Sena tersenyum di depan dekorasi ulang tahun', className: 'photoParty' },
  { file: 'sena-family', caption: 'Duniaku, lengkap.', alt: 'Sena bersama Adhi dan Cia di taman', className: 'photoFamily' },
];

function Excavator({ className = '' }) {
  return <div className={`${styles.excavator} ${className}`} aria-hidden="true"><Image src={`${asset}/toy-excavator.webp`} alt="" width={900} height={900} unoptimized /></div>;
}

function RsvpForm() {
  const [attendance, setAttendance] = useState('yes');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);
  const requestId = useRef(null);
  const submissionLock = useRef(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved?.id && saved?.name) {
        setReceipt(saved);
        setStatus('success');
      }
    } catch (_) {
      // The form also works when browser storage is unavailable.
    }
  }, []);

  async function submit(event) {
    event.preventDefault();
    if (submissionLock.current) return;
    submissionLock.current = true;
    setStatus('sending');
    setError('');
    const form = new FormData(event.currentTarget);
    requestId.current = requestId.current || createRequestId();
    const payload = {
      id: requestId.current,
      name: String(form.get('name') || '').trim(),
      attendance,
      adults: attendance === 'yes' ? Number(form.get('adults')) : 0,
      children: attendance === 'yes' ? Number(form.get('children')) : 0,
      message: String(form.get('message') || '').trim(),
      website: String(form.get('website') || ''),
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch('/api/birthday/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Konfirmasi belum terkirim. Silakan coba lagi.');
      const saved = { id: result.id, name: payload.name, attendance, storage: result.storage };
      setReceipt(saved);
      setStatus('success');
      try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (_) { /* Sending does not depend on browser storage. */ }
    } catch (err) {
      setError(err.name === 'AbortError' ? 'Koneksi terlalu lama. Coba kirim lagi, jawaban yang sama akan dicatat satu kali.' : err.message);
      setStatus('error');
    } finally {
      clearTimeout(timeout);
      submissionLock.current = false;
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successMark}><FiCheck size={30} /></span>
        <h3>Makasih, {receipt.name}!</h3>
        <p>{receipt.attendance === 'yes' ? 'Konfirmasi kehadiranmu sudah tercatat. Sena tunggu di pesta, ya!' : 'Jawabanmu sudah tercatat. Terima kasih sudah ikut memberi doa untuk Sena.'}</p>
        {receipt.storage === 'local' && <p className={styles.previewNotice}>Mode preview · jawaban tersimpan di server lokal.</p>}
        <a href="#detail" className={styles.textLink}>Lihat detail acara <FiArrowRight /></a>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} aria-label="Konfirmasi kehadiran" aria-busy={status === 'sending'}>
      <fieldset disabled={status === 'sending'}>
        <label htmlFor="guest-name">Nama kamu / keluarga <span aria-hidden="true">*</span></label>
        <input id="guest-name" name="name" autoComplete="name" placeholder="Tulis nama kamu di sini" required maxLength={120} />
        <div className={styles.honeypot} aria-hidden="true"><label htmlFor="guest-website">Website</label><input id="guest-website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <fieldset className={styles.attendance}>
          <legend>Bisa datang merayakan? <span aria-hidden="true">*</span></legend>
          <div className={styles.radioOptions}>
            <label><input type="radio" name="attendance" value="yes" checked={attendance === 'yes'} onChange={() => setAttendance('yes')} /><span>Iya, aku datang!</span></label>
            <label><input type="radio" name="attendance" value="no" checked={attendance === 'no'} onChange={() => setAttendance('no')} /><span>Belum bisa hadir</span></label>
          </div>
        </fieldset>
        {attendance === 'yes' && <div className={styles.countFields}>
          <div><label htmlFor="guest-adults">Jumlah dewasa</label><select id="guest-adults" name="adults" defaultValue="1">{Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1} orang</option>)}</select></div>
          <div><label htmlFor="guest-children">Jumlah anak</label><select id="guest-children" name="children" defaultValue="0">{Array.from({ length: 11 }, (_, i) => <option key={i} value={i}>{i} anak</option>)}</select></div>
        </div>}
        <label htmlFor="guest-message">Pesan untuk Sena <span className={styles.optional}>(opsional)</span></label>
        <textarea id="guest-message" name="message" placeholder="Doa kecil untuk langkah besar Sena…" rows={3} maxLength={500} />
        {error && <p className={styles.formError} role="alert">{error}</p>}
        <button className={styles.darkButton} type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Mengirim konfirmasi…' : 'Kirim konfirmasi'}<FiArrowRight /></button>
        <p className={styles.formNote}>Jawabanmu hanya digunakan Adhi & Cia untuk persiapan acara.</p>
      </fieldset>
    </form>
  );
}

export default function BirthdayInvitation({ event }) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);
  const timer = useRef(null);
  const heroHeading = useRef(null);
  const guest = typeof router.query.invite === 'string' ? router.query.invite.slice(0, 120) : '';
  const shareUrl = typeof window === 'undefined' ? '' : `${window.location.origin}/birthday/sena`;

  useEffect(() => {
    function updateCountdown() { setDaysLeft(Math.max(0, Math.ceil((new Date(event.startsAt).getTime() - Date.now()) / 86400000))); }
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => { clearInterval(interval); clearTimeout(timer.current); };
  }, [event.startsAt]);

  useEffect(() => {
    if (!opened) return;
    heroHeading.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [opened]);

  function openInvitation() {
    if (opening) return;
    setOpening(true);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = setTimeout(() => setOpened(true), reduceMotion ? 0 : 1100);
  }

  return (
    <div className={styles.page}>
      {!opened ? <main className={`${styles.cover} ${opening ? styles.opening : ''}`}>
        <span className={styles.coverDate}>29 NOVEMBER 2026</span>
        <div className={styles.coverHeading}><p>Ada pesta kecil untukmu!</p><h1>Sena turns <span>ONE!</span></h1></div>
        <div className={styles.envelopeScene}>
          <div className={styles.envelope}>
            <div className={styles.envelopeLetter}><span>Undangan ulang tahun</span><strong>Sena</strong><span>Naushad Sena Al Farabi</span></div>
            <div className={styles.envelopePocket} />
            <div className={styles.stamp}><Image src={`${asset}/sena-main.webp`} alt="Sena tersenyum menyambut ulang tahun pertamanya" width={82} height={98} priority unoptimized /></div>
            <div className={styles.addressee}><span>Untuk yang tersayang,</span><strong>{guest || 'Teman & Keluarga'}</strong></div>
            <span className={styles.seal} aria-hidden="true">1</span>
          </div>
          <Excavator className={styles.coverToy} />
          <span className={styles.coverCone} aria-hidden="true" />
        </div>
        <button className={styles.darkButton} onClick={openInvitation} disabled={opening}>{opening ? 'Sebentar, Sena siap-siap…' : 'Buka undangan'}<FiArrowRight /></button>
        <p className={styles.coverSignoff}>Dengan sayang, Adhi & Cia</p>
      </main> : <>
        <a href="#rsvp" className={styles.skipLink}>Langsung ke konfirmasi kehadiran</a>
        <header className={styles.header}>
          <a href="#home" className={styles.wordmark} aria-label="Undangan Sena, kembali ke atas">sena<span>.</span></a>
          <span className={styles.headerDate}>29.11.2026</span>
          <a href="#rsvp" className={styles.headerRsvp}>Aku ikut! <FiArrowRight /></a>
        </header>
        <main>
          <section id="home" className={styles.hero} aria-labelledby="sena-heading">
            <div className={styles.heroCopy}>
              {guest && <p className={styles.guestGreeting}>Hai, {guest}!</p>}
              <h1 id="sena-heading" tabIndex={-1} ref={heroHeading}>Sena<span>turns <em>ONE!</em></span></h1>
              <p className={styles.fullName}>{event.fullName}</p>
              <p className={styles.heroDescription}>Satu tahun penuh tawa, peluk, dan petualangan kecil. Sekarang, waktunya pesta bersama kamu!</p>
              <div className={styles.heroActions}><a className={styles.darkButton} href="#detail">Yuk, lihat pestanya <FiArrowDown /></a></div>
              <p className={styles.heroDate}>{event.date} <span>·</span> {event.time}</p>
            </div>
            <div className={styles.heroScene}>
              <div className={styles.photoCard}><div className={styles.photoFrame}><Image src={`${asset}/sena-main.webp`} alt="Sena tersenyum dengan kedua tangan terbuka" width={1067} height={1600} priority unoptimized /></div><p>Halo, aku sudah satu tahun!</p></div>
              <div className={styles.numberSticker} role="img" aria-label="Ulang tahun pertama">1<span>HAPPY BIRTHDAY</span></div>
              <span className={styles.heroTape} aria-hidden="true" />
              <Excavator className={styles.heroToy} />
              <span className={styles.heroStar} aria-hidden="true" />
            </div>
          </section>

          <section id="detail" className={styles.details} aria-labelledby="details-heading">
            <div className={styles.detailsInner}>
              <div className={styles.detailsIntro}><h2 id="details-heading">Minggu seru<br />bareng Sena.</h2><p>Siapkan senyum paling lebar.<br />Kita main dan rayakan bersama!</p>{daysLeft !== null && daysLeft > 0 && <p className={styles.countdown}><strong>{daysLeft}</strong> hari lagi menuju pesta</p>}</div>
              <div className={styles.eventBoard}>
                <div className={styles.boardDate}><span>MINGGU</span><strong>29</strong><span>NOVEMBER 2026</span></div>
                <div className={styles.boardInfo}><div><FiCalendar aria-hidden="true" /><p><span>Mulai pukul</span><strong>{event.time}</strong></p></div><div><FiMapPin aria-hidden="true" /><p><span>Tempat kita berkumpul</span><strong>{event.place}</strong></p></div></div>
                <div className={styles.boardActions}><a className={styles.darkButton} href={event.mapsUrl} target="_blank" rel="noopener noreferrer">Petunjuk lokasi <FiArrowRight /></a><a className={styles.calendarLink} href="/birthday/sena/sena-birthday.ics" download>Simpan ke kalender <FiCalendar /></a></div>
              </div>
            </div>
          </section>

          <section className={styles.memories} aria-labelledby="memories-heading">
            <div className={styles.sectionIntro}><h2 id="memories-heading">Kecil-kecil,<br /><span>banyak cerita.</span></h2><p>Dari pelukan pertama sampai sibuk dengan mainan. Ini sedikit cerita dari tahun pertamaku.</p></div>
            <div className={styles.scrapbook}>{gallery.map(photo => <figure className={`${styles.memoryPhoto} ${styles[photo.className]}`} key={photo.file}><div className={styles.memoryImage}><Image src={`${asset}/${photo.file}.webp`} alt={photo.alt} layout="fill" objectFit="cover" unoptimized loading="lazy" /></div><figcaption>{photo.caption}</figcaption></figure>)}<span className={styles.scrapbookStar} aria-hidden="true" /></div>
          </section>

          <section id="rsvp" className={styles.rsvpSection} aria-labelledby="rsvp-heading">
            <div className={styles.rsvpInner}><div className={styles.rsvpCopy}><h2 id="rsvp-heading">Yuk, ikut<br />ngeramein!</h2><p>Kabari Ayah & Bunda kalau kamu bisa datang, ya. Biar semuanya siap menyambutmu.</p><Excavator className={styles.rsvpToy} /><span className={styles.rsvpNote}>Sena tunggu, ya!</span></div><RsvpForm /></div>
          </section>
          <section className={styles.goodbye}><span className={styles.goodbyeStar} aria-hidden="true" /><h2>Sampai ketemu<br />di pestaku!</h2><p>Dengan penuh sayang,</p><strong>Adhi & Cia</strong><a href={`https://wa.me/?text=${encodeURIComponent(`Yuk, rayakan ulang tahun pertama Sena!\nMinggu, 29 November 2026 · 15.00 WIB\nLihat undangan dan konfirmasi kehadiran di sini:\n${shareUrl}`)}`} target="_blank" rel="noopener noreferrer" className={styles.shareLink}><FiShare2 /> Bagikan lewat WhatsApp</a><a href="#home" className={styles.backTop}>Kembali ke atas ↑</a></section>
        </main>
        <footer className={styles.footer}>Dibuat dengan sayang untuk Sena · 2026</footer>
        <nav className={styles.mobileNav} aria-label="Navigasi undangan"><a href="#detail"><FiCalendar />Acara</a><a href={event.mapsUrl} target="_blank" rel="noopener noreferrer"><FiMapPin />Lokasi</a><a href="#rsvp">Aku ikut! <FiArrowRight /></a></nav>
      </>}
    </div>
  );
}
