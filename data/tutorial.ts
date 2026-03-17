export interface RustExercise {
  id: string;
  title: string;
  difficulty: string;
  goal: string;
  focus: string[];
  brokenCode: string;
  expectedOutput: string;
  hints: string[];
  explanation: string;
}

export interface LessonSubmodule {
  id: string;
  title: string;
  summary: string;
  concepts: string[];
  walkthrough: string[];
  exampleLabel: string;
  exampleCode: string;
  exercises: RustExercise[];
}

export interface LessonSection {
  id: string;
  badge: string;
  title: string;
  summary: string;
  foundations: string[];
  deepDive: string[];
  pitfalls: string[];
  checkpoints: string[];
  codeLabel: string;
  codeExample: string;
  practice: string[];
  submodules: LessonSubmodule[];
}

export const overviewCards = [
  {
    title: "Belajar Rust itu berlapis",
    body:
      "Jangan membaca Rust sebagai kumpulan syntax. Yang perlu dibangun berurutan adalah cara kerja compiler, cara data hidup di memori, lalu cara menulis API yang aman dan jelas.",
  },
  {
    title: "Kesalahan compile itu bagian dari materi",
    body:
      "Compiler Rust memang tegas. Justru itu keunggulannya untuk belajar. Pesan error tidak hanya memberitahu bahwa program salah, tetapi juga memberi arah untuk memperbaikinya.",
  },
  {
    title: "Latihan terbaik adalah edit-run-refine",
    body:
      "Setiap modul kini dipecah ke submodule kecil. Setelah membaca teori dan contoh, Anda langsung memperbaiki kode rusak yang relevan dengan konsep submodule tersebut.",
  },
];

export const roadmapPhases = [
  {
    title: "Phase 1: grammar bahasa",
    body:
      "Pahami let, mut, scalar type, tuple, array, function, if, dan loop. Di tahap ini Anda sedang membangun rasa terhadap bentuk dasar Rust.",
  },
  {
    title: "Phase 2: aliran data",
    body:
      "Masuk ke String, &str, ownership, borrowing, slice, dan cara compiler menjaga reference tetap valid. Ini fase yang paling membedakan Rust dari bahasa lain.",
  },
  {
    title: "Phase 3: membangun model",
    body:
      "Gunakan struct, enum, match, module, trait, dan generic untuk menulis kode yang lebih ekspresif. Fokusnya bukan cuma jalan, tetapi rapi dan mudah dibaca.",
  },
  {
    title: "Phase 4: library dan tooling",
    body:
      "Akhiri dengan collection, iterator, error handling, lifetime, smart pointer, dan macro. Pada fase ini Anda mulai menggabungkan konsep-konsep sebelumnya.",
  },
];

