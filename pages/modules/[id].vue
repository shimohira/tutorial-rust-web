<script setup lang="ts">
import { computed } from "vue";
import SubmoduleSection from "~/components/SubmoduleSection.vue";
import TutorialSection from "~/components/TutorialSection.vue";
import { getLessonSectionById, lessonSections, moduleIds } from "~/data/tutorial";

const { clearModuleProgress, getModuleProgress, getSubmoduleProgress } = useTutorialProgress();
const route = useRoute();

const moduleId = computed(() => String(route.params.id ?? ""));
const section = computed(() => getLessonSectionById(moduleId.value));

if (!section.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Modul tidak ditemukan.",
  });
}

const exerciseCount = computed(() => {
  return (
    section.value?.submodules.reduce((total, submodule) => {
      return total + submodule.exercises.length;
    }, 0) ?? 0
  );
});

const submoduleCount = computed(() => section.value?.submodules.length ?? 0);
const hasSubmodules = computed(() => submoduleCount.value > 0);
const hasExercises = computed(() => exerciseCount.value > 0);

const moduleProgress = computed(() => {
  if (!section.value) {
    return {
      completedSubmodules: 0,
      totalSubmodules: 0,
      solvedExercises: 0,
      totalExercises: 0,
      completionRatio: 0,
    };
  }

  return getModuleProgress(section.value.id, section.value.submodules);
});

const submoduleProgressMap = computed(() => {
  if (!section.value || !hasSubmodules.value) {
    return {};
  }

  return Object.fromEntries(
    section.value.submodules.map((submodule) => {
      return [submodule.id, getSubmoduleProgress(section.value!.id, submodule)];
    }),
  );
});

const currentIndex = computed(() => moduleIds.indexOf(moduleId.value));

const previousSection = computed(() => {
  if (currentIndex.value <= 0) {
    return null;
  }

  return getLessonSectionById(moduleIds[currentIndex.value - 1]) ?? null;
});

const nextSection = computed(() => {
  if (currentIndex.value < 0 || currentIndex.value >= moduleIds.length - 1) {
    return null;
  }

  return getLessonSectionById(moduleIds[currentIndex.value + 1]) ?? null;
});

const moduleLearningSteps = computed(() => {
  if (hasSubmodules.value) {
    return [
      "Mulai dari peta modul, lalu turun ke submodule satu per satu.",
      "Baca contoh di tiap submodule sebelum menyentuh editor lab-nya.",
      "Perbaiki compile error sampai output sesuai target, baru lanjut ke submodule berikutnya.",
    ];
  }

  return [
    "Mulai dari overview fondasi, detail penting, dan jebakan umum di modul ini.",
    "Gunakan contoh kode utama modul sebagai jangkar sebelum masuk ke checkpoint.",
    "Tutup modul ini dari checkpoint dan latihan lanjutan tanpa harus melewati submodule terpisah.",
  ];
});

const moduleStructureCopy = computed(() => {
  if (hasSubmodules.value) {
    return `Setiap submodule memecah satu konsep besar menjadi langkah yang lebih sempit. Modul ini memiliki ${submoduleCount.value} submodule dengan contoh dan Rust Lab yang mengikuti fokus materi masing-masing.`;
  }

  return "Materi modul ini cukup jelas bila disajikan langsung di level modul. Karena itu halaman ini tetap lengkap tanpa memaksa pemecahan ke submodule tambahan.";
});

const progressSummaryLabel = computed(() => {
  if (hasExercises.value) {
    return `${moduleProgress.value.completedSubmodules} / ${moduleProgress.value.totalSubmodules} submodule selesai`;
  }

  if (hasSubmodules.value) {
    return "Belum ada Rust Lab di modul ini";
  }

  return "Modul ini tidak memakai progress latihan";
});

const progressPercentLabel = computed(() => {
  return hasExercises.value ? `${Math.round(moduleProgress.value.completionRatio * 100)}%` : "N/A";
});

