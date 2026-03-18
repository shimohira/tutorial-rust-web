<script setup lang="ts">
import { computed } from "vue";
import ExerciseWorkbench from "~/components/ExerciseWorkbench.vue";
import { getSubmoduleUsageExamplesById } from "~/data/tutorial";
import type { LessonSubmodule } from "~/data/tutorial";

const props = defineProps<{
  moduleId: string;
  moduleBadge: string;
  submodule: LessonSubmodule;
  index: number;
}>();

const { getSubmoduleProgress } = useTutorialProgress();

const submoduleProgress = computed(() => {
  return getSubmoduleProgress(props.moduleId, props.submodule);
});

const usageExamples = computed(() => {
  return getSubmoduleUsageExamplesById(props.submodule.id);
});
</script>

<template>
  <section
    :id="submodule.id"
    class="panel submodule-panel"
    :data-testid="`submodule-${submodule.id}`"
  >
    <div class="lesson-head">
      <div>
        <p class="eyebrow">{{ moduleBadge }} • Submodule {{ index + 1 }}</p>
        <h2>{{ submodule.title }}</h2>
      </div>
      <div
        class="lesson-badge"
        :class="{ 'lesson-badge-complete': submoduleProgress.isCompleted }"
        :data-testid="`submodule-progress-${submodule.id}`"
      >
        {{ submoduleProgress.isCompleted ? "Selesai" : `${submoduleProgress.solvedExercises}/${submoduleProgress.totalExercises} lab` }}
      </div>
    </div>

    <p class="section-copy">
      {{ submodule.summary }}
    </p>

    <div class="submodule-progress-strip" aria-hidden="true">
      <span :style="{ width: `${submoduleProgress.completionRatio * 100}%` }" />
    </div>

    <p class="submodule-progress-copy">
      {{
        submoduleProgress.isCompleted
          ? "Semua latihan di submodule ini sudah selesai."
          : `Selesaikan ${submoduleProgress.totalExercises - submoduleProgress.solvedExercises} latihan lagi untuk menutup submodule ini.`
      }}
    </p>

    <div class="submodule-grid">
      <article class="lesson-card">
        <h3>Konsep inti</h3>
        <ul class="bullet-list">
          <li v-for="item in submodule.concepts" :key="item">
            {{ item }}
          </li>
        </ul>
      </article>

      <article class="lesson-card">
        <h3>Cara membaca submodule ini</h3>
        <ul class="bullet-list">
          <li v-for="item in submodule.walkthrough" :key="item">
            {{ item }}
          </li>
        </ul>
      </article>
    </div>

    <article
      v-if="submodule.references?.length"
      class="lesson-card docs-card submodule-docs-card"
      :data-testid="`submodule-doc-links-${submodule.id}`"
    >
      <div class="docs-card-head">
        <div>
          <p class="eyebrow">Rust docs terkait</p>
          <h3>Referensi resmi untuk submodule ini</h3>
        </div>
        <span>{{ submodule.references.length }} link</span>
      </div>

      <div class="resource-stack">
        <a
          v-for="reference in submodule.references"
          :key="reference.url"
          class="resource-link"
          :href="reference.url"
          target="_blank"
          rel="noreferrer"
        >
          <strong>{{ reference.title }}</strong>
          <p>{{ reference.description }}</p>
        </a>
      </div>
    </article>

    <article
      v-if="usageExamples.length"
      class="lesson-card usage-card"
      :data-testid="`submodule-usage-${submodule.id}`"
    >
      <div class="docs-card-head">
        <div>
          <p class="eyebrow">Contoh penggunaan</p>
          <h3>Kasus pakai yang lebih dekat ke situasi nyata</h3>
        </div>
        <span>{{ usageExamples.length }} contoh</span>
      </div>

      <div class="usage-grid">
        <article
          v-for="(usage, usageIndex) in usageExamples"
          :key="`${submodule.id}-${usage.title}`"
          class="lesson-card usage-example-card"
          :class="{ 'usage-example-card-full': usage.comparison }"
        >
          <div class="usage-copy">
            <h4>{{ usage.title }}</h4>
            <p>{{ usage.summary }}</p>
          </div>

          <div
            v-if="usage.comparison"
            class="comparison-grid"
            :data-testid="`submodule-usage-comparison-${submodule.id}-${usageIndex}`"
          >
            <article class="code-panel usage-code-panel">
              <div class="code-header">
                <span>{{ usage.comparison.withoutLabel }}</span>
                <span>Sebelum solusi</span>
              </div>
              <pre><code>{{ usage.comparison.withoutCode }}</code></pre>
            </article>

            <article class="code-panel usage-code-panel">
              <div class="code-header">
                <span>{{ usage.comparison.withLabel }}</span>
                <span>Setelah solusi</span>
              </div>
              <pre><code>{{ usage.comparison.withCode }}</code></pre>
            </article>
          </div>

          <article v-else class="code-panel usage-code-panel">
            <div class="code-header">
              <span>{{ usage.title }}</span>
              <span>Contoh pakai</span>
            </div>
            <pre><code>{{ usage.code }}</code></pre>
          </article>

          <p class="usage-takeaway">
            {{ usage.takeaway }}
          </p>
          <p v-if="usage.comparison" class="usage-difference">
            {{ usage.comparison.difference }}
          </p>
        </article>
      </div>
    </article>

    <div class="code-split submodule-code-split">
      <article class="code-panel">
        <div class="code-header">
          <span>{{ submodule.exampleLabel }}</span>
          <span>Contoh submodule</span>
        </div>
        <pre><code>{{ submodule.exampleCode }}</code></pre>
      </article>

      <div class="lesson-side">
        <article class="lesson-card submodule-note-card">
          <h3>Target latihan</h3>
          <ul class="bullet-list">
            <li v-for="exercise in submodule.exercises" :key="exercise.id">
              {{ exercise.goal }}
            </li>
          </ul>
        </article>

        <article class="lesson-card submodule-note-card">
          <h3>Yang perlu diperhatikan</h3>
          <ul class="bullet-list">
            <li v-for="exercise in submodule.exercises" :key="`${exercise.id}-focus`">
              {{ exercise.focus[0] }}
            </li>
          </ul>
        </article>
      </div>
    </div>

    <ExerciseWorkbench
      :exercises="submodule.exercises"
      :module-id="moduleId"
      :submodule-id="submodule.id"
      :test-id="`lab-${submodule.id}`"
    />
  </section>
</template>
