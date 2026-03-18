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
- `composables/useTutorialPreferences.ts`
  - state preferensi global untuk bahasa dan tema
- `composables/useTutorialUi.ts`
  - selector copy UI berdasarkan locale aktif
- `composables/useTutorialContent.ts`
  - selector konten tutorial yang locale-aware
- `data/ui.ts`
  - kamus copy UI untuk Indonesia dan English
- `data/tutorial.en.ts`
  - overlay English untuk overview, roadmap, judul/summary modul, submodule, dan exercise

## Status implementasi terakhir

- Sudah migrate ke Nuxt.
- Landing page menampilkan jumlah modul, submodule, dan jumlah Rust Lab.
- Setiap modul memiliki halaman sendiri.
- Halaman modul sekarang adaptif untuk jumlah submodule berapa pun, termasuk nol.
- Modul setup saat ini sudah dipecah menjadi 3 submodule untuk menunjukkan bahwa struktur tidak dibatasi 2 bagian.
- Jika submodule dipakai, masing-masing submodule dapat memiliki Rust Lab sendiri.
- Materi sekarang juga bisa menyimpan referensi resmi Rust docs per modul dan per submodule.
- Halaman modul menampilkan panel "Rust docs terkait" untuk topik yang memang punya rujukan resmi yang relevan, misalnya `Range`, `String`, `Option`, `Iterator`, `Result`, `Deref`, `Rc`, dan `RefCell`.
- Submodule sekarang juga mendukung panel "Contoh penggunaan" yang berisi kasus pakai praktis per topik.
- `advanced-smart-pointers` sudah diperluas dengan contoh `Box`, `Rc`, `Deref`, `RefCell`, `Box` pada `struct`, `Box<dyn Trait>`, `Deref` pada wrapper struct, dan perbandingan `tanpa Box` vs `dengan Box` pada recursive type.
- Pola perbandingan serupa sekarang juga dipakai di beberapa submodule lain, misalnya borrow vs move, if statement vs if expression, boolean state vs enum, helper root vs module, sentinel vs Option, loop manual vs iterator, Vec tuple vs HashMap, Vec dedup vs HashSet, dan unwrap vs Result.
- Beberapa submodule lain juga mulai memakai contoh berbasis custom type, misalnya trait pada dua struct, generic vs function duplikat, dan HashMap yang menyimpan struct sebagai value.
- Menu sidebar modul dan submodule sudah dibuat lebih compact dan scrollable agar item terakhir tetap mudah diakses, termasuk di viewport sempit.
- Layout navigasi modul kini tidak lagi memakan kolom sidebar tetap di desktop; menu modul dan submodule dipindah ke panel navigasi full-width di atas konten utama agar lebar layar lebih banyak dipakai untuk materi dan code block.
- Panel navigasi modul sekarang sticky saat user scroll ke bawah.
- Saat panel navigasi sudah menempel di atas viewport, tampilannya berubah ke mode ringkas dengan tombol expand untuk daftar modul atau daftar submodule agar tinggi panel tetap hemat.
- Saat mode sticky di-expand, daftar modul/submodule tetap berupa strip horizontal, tetapi sekarang strip itu membentang penuh di dalam `navigation-shell` agar area scroll memanfaatkan lebar panel aktif.
- Anchor submodule sekarang memakai `scroll-margin-top` yang lebih besar supaya lompatan ke bagian tertentu tidak ketutup panel navigasi sticky.
- `ExerciseWorkbench.vue` sudah aman dipakai berkali-kali dalam satu halaman.
- Progress tracking lokal per exercise/submodule sudah ditambahkan memakai local storage browser.
- Halaman modul sekarang menampilkan ringkasan progres, status per submodule, dan tombol reset progres modul.
- Landing page sekarang menampilkan progres per modul dan progres total yang sudah diselesaikan.
- Coverage materi di `data/tutorial.ts` sudah diperluas agar lebih dekat ke outline video sumber, terutama pada syntax, ownership, control flow, modeling, abstraction, stdlib, dan advanced.
- Materi collection sekarang dipisah ke modul khusus `collections` agar `Sequence`, `Maps`, dan `Sets` punya ruang belajar sendiri.
- Jumlah submodule sekarang lebih variatif: `syntax` 4, `ownership` 4, `control-flow` 3, `modeling` 3, `abstraction` 3, `stdlib` 3, `collections` 3, dan `advanced` 6.
- README dan `.gitignore` sudah ditambahkan.
- Tutorial sekarang mendukung dua bahasa: Indonesia dan English.
- Default locale saat pertama kali membuka app adalah Indonesia.
- Preferensi bahasa dan tema disimpan lokal di browser memakai key `rust-study-preferences`.
- Sekarang ada floating control kecil yang sticky di kanan bawah untuk mengganti bahasa dan theme tanpa meninggalkan halaman.
- Theme yang tersedia ada tiga: `light`, `dark`, dan `reading`.
- `app.vue` sekarang melakukan bootstrap preferensi sebelum hydration agar atribut `lang` dan `data-theme` pada root document mengikuti preferensi terakhir user.
- `useTutorialUi.ts` + `data/ui.ts` dipakai untuk melokalisasi copy UI, label panel, navigasi modul, lab, dan floating control.
- `useTutorialContent.ts` + `data/tutorial.en.ts` dipakai untuk melokalisasi katalog utama, roadmap, judul/summary modul, judul/summary submodule, serta judul/goal/difficulty exercise.
- Scope English saat ini belum 100% penuh di semua butir materi terdalam; item yang belum punya override masih fallback ke konten dasar di `data/tutorial.ts`.

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
- test juga memverifikasi navigasi sticky bisa di-expand kembali setelah user scroll jauh ke bawah
- test juga memverifikasi daftar modul pada sticky expand memakai hampir seluruh lebar `navigation-shell` dan tetap horizontal-scrollable
- test juga memverifikasi modul yang relevan menampilkan link resmi Rust docs, termasuk link `Range` di modul `control-flow`
- test juga memverifikasi modul collection terpisah menampilkan tiga submodule: `sequence`, `maps`, dan `sets`
- test juga memverifikasi submodule smart pointer menampilkan contoh penggunaan detail dan panel perbandingan `Tanpa Box` vs `Dengan Box`
- test juga memverifikasi panel perbandingan lintas modul muncul pada submodule seperti `ownership-borrowing` dan `stdlib-option`
- code block pada panel contoh penggunaan sekarang bisa scroll horizontal di dalam panel, sehingga baris Rust yang panjang tidak pecah atau meluber ke card sebelah
- build dan test terakhir tetap lolos setelah ekspansi materi/submodule besar di `data/tutorial.ts`
- test sekarang juga memverifikasi floating controls bisa mengganti bahasa ke English, mengganti theme ke `dark` lalu `reading`, dan memastikan preferensi tetap tersimpan setelah reload

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
