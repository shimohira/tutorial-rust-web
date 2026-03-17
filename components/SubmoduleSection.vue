<script setup lang="ts">
import { computed } from "vue";
import ExerciseWorkbench from "~/components/ExerciseWorkbench.vue";
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
