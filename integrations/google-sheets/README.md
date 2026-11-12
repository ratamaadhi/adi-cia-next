# RSVP Sena melalui Google Sheets

Formulir `/birthday/sena` mengirim POST ke `/api/birthday/rsvp`. Server Vercel meneruskan data ke Google Apps Script dengan secret yang tersimpan di server. Spreadsheet tetap privat. Apps Script hanya menerima pengiriman dan tidak menyediakan endpoint untuk membaca data tamu.

Sheet tujuan adalah [Google Sheet RSVP Sena](https://docs.google.com/spreadsheets/d/181TtiXTsKaDrSMkMetMQV9L27qZIEQ5iLmat26PBVqE/edit). Integrasi memakai tab `RSVP Sena` dan tidak mengubah tab lain.

## Hubungkan Google Sheet

1. Buka sheet sebagai pemilik, lalu pilih **Extensions → Apps Script**.
2. Salin isi `Code.gs` dari folder ini ke editor Apps Script dan simpan.
3. Di **Project Settings → Script properties**, tambahkan `RSVP_SECRET` berisi secret acak sepanjang minimal 32 karakter. Simpan nilainya di password manager dan gunakan nilai yang sama untuk environment variable Vercel. Secret dapat dibuat dengan `openssl rand -hex 32`.
4. Jalankan fungsi `setupRsvpSheet` satu kali dan izinkan akses Google Sheets. Fungsi ini membuat tab dan header jika belum ada. Header tab yang sudah berisi data diverifikasi sebelum ada data baru yang ditulis.
5. Pilih **Deploy → New deployment → Web app**. Atur **Execute as** ke akun pemilik dan **Who has access** ke **Anyone**, kemudian deploy. Endpoint publik ini memverifikasi secret sebelum menulis. Spreadsheet tidak perlu dibagikan secara publik.
6. Salin URL deployment yang berakhiran `/exec`.

### Jika editor Apps Script gagal dibuka

Jika muncul pesan Google Drive “saat ini tidak dapat membuka file”, coba buka jendela Incognito/Private dan masuk hanya dengan akun Google pemilik Sheet. Google mendokumentasikan bahwa login beberapa akun sekaligus dapat menyebabkan masalah akses Apps Script.

Buka [Apps Script](https://script.google.com/) langsung, pilih **New project**, dan beri nama `RSVP Sena`. Salin isi `Code.gs` ke editor, lalu lanjutkan dari langkah pengaturan `RSVP_SECRET` di atas. Kode ini sudah membuka Sheet tujuan melalui `SpreadsheetApp.openById`, sehingga juga dapat dijalankan sebagai project mandiri.

Jika halaman Apps Script langsung masih gagal dibuka, catat URL halaman yang gagal dan periksa apakah akun yang digunakan akun pribadi atau Google Workspace. Kedua informasi ini diperlukan untuk membedakan masalah tautan, sesi akun, dan pengaturan organisasi.

Referensi Google tersedia pada [masalah beberapa akun](https://developers.google.com/apps-script/guides/projects) dan [pembuatan project mandiri](https://developers.google.com/apps-script/guides/standalone).

## Environment variable Vercel

Tambahkan kedua variabel berikut untuk environment deployment yang dipakai, kemudian redeploy.

```dotenv
GOOGLE_SHEETS_RSVP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SHEETS_RSVP_SECRET=SECRET_YANG_SAMA_DENGAN_RSVP_SECRET
```

Untuk mencoba integrasi lokal, tambahkan variabel yang sama ke `.env.local` dan restart development server. Jangan gunakan awalan `NEXT_PUBLIC_` untuk keduanya.

Saat Apps Script diubah, pilih **Deploy → Manage deployments → Edit → New version** agar URL `/exec` memakai kode terbaru.

## Periksa sebelum dibagikan

- Kirim RSVP percobaan melalui web deployment dan pastikan satu baris muncul di tab `RSVP Sena`.
- Coba hadir dan tidak hadir. Jawaban tidak hadir mencatat nol tamu.
- Ulangi request dengan ID yang sama untuk memastikan satu jawaban tidak menjadi dua baris.
- Hapus baris percobaan dari sheet setelah pengujian.
- Jika sheet dibagikan ke siapa saja yang memiliki tautan, ubah akses umum ke **Restricted** agar data tamu hanya terlihat oleh pengelola acara.

Dalam development tanpa URL Apps Script, jawaban disimpan di `.data/birthday-rsvp/` dan antarmuka menandainya sebagai preview lokal. Pada production, formulir mengembalikan pesan gagal jika integrasi belum dikonfigurasi. Pesan berhasil hanya muncul setelah server penyimpanan mengonfirmasi data diterima.

Nama tamu pada amplop dapat diisi melalui `/birthday/sena?invite=Nama%20Keluarga`. Tautan berbagi WhatsApp memakai alamat deployment aktif.
