<script setup lang="ts">
import SubmoduleSection from "~/components/SubmoduleSection.vue";
import TutorialSection from "~/components/TutorialSection.vue";
import { getLessonSectionById, lessonSections, moduleIds } from "~/data/tutorial";

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

useHead(() => ({
  title: section.value
    ? `${section.value.badge} - ${section.value.title}`
    : "Modul Rust",
  meta: [
    {
      name: "description",
      content: section.value
        ? `${section.value.title} dengan submodule detail, contoh terpisah, dan Rust Lab per submodule.`
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
            <span>Submodule</span>
            <strong>{{ section.submodules.length }} bagian</strong>
          </div>
          <div>
            <span>Checkpoint</span>
            <strong>{{ section.checkpoints.length }} target</strong>
          </div>
          <div>
            <span>Rust Lab</span>
            <strong>{{ exerciseCount }} latihan</strong>
          </div>
        </div>
      </div>

      <div class="hero-stack">
        <section class="panel panel-dark">
          <p class="eyebrow">Cara belajar modul ini</p>
          <ul class="bullet-list">
            <li>Mulai dari peta modul, lalu turun ke submodule satu per satu.</li>
            <li>Baca contoh di tiap submodule sebelum menyentuh editor lab-nya.</li>
            <li>Perbaiki compile error sampai output sesuai target, baru lanjut ke submodule berikutnya.</li>
          </ul>
        </section>

        <section class="panel accent-panel">
          <p class="eyebrow">Struktur materi</p>
          <p>
            Setiap submodule memecah satu konsep besar menjadi langkah yang lebih
            sempit: konsep inti, cara membaca contoh, contoh kode, lalu Rust Lab
            yang relevan hanya untuk topik itu.
          </p>
        </section>
      </div>
    </header>

    <div class="content-grid">
      <aside class="sidebar">
        <div class="sidebar-stack">
          <div class="panel toc-panel">
            <p class="eyebrow">Semua modul</p>
            <nav>
              <NuxtLink
                v-for="item in lessonSections"
                :key="item.id"
                class="toc-link"
                :class="{ active: item.id === section.id }"
                :to="`/modules/${item.id}`"
              >
                {{ item.badge }}: {{ item.title }}
              </NuxtLink>
            </nav>
          </div>

          <div class="panel submodule-toc-panel">
            <p class="eyebrow">Submodule modul ini</p>
            <nav>
              <a
                v-for="submodule in section.submodules"
                :key="submodule.id"
                class="toc-link submodule-link"
                :href="`#${submodule.id}`"
              >
                {{ submodule.title }}
              </a>
            </nav>
          </div>
        </div>
      </aside>

      <main class="main-stack">
        <TutorialSection :section="section" />

        <section class="panel submodule-overview-panel">
          <div class="section-header">
            <p class="eyebrow">Submodule Track</p>
            <h2>Belajar modul ini lewat bagian-bagian yang lebih kecil</h2>
          </div>

          <p class="section-copy">
            Alih-alih satu blok materi besar, modul ini sekarang dipecah menjadi
            {{ section.submodules.length }} submodule. Setiap submodule punya
            contoh sendiri dan Rust Lab sendiri agar error yang Anda perbaiki
            benar-benar sesuai dengan konsep yang baru dibaca.
          </p>
        </section>

        <div class="submodule-stack">
          <SubmoduleSection
            v-for="(submodule, index) in section.submodules"
            :key="submodule.id"
            :index="index"
            :module-badge="section.badge"
            :submodule="submodule"
          />
        </div>

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
