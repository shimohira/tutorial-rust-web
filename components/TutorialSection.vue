<script setup lang="ts">
import { useTutorialUi } from "~/composables/useTutorialUi";
import type { LessonSection } from "~/data/tutorial";

defineProps<{
  section: LessonSection;
}>();

const ui = useTutorialUi();
</script>

<template>
  <section :id="section.id" class="panel lesson-panel" data-track>
    <div class="lesson-head">
      <div>
        <p class="eyebrow">{{ section.badge }}</p>
        <h2>{{ section.title }}</h2>
      </div>
      <div class="lesson-badge">{{ ui.common.rustCore }}</div>
    </div>

    <p class="section-copy">
      {{ section.summary }}
    </p>

    <div class="lesson-grid">
      <article class="lesson-card">
        <h3>{{ ui.tutorialSection.foundations }}</h3>
        <ul class="bullet-list">
          <li v-for="item in section.foundations" :key="item">
            {{ item }}
          </li>
        </ul>
      </article>

      <article class="lesson-card">
        <h3>{{ ui.tutorialSection.deepDive }}</h3>
        <ul class="bullet-list">
          <li v-for="item in section.deepDive" :key="item">
            {{ item }}
          </li>
        </ul>
      </article>

      <article class="lesson-card warning-card">
        <h3>{{ ui.tutorialSection.pitfalls }}</h3>
        <ul class="bullet-list">
          <li v-for="item in section.pitfalls" :key="item">
            {{ item }}
          </li>
        </ul>
      </article>
    </div>

    <article
      v-if="section.references?.length"
      class="lesson-card docs-card"
      data-testid="module-doc-links"
    >
      <div class="docs-card-head">
        <div>
          <p class="eyebrow">{{ ui.common.relatedDocs }}</p>
          <h3>{{ ui.common.officialReferencesModule }}</h3>
        </div>
        <span>{{ section.references.length }} {{ ui.common.linkSuffix }}</span>
      </div>

      <div class="resource-stack">
        <a
          v-for="reference in section.references"
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

    <div class="code-split">
      <article class="code-panel">
        <div class="code-header">
          <span>{{ section.codeLabel }}</span>
          <span>{{ ui.common.briefExample }}</span>
        </div>
        <pre><code>{{ section.codeExample }}</code></pre>
      </article>

      <div class="lesson-side">
        <article class="lesson-card">
          <h3>{{ ui.tutorialSection.checkpoint }}</h3>
          <ul class="bullet-list">
            <li v-for="item in section.checkpoints" :key="item">
              {{ item }}
            </li>
          </ul>
        </article>

        <article class="lesson-card">
          <h3>{{ ui.tutorialSection.practice }}</h3>
          <ul class="bullet-list">
            <li v-for="item in section.practice" :key="item">
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
