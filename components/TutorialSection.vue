<script setup lang="ts">
import type { LessonSection } from "~/data/tutorial";

defineProps<{
  section: LessonSection;
}>();
</script>

<template>
  <section :id="section.id" class="panel lesson-panel" data-track>
    <div class="lesson-head">
      <div>
        <p class="eyebrow">{{ section.badge }}</p>
        <h2>{{ section.title }}</h2>
      </div>
      <div class="lesson-badge">Rust Core</div>
    </div>

    <p class="section-copy">
      {{ section.summary }}
    </p>

    <div class="lesson-grid">
      <article class="lesson-card">
        <h3>Fondasi materi</h3>
        <ul class="bullet-list">
          <li v-for="item in section.foundations" :key="item">
            {{ item }}
          </li>
        </ul>
      </article>

      <article class="lesson-card">
        <h3>Detail yang perlu diperhatikan</h3>
        <ul class="bullet-list">
          <li v-for="item in section.deepDive" :key="item">
            {{ item }}
          </li>
        </ul>
      </article>

      <article class="lesson-card warning-card">
        <h3>Jebakan umum</h3>
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
          <p class="eyebrow">Rust docs terkait</p>
          <h3>Referensi resmi untuk modul ini</h3>
        </div>
        <span>{{ section.references.length }} link</span>
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
          <span>Contoh ringkas</span>
        </div>
        <pre><code>{{ section.codeExample }}</code></pre>
      </article>

      <div class="lesson-side">
        <article class="lesson-card">
          <h3>Checkpoint</h3>
          <ul class="bullet-list">
            <li v-for="item in section.checkpoints" :key="item">
              {{ item }}
            </li>
          </ul>
        </article>

        <article class="lesson-card">
          <h3>Latihan lanjutan</h3>
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
