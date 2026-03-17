<script setup lang="ts">
import ExerciseWorkbench from "~/components/ExerciseWorkbench.vue";
import type { LessonSubmodule } from "~/data/tutorial";

defineProps<{
  moduleBadge: string;
  submodule: LessonSubmodule;
  index: number;
}>();
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
      <div class="lesson-badge">Detail + Lab</div>
    </div>

    <p class="section-copy">
      {{ submodule.summary }}
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
      :test-id="`lab-${submodule.id}`"
    />
  </section>
</template>
