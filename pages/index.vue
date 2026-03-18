<script setup lang="ts">
import { computed } from "vue";
import { useTutorialContent } from "~/composables/useTutorialContent";
import { useTutorialUi } from "~/composables/useTutorialUi";

const { getModuleProgress, getOverallProgress } = useTutorialProgress();
const { getModuleExercisesById, lessonSections, overviewCards, roadmapPhases } = useTutorialContent();
const ui = useTutorialUi();

useHead(() => ({
  title: ui.value.landing.pageTitle,
  meta: [
    {
      name: "description",
      content:
        ui.value.landing.heroText,
    },
  ],
}));

const moduleBlueprints = computed(() => {
  return lessonSections.value.map((section) => ({
    ...section,
    submoduleCount: section.submodules.length,
    exerciseCount: getModuleExercisesById(section.id).length,
  }));
});

const moduleCards = computed(() => {
  return moduleBlueprints.value.map((section) => {
    const progress = getModuleProgress(section.id, section.submodules);

    return {
      ...section,
      completedSubmodules: progress.completedSubmodules,
      solvedExercises: progress.solvedExercises,
      completionRatio: progress.completionRatio,
    };
  });
});

const overallProgress = computed(() => getOverallProgress(lessonSections.value));
const totalSubmodules = computed(() => {
  return moduleBlueprints.value.reduce((sum, module) => sum + module.submoduleCount, 0);
});
const totalLabs = computed(() => {
  return moduleBlueprints.value.reduce((sum, module) => sum + module.exerciseCount, 0);
});
</script>

<template>
  <div class="page-shell landing-shell">
    <header class="hero landing-hero">
      <div class="hero-copy">
        <p class="eyebrow">{{ ui.landing.eyebrow }}</p>
        <h1>{{ ui.landing.heroTitle }}</h1>
        <p class="hero-text">
          {{ ui.landing.heroText }}
        </p>

        <div class="hero-metrics">
          <div>
            <span>{{ ui.landing.modulesLabel }}</span>
            <strong>{{ moduleCards.length }} {{ ui.landing.pagesSuffix }}</strong>
          </div>
          <div>
            <span>{{ ui.landing.completedSubmodulesLabel }}</span>
            <strong>{{ overallProgress.completedSubmodules }} / {{ totalSubmodules }}</strong>
          </div>
          <div>
            <span>{{ ui.landing.completedLabsLabel }}</span>
            <strong>{{ overallProgress.solvedExercises }} / {{ totalLabs }}</strong>
          </div>
        </div>
      </div>

      <div class="hero-stack">
        <section class="panel panel-dark">
          <p class="eyebrow">{{ ui.landing.studyPatternEyebrow }}</p>
          <ul class="bullet-list">
            <li v-for="item in ui.landing.studyPattern" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="panel accent-panel">
          <p class="eyebrow">{{ ui.landing.directionEyebrow }}</p>
          <p>
            {{ ui.landing.directionCopy }}
          </p>
        </section>
      </div>
    </header>

    <main class="main-stack">
      <section class="panel">
        <div class="section-header">
          <p class="eyebrow">{{ ui.landing.directoryEyebrow }}</p>
          <h2>{{ ui.landing.directoryTitle }}</h2>
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
                    ? ui.landing.formatCompletedSubmodules(
                      module.completedSubmodules,
                      module.submoduleCount,
                    )
                    : ui.common.directMaterial
                }}
              </span>
              <span>
                {{
                  module.exerciseCount > 0
                    ? ui.landing.formatCompletedLabs(module.solvedExercises, module.exerciseCount)
                    : ui.common.noLab
                }}
              </span>
            </div>
            <div class="progress-meter progress-meter-compact" aria-hidden="true">
              <span :style="{ width: `${module.completionRatio * 100}%` }" />
            </div>
            <div class="module-card-meta">
              <span>{{ ui.landing.formatSubmoduleCount(module.submoduleCount) }}</span>
              <span>{{ ui.landing.formatExerciseCount(module.exerciseCount) }}</span>
              <span>{{ ui.common.openModule }}</span>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section class="panel">
        <div class="section-header">
          <p class="eyebrow">{{ ui.landing.overviewEyebrow }}</p>
          <h2>{{ ui.landing.overviewTitle }}</h2>
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
