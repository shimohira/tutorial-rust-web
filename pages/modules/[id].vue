<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import SubmoduleSection from "~/components/SubmoduleSection.vue";
import TutorialSection from "~/components/TutorialSection.vue";
import { useTutorialContent } from "~/composables/useTutorialContent";
import { useTutorialUi } from "~/composables/useTutorialUi";

const { clearModuleProgress, getModuleProgress, getSubmoduleProgress } = useTutorialProgress();
const { getLessonSectionById, lessonSections, moduleIds } = useTutorialContent();
const ui = useTutorialUi();
const route = useRoute();
const navigationSentinel = ref<HTMLElement | null>(null);
const isNavigationSticky = ref(false);
const expandedNavigationPanel = ref<"modules" | "submodules" | null>(null);
let navigationObserver: IntersectionObserver | null = null;

const moduleId = computed(() => String(route.params.id ?? ""));
const section = computed(() => getLessonSectionById(moduleId.value));

if (!section.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Module not found.",
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

const currentIndex = computed(() => moduleIds.value.indexOf(moduleId.value));

const previousSection = computed(() => {
  if (currentIndex.value <= 0) {
    return null;
  }

  return getLessonSectionById(moduleIds.value[currentIndex.value - 1]) ?? null;
});

const nextSection = computed(() => {
  if (
    currentIndex.value < 0 ||
    currentIndex.value >= moduleIds.value.length - 1
  ) {
    return null;
  }

  return getLessonSectionById(moduleIds.value[currentIndex.value + 1]) ?? null;
});

const moduleLearningSteps = computed(() => {
  if (hasSubmodules.value) {
    return ui.value.modulePage.learningStepsWithSubmodules;
  }

  return ui.value.modulePage.learningStepsDirect;
});

const moduleStructureCopy = computed(() => {
  if (hasSubmodules.value) {
    return ui.value.modulePage.formatModuleSteps(submoduleCount.value);
  }

  return ui.value.modulePage.directStructureCopy;
});

const progressSummaryLabel = computed(() => {
  if (hasExercises.value) {
    return ui.value.modulePage.formatProgressSummary(
      moduleProgress.value.completedSubmodules,
      moduleProgress.value.totalSubmodules,
    );
  }

  if (hasSubmodules.value) {
    return ui.value.modulePage.noLabInModule;
  }

  return ui.value.modulePage.noModuleProgress;
});

const progressPercentLabel = computed(() => {
  return hasExercises.value
    ? ui.value.modulePage.formatProgressPercent(moduleProgress.value.completionRatio)
    : ui.value.modulePage.naLabel;
});

const showExpandedNavigation = computed(() => {
  return !isNavigationSticky.value || expandedNavigationPanel.value !== null;
});

const showModuleNavigation = computed(() => {
  return !isNavigationSticky.value || expandedNavigationPanel.value === "modules";
});

const showSubmoduleNavigation = computed(() => {
  return !isNavigationSticky.value || expandedNavigationPanel.value === "submodules";
});

const toggleNavigationPanel = (panel: "modules" | "submodules") => {
  if (!isNavigationSticky.value) {
    return;
  }

  expandedNavigationPanel.value = expandedNavigationPanel.value === panel ? null : panel;
};

watch(moduleId, () => {
  expandedNavigationPanel.value = null;
});

onMounted(() => {
  if (!navigationSentinel.value || typeof window === "undefined") {
    return;
  }

  if (typeof window.IntersectionObserver === "undefined") {
    return;
  }

  navigationObserver = new window.IntersectionObserver(
    ([entry]) => {
      const nextStickyState = !entry.isIntersecting && entry.boundingClientRect.top < 18;

      isNavigationSticky.value = nextStickyState;

      if (!nextStickyState) {
        expandedNavigationPanel.value = null;
      }
    },
    {
      threshold: 0,
      rootMargin: "-18px 0px 0px 0px",
    },
  );

  navigationObserver.observe(navigationSentinel.value);
});

onBeforeUnmount(() => {
  navigationObserver?.disconnect();
});

useHead(() => ({
  title: section.value
    ? `${section.value.badge} - ${section.value.title}`
    : "Rust Module",
  meta: [
    {
      name: "description",
      content: section.value?.summary ?? "Rust Module",
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
            <span>{{ hasSubmodules ? ui.modulePage.submoduleMetric : ui.modulePage.directMetric }}</span>
            <strong>
              {{ hasSubmodules ? ui.modulePage.formatSubmoduleCount(submoduleCount) : ui.modulePage.directMaterialLabel }}
            </strong>
          </div>
          <div>
            <span>{{ hasSubmodules ? ui.modulePage.submoduleProgressMetric : ui.modulePage.noSubmoduleMetric }}</span>
            <strong data-testid="module-progress-submodules">
              {{
                hasSubmodules
                  ? ui.modulePage.formatProgressSummary(
                    moduleProgress.completedSubmodules,
                    moduleProgress.totalSubmodules,
                  )
                  : ui.modulePage.notUsedLabel
              }}
            </strong>
          </div>
          <div>
            <span>{{ hasExercises ? ui.modulePage.labProgressMetric : ui.modulePage.noLabMetric }}</span>
            <strong data-testid="module-progress-labs">
              {{
                hasExercises
                  ? ui.landing.formatCompletedLabs(moduleProgress.solvedExercises, exerciseCount)
                  : ui.modulePage.noLabLabel
              }}
            </strong>
          </div>
        </div>
      </div>

      <div class="hero-stack">
        <section class="panel panel-dark">
          <p class="eyebrow">{{ ui.modulePage.learningEyebrow }}</p>
          <ul class="bullet-list">
            <li v-for="step in moduleLearningSteps" :key="step">{{ step }}</li>
          </ul>
        </section>

        <section class="panel accent-panel">
          <p class="eyebrow">{{ ui.modulePage.structureEyebrow }}</p>
          <p>{{ moduleStructureCopy }}</p>
        </section>

        <section class="panel progress-panel">
          <p class="eyebrow">{{ ui.modulePage.progressEyebrow }}</p>
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
                ? ui.modulePage.progressStoredCopy
                : ui.modulePage.noProgressCopy
            }}
          </p>
          <button
            v-if="hasExercises"
            type="button"
            class="ghost-button"
            :disabled="moduleProgress.solvedExercises === 0"
            @click="clearModuleProgress(section.id)"
          >
            {{ ui.modulePage.resetProgress }}
          </button>
        </section>
      </div>
    </header>

    <div class="main-stack module-main-stack">
      <div
        ref="navigationSentinel"
        class="module-navigation-sentinel"
        aria-hidden="true"
      />

      <section
        class="panel module-navigation-shell"
        :class="{ 'is-stuck': isNavigationSticky }"
        data-testid="module-navigation-shell"
      >
        <div
          v-if="isNavigationSticky"
          class="navigation-compact-bar"
          data-testid="sticky-navigation-controls"
        >
          <button
            type="button"
            class="navigation-toggle"
            :class="{ active: expandedNavigationPanel === 'modules' }"
            :aria-expanded="expandedNavigationPanel === 'modules'"
            data-testid="module-nav-toggle"
            @click="toggleNavigationPanel('modules')"
          >
            <span>{{ ui.modulePage.allModules }}</span>
            <strong>
              {{
                expandedNavigationPanel === "modules"
                  ? ui.modulePage.stickyModulesClosed
                  : section.badge
              }}
            </strong>
            <small>
              {{
                expandedNavigationPanel === "modules"
                  ? ui.modulePage.compactModeCopy
                  : section.title
              }}
            </small>
          </button>

          <button
            v-if="hasSubmodules"
            type="button"
            class="navigation-toggle"
            :class="{ active: expandedNavigationPanel === 'submodules' }"
            :aria-expanded="expandedNavigationPanel === 'submodules'"
            data-testid="submodule-nav-toggle"
            @click="toggleNavigationPanel('submodules')"
          >
            <span>{{ ui.common.submodule }}</span>
            <strong>
              {{
                expandedNavigationPanel === "submodules"
                  ? ui.modulePage.stickySubmodulesClosed
                  : ui.modulePage.formatSubmoduleCount(submoduleCount)
              }}
            </strong>
            <small>
              {{
                expandedNavigationPanel === "submodules"
                  ? ui.modulePage.compactModeCopy
                  : ui.modulePage.stickySubmoduleHint
              }}
            </small>
          </button>
        </div>

        <div
          v-if="showExpandedNavigation"
          class="navigation-grid"
          :class="{ 'navigation-grid-single': isNavigationSticky }"
        >
          <div v-show="showModuleNavigation" class="navigation-panel">
            <div class="sidebar-panel-head">
              <p class="eyebrow">{{ ui.modulePage.allModules }}</p>
              <span>{{ lessonSections.length }} {{ ui.modulePage.totalSuffix }}</span>
            </div>
            <nav class="toc-chip-nav module-chip-nav" data-testid="module-sidebar-nav">
              <NuxtLink
                v-for="item in lessonSections"
                :key="item.id"
                class="toc-link toc-chip module-chip"
                :class="{ active: item.id === section.id }"
                :to="`/modules/${item.id}`"
              >
                <small class="toc-kicker">{{ item.badge }}</small>
                <span>{{ item.title }}</span>
              </NuxtLink>
            </nav>
          </div>

          <div
            v-show="showSubmoduleNavigation"
            class="navigation-panel"
          >
            <div class="sidebar-panel-head">
              <p class="eyebrow">{{ ui.modulePage.submodulesInThisModule }}</p>
              <span>{{ hasSubmodules ? ui.modulePage.formatSubmoduleCount(submoduleCount) : `0 ${ui.modulePage.partSuffix}` }}</span>
            </div>
            <nav
              v-if="hasSubmodules"
              class="toc-chip-nav submodule-chip-nav"
              data-testid="submodule-sidebar-nav"
            >
              <a
                v-for="(submodule, index) in section.submodules"
                :key="submodule.id"
                class="toc-link toc-chip submodule-chip"
                :class="{ complete: submoduleProgressMap[submodule.id]?.isCompleted }"
                :href="`#${submodule.id}`"
              >
                <small class="toc-kicker">{{ ui.submoduleSection.partLabel(index + 1) }}</small>
                <span>{{ submodule.title }}</span>
                <small>
                  {{
                    submoduleProgressMap[submodule.id]?.isCompleted
                      ? ui.modulePage.completedLabel
                      : ui.submoduleSection.formatLabProgress(
                        submoduleProgressMap[submodule.id]?.solvedExercises ?? 0,
                        submoduleProgressMap[submodule.id]?.totalExercises ?? 0,
                      )
                  }}
                </small>
              </a>
            </nav>
            <p v-else class="sidebar-note">
              {{ ui.modulePage.noSubmoduleNavigation }}
            </p>
          </div>
        </div>
      </section>

      <main class="main-stack">
        <TutorialSection :section="section" />

        <section class="panel submodule-overview-panel">
          <div class="section-header">
            <p class="eyebrow">{{ hasSubmodules ? ui.modulePage.trackEyebrow : ui.modulePage.directEyebrow }}</p>
            <h2>
              {{
                hasSubmodules
                  ? ui.modulePage.trackTitle
                  : ui.modulePage.directTitle
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
            <p class="eyebrow">{{ ui.modulePage.directPanelEyebrow }}</p>
            <h2>{{ ui.modulePage.directPanelTitle }}</h2>
          </div>

          <p class="section-copy empty-state-copy">
            {{ ui.modulePage.directPanelCopy }}
          </p>
        </section>

        <section class="panel module-nav-panel">
          <div class="section-header">
            <p class="eyebrow">{{ ui.modulePage.nextMoveEyebrow }}</p>
            <h2>{{ ui.modulePage.nextMoveTitle }}</h2>
          </div>

          <div class="module-nav-grid">
            <NuxtLink
              v-if="previousSection"
              class="module-nav-card"
              :to="`/modules/${previousSection.id}`"
            >
              <span>{{ ui.modulePage.previousModule }}</span>
              <strong>{{ previousSection.badge }}</strong>
              <p>{{ previousSection.title }}</p>
            </NuxtLink>

            <NuxtLink class="module-nav-card" to="/">
              <span>{{ ui.modulePage.backToCatalog }}</span>
              <strong>{{ ui.modulePage.catalogTitle }}</strong>
              <p>{{ ui.modulePage.catalogCopy }}</p>
            </NuxtLink>

            <NuxtLink
              v-if="nextSection"
              class="module-nav-card"
              :to="`/modules/${nextSection.id}`"
            >
              <span>{{ ui.modulePage.nextModule }}</span>
              <strong>{{ nextSection.badge }}</strong>
              <p>{{ nextSection.title }}</p>
            </NuxtLink>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
