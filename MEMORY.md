# Codex Memory

File ini dipakai sebagai handoff context untuk thread Codex berikutnya. Jika membuka thread baru, buka workspace langsung dari folder ini:

`/Users/abdul/project/NSSF/latihan/rust/tutorial-rust-web`

Lalu minta thread baru untuk membaca `MEMORY.md` terlebih dahulu.

## Ringkasan project

- Project ini adalah web tutorial Rust berbasis Nuxt.
- Materi dibagi per modul.
- Satu modul bisa memiliki nol atau lebih submodule, tergantung kebutuhan materi.
- Jika modul memakai submodule, setiap submodule dapat memiliki:
  - ringkasan materi
  - daftar konsep
  - walkthrough belajar
  - contoh kode
  - Rust Lab sendiri
- Rust Lab mengeksekusi kode Rust melalui server API lokal yang memanggil `rustc`.

## Struktur penting

- `pages/index.vue`
  - katalog modul utama
- `pages/modules/[id].vue`
  - halaman detail modul
  - merender semua submodule dalam satu modul
- `components/TutorialSection.vue`
  - overview besar per modul
- `components/SubmoduleSection.vue`
  - renderer satu submodule lengkap dengan example dan Rust Lab
- `components/ExerciseWorkbench.vue`
  - editor, tab latihan, tombol run, hasil compile/run
- `data/tutorial.ts`
  - seluruh data modul, submodule, example code, dan latihan
- `server/api/rust/run.post.ts`
  - endpoint compile/run Rust
- `tests/exercise.spec.ts`
  - smoke test Playwright untuk submodule labs
- `assets/css/main.css`
  - styling utama

## Status implementasi terakhir

- Sudah migrate ke Nuxt.
- Landing page menampilkan jumlah modul, submodule, dan jumlah Rust Lab.
- Setiap modul memiliki halaman sendiri.
- Halaman modul sekarang adaptif untuk jumlah submodule berapa pun, termasuk nol.
- Modul setup saat ini sudah dipecah menjadi 3 submodule untuk menunjukkan bahwa struktur tidak dibatasi 2 bagian.
- Jika submodule dipakai, masing-masing submodule dapat memiliki Rust Lab sendiri.
- Menu sidebar modul dan submodule sudah dibuat lebih compact dan scrollable agar item terakhir tetap mudah diakses, termasuk di viewport sempit.
- `ExerciseWorkbench.vue` sudah aman dipakai berkali-kali dalam satu halaman.
- Progress tracking lokal per exercise/submodule sudah ditambahkan memakai local storage browser.
- Halaman modul sekarang menampilkan ringkasan progres, status per submodule, dan tombol reset progres modul.
- Landing page sekarang menampilkan progres per modul dan progres total yang sudah diselesaikan.
- README dan `.gitignore` sudah ditambahkan.

## Verifikasi terakhir

Command yang terakhir berhasil dijalankan:

```bash
npm run build
npx playwright test tests/exercise.spec.ts --reporter=line --workers=1
```

Hasil terakhir:

- build sukses
- browser smoke test sukses
- test memverifikasi 3 submodule pada modul setup, memastikan masing-masing lab bisa dijalankan, progres modul berubah, dan progres tetap tersimpan setelah reload
- test juga memverifikasi menu sidebar modul tetap bisa dipakai untuk membuka modul terakhir pada viewport sempit

## Catatan environment

- Repo Git ada langsung di folder ini.
- Thread sebelumnya dibuka dari parent directory sehingga diff panel Codex kurang ideal.
- Untuk thread baru, buka langsung folder `tutorial-rust-web` agar diff panel bekerja normal.
- MCP `browseros` tidak tersedia di sesi sebelumnya.
- Fallback testing browser yang dipakai adalah Playwright lokal.

## Kredit sumber dasar materi

Struktur modul awal project ini mengambil dasar dari:

- Video YouTube: `Tutorial Rust Dasar (Bahasa Indonesia)`
- URL: `https://www.youtube.com/watch?v=FkASrE05VY4`
- Channel: `Programmer Zaman Now`
- URL channel: `https://www.youtube.com/@ProgrammerZamanNow`

Materi di dalam app sudah diperluas dan dipecah ulang menjadi format modul/submodule interaktif.

## Cara lanjut di thread baru

Gunakan instruksi singkat seperti ini:

```text
Baca MEMORY.md lalu lanjutkan development project ini.
```

Atau jika ingin spesifik:

```text
Baca MEMORY.md lalu lanjutkan dari status terakhir. Fokus berikutnya adalah ...
```

## Next steps yang masuk akal

- tambah lebih banyak exercise per submodule
- tambah Playwright test untuk semua modul, bukan hanya modul setup
- tambahkan editor yang lebih kaya seperti Monaco bila diperlukan
- pisahkan data materi ke beberapa file jika `data/tutorial.ts` mulai terlalu besar
