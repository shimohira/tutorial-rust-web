<script setup lang="ts">
import { computed } from "vue";
import {
  getModuleExercisesById,
  lessonSections,
  overviewCards,
  roadmapPhases,
} from "~/data/tutorial";

const { getModuleProgress, getOverallProgress } = useTutorialProgress();

useHead({
  title: "Rust Study Deck",
  meta: [
    {
      name: "description",
      content:
        "Katalog modul Rust dengan halaman terpisah per modul dan Rust Lab yang sesuai dengan topiknya.",
    },
  ],
});

const moduleBlueprints = lessonSections.map((section) => ({
  ...section,
  submoduleCount: section.submodules.length,
  exerciseCount: getModuleExercisesById(section.id).length,
}));

const moduleCards = computed(() => {
  return moduleBlueprints.map((section) => {
    const progress = getModuleProgress(section.id, section.submodules);

    return {
      ...section,
      completedSubmodules: progress.completedSubmodules,
      solvedExercises: progress.solvedExercises,
      completionRatio: progress.completionRatio,
    };
  });
});

const overallProgress = computed(() => getOverallProgress(lessonSections));
const totalSubmodules = moduleBlueprints.reduce((sum, module) => sum + module.submoduleCount, 0);
const totalLabs = moduleBlueprints.reduce((sum, module) => sum + module.exerciseCount, 0);
</script>

<template>
  <div class="page-shell landing-shell">
    <header class="hero landing-hero">
      <div class="hero-copy">
        <p class="eyebrow">Nuxt edition</p>
        <h1>Belajar Rust per modul, dengan lab yang langsung nyambung ke materinya.</h1>
        <p class="hero-text">
          Halaman utama ini sekarang berfungsi sebagai katalog belajar. Setiap
          modul punya halaman tersendiri, materi yang lebih fokus, dan Rust Lab
          yang hanya berisi latihan sesuai topik modul tersebut.
        </p>

        <div class="hero-metrics">
          <div>
            <span>Modul</span>
            <strong>{{ moduleCards.length }} halaman</strong>
          </div>
          <div>
            <span>Submodule selesai</span>
            <strong>{{ overallProgress.completedSubmodules }} / {{ totalSubmodules }}</strong>
          </div>
          <div>
            <span>Rust Lab selesai</span>
            <strong>{{ overallProgress.solvedExercises }} / {{ totalLabs }}</strong>
          </div>
        </div>
      </div>

      <div class="hero-stack">
        <section class="panel panel-dark">
          <p class="eyebrow">Pola belajar</p>
          <ul class="bullet-list">
            <li>Buka satu modul, baca materi, lalu jalankan lab modul itu.</li>
            <li>Perbaiki compile error sampai output sesuai target.</li>
            <li>Pindah ke modul berikutnya setelah checkpoint modul saat ini terasa nyaman.</li>
            <li>Gunakan halaman utama hanya sebagai peta dan pintu masuk modul.</li>
          </ul>
        </section>

        <section class="panel accent-panel">
          <p class="eyebrow">Arah materi</p>
          <p>
            Urutan modul sengaja bergerak dari grammar dasar ke aliran data,
            lalu ke pemodelan, abstraction, standard library, dan topik lanjut.
          </p>
        </section>
      </div>
    </header>

    <main class="main-stack">
      <section class="panel">
        <div class="section-header">
          <p class="eyebrow">Module Directory</p>
          <h2>Pilih modul yang ingin dipelajari</h2>
        </div>

        <div class="module-grid">
          <NuxtLink
            v-for="module in moduleCards"
            :key="module.id"
            class="module-card"
            :to="`/modules/${module.id}`"
          >
            <span class="module-card-badge">{{ module.badge }}</span>
            <h3>{{ module.title }}</h3>
            <p>{{ module.summary }}</p>
            <div class="module-card-progress" :data-testid="`module-progress-${module.id}`">
              <span>
                {{
                  module.submoduleCount > 0
                    ? `${module.completedSubmodules} / ${module.submoduleCount} submodule selesai`
                    : "Materi langsung tanpa submodule"
                }}
              </span>
              <span>
                {{
                  module.exerciseCount > 0
                    ? `${module.solvedExercises} / ${module.exerciseCount} lab selesai`
                    : "Belum ada Rust Lab"
                }}
              </span>
            </div>
            <div class="progress-meter progress-meter-compact" aria-hidden="true">
              <span :style="{ width: `${module.completionRatio * 100}%` }" />
            </div>
            <div class="module-card-meta">
              <span>{{ module.submoduleCount > 0 ? `${module.submoduleCount} submodule` : "Materi langsung" }}</span>
              <span>{{ module.exerciseCount > 0 ? `${module.exerciseCount} lab` : "Tanpa lab" }}</span>
              <span>Buka modul</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section class="panel">
        <div class="section-header">
          <p class="eyebrow">Overview</p>
          <h2>Pondasi belajar sebelum masuk ke halaman modul</h2>
        </div>

        <div class="overview-grid">
          <article
            v-for="card in overviewCards"
            :key="card.title"
            class="lesson-card"
          >
            <h3>{{ card.title }}</h3>
            <p>{{ card.body }}</p>
          </article>
        </div>

        <div class="phase-grid">
          <article
            v-for="phase in roadmapPhases"
            :key="phase.title"
            class="phase-card"
          >
            <h3>{{ phase.title }}</h3>
            <p>{{ phase.body }}</p>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