useHead(() => ({
  title: section.value
    ? `${section.value.badge} - ${section.value.title}`
    : "Modul Rust",
  meta: [
    {
      name: "description",
      content: section.value
        ? section.value.submodules.length > 0
          ? `${section.value.title} dengan ${section.value.submodules.length} submodule detail, contoh terpisah, dan Rust Lab yang mengikuti tiap bagian.`
          : `${section.value.title} dengan pembahasan langsung di level modul tanpa submodule tambahan.`
        : "Modul Rust",
    },
  ],
}));
</script>

<template>
  <div v-if="section" class="page-shell">
    <header class="hero module-hero">
      <div class="hero-copy">
        <p class="eyebrow">{{ section.badge }}</p>
        <h1>{{ section.title }}</h1>
        <p class="hero-text">
          {{ section.summary }}
        </p>

        <div class="hero-metrics">
          <div>
            <span>{{ hasSubmodules ? "Submodule" : "Format materi" }}</span>
            <strong>{{ hasSubmodules ? `${submoduleCount} bagian` : "Materi langsung" }}</strong>
          </div>
          <div>
            <span>{{ hasSubmodules ? "Progres submodule" : "Submodule" }}</span>
            <strong data-testid="module-progress-submodules">
              {{ hasSubmodules ? `${moduleProgress.completedSubmodules} / ${moduleProgress.totalSubmodules} selesai` : "Tidak dipakai" }}
            </strong>
          </div>
          <div>
            <span>{{ hasExercises ? "Rust Lab selesai" : "Rust Lab" }}</span>
            <strong data-testid="module-progress-labs">
              {{ hasExercises ? `${moduleProgress.solvedExercises} / ${exerciseCount} latihan` : "Belum ada lab" }}
            </strong>
          </div>
        </div>
      </div>

      <div class="hero-stack">
        <section class="panel panel-dark">
          <p class="eyebrow">Cara belajar modul ini</p>
          <ul class="bullet-list">
            <li v-for="step in moduleLearningSteps" :key="step">{{ step }}</li>
          </ul>
        </section>

        <section class="panel accent-panel">
          <p class="eyebrow">Struktur materi</p>
          <p>{{ moduleStructureCopy }}</p>
        </section>

        <section class="panel progress-panel">
          <p class="eyebrow">Progress modul</p>
          <div class="progress-summary-head">
            <strong data-testid="module-progress-summary">{{ progressSummaryLabel }}</strong>
            <span>{{ progressPercentLabel }}</span>
          </div>
          <div class="progress-meter" aria-hidden="true">
            <span :style="{ width: `${moduleProgress.completionRatio * 100}%` }" />
          </div>
          <p class="progress-copy">
            {{
              hasExercises
                ? "Progress disimpan lokal di browser ini. Selesaikan semua lab untuk menutup modul ini, atau reset jika ingin mengulang dari awal."
                : "Modul ini tetap bisa dipelajari tanpa progress latihan. Jika nanti ditambah Rust Lab, panel ini akan mulai melacak penyelesaiannya."
            }}
          </p>
          <button
            v-if="hasExercises"
            type="button"
            class="ghost-button"
            :disabled="moduleProgress.solvedExercises === 0"
            @click="clearModuleProgress(section.id)"
          >
            Reset progres modul
          </button>
        </section>
      </div>
    </header>

    <div class="content-grid">
      <aside class="sidebar">
        <div class="sidebar-stack">
          <div class="panel toc-panel">
            <div class="sidebar-panel-head">
              <p class="eyebrow">Semua modul</p>
              <span>{{ lessonSections.length }} total</span>
            </div>
            <nav class="toc-nav module-toc-nav" data-testid="module-sidebar-nav">
              <NuxtLink
                v-for="item in lessonSections"
                :key="item.id"
                class="toc-link module-link"
                :class="{ active: item.id === section.id }"
                :to="`/modules/${item.id}`"
              >
                <small class="toc-kicker">{{ item.badge }}</small>
                <span>{{ item.title }}</span>
              </NuxtLink>
            </nav>
          </div>

          <div class="panel submodule-toc-panel">
            <div class="sidebar-panel-head">
              <p class="eyebrow">Submodule modul ini</p>
              <span>{{ hasSubmodules ? `${submoduleCount} bagian` : "0 bagian" }}</span>
            </div>
            <nav
              v-if="hasSubmodules"
              class="toc-nav submodule-nav"
              data-testid="submodule-sidebar-nav"
            >
              <a
                v-for="(submodule, index) in section.submodules"
                :key="submodule.id"
                class="toc-link submodule-link"
                :class="{ complete: submoduleProgressMap[submodule.id]?.isCompleted }"
                :href="`#${submodule.id}`"
              >
                <small class="toc-kicker">Bagian {{ index + 1 }}</small>
                <span>{{ submodule.title }}</span>
                <small>
                  {{
                    submoduleProgressMap[submodule.id]?.isCompleted
                      ? "Selesai"
                      : `${submoduleProgressMap[submodule.id]?.solvedExercises ?? 0}/${submoduleProgressMap[submodule.id]?.totalExercises ?? 0} lab`
                  }}
                </small>
              </a>
            </nav>
            <p v-else class="sidebar-note">
              Modul ini disajikan langsung dari overview utama, jadi tidak ada daftar submodule untuk dinavigasi.
            </p>
          </div>
        </div>
      </aside>

      <main class="main-stack">
        <TutorialSection :section="section" />

        <section class="panel submodule-overview-panel">
          <div class="section-header">
            <p class="eyebrow">{{ hasSubmodules ? "Submodule Track" : "Format modul" }}</p>
            <h2>
              {{
                hasSubmodules
                  ? "Belajar modul ini lewat bagian-bagian yang lebih kecil"
                  : "Modul ini tidak dipaksa punya submodule"
              }}
            </h2>
          </div>

          <p class="section-copy">{{ moduleStructureCopy }}</p>
        </section>

        <div v-if="hasSubmodules" class="submodule-stack">
          <SubmoduleSection
            v-for="(submodule, index) in section.submodules"
            :key="submodule.id"
            :index="index"
            :module-id="section.id"
            :module-badge="section.badge"
            :submodule="submodule"
          />
        </div>

        <section v-else class="panel empty-state-panel">
          <div class="section-header">
            <p class="eyebrow">Direct module</p>
            <h2>Materi cukup disampaikan di level modul</h2>
          </div>

          <p class="section-copy empty-state-copy">
            Beberapa topik tidak perlu dipaksa menjadi submodule. Jika struktur
            modulnya sudah cukup jelas lewat fondasi, detail, checkpoint, dan
            contoh utama, halaman ini tetap valid tanpa pemecahan tambahan.
          </p>
        </section>

        <section class="panel module-nav-panel">
          <div class="section-header">
            <p class="eyebrow">Next move</p>
            <h2>Lanjutkan progres modul</h2>
          </div>

          <div class="module-nav-grid">
            <NuxtLink
              v-if="previousSection"
              class="module-nav-card"
              :to="`/modules/${previousSection.id}`"
            >
              <span>Modul sebelumnya</span>
              <strong>{{ previousSection.badge }}</strong>
              <p>{{ previousSection.title }}</p>
            </NuxtLink>

            <NuxtLink class="module-nav-card" to="/">
              <span>Kembali</span>
              <strong>Katalog modul</strong>
              <p>Lihat seluruh modul dan jumlah submodule dari halaman utama.</p>
            </NuxtLink>

            <NuxtLink
              v-if="nextSection"
              class="module-nav-card"
              :to="`/modules/${nextSection.id}`"
            >
              <span>Modul berikutnya</span>
              <strong>{{ nextSection.badge }}</strong>
              <p>{{ nextSection.title }}</p>
            </NuxtLink>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
