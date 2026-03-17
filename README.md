# Tutorial Rust Web

Web tutorial Rust berbasis Nuxt dengan materi yang dipecah per modul dan submodule. Setiap submodule memiliki contoh kode sendiri dan Rust Lab sendiri untuk memperbaiki syntax error atau compile error langsung dari browser.

## Fitur utama

- katalog modul Rust dari dasar sampai topik lanjutan
- halaman terpisah untuk setiap modul
- submodule detail di dalam setiap modul
- Rust Lab per submodule dengan runner lokal berbasis `rustc`
- browser test menggunakan Playwright

## Kebutuhan

Pastikan environment lokal memiliki:

- Node.js dan npm
- Rust toolchain yang menyediakan `rustc`
- koneksi lokal untuk menjalankan server Nuxt

Rust Lab di web ini menjalankan kompilasi Rust melalui endpoint server lokal, jadi `rustc` harus tersedia di `PATH`.

## Instalasi

```bash
cd /Users/abdul/project/NSSF/latihan/rust/tutorial-rust-web
npm install
```

## Menjalankan saat development

Jalankan server development:

```bash
npm run dev
```

Setelah server aktif, buka alamat yang ditampilkan Nuxt di browser. Umumnya `http://localhost:3000`.

## Build production

Untuk memastikan aplikasi dapat dibangun sebagai server production:

```bash
npm run build
```

Untuk preview hasil build:

```bash
npm run preview
```

## Testing browser

Project ini memakai Playwright untuk smoke test alur pembelajaran dan Rust Lab:

```bash
npm run test:browser
```

Jika ingin menjalankan satu file test saja:

```bash
npx playwright test tests/exercise.spec.ts --reporter=line --workers=1
```

## Struktur penting project

- `pages/index.vue` untuk katalog modul utama
- `pages/modules/[id].vue` untuk halaman detail setiap modul
- `components/SubmoduleSection.vue` untuk renderer submodule beserta Rust Lab
- `components/ExerciseWorkbench.vue` untuk editor dan eksekusi latihan
- `data/tutorial.ts` untuk seluruh data modul, submodule, contoh, dan latihan
- `server/api/rust/run.post.ts` untuk runner Rust lokal
- `tests/exercise.spec.ts` untuk browser smoke test

## Catatan development

- Materi tutorial diisi dari `data/tutorial.ts`.
- Jika menambah modul baru, pastikan modul memiliki `submodules` dan setiap submodule memiliki `exercises`.
- Jika menambah jenis interaksi baru pada Rust Lab, cek kembali integrasi di `components/ExerciseWorkbench.vue` dan `server/api/rust/run.post.ts`.
- Setelah perubahan pada UI atau data latihan, jalankan minimal `npm run build` dan `npm run test:browser`.

## Credits

Pengembangan struktur modul awal dalam project ini mengambil dasar dari video YouTube:

- [Tutorial Rust Dasar (Bahasa Indonesia)](https://www.youtube.com/watch?v=FkASrE05VY4)

Credit kepada pemilik channel:

- [Programmer Zaman Now](https://www.youtube.com/@ProgrammerZamanNow)

Materi di dalam web ini sudah diperluas, dipecah ulang per modul dan submodule, serta disesuaikan menjadi format tutorial interaktif berbasis web.
