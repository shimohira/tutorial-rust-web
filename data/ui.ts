import type { TutorialLocale } from "~/composables/useTutorialPreferences";

export const uiMessages = {
  id: {
    app: {
      openControls: "Tampilan",
      controlsTitle: "Bahasa dan tema",
      controlsBody: "Atur bahasa tutorial dan mode visual tanpa meninggalkan halaman.",
      controlsOpenAria: "Buka pengaturan bahasa dan tema",
      languageLabel: "Bahasa",
      themeLabel: "Tema",
      localeId: "Indonesia",
      localeEn: "English",
      localeIdHint: "Mode utama dan default untuk seluruh kurikulum.",
      localeEnHint: "Cocok saat ingin membaca istilah teknis dalam English.",
      themeLight: "Terang",
      themeDark: "Gelap",
      themeReading: "Membaca",
      themeLightHint: "Cerah, netral, dan paling ringan untuk scanning cepat.",
      themeDarkHint: "Kontras tinggi untuk sesi malam dan fokus ke code block.",
      themeReadingHint: "Sepia lembut dengan ruang baca lebih nyaman untuk materi panjang.",
    },
    common: {
      rustCore: "Rust Core",
      directMaterial: "Materi langsung",
      noLab: "Belum ada Rust Lab",
      submodule: "Submodule",
      module: "Modul",
      section: "Bagian",
      openModule: "Buka modul",
      relatedDocs: "Rust docs terkait",
      officialReferencesModule: "Referensi resmi untuk modul ini",
      officialReferencesSubmodule: "Referensi resmi untuk submodule ini",
      linkSuffix: "link",
      briefExample: "Contoh ringkas",
      submoduleExample: "Contoh submodule",
      usageExamples: "Contoh penggunaan",
      realUseCases: "Kasus pakai yang lebih dekat ke situasi nyata",
      exampleUsage: "Contoh pakai",
      beforeSolution: "Sebelum solusi",
      afterSolution: "Setelah solusi",
    },
    landing: {
      eyebrow: "Nuxt edition",
      heroTitle: "Belajar Rust per modul, dengan lab yang langsung nyambung ke materinya.",
      heroText:
        "Halaman utama ini sekarang berfungsi sebagai katalog belajar. Setiap modul punya halaman tersendiri, materi yang lebih fokus, dan Rust Lab yang hanya berisi latihan sesuai topik modul tersebut.",
      modulesLabel: "Modul",
      completedSubmodulesLabel: "Submodule selesai",
      completedLabsLabel: "Rust Lab selesai",
      pageTitle: "Rust Study Deck",
      pagesSuffix: "halaman",
      studyPatternEyebrow: "Pola belajar",
      studyPattern: [
        "Buka satu modul, baca materi, lalu jalankan lab modul itu.",
        "Perbaiki compile error sampai output sesuai target.",
        "Pindah ke modul berikutnya setelah checkpoint modul saat ini terasa nyaman.",
        "Gunakan halaman utama hanya sebagai peta dan pintu masuk modul.",
      ],
      directionEyebrow: "Arah materi",
      directionCopy:
        "Urutan modul sengaja bergerak dari grammar dasar ke aliran data, lalu ke pemodelan, abstraction, standard library, dan topik lanjut.",
      directoryEyebrow: "Module Directory",
      directoryTitle: "Pilih modul yang ingin dipelajari",
      overviewEyebrow: "Overview",
      overviewTitle: "Pondasi belajar sebelum masuk ke halaman modul",
      formatCompletedSubmodules(completed: number, total: number) {
        return `${completed} / ${total} submodule selesai`;
      },
      formatCompletedLabs(completed: number, total: number) {
        return `${completed} / ${total} lab selesai`;
      },
      formatSubmoduleCount(count: number) {
        return count > 0 ? `${count} submodule` : "Materi langsung";
      },
      formatExerciseCount(count: number) {
        return count > 0 ? `${count} lab` : "Tanpa lab";
      },
    },
    modulePage: {
      learningEyebrow: "Cara belajar modul ini",
      structureEyebrow: "Struktur materi",
      progressEyebrow: "Progress modul",
      submoduleMetric: "Submodule",
      directMetric: "Format materi",
      submoduleProgressMetric: "Progres submodule",
      labProgressMetric: "Rust Lab selesai",
      noSubmoduleMetric: "Submodule",
      noLabMetric: "Rust Lab",
      directMaterialLabel: "Materi langsung",
      notUsedLabel: "Tidak dipakai",
      noLabLabel: "Belum ada lab",
      progressStoredCopy:
        "Progress disimpan lokal di browser ini. Selesaikan semua lab untuk menutup modul ini, atau reset jika ingin mengulang dari awal.",
      noProgressCopy:
        "Modul ini tetap bisa dipelajari tanpa progress latihan. Jika nanti ditambah Rust Lab, panel ini akan mulai melacak penyelesaiannya.",
      resetProgress: "Reset progres modul",
      allModules: "Semua modul",
      submodulesInThisModule: "Submodule modul ini",
      noSubmoduleNavigation:
        "Modul ini disajikan langsung dari overview utama, jadi tidak ada daftar submodule untuk dinavigasi.",
      nextMoveEyebrow: "Next move",
      nextMoveTitle: "Lanjutkan progres modul",
      backToCatalog: "Kembali",
      catalogTitle: "Katalog modul",
      catalogCopy: "Lihat seluruh modul dan jumlah submodule dari halaman utama.",
      previousModule: "Modul sebelumnya",
      nextModule: "Modul berikutnya",
      trackEyebrow: "Submodule Track",
      trackTitle: "Belajar modul ini lewat bagian-bagian yang lebih kecil",
      directEyebrow: "Format modul",
      directTitle: "Modul ini tidak dipaksa punya submodule",
      directPanelEyebrow: "Direct module",
      directPanelTitle: "Materi cukup disampaikan di level modul",
      directPanelCopy:
        "Beberapa topik tidak perlu dipaksa menjadi submodule. Jika struktur modulnya sudah cukup jelas lewat fondasi, detail, checkpoint, dan contoh utama, halaman ini tetap valid tanpa pemecahan tambahan.",
      stickyModulesClosed: "Tutup daftar modul",
      stickySubmodulesClosed: "Tutup daftar submodule",
      compactModeCopy: "Kembali ke mode ringkas",
      stickySubmoduleHint: "Buka bagian tertentu tanpa kehilangan ruang baca",
      totalSuffix: "total",
      partSuffix: "bagian",
      completedLabel: "Selesai",
      formatModuleSteps(submoduleCount: number) {
        return `Setiap submodule memecah satu konsep besar menjadi langkah yang lebih sempit. Modul ini memiliki ${submoduleCount} submodule dengan contoh dan Rust Lab yang mengikuti fokus materi masing-masing.`;
      },
      directStructureCopy:
        "Materi modul ini cukup jelas bila disajikan langsung di level modul. Karena itu halaman ini tetap lengkap tanpa memaksa pemecahan ke submodule tambahan.",
      learningStepsWithSubmodules: [
        "Mulai dari peta modul, lalu turun ke submodule satu per satu.",
        "Baca contoh di tiap submodule sebelum menyentuh editor lab-nya.",
        "Perbaiki compile error sampai output sesuai target, baru lanjut ke submodule berikutnya.",
      ],
      learningStepsDirect: [
        "Mulai dari overview fondasi, detail penting, dan jebakan umum di modul ini.",
        "Gunakan contoh kode utama modul sebagai jangkar sebelum masuk ke checkpoint.",
        "Tutup modul ini dari checkpoint dan latihan lanjutan tanpa harus melewati submodule terpisah.",
      ],
      formatProgressSummary(completed: number, total: number) {
        return `${completed} / ${total} submodule selesai`;
      },
      noLabInModule: "Belum ada Rust Lab di modul ini",
      noModuleProgress: "Modul ini tidak memakai progress latihan",
      formatProgressPercent(value: number) {
        return `${Math.round(value * 100)}%`;
      },
      naLabel: "N/A",
      formatSubmoduleCount(count: number) {
        return `${count} bagian`;
      },
    },
    tutorialSection: {
      foundations: "Fondasi materi",
      deepDive: "Detail yang perlu diperhatikan",
      pitfalls: "Jebakan umum",
      checkpoint: "Checkpoint",
      practice: "Latihan lanjutan",
    },
    submoduleSection: {
      completed: "Selesai",
      labSuffix: "lab",
      allExercisesDone: "Semua latihan di submodule ini sudah selesai.",
      concepts: "Konsep inti",
      walkthrough: "Cara membaca submodule ini",
      goals: "Target latihan",
      focus: "Yang perlu diperhatikan",
      allUsageCount: "contoh",
      formatSubmoduleEyebrow(moduleBadge: string, index: number) {
        return `${moduleBadge} • Submodule ${index}`;
      },
      formatRemainingExercises(value: number) {
        return `Selesaikan ${value} latihan lagi untuk menutup submodule ini.`;
      },
      formatLabProgress(completed: number, total: number) {
        return `${completed}/${total} lab`;
      },
      partLabel(index: number) {
        return `Bagian ${index}`;
      },
    },
    lab: {
      labEyebrow: "Lab",
      expected: "Expected",
      statusDone: "Status: selesai",
      statusTodo: "Status: belum selesai",
      exercisesDoneSuffix: "latihan selesai",
      focusTitle: "Yang sedang diuji",
      hintsTitle: "Hint bertahap",
      revealHint: "Tampilkan hint berikutnya",
      runnerNote:
        "Runner ini mengeksekusi rustc lokal melalui server Nuxt. Gunakan untuk pembelajaran lokal, bukan untuk kode yang tidak dipercaya.",
      savedProgress:
        "Status selesai disimpan di browser ini. Anda bisa mengulang latihan kapan saja.",
      playgroundTitle: "Rust Playground Mini",
      resetCode: "Reset kode",
      runCode: "Jalankan kode",
      runningCode: "Menjalankan...",
      matchesOutput: "Output sesuai",
      stdout: "Stdout",
      whyItWorks: "Kenapa solusi ini benar",
      noExerciseYet: "Belum ada latihan untuk bagian ini.",
      notRunYet: "Belum dijalankan",
      completedTitle: "Latihan ini sudah selesai",
      solvedTitle: "Latihan selesai",
      runningTitle: "Menjalankan compiler...",
      outputMismatch: "Program berjalan, tetapi output belum sesuai",
      compileError: "Masih ada error kompilasi",
      runError: "Program gagal dieksekusi",
      terminalPlaceholder: "Jalankan kode untuk melihat hasil compile atau output program.",
      alreadyDone: "Sudah selesai",
      localRunnerFailed: "Runner lokal gagal dijalankan.",
    },
  },
  en: {
    app: {
      openControls: "View",
      controlsTitle: "Language and theme",
      controlsBody: "Switch tutorial language and visual mode without leaving the page.",
      controlsOpenAria: "Open language and theme controls",
      languageLabel: "Language",
      themeLabel: "Theme",
      localeId: "Bahasa Indonesia",
      localeEn: "English",
      localeIdHint: "The primary and default mode for the full curriculum.",
      localeEnHint: "Better if you want the technical terms in English.",
      themeLight: "Light",
      themeDark: "Dark",
      themeReading: "Reading",
      themeLightHint: "Bright, neutral, and easiest to scan quickly.",
      themeDarkHint: "High contrast for night sessions and code-heavy reading.",
      themeReadingHint: "Soft sepia with a calmer rhythm for longer lessons.",
    },
    common: {
      rustCore: "Rust Core",
      directMaterial: "Direct lesson",
      noLab: "No Rust Lab yet",
      submodule: "Submodule",
      module: "Module",
      section: "Part",
      openModule: "Open module",
      relatedDocs: "Related Rust docs",
      officialReferencesModule: "Official references for this module",
      officialReferencesSubmodule: "Official references for this submodule",
      linkSuffix: "links",
      briefExample: "Short example",
      submoduleExample: "Submodule example",
      usageExamples: "Usage examples",
      realUseCases: "More practical use cases",
      exampleUsage: "Usage sample",
      beforeSolution: "Before the fix",
      afterSolution: "After the fix",
    },
    landing: {
      eyebrow: "Nuxt edition",
      heroTitle: "Learn Rust by module, with labs that stay tightly connected to the lesson.",
      heroText:
        "The homepage now works as a study catalog. Every module has its own page, tighter lesson scope, and a Rust Lab filled only with exercises that match that module.",
      modulesLabel: "Modules",
      completedSubmodulesLabel: "Completed submodules",
      completedLabsLabel: "Completed Rust Labs",
      pageTitle: "Rust Study Deck",
      pagesSuffix: "pages",
      studyPatternEyebrow: "Study flow",
      studyPattern: [
        "Open one module, read the lesson, then run that module's lab.",
        "Fix compile errors until the output matches the target.",
        "Move to the next module only after the current checkpoint feels comfortable.",
        "Use the homepage only as the map and entry point to each module.",
      ],
      directionEyebrow: "Course direction",
      directionCopy:
        "The sequence moves on purpose from basic grammar to data flow, then into modeling, abstraction, the standard library, and advanced topics.",
      directoryEyebrow: "Module Directory",
      directoryTitle: "Choose the module you want to study",
      overviewEyebrow: "Overview",
      overviewTitle: "Foundations to keep in mind before opening a module page",
      formatCompletedSubmodules(completed: number, total: number) {
        return `${completed} / ${total} submodules completed`;
      },
      formatCompletedLabs(completed: number, total: number) {
        return `${completed} / ${total} labs completed`;
      },
      formatSubmoduleCount(count: number) {
        return count > 0 ? `${count} submodules` : "Direct lesson";
      },
      formatExerciseCount(count: number) {
        return count > 0 ? `${count} labs` : "No labs";
      },
    },
    modulePage: {
      learningEyebrow: "How to study this module",
      structureEyebrow: "Lesson structure",
      progressEyebrow: "Module progress",
      submoduleMetric: "Submodules",
      directMetric: "Lesson format",
      submoduleProgressMetric: "Submodule progress",
      labProgressMetric: "Completed Rust Labs",
      noSubmoduleMetric: "Submodules",
      noLabMetric: "Rust Labs",
      directMaterialLabel: "Direct lesson",
      notUsedLabel: "Not used",
      noLabLabel: "No lab yet",
      progressStoredCopy:
        "Progress is stored locally in this browser. Finish every lab to close the module, or reset it if you want a clean replay.",
      noProgressCopy:
        "This module can still be studied without exercise progress. If Rust Labs are added later, this panel will start tracking them automatically.",
      resetProgress: "Reset module progress",
      allModules: "All modules",
      submodulesInThisModule: "Submodules in this module",
      noSubmoduleNavigation:
        "This module is delivered directly from the main overview, so there is no separate submodule list to navigate.",
      nextMoveEyebrow: "Next move",
      nextMoveTitle: "Continue your module progress",
      backToCatalog: "Back",
      catalogTitle: "Module catalog",
      catalogCopy: "See every module and its submodule count from the homepage.",
      previousModule: "Previous module",
      nextModule: "Next module",
      trackEyebrow: "Submodule Track",
      trackTitle: "Study this module through smaller focused parts",
      directEyebrow: "Module format",
      directTitle: "This module does not need forced submodules",
      directPanelEyebrow: "Direct module",
      directPanelTitle: "The lesson works well at module level",
      directPanelCopy:
        "Some topics should not be forced into submodules. If the module structure is already clear through foundations, details, checkpoints, and core examples, the page still stands on its own without extra splits.",
      stickyModulesClosed: "Hide module list",
      stickySubmodulesClosed: "Hide submodule list",
      compactModeCopy: "Back to compact mode",
      stickySubmoduleHint: "Open a specific part without losing reading space",
      totalSuffix: "total",
      partSuffix: "parts",
      completedLabel: "Done",
      formatModuleSteps(submoduleCount: number) {
        return `Each submodule narrows one larger concept into a smaller study step. This module has ${submoduleCount} submodules, each with examples and a Rust Lab that follows its own focus.`;
      },
      directStructureCopy:
        "This module is clear enough when it is presented directly at module level, so the page stays complete without forcing extra submodule splits.",
      learningStepsWithSubmodules: [
        "Start from the module map, then move through each submodule one by one.",
        "Read the examples in each submodule before touching the lab editor.",
        "Fix compile errors until the output matches the target, then move to the next submodule.",
      ],
      learningStepsDirect: [
        "Start from the foundations, key details, and common traps in this module.",
        "Use the main code example as your anchor before you enter the checkpoint.",
        "Close this module through the checkpoint and follow-up practice without needing separate submodules.",
      ],
      formatProgressSummary(completed: number, total: number) {
        return `${completed} / ${total} submodules completed`;
      },
      noLabInModule: "This module has no Rust Lab yet",
      noModuleProgress: "This module does not use exercise progress",
      formatProgressPercent(value: number) {
        return `${Math.round(value * 100)}%`;
      },
      naLabel: "N/A",
      formatSubmoduleCount(count: number) {
        return `${count} parts`;
      },
    },
    tutorialSection: {
      foundations: "Learning foundations",
      deepDive: "Important details",
      pitfalls: "Common traps",
      checkpoint: "Checkpoint",
      practice: "Follow-up practice",
    },
    submoduleSection: {
      completed: "Done",
      labSuffix: "lab",
      allExercisesDone: "All exercises in this submodule are complete.",
      concepts: "Core concepts",
      walkthrough: "How to read this submodule",
      goals: "Exercise targets",
      focus: "What to watch closely",
      allUsageCount: "examples",
      formatSubmoduleEyebrow(moduleBadge: string, index: number) {
        return `${moduleBadge} • Submodule ${index}`;
      },
      formatRemainingExercises(value: number) {
        return `Finish ${value} more exercises to close this submodule.`;
      },
      formatLabProgress(completed: number, total: number) {
        return `${completed}/${total} labs`;
      },
      partLabel(index: number) {
        return `Part ${index}`;
      },
    },
    lab: {
      labEyebrow: "Lab",
      expected: "Expected",
      statusDone: "Status: complete",
      statusTodo: "Status: not complete",
      exercisesDoneSuffix: "exercises completed",
      focusTitle: "What is being tested",
      hintsTitle: "Step-by-step hints",
      revealHint: "Show the next hint",
      runnerNote:
        "This runner executes local rustc through the Nuxt server. Use it for local learning, not for untrusted code.",
      savedProgress:
        "Completion status is stored in this browser. You can replay the exercise any time.",
      playgroundTitle: "Mini Rust Playground",
      resetCode: "Reset code",
      runCode: "Run code",
      runningCode: "Running...",
      matchesOutput: "Output matches",
      stdout: "Stdout",
      whyItWorks: "Why this solution is correct",
      noExerciseYet: "No exercises yet for this part.",
      notRunYet: "Not run yet",
      completedTitle: "This exercise is already complete",
      solvedTitle: "Exercise complete",
      runningTitle: "Running the compiler...",
      outputMismatch: "The program ran, but the output does not match yet",
      compileError: "There are still compile errors",
      runError: "The program failed to run",
      terminalPlaceholder: "Run the code to see compile output or program output.",
      alreadyDone: "Already complete",
      localRunnerFailed: "The local runner could not be started.",
    },
  },
} satisfies Record<TutorialLocale, object>;