export const lessonSections: LessonSection[] = [
  {
    id: "setup",
    badge: "Modul 1",
    title: "Setup, Cargo, dan cara kerja project Rust",
    summary:
      "Dasar Rust bukan dimulai dari syntax, tetapi dari workflow. Anda perlu memahami bahwa toolchain, package manager, build system, test runner, dan dependency management semuanya bertemu di Cargo.",
    foundations: [
      "Gunakan rustup untuk memasang compiler dan toolchain pendukung. Setelah instalasi, verifikasi environment lewat terminal sebelum menulis kode.",
      "cargo new membuat struktur project minimal: file konfigurasi, folder src, dan entry point main.rs.",
      "cargo check memberi feedback compile lebih cepat daripada cargo run karena tidak menjalankan binary akhir.",
      "cargo test bukan hanya untuk production code. Untuk belajar, test function sangat nyaman karena satu project bisa menyimpan banyak eksperimen.",
    ],
    deepDive: [
      "Perlakukan Cargo.toml sebagai kontrak project. Di sana Anda menyimpan nama crate, versi, edition, dan dependency.",
      "Bedakan cargo run, cargo build, dan cargo build --release. Yang terakhir dipakai ketika Anda butuh binary final yang dioptimalkan.",
      "Biasakan membaca pesan compiler dari baris paling atas lebih dulu, lalu lihat saran yang diberikan compiler sebelum memperbaiki kode.",
    ],
    pitfalls: [
      "Menyimpan semua eksperimen di main.rs tanpa struktur akan cepat membuat pembelajaran kabur.",
      "Sering menjalankan cargo run untuk validasi syntax sederhana akan terasa lambat dibanding cargo check.",
    ],
    checkpoints: [
      "Anda bisa membuat project baru tanpa melihat catatan.",
      "Anda tahu kapan memakai cargo check, run, test, dan build.",
      "Anda tahu di mana konfigurasi project dan file entry point disimpan.",
    ],
    codeLabel: "Workflow paling kecil yang perlu dikuasai",
    codeExample: `cargo new belajar-rust
cd belajar-rust
cargo check
cargo run
cargo test
cargo build --release`,
    practice: [
      "Buat project baru lalu tambahkan satu test function yang hanya menampilkan teks agar Anda terbiasa menjalankan contoh lewat cargo test.",
      "Ubah nama crate dan edition di Cargo.toml, lalu jalankan lagi cargo check untuk memastikan perubahan terbaca.",
    ],
    submodules: [
      {
        id: "setup-environment",
        title: "Toolchain, rustup, dan entry point pertama",
        summary:
          "Submodule ini fokus pada hal paling awal yang harus terasa natural: compiler tersedia, project berhasil dibuat, dan file src/main.rs benar-benar menjadi titik masuk program.",
        concepts: [
          "rustup mengelola toolchain, target, dan komponen seperti rustfmt atau clippy.",
          "Project Rust minimal selalu punya entry point bernama main di src/main.rs.",
          "println! adalah macro, bukan function biasa, sehingga syntax pemanggilannya punya ciri khas sendiri.",
        ],
        walkthrough: [
          "Mulai dari verifikasi toolchain lewat terminal sebelum membuka editor.",
          "Kenali relasi antara cargo new, folder src, dan fungsi main.",
          "Perhatikan bahwa error syntax kecil di function main akan menghentikan seluruh program sejak awal.",
        ],
        exampleLabel: "Terminal sequence dan src/main.rs pertama",
        exampleCode: `rustup show active-toolchain
rustc --version
cargo new halo-rust
cd halo-rust

// src/main.rs
fn main() {
    println!("toolchain siap");
}`,
        exercises: [
          {
            id: "setup-main-entry",
            title: "Perbaiki entry point pertama",
            difficulty: "Pemula",
            goal: "Betulkan function main dan panggilan macro output agar program bisa dijalankan.",
            focus: [
              "Function main harus punya deklarasi yang lengkap.",
              "println! adalah macro yang perlu tanda seru dan kurung yang benar.",
            ],
            brokenCode: `fn main( {
    println("Toolchain siap");
}`,
            expectedOutput: "Toolchain siap",
            hints: [
              "Perhatikan bentuk signature function paling dasar di Rust.",
              "Macro output standar tidak dipanggil seperti function biasa.",
            ],
            explanation:
              "Function main adalah entry point. Begitu signature dan pemanggilan println! benar, compiler bisa membangun binary pertama tanpa hambatan.",
          },
        ],
      },
      {
        id: "setup-cargo-cycle",
        title: "Membaca siklus cargo check, run, test, dan build",
        summary:
          "Di tahap ini Anda perlu menghubungkan command Cargo dengan aktivitas nyata: memeriksa syntax, menjalankan program, menguji perilaku, dan menyiapkan binary release.",
        concepts: [
          "cargo check memvalidasi kode lebih cepat karena fokus pada proses kompilasi.",
          "cargo run melakukan build lalu mengeksekusi binary hasil build.",
          "cargo test dan cargo build --release punya tujuan berbeda: validasi perilaku vs binary optimasi.",
        ],
        walkthrough: [
          "Baca Cargo.toml sebagai identitas crate, bukan sekadar file konfigurasi sampingan.",
          "Pisahkan kode kecil ke function helper agar main tetap pendek dan mudah dipindai.",
          "Biasakan merapikan error satu per satu dari baris paling atas.",
        ],
        exampleLabel: "Siklus Cargo yang paling sering dipakai",
        exampleCode: `cargo check
cargo run
cargo test
cargo build --release

// Cargo.toml
[package]
name = "belajar-rust"
version = "0.1.0"
edition = "2024"`,
        exercises: [
          {
            id: "setup-helper-function",
            title: "Pisahkan logika ke function kecil",
            difficulty: "Pemula",
            goal: "Perbaiki signature function helper agar main bisa memakainya untuk mencetak nama crate.",
            focus: [
              "Function Rust memakai panah tipis untuk return type.",
              "Function kecil membantu file main tetap fokus pada alur program.",
            ],
            brokenCode: `fn crate_name() => &'static str {
    "belajar-rust"
}

fn main() {
    println!("crate: {}", crate_name());
}`,
            expectedOutput: "crate: belajar-rust",
            hints: [
              "Syntax return type function di Rust tidak memakai simbol sama dengan.",
              "Lihat kembali bentuk deklarasi function yang mengembalikan nilai.",
            ],
            explanation:
              "Memisahkan detail kecil ke function membantu struktur project lebih rapi. Signature function harus valid lebih dulu sebelum Cargo bisa memeriksa alur program lainnya.",
          },
        ],
      },
      {
        id: "setup-project-map",
        title: "Membaca Cargo.toml, src, dan verifikasi kecil",
        summary:
          "Setelah toolchain dan command dasar terasa familiar, Anda perlu bisa membaca susunan project minimal dan melakukan verifikasi kecil terhadap asumsi program Anda.",
        concepts: [
          "Cargo.toml menyimpan metadata crate dan menjadi pusat konfigurasi project.",
          "src/main.rs adalah lokasi entry point untuk binary sederhana.",
          "assert_eq! berguna untuk memverifikasi asumsi kecil sebelum program lanjut ke langkah berikutnya.",
        ],
        walkthrough: [
          "Mulai dari satu helper function yang mendeskripsikan layout project secara ringkas.",
          "Gunakan assert_eq! untuk memastikan helper itu mengembalikan nilai yang Anda harapkan.",
          "Cetak status akhir agar terlihat bahwa program lolos sampai selesai dieksekusi.",
        ],
        exampleLabel: "Membaca layout project Rust minimal",
        exampleCode: `// Cargo.toml
[package]
name = "belajar-rust"
version = "0.1.0"
edition = "2024"

// src/main.rs
fn project_layout() -> &'static str {
    "Cargo.toml + src/main.rs"
}

fn main() {
    assert_eq!("Cargo.toml + src/main.rs", project_layout());
    println!("layout siap");
}`,
        exercises: [
          {
            id: "setup-assert-layout",
            title: "Validasi layout project dengan assert_eq!",
            difficulty: "Pemula",
            goal: "Perbaiki assert_eq! dan pemanggilan helper agar program lolos verifikasi lalu mencetak status layout.",
            focus: [
              "assert_eq! adalah macro yang butuh tanda seru dan argumen lengkap.",
              "Helper function harus dipanggil, bukan dipakai sebagai item function mentah.",
            ],
            brokenCode: `fn project_layout() -> &'static str {
    "Cargo.toml + src/main.rs"
}

fn main() {
    assert_eq("Cargo.toml + src/main.rs", project_layout);
    println!("layout siap");
}`,
            expectedOutput: "layout siap",
            hints: [
              "Cek bentuk pemanggilan assert_eq! di Rust.",
              "Lihat apakah project_layout sedang dipanggil atau baru direferensikan.",
            ],
            explanation:
              "assert_eq! memberi verifikasi cepat terhadap asumsi kecil. Setelah macro dan pemanggilan function benar, program lolos validasi lalu mencetak status terakhir.",
          },
        ],
      },
    ],
  },
  {
    id: "syntax",
    badge: "Modul 2",
    title: "Variable, tipe data, angka, tuple, array, dan scope",
    summary:
      "Pada tahap ini tujuan Anda bukan sekadar menghafal syntax, tetapi memahami kenapa Rust memaksa tipe data dan mutability terlihat jelas sejak awal.",
    foundations: [
      "let membuat variable immutable secara default. Jika data memang harus berubah, mut harus ditulis eksplisit.",
      "Rust adalah static typed language, jadi satu variable tidak bebas berpindah tipe setelah diinisialisasi.",
      "Scalar type terdiri dari integer, float, boolean, dan char. Compound type utama adalah tuple dan array.",
      "Array menyimpan tipe homogen dengan ukuran tetap, sedangkan tuple menyimpan kombinasi tipe yang boleh berbeda.",
    ],
    deepDive: [
      "Default integer adalah i32 dan default floating-point adalah f64. Pilihan ini cukup untuk mayoritas contoh dasar.",
      "Shadowing berguna ketika Anda ingin memetakan ulang nilai tanpa membuat nama variable baru, tetapi terlalu sering akan merusak keterbacaan.",
      "const berbeda dari let karena nilainya harus tersedia saat kompilasi dan selalu butuh tipe eksplisit.",
      "Scope membantu Anda memahami kapan suatu nama masih tersedia, dan ini akan menjadi fondasi untuk ownership.",
    ],
    pitfalls: [
      "Menganggap shadowing sama dengan mutability. Keduanya menghasilkan perilaku berbeda.",
      "Memilih array untuk data yang seharusnya dinamis. Array bukan collection yang berkembang saat runtime.",
    ],
    checkpoints: [
      "Anda bisa memilih kapan memakai tuple dan kapan memakai array.",
      "Anda tahu kenapa const tidak sama dengan let mut.",
      "Anda nyaman membaca tipe angka seperti i32, u64, dan f64.",
    ],
    codeLabel: "Contoh syntax dasar yang sering muncul",
    codeExample: `const APP_NAME: &str = "Rust Study";

fn main() {
    let user = "Abdul";
    let mut total = 1;
    total += 2;

    let aktif = true;
    let grade = 'A';
    let koordinat = (-6.2, 106.8);
    let skor = [10, 20, 30];

    println!("{APP_NAME}");
    println!("{user} / {aktif} / {grade}");
    println!("koordinat = {:?}, skor = {}", koordinat, skor[1]);
    println!("total = {total}");
}`,
    practice: [
      "Tulis satu program yang memakai semua scalar type dan minimal satu tuple serta satu array.",
      "Buat dua versi solusi: satu memakai shadowing dan satu lagi memakai mut, lalu bandingkan mana yang lebih jelas dibaca.",
    ],
    submodules: [
      {
        id: "syntax-mutability",
        title: "let, mut, dan perubahan nilai yang eksplisit",
        summary:
          "Rust menganggap data immutable sebagai default. Submodule ini melatih Anda untuk membedakan kapan data cukup dibaca dan kapan mutability memang harus dinyatakan terang-terangan.",
        concepts: [
          "let membuat binding yang tidak bisa diubah.",
          "mut dipakai saat value memang perlu diperbarui setelah inisialisasi.",
          "Compiler akan menolak perubahan state yang tidak dinyatakan eksplisit.",
        ],
        walkthrough: [
          "Cek variable mana yang benar-benar berubah selama program berjalan.",
          "Pastikan statement diakhiri dengan titik koma ketika memang merupakan statement biasa.",
          "Gunakan mut seperlunya agar niat kode tetap jelas.",
        ],
        exampleLabel: "Mutability paling dasar",
        exampleCode: `fn main() {
    let mut total = 1;
    total += 2;

    println!("total = {total}");
}`,
        exercises: [
          {
            id: "syntax-mut-counter",
            title: "Counter mutable",
            difficulty: "Pemula",
            goal: "Perbaiki variable agar bisa diperbarui lalu tampilkan hasil akhirnya.",
            focus: [
              "Mutability harus ditulis eksplisit.",
              "Statement biasa perlu diakhiri titik koma.",
            ],
            brokenCode: `fn main() {
    let total = 1
    total += 2;
    println!("Total: {total}");
}`,
            expectedOutput: "Total: 3",
            hints: [
              "Ada variable yang diubah walau belum diberi mut.",
              "Periksa statement pertama sebelum operasi penambahan dilakukan.",
            ],
            explanation:
              "Dua error paling umum di awal belajar Rust adalah lupa menambahkan mut dan lupa menutup statement dengan titik koma. Latihan ini sengaja memadukan keduanya.",
          },
        ],
      },
      {
        id: "syntax-types",
        title: "const, tuple, array, dan membaca tipe secara sadar",
        summary:
          "Setelah binding terasa jelas, langkah berikutnya adalah membedakan data yang diketahui saat kompilasi, data majemuk dengan tipe campuran, dan data berukuran tetap.",
        concepts: [
          "const wajib punya tipe eksplisit karena nilainya harus diketahui saat kompilasi.",
          "Tuple cocok untuk beberapa nilai heterogen yang bergerak bersama.",
          "Array cocok untuk kumpulan nilai homogen dengan panjang tetap.",
        ],
        walkthrough: [
          "Baca perbedaan bentuk tuple indexing dan array indexing.",
          "Ingat bahwa const tidak sama dengan let mut, baik dari niat maupun aturannya.",
          "Gunakan contoh kecil sebelum mencoba struktur data yang lebih dinamis.",
        ],
        exampleLabel: "Const dan compound type kecil",
        exampleCode: `const MAX_USERS: usize = 3;

fn main() {
    let point = (10, 20);
    let labels = ["A", "B", "C"];

    println!("{} {} {}", MAX_USERS, point.1, labels[0]);
}`,
        exercises: [
          {
            id: "syntax-const-type",
            title: "Const butuh tipe",
            difficulty: "Pemula",
            goal: "Betulkan deklarasi const agar program dapat menampilkan nilai const dan elemen array.",
            focus: [
              "const tidak boleh dideklarasikan tanpa tipe.",
              "Array index dan output sederhana membantu memeriksa hasil compile.",
            ],
            brokenCode: `const MAX_USERS = 3;

fn main() {
    let group = ["A", "B", "C"];
    println!("{} {}", MAX_USERS, group[1]);
}`,
            expectedOutput: "3 B",
            hints: [
              "Bandingkan aturan const dengan aturan let.",
              "Ada detail wajib di antara nama const dan tanda sama dengan.",
            ],
            explanation:
              "Rust memaksa const memiliki tipe eksplisit karena nilainya diselesaikan saat kompilasi. Setelah tipe ditambahkan, sisanya berjalan normal.",
          },
        ],
      },
    ],
  },
  {
    id: "ownership",
    badge: "Modul 3",
    title: "String, stack dan heap, ownership, borrowing, slice",
    summary:
      "Rust mulai terasa berbeda ketika Anda masuk ke String dan ownership. Modul ini adalah pusat pembelajaran karena hampir semua fitur besar Rust bergantung pada cara data dimiliki dan dipinjam.",
    foundations: [
      "Data berukuran tetap cenderung hidup di stack, sedangkan data yang tumbuh seperti String berada di heap.",
      "&str adalah view ke data string, sedangkan String adalah pemilik buffer UTF-8 yang bisa bertambah atau berubah.",
      "Aturan ownership inti sangat sederhana: setiap value punya satu owner, hanya ada satu owner aktif pada satu waktu, dan value dibersihkan saat owner keluar scope.",
      "Reference memungkinkan Anda membaca atau meminjam data tanpa memindahkan ownership.",
    ],
    deepDive: [
      "Tipe yang kecil dan fixed-size umumnya dicopy, tetapi value heap seperti String cenderung dipindahkan ketika diassign ke variable baru.",
      "clone dipakai saat Anda memang ingin membuat salinan data heap yang benar-benar baru.",
      "Immutable borrow bisa banyak, tetapi mutable borrow hanya satu dan tidak boleh hidup bersamaan dengan borrow lain.",
      "Slice adalah reference ke sebagian data, baik array slice maupun string slice. Ia tidak memiliki data, hanya menunjuk ke data.",
    ],
    pitfalls: [
      "Mengembalikan reference ke data lokal yang dibuat di dalam function. Ini menghasilkan dangling reference dan akan ditolak compiler.",
      "Menggunakan clone untuk semua masalah ownership tanpa memahami alasan perpindahan data.",
    ],
    checkpoints: [
      "Anda bisa menjelaskan beda String dan &str dengan kata-kata Anda sendiri.",
      "Anda tahu kapan perlu borrow dan kapan memang harus memindahkan value.",
      "Anda paham kenapa slice tidak punya ownership.",
    ],
    codeLabel: "Fungsi yang aman karena memakai borrow",
    codeExample: `fn first_word(text: &str) -> &str {
    if let Some(index) = text.find(' ') {
        &text[..index]
    } else {
        text
    }
}

fn main() {
    let title = String::from("rust dasar");
    let first = first_word(&title);

    println!("kata pertama = {first}");
    println!("judul asli    = {title}");
}`,
    practice: [
      "Ambil satu function yang menerima String, lalu ubah menjadi menerima &str dan amati perbedaan saat caller ingin tetap memakai nilai aslinya.",
      "Tulis contoh array slice dan string slice untuk merasakan bahwa keduanya sama-sama reference ke sebagian data.",
    ],
    submodules: [
      {
        id: "ownership-borrowing",
        title: "String vs &str dan borrow yang tidak memindahkan data",
        summary:
          "Submodule ini membantu Anda merasakan kapan function cukup membaca data lewat reference, dan kapan pengiriman value justru memindahkan pemilik utama.",
        concepts: [
          "String memiliki buffer heap, sedangkan &str hanya melihat data string yang ada.",
          "Borrow cocok ketika function hanya perlu membaca atau menginspeksi data.",
          "Dengan borrow, caller tetap memegang owner utama setelah function selesai.",
        ],
        walkthrough: [
          "Mulai dari function yang menerima &str dan kembalikan slice ke data yang sama.",
          "Bandingkan pemanggilan function dengan value penuh vs reference.",
          "Cek apakah nilai asli masih bisa dipakai setelah function dipanggil.",
        ],
        exampleLabel: "Borrow string yang aman",
        exampleCode: `fn first_word(text: &str) -> &str {
    if let Some(index) = text.find(' ') {
        &text[..index]
    } else {
        text
    }
}

fn main() {
    let title = String::from("rust dasar");
    println!("{}", first_word(&title));
    println!("{}", title);
}`,
        exercises: [
          {
            id: "ownership-borrow-word",
            title: "Borrow string",
            difficulty: "Menengah",
            goal: "Perbaiki pemanggilan function agar String tetap bisa dipakai setelah fungsi selesai.",
            focus: [
              "Pahami kapan String dipindah dan kapan cukup dipinjam.",
              "Gunakan reference bila function hanya perlu membaca data.",
            ],
            brokenCode: `fn first_word(text: &str) -> &str {
    if let Some(index) = text.find(' ') {
        &text[..index]
    } else {
        text
    }
}

fn main() {
    let title = String::from("rust dasar");
    let word = first_word(title);
    println!("{word}");
    println!("{title}");
}`,
            expectedOutput: "rust\nrust dasar",
            hints: [
              "Signature function tidak meminta String utuh.",
              "Caller seharusnya mengirim view ke string, bukan memindahkan pemilik data.",
            ],
            explanation:
              "Jika function hanya membaca sebagian string, kirim reference. Dengan begitu owner utama tetap berada di caller dan nilai asli masih bisa dipakai.",
          },
        ],
      },
      {
        id: "ownership-mutable-borrow",
        title: "Mutable borrow dan perubahan data yang terkontrol",
        summary:
          "Begitu Anda mulai mengubah isi String atau collection, aturan borrow menjadi lebih ketat. Rust ingin memastikan hanya ada satu jalur mutasi yang aktif pada saat yang sama.",
        concepts: [
          "&mut memberi akses ubah ke data tanpa memindahkan ownership.",
          "Mutable borrow menuntut akses eksklusif selama borrow itu aktif.",
          "Mutasi data heap seperti String sebaiknya dibungkus ke function kecil yang niatnya jelas.",
        ],
        walkthrough: [
          "Buat function yang menerima &mut String lalu ubah isinya dengan push_str.",
          "Tandai binding caller dengan mut bila nilainya memang akan berubah.",
          "Lihat bahwa caller tetap menjadi owner walau mutasi dilakukan di function lain.",
        ],
        exampleLabel: "Mutasi String lewat borrow",
        exampleCode: `fn append_suffix(name: &mut String) {
    name.push_str(" Rust");
}

fn main() {
    let mut title = String::from("Belajar");
    append_suffix(&mut title);
    println!("{title}");
}`,
        exercises: [
          {
            id: "ownership-mutable-borrow",
            title: "Mutable borrow untuk String",
            difficulty: "Menengah",
            goal: "Perbaiki pemanggilan function agar String bisa dimutasi tanpa memindahkan ownership.",
            focus: [
              "Function menerima mutable reference, bukan String utuh.",
              "Caller perlu mengirim borrow yang cocok dengan signature function.",
            ],
            brokenCode: `fn append_suffix(name: &mut String) {
    name.push_str(" Rust");
}

fn main() {
    let mut title = String::from("Belajar");
    append_suffix(title);
    println!("{title}");
}`,
            expectedOutput: "Belajar Rust",
            hints: [
              "Bandingkan bentuk parameter function dengan argumen yang dikirim dari main.",
              "Nilai asli harus tetap dimiliki caller setelah function selesai.",
            ],
            explanation:
              "Mutable borrow memungkinkan perubahan data tanpa memindahkan pemilik. Kuncinya adalah signature function dan bentuk argumen caller harus benar-benar cocok.",
          },
        ],
      },
    ],
  },
  {
    id: "control-flow",
    badge: "Modul 4",
    title: "If expression, loop, while, for, range, function, recursion",
    summary:
      "Rust adalah bahasa yang expression-oriented. That means banyak blok kode menghasilkan nilai. Pola ini akan sering Anda temui dan sangat penting untuk menulis kode yang ringkas tetapi tetap jelas.",
    foundations: [
      "if adalah expression, jadi hasil percabangan bisa langsung dipakai untuk mengisi variable.",
      "loop berjalan terus sampai break. break sendiri bisa membawa return value dari loop.",
      "while cocok untuk kondisi yang Anda cek berulang, sedangkan for lebih natural untuk iterasi data berurutan.",
      "Function menggunakan snake_case, parameter wajib bertipe, dan nilai balik ditentukan oleh expression terakhir atau return eksplisit.",
    ],
    deepDive: [
      "Label pada loop membantu ketika Anda punya nested loop dan ingin berhenti dari loop tertentu secara eksplisit.",
      "Range eksklusif dan range inklusif sangat berguna untuk iterasi serta slicing.",
      "Recursion boleh dipakai selama kasus basisnya jelas. Rust tidak melarang pola ini, tetapi Anda tetap perlu menjaga keterbacaan.",
      "Ownership tetap berlaku ketika value dikirim ke function, jadi bentuk parameter selalu perlu dipikirkan bersamaan dengan logika fungsi.",
    ],
    pitfalls: [
      "Memakai while untuk semua iterasi padahal for jauh lebih idiomatis dan aman saat mengakses collection.",
      "Lupa bahwa expression terakhir tanpa titik koma akan menjadi return value dari function atau block.",
    ],
    checkpoints: [
      "Anda nyaman memakai if sebagai expression.",
      "Anda bisa menulis loop yang mengembalikan nilai lewat break.",
      "Anda tahu kapan lebih baik memakai for daripada while.",
    ],
    codeLabel: "Expression-oriented flow",
    codeExample: `fn status(score: i32) -> &'static str {
    if score >= 75 { "lulus" } else { "ulang" }
}

fn main() {
    let total = loop {
        for number in 1..=5 {
            if number == 4 {
                break number * 10;
            }
        }
    };

    println!("status = {}", status(80));
    println!("total  = {total}");
}`,
    practice: [
      "Buat menu sederhana berbasis loop yang terus berjalan sampai user memilih keluar.",
      "Tulis ulang satu solusi if-else biasa menjadi if expression yang langsung mengisi variable.",
    ],
    submodules: [
      {
        id: "control-flow-if-expression",
        title: "if sebagai expression yang menghasilkan nilai",
        summary:
          "Submodule ini menekankan bahwa if di Rust bukan hanya percabangan prosedural. Ia juga bisa mengembalikan nilai selama semua cabang konsisten.",
        concepts: [
          "if dapat langsung dipakai untuk mengisi variable atau menjadi expression terakhir function.",
          "Blok function dan blok if sama-sama harus tertutup rapi.",
          "Compiler sangat bergantung pada struktur kurung kurawal untuk memahami alur nilai.",
        ],
        walkthrough: [
          "Lihat bagaimana function bisa selesai hanya dengan expression terakhir.",
          "Periksa batas blok sebelum menyalahkan isi expression-nya.",
          "Gunakan contoh kecil untuk membangun intuisi pada expression-oriented style.",
        ],
        exampleLabel: "if expression dalam function",
        exampleCode: `fn status(score: i32) -> &'static str {
    if score >= 75 {
        "lulus"
    } else {
        "ulang"
    }
}

fn main() {
    println!("{}", status(80));
}`,
        exercises: [
          {
            id: "control-flow-if-expression",
            title: "If expression lengkap",
            difficulty: "Menengah",
            goal: "Perbaiki function agar blok if-expression selesai dengan benar lalu tampilkan hasilnya.",
            focus: [
              "Rust sangat sensitif pada batas blok function dan expression.",
              "Function yang mengembalikan nilai tetap harus punya struktur blok yang lengkap.",
            ],
            brokenCode: `fn label(score: i32) -> &'static str {
    if score >= 75 {
        "lulus"
    } else {
        "ulang"
    }

fn main() {
    println!("{}", label(80));
}`,
            expectedOutput: "lulus",
            hints: [
              "Periksa apakah function pertama sudah benar-benar ditutup sebelum main dimulai.",
              "Blok if-expression sudah benar, tetapi ada batas blok function yang belum lengkap.",
            ],
            explanation:
              "If di Rust dapat menghasilkan nilai, tetapi blok function tetap harus ditutup dengan benar. Compiler membaca struktur kurung kurawal secara ketat.",
          },
        ],
      },
      {
        id: "control-flow-loops",
        title: "while, for, dan range untuk iterasi yang jelas",
        summary:
          "Ketika alur program mulai berulang, Rust menyediakan beberapa bentuk loop dengan niat yang berbeda. Submodule ini membantu Anda memilih bentuk yang paling tepat dan idiomatis.",
        concepts: [
          "while cocok saat pengulangan dikendalikan kondisi yang berubah.",
          "for lebih aman dan lebih idiomatis untuk iterasi terhadap range atau collection.",
          "Blok loop harus jelas agar compiler bisa memisahkan kondisi dan tubuh loop.",
        ],
        walkthrough: [
          "Mulai dari while sederhana sebelum beralih ke for dan range.",
          "Pastikan perubahan state terjadi di dalam blok loop, bukan di luar tanpa sengaja.",
          "Gunakan output akhir untuk mengonfirmasi berapa kali loop berjalan.",
        ],
        exampleLabel: "Loop sederhana dengan kondisi eksplisit",
        exampleCode: `fn main() {
    let mut count = 0;

    while count < 3 {
        count += 1;
    }

    println!("{count}");
}`,
        exercises: [
          {
            id: "control-flow-while-block",
            title: "Tutup blok while dengan benar",
            difficulty: "Menengah",
            goal: "Perbaiki syntax loop while agar penghitung naik sampai target yang diinginkan.",
            focus: [
              "while perlu blok tubuh yang jelas.",
              "Perubahan state harus tetap berada di dalam blok loop.",
            ],
            brokenCode: `fn main() {
    let mut count = 0;

    while count < 3
        count += 1;
    }

    println!("{count}");
}`,
            expectedOutput: "3",
            hints: [
              "Bandingkan bentuk while di Rust dengan bentuk if atau loop yang lain.",
              "Kondisi loop seharusnya langsung diikuti blok tubuh.",
            ],
            explanation:
              "while di Rust tidak memakai titik dua atau kata kunci tambahan. Yang dibutuhkan hanyalah kondisi yang valid dan blok tubuh yang tertutup rapi.",
          },
        ],
      },
    ],
  },
  {
    id: "modeling",
    badge: "Modul 5",
    title: "Struct, enum, method, pattern matching, type alias",
    summary:
      "Modul ini mengubah Rust dari bahasa latihan syntax menjadi bahasa pemodelan domain. Begitu Anda paham struct dan enum, kode akan terasa jauh lebih ekspresif.",
    foundations: [
      "Struct menyimpan beberapa field bernama. Ini membuat data lebih mudah dibaca daripada tuple ketika domain mulai kompleks.",
      "Method ditulis dalam blok impl dan menerima self, &self, atau &mut self sesuai kebutuhan.",
      "Enum merepresentasikan pilihan state yang mutually exclusive. Ini jauh lebih aman daripada beberapa boolean yang saling bergantung.",
      "match memaksa Anda menangani semua kemungkinan. Sifat exhaustive ini adalah salah satu kekuatan terbesar Rust.",
    ],
    deepDive: [
      "Struct update syntax berguna untuk membuat instance baru dari instance lama, tetapi field heap yang ikut dipindah dapat membuat nilai lama tidak lagi valid.",
      "Tuple struct dan unit-like struct tetap berguna ketika nama tipe penting tetapi nama field tidak terlalu membantu.",
      "Pattern matching bisa membongkar data dari enum maupun struct, bukan hanya mengecek nilai literal.",
      "Type alias membuat model bisnis lebih mudah dibaca tanpa biaya runtime tambahan.",
    ],
    pitfalls: [
      "Memodelkan state dengan banyak boolean padahal enum jauh lebih aman.",
      "Menganggap match setara dengan switch biasa. Di Rust, match lebih kaya dan lebih ketat.",
    ],
    checkpoints: [
      "Anda bisa memilih kapan memakai struct dan kapan memakai enum.",
      "Anda mengerti kenapa match harus exhaustive.",
      "Anda tahu bedanya method dan associated function.",
    ],
    codeLabel: "Model data kecil yang idiomatis",
    codeExample: `type UserId = u64;

struct User {
    id: UserId,
    name: String,
}

enum Role {
    Guest,
    Member(String),
}

impl User {
    fn label(&self) -> String {
        format!("#{} {}", self.id, self.name)
    }
}

fn role_text(role: Role) -> String {
    match role {
        Role::Guest => String::from("guest"),
        Role::Member(level) => format!("member:{level}"),
    }
}`,
    practice: [
      "Modelkan sistem task dengan struct Task dan enum TaskStatus.",
      "Tambahkan method ringkasan dan satu function yang memakai match untuk mengubah state menjadi label tampilan.",
    ],
    submodules: [
      {
        id: "modeling-struct-method",
        title: "Struct, field bernama, dan method yang rapi",
        summary:
          "Submodule ini menekankan penggunaan struct untuk membentuk model data yang mudah dibaca, lalu menambahkan method agar perilaku menempel pada data yang tepat.",
        concepts: [
          "Struct cocok untuk domain yang butuh field bernama dan keterbacaan.",
          "Method di blok impl mengikat perilaku langsung ke tipe yang relevan.",
          "&self dipakai saat method hanya membaca data milik instance.",
        ],
        walkthrough: [
          "Mulai dari struct kecil dengan dua atau tiga field yang jelas.",
          "Tambahkan method ringkasan agar logika formatting tidak tercecer di main.",
          "Pastikan signature method valid sebelum melihat isi format string.",
        ],
        exampleLabel: "Struct dan method label",
        exampleCode: `struct User {
    name: String,
    age: u8,
}

impl User {
    fn label(&self) -> String {
        format!("{} ({})", self.name, self.age)
    }
}

fn main() {
    let user = User {
        name: String::from("Nina"),
        age: 20,
    };

    println!("{}", user.label());
}`,
        exercises: [
          {
            id: "modeling-struct-method",
            title: "Method pada struct",
            difficulty: "Menengah",
            goal: "Perbaiki signature method agar instance struct bisa menampilkan label dengan benar.",
            focus: [
              "Method tetap memakai syntax function biasa di dalam impl.",
              "Return type function di Rust menggunakan panah tipis.",
            ],
            brokenCode: `struct User {
    name: String,
    age: u8,
}

impl User {
    fn label(&self) => String {
        format!("{} ({})", self.name, self.age)
    }
}

fn main() {
    let user = User {
        name: String::from("Nina"),
        age: 20,
    };

    println!("{}", user.label());
}`,
            expectedOutput: "Nina (20)",
            hints: [
              "Method di impl tetap mengikuti aturan signature function biasa.",
              "Perhatikan simbol yang memisahkan parameter dan return type.",
            ],
            explanation:
              "Walau berada di dalam impl, method tetap function Rust biasa. Begitu return type ditulis dengan benar, format label akan dievaluasi normal.",
          },
        ],
      },
      {
        id: "modeling-enum-match",
        title: "Enum dan match untuk state yang eksplisit",
        summary:
          "Jika struct menyusun data, enum menyusun kemungkinan state. Submodule ini membantu Anda merasakan kenapa match menjadi pasangan alami untuk enum di Rust.",
        concepts: [
          "Enum memodelkan pilihan state yang mutually exclusive.",
          "match memaksa semua kemungkinan ditangani secara eksplisit.",
          "Branch match harus punya syntax yang jelas agar parser dan pembaca sama-sama nyaman.",
        ],
        walkthrough: [
          "Mulai dari enum dua state sebelum masuk ke enum dengan data tambahan.",
          "Baca setiap arm match sebagai kontrak perilaku untuk satu varian.",
          "Perhatikan pemisah antar-arm karena error kecil di sini sangat umum.",
        ],
        exampleLabel: "Enum status dan match label",
        exampleCode: `enum Status {
    Draft,
    Published,
}

fn label(status: Status) -> &'static str {
    match status {
        Status::Draft => "draft",
        Status::Published => "published",
    }
}`,
        exercises: [
          {
            id: "modeling-match-status",
            title: "Match status",
            difficulty: "Menengah",
            goal: "Perbaiki syntax match agar semua branch valid dan program bisa dijalankan.",
            focus: [
              "Setiap arm di match harus ditulis dengan bentuk yang benar.",
              "Pisahkan branch dengan tanda yang tepat agar parser Rust mengenalinya.",
            ],
            brokenCode: `enum Status {
    Draft,
    Published,
}

fn label(status: Status) -> &'static str {
    match status {
        Status::Draft => "draft"
        Status::Published => "published",
    }
}

fn main() {
    println!("{}", label(Status::Published));
}`,
            expectedOutput: "published",
            hints: [
              "Lihat pemisah antarcabang pada blok match.",
              "Setiap arm harus berdiri jelas agar compiler tahu batasnya.",
            ],
            explanation:
              "match di Rust sangat ketat. Syntax yang tepat penting karena compiler harus bisa memastikan semua kemungkinan tertangani dengan bentuk yang jelas.",
          },
        ],
      },
    ],
  },
  {
    id: "abstraction",
    badge: "Modul 6",
    title: "Module, crate, visibility, trait, generic, where clause",
    summary:
      "Saat project membesar, struktur menjadi penting. Modul ini membantu Anda menata kode, membuat kontrak perilaku, dan mengurangi duplikasi dengan generic.",
    foundations: [
      "Module memecah kode ke area tanggung jawab yang lebih kecil. pub dipakai untuk menentukan apa yang terbuka ke luar.",
      "crate:: dan super:: membantu navigasi ketika Anda mulai punya module bertingkat.",
      "Trait mendefinisikan perilaku yang dapat diimplementasikan banyak tipe berbeda.",
      "Generic memungkinkan struct, function, enum, method, dan trait menerima tipe yang ditentukan saat dipakai.",
    ],
    deepDive: [
      "Default implementation pada trait memberi perilaku umum yang bisa diwarisi implementor tanpa menulis ulang.",
      "impl Trait menyederhanakan parameter dan return value saat Anda ingin berbicara tentang perilaku, bukan type konkret.",
      "Type bound dan where clause menjaga generic tetap punya kemampuan yang relevan dengan operasi yang dilakukan.",
      "Trait standar seperti Display, Debug, Add, atau PartialEq menunjukkan bahwa banyak fitur bahasa sebenarnya dibangun di atas trait.",
    ],
    pitfalls: [
      "Membuat generic terlalu cepat untuk kasus yang sebenarnya hanya punya satu tipe nyata.",
      "Mengekspos terlalu banyak member module dengan pub sehingga batas antarbagian project menjadi kabur.",
    ],
    checkpoints: [
      "Anda bisa memecah kode ke beberapa file dan tetap mengimpornya dengan benar.",
      "Anda paham kapan trait dipakai sebagai kontrak perilaku.",
      "Anda bisa membaca syntax generic dan where clause tanpa bingung.",
    ],
    codeLabel: "Trait plus generic yang sederhana",
    codeExample: `trait Summary {
    fn summary(&self) -> String;
}

struct Article<T> {
    title: T,
}

impl Summary for Article<String> {
    fn summary(&self) -> String {
        format!("Artikel: {}", self.title)
    }
}

fn print_summary(item: &impl Summary) {
    println!("{}", item.summary());
}`,
    practice: [
      "Pecah satu project kecil ke module terpisah, lalu ekspor hanya member yang memang perlu dipakai di luar.",
      "Buat satu trait sederhana dan implementasikan pada dua struct berbeda agar Anda merasakan manfaat perilaku generik.",
    ],
    submodules: [
      {
        id: "abstraction-traits",
        title: "Trait sebagai kontrak perilaku",
        summary:
          "Submodule ini memperjelas trait sebagai cara menyatakan perilaku bersama, bukan sekadar fitur sintaksis tambahan. Tujuannya agar Anda berpikir dalam kontrak API, bukan hanya tipe konkret.",
        concepts: [
          "Trait mendefinisikan perilaku yang bisa diimplementasikan banyak tipe.",
          "Implementasi trait tetap menggunakan method Rust biasa lengkap dengan fn dan signature-nya.",
          "Memanggil method trait membuat kode lebih fleksibel dibanding menggandakan fungsi serupa.",
        ],
        walkthrough: [
          "Definisikan trait yang kecil dan jelas terlebih dahulu.",
          "Implementasikan trait itu pada satu struct agar pola dasarnya terasa.",
          "Bandingkan deklarasi method pada trait dan deklarasi method saat implementasi.",
        ],
        exampleLabel: "Trait Summary paling sederhana",
        exampleCode: `trait Summary {
    fn summary(&self) -> String;
}

struct Note {
    title: String,
}

impl Summary for Note {
    fn summary(&self) -> String {
        format!("Catatan: {}", self.title)
    }
}`,
        exercises: [
          {
            id: "abstraction-trait-impl",
            title: "Trait implementation",
            difficulty: "Menengah",
            goal: "Perbaiki implementasi trait agar method memiliki deklarasi yang valid.",
            focus: [
              "Method dalam impl tetap harus dideklarasikan dengan kata kunci fn.",
              "Trait dan implementasi harus punya signature yang konsisten.",
            ],
            brokenCode: `trait Summary {
    fn summary(&self) -> String;
}

struct Note {
    title: String,
}

impl Summary for Note {
    summary(&self) -> String {
        format!("Catatan: {}", self.title)
    }
}

fn main() {
    let note = Note {
        title: String::from("Trait"),
    };

    println!("{}", note.summary());
}`,
            expectedOutput: "Catatan: Trait",
            hints: [
              "Bandingkan bentuk deklarasi method pada trait dan pada implementasinya.",
              "Ada satu keyword yang hilang tepat sebelum nama method.",
            ],
            explanation:
              "Implementasi trait mengikuti bentuk method biasa pada Rust. Kata kunci fn tetap diperlukan walaupun method tersebut sudah didefinisikan di trait.",
          },
        ],
      },
      {
        id: "abstraction-generics",
        title: "Generic function untuk mengurangi duplikasi yang sehat",
        summary:
          "Setelah trait, generic membantu Anda menulis logika yang dapat dipakai pada banyak tipe selama operasinya memang serupa. Kuncinya adalah tetap menjaga generic tetap sederhana dan tepat guna.",
        concepts: [
          "Generic function menerima tipe sebagai parameter saat dipakai.",
          "Tanda <T> memperkenalkan parameter tipe pada function atau struct.",
          "Gunakan generic ketika logika benar-benar sama, bukan sekadar karena syntax-nya tersedia.",
        ],
        walkthrough: [
          "Mulai dari fungsi kecil yang tidak bergantung pada satu tipe konkret.",
          "Pastikan parameter tipe diumumkan di signature function sebelum dipakai.",
          "Biarkan caller menentukan tipe lewat nilai yang dikirim ke function.",
        ],
        exampleLabel: "Generic function yang sangat kecil",
        exampleCode: `fn first_item<T>(items: &[T]) -> &T {
    &items[0]
}

fn main() {
    let items = [3, 5, 8];
    println!("{}", first_item(&items));
}`,
        exercises: [
          {
            id: "abstraction-generic-function",
            title: "Tambahkan parameter generic",
            difficulty: "Menengah",
            goal: "Perbaiki signature function agar parameter tipe generic dikenali compiler.",
            focus: [
              "Tipe generic harus diumumkan sebelum dipakai pada parameter.",
              "Function generic tetap bisa dipakai pada array biasa.",
            ],
            brokenCode: `fn first_item(items: &[T]) -> &T {
    &items[0]
}

fn main() {
    let items = [3, 5, 8];
    println!("{}", first_item(&items));
}`,
            expectedOutput: "3",
            hints: [
              "T dan jenis parameter tipe lain tidak muncul begitu saja.",
              "Perhatikan bagian signature function tepat setelah nama function.",
            ],
            explanation:
              "Compiler perlu tahu lebih dulu bahwa T adalah parameter tipe. Begitu <T> ditambahkan ke signature, fungsi dapat dimonomorfisasi sesuai tipe yang dipakai caller.",
          },
        ],
      },
    ],
  },
  {
    id: "stdlib",
    badge: "Modul 7",
    title: "String API, Option, closure, collections, iterator, formatting",
    summary:
      "Modul ini sangat praktis karena langsung menyentuh pekerjaan sehari-hari. Anda akan mulai memakai tipe data dan pola yang sering muncul di aplikasi nyata.",
    foundations: [
      "Option menggantikan null atau undefined. Nilai kosong harus ditangani secara eksplisit, biasanya lewat match atau helper method.",
      "String dan &str menyediakan banyak method. Kuncinya bukan menghafal semuanya, tetapi tahu cara menelusuri dokumentasi dan memilih method yang tepat.",
      "Closure adalah function tanpa nama yang bisa disimpan di variable atau dikirim sebagai parameter.",
      "Collection utama yang perlu dikuasai lebih dulu adalah Vec, HashMap, dan HashSet.",
    ],
    deepDive: [
      "Display dan Debug melayani kebutuhan berbeda. Display untuk output yang lebih rapi, Debug untuk melihat representasi teknis.",
      "Iterator membuat transformasi data lebih deklaratif. map, filter, collect, dan fold adalah method yang sangat sering dipakai.",
      "Vec cocok sebagai default collection. Ganti ke struktur lain hanya jika ada alasan nyata seperti butuh key-value atau data unik.",
      "Closure bisa menangkap nilai dari scope luar, dan ini sangat berguna tetapi juga perlu dikontrol agar kode tetap jelas.",
    ],
    pitfalls: [
      "Memakai loop manual panjang padahal iterator chain jauh lebih bersih untuk transformasi data.",
      "Memaksa semua output memakai Debug karena lebih cepat, padahal Display lebih tepat untuk user-facing text.",
    ],
    checkpoints: [
      "Anda bisa memakai Option tanpa mengandalkan nilai kosong ala bahasa lain.",
      "Anda nyaman membangun Vec dan HashMap untuk data sederhana.",
      "Anda bisa membaca iterator chain tanpa merasa itu 'sihir'.",
    ],
    codeLabel: "Vec, iterator, dan HashMap bersama",
    codeExample: `use std::collections::HashMap;

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let doubled_even: Vec<i32> = numbers
        .iter()
        .filter(|value| **value % 2 == 0)
        .map(|value| value * 2)
        .collect();

    let mut scores = HashMap::new();
    scores.insert("ownership", 95);
    scores.insert("trait", 88);

    println!("data   = {:?}", doubled_even);
    println!("trait  = {}", scores.get("trait").copied().unwrap_or(0));
}`,
    practice: [
      "Ambil daftar string, ubah ke uppercase dengan iterator dan closure, lalu hitung frekuensi kemunculannya di HashMap.",
      "Buat function yang mengembalikan Option ketika mencari data tertentu dalam Vec.",
    ],
    submodules: [
      {
        id: "stdlib-option",
        title: "Option dan match untuk data yang mungkin kosong",
        summary:
          "Submodule ini melatih Anda menangani ketidakpastian secara eksplisit. Alih-alih null tersembunyi, Rust memaksa kemungkinan kosong menjadi bagian dari model program.",
        concepts: [
          "Option<T> membungkus dua keadaan: ada nilai atau tidak ada nilai.",
          "match adalah cara paling langsung untuk membuka Option dan menangani setiap kemungkinan.",
          "Syntax arm match tetap penting walau kasusnya terlihat sederhana.",
        ],
        walkthrough: [
          "Mulai dari Option<&str> agar fokus ke pola pengambilan nilai.",
          "Baca Some dan None sebagai dua jalur perilaku yang sama-sama valid.",
          "Pastikan setiap arm match dipisahkan dengan jelas.",
        ],
        exampleLabel: "Option dibuka dengan match",
        exampleCode: `fn describe(value: Option<&str>) -> &str {
    match value {
        Some(text) => text,
        None => "kosong",
    }
}

fn main() {
    println!("{}", describe(Some("ada")));
}`,
        exercises: [
          {
            id: "stdlib-option-match",
            title: "Match pada Option",
            difficulty: "Menengah",
            goal: "Perbaiki arm match agar nilai Option dapat dikembalikan dengan benar.",
            focus: [
              "Option dibuka lewat branch yang eksplisit.",
              "Arm match butuh pemisah yang tepat walau hanya dua cabang.",
            ],
            brokenCode: `fn describe(value: Option<&str>) -> &str {
    match value {
        Some(text) => text
        None => "kosong",
    }
}

fn main() {
    println!("{}", describe(Some("ada")));
}`,
            expectedOutput: "ada",
            hints: [
              "Periksa batas antara arm Some dan arm None.",
              "match di Rust mengharuskan setiap cabang dipisah dengan jelas.",
            ],
            explanation:
              "Option memaksa jalur ada dan kosong ditulis eksplisit. Supaya compiler bisa memeriksa exhaustiveness, syntax antar-arm juga harus benar.",
          },
        ],
      },
      {
        id: "stdlib-iterators",
        title: "Iterator dan transformasi data yang deklaratif",
        summary:
          "Setelah data ada di Vec atau collection lain, iterator membantu Anda mengubah data tanpa menulis loop manual panjang. Submodule ini melatih membaca rantai method satu langkah demi satu langkah.",
        concepts: [
          "into_iter memindahkan item keluar dari collection untuk diproses satu per satu.",
          "map mengubah setiap item, collect merakit hasil ke collection baru.",
          "Tanda kurung yang hilang di iterator chain sering menghasilkan error parser yang membingungkan bila belum terbiasa.",
        ],
        walkthrough: [
          "Baca iterator chain dari kiri ke kanan: sumber data, transformasi, lalu koleksi hasil.",
          "Pastikan setiap method call tertutup sebelum berpindah ke method berikutnya.",
          "Gunakan output Debug sederhana untuk memastikan bentuk hasil akhir.",
        ],
        exampleLabel: "Vec diubah lewat iterator chain",
        exampleCode: `fn main() {
    let numbers = vec![1, 2, 3, 4];
    let doubled: Vec<i32> = numbers
        .into_iter()
        .map(|value| value * 2)
        .collect();

    println!("{:?}", doubled);
}`,
        exercises: [
          {
            id: "stdlib-iterator-collect",
            title: "Lengkapi iterator chain",
            difficulty: "Menengah",
            goal: "Perbaiki syntax iterator chain sampai Vec hasil transformasi bisa dicetak.",
            focus: [
              "Method chain harus tertutup rapi sebelum berpindah ke method lain.",
              "Iterator cocok untuk transformasi data yang berulang.",
            ],
            brokenCode: `fn main() {
    let numbers = vec![1, 2, 3, 4];
    let doubled: Vec<i32> = numbers
        .into_iter()
        .map(|value| value * 2
        .collect();

    println!("{:?}", doubled);
}`,
            expectedOutput: "[2, 4, 6, 8]",
            hints: [
              "Perhatikan method map sebelum collect dipanggil.",
              "Ada satu penutup yang hilang di dalam chain iterator.",
            ],
            explanation:
              "Iterator chain mudah dibaca jika setiap langkah tertutup dengan jelas. Begitu penutup map ditambahkan, collect bisa membentuk Vec hasil transformasi.",
          },
        ],
      },
    ],
  },
  {
    id: "advanced",
    badge: "Modul 8",
    title: "Result, lifetime, derive, smart pointer, static, macro",
    summary:
      "Bagian akhir ini bukan untuk dihafal sekali baca, tetapi untuk memahami bagaimana Rust menangani error, masa hidup reference, dan struktur data yang lebih kompleks.",
    foundations: [
      "Result dipakai ketika operasi bisa gagal secara normal. panic! dipakai ketika program memang tidak layak lanjut.",
      "Lifetime membantu compiler memahami hubungan antar-reference. Ia tidak memperpanjang umur data secara ajaib.",
      "Derive attribute seperti Debug, Clone, atau PartialEq menghemat banyak pekerjaan berulang.",
      "Box, Rc, dan RefCell adalah smart pointer dengan trade-off berbeda.",
    ],
    deepDive: [
      "Gunakan operator ? untuk merangkai fungsi-fungsi yang mengembalikan Result tanpa boilerplate match berulang.",
      "Box cocok untuk memindahkan data ke heap atau membuat recursive type. Rc menambah shared ownership, RefCell menambah interior mutability pada runtime.",
      "static mirip const, tetapi mutable static membawa risiko race condition dan biasanya butuh unsafe.",
      "macro_rules! memungkinkan pembuatan kode dari pola. Ia kuat, tetapi kompleksitasnya juga meningkat tajam.",
    ],
    pitfalls: [
      "Melompat ke Rc dan RefCell sebelum fondasi ownership kuat. Ini biasanya membuat solusi terasa ajaib tetapi rapuh.",
      "Menambahkan lifetime annotation di semua tempat tanpa memahami relasi data yang sebenarnya.",
    ],
    checkpoints: [
      "Anda paham kapan memakai Result dan kapan panic! lebih masuk akal.",
      "Anda bisa menjelaskan Box, Rc, dan RefCell dalam satu kalimat masing-masing.",
      "Anda tahu kenapa macro sebaiknya menjadi alat terakhir, bukan pilihan pertama.",
    ],
    codeLabel: "Result plus operator tanya",
    codeExample: `fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        return Err(String::from("pembagi tidak boleh nol"));
    }

    Ok(a / b)
}

fn main() -> Result<(), String> {
    let result = divide(10, 2)?;
    println!("hasil = {result}");
    Ok(())
}`,
    practice: [
      "Refactor satu function agar mengembalikan Result lalu pakai operator ? di caller-nya.",
      "Buat recursive enum sederhana dengan Box untuk merasakan kenapa heap pointer dibutuhkan.",
    ],
    submodules: [
      {
        id: "advanced-result",
        title: "Result dan jalur sukses-gagal yang eksplisit",
        summary:
          "Submodule ini membantu Anda membedakan error yang masih normal dari crash yang memang fatal. Result membuat jalur sukses dan gagal menjadi bagian eksplisit dari signature function.",
        concepts: [
          "Result<T, E> membawa dua kemungkinan: sukses atau error.",
          "Jalur Ok dan Err harus sama-sama valid secara syntax.",
          "Function yang mengembalikan Result biasanya menjadi pondasi untuk alur error handling yang lebih besar.",
        ],
        walkthrough: [
          "Mulai dari function kecil seperti pembagian agar kontrak sukses-gagal mudah dibaca.",
          "Periksa jalur Err lebih dulu, lalu pastikan jalur Ok ditutup dengan benar.",
          "Gunakan output sederhana untuk memastikan hasil sukses memang tercetak.",
        ],
        exampleLabel: "Result paling kecil",
        exampleCode: `fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        return Err(String::from("pembagi tidak boleh nol"));
    }

    Ok(a / b)
}

fn main() {
    println!("{}", divide(10, 2).unwrap());
}`,
        exercises: [
          {
            id: "advanced-result-ok",
            title: "Result dan kurung penutup",
            difficulty: "Lanjutan",
            goal: "Perbaiki function yang mengembalikan Result agar jalur suksesnya valid.",
            focus: [
              "Result menuntut jalur sukses dan gagal yang jelas.",
              "Compile error kecil pada jalur Ok bisa memblokir seluruh function.",
            ],
            brokenCode: `fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        return Err(String::from("pembagi tidak boleh nol"));
    }

    Ok(a / b
}

fn main() {
    println!("{}", divide(10, 2).unwrap());
}`,
            expectedOutput: "5",
            hints: [
              "Lihat pemanggilan Ok pada akhir function.",
              "Ada satu tanda penutup yang hilang sebelum blok function selesai.",
            ],
            explanation:
              "Result yang baik tidak hanya memodelkan jalur gagal, tetapi juga harus membungkus jalur sukses dengan benar. Syntax yang lengkap di Ok(...) membuat compiler bisa memvalidasi seluruh function.",
          },
        ],
      },
      {
        id: "advanced-question-mark",
        title: "Operator ? dan propagasi error yang bersih",
        summary:
          "Saat beberapa function Result dirangkai, operator ? mengurangi boilerplate secara drastis. Namun ada satu syarat penting: function pemanggil juga harus mengembalikan type yang kompatibel.",
        concepts: [
          "Operator ? menghentikan function lebih awal saat error terjadi.",
          "Function yang memakai ? harus mengembalikan Result, Option, atau tipe yang mendukung FromResidual.",
          "main juga bisa mengembalikan Result untuk alur CLI sederhana.",
        ],
        walkthrough: [
          "Baca function dari bawah ke atas: jika caller memakai ?, cek return type caller lebih dulu.",
          "Pastikan jalur sukses function pemanggil diakhiri dengan Ok(()).",
          "Gunakan parse integer sebagai contoh error propagation yang mudah diverifikasi.",
        ],
        exampleLabel: "Propagasi error dengan tanda tanya",
        exampleCode: `fn parse_number(text: &str) -> Result<i32, std::num::ParseIntError> {
    let value = text.parse::<i32>()?;
    Ok(value)
}

fn main() -> Result<(), std::num::ParseIntError> {
    let value = parse_number("42")?;
    println!("{value}");
    Ok(())
}`,
        exercises: [
          {
            id: "advanced-question-mark-main",
            title: "main yang memakai operator ?",
            difficulty: "Lanjutan",
            goal: "Perbaiki main agar bisa memakai operator ? saat memanggil function yang mengembalikan Result.",
            focus: [
              "Operator ? hanya valid pada function yang return type-nya kompatibel.",
              "main dapat mengembalikan Result lalu menutup jalur sukses dengan Ok(()).",
            ],
            brokenCode: `fn parse_number(text: &str) -> Result<i32, std::num::ParseIntError> {
    let value = text.parse::<i32>()?;
    Ok(value)
}

fn main() {
    let value = parse_number("42")?;
    println!("{value}");
}`,
            expectedOutput: "42",
            hints: [
              "Compiler akan protes pada penggunaan ? di main.",
              "Cek return type main dan pikirkan bagaimana jalur suksesnya ditutup.",
            ],
            explanation:
              "Operator ? bekerja dengan sangat rapi jika function pemanggil juga mengembalikan Result. Pada program kecil, membuat main mengembalikan Result adalah solusi yang idiomatis.",
          },
        ],
      },
    ],
  },
];

export const moduleIds = lessonSections.map((section) => section.id);

export function getLessonSectionById(id: string) {
  return lessonSections.find((section) => section.id === id);
}

export function getModuleExercisesById(id: string) {
  const section = getLessonSectionById(id);
  return section?.submodules.flatMap((submodule) => submodule.exercises) ?? [];
}
