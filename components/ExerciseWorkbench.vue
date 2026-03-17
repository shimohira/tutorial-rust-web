<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import type { RustExercise } from "~/data/tutorial";

interface RunnerResponse {
  ok: boolean;
  stage: "compile" | "run";
  stdout: string;
  stderr: string;
}

const props = defineProps<{
  exercises: RustExercise[];
  testId?: string;
}>();

const selectedId = ref(props.exercises[0]?.id ?? "");
const drafts = reactive<Record<string, string>>({});
const status = ref<"idle" | "running">("idle");
const result = ref<RunnerResponse | null>(null);
const visibleHintCount = ref(1);

const currentExercise = computed(() => {
  return props.exercises.find((exercise) => exercise.id === selectedId.value) ?? props.exercises[0];
});

const currentCode = computed({
  get() {
    if (!currentExercise.value) {
      return "";
    }

    return drafts[selectedId.value] ?? currentExercise.value.brokenCode;
  },
  set(value: string) {
    drafts[selectedId.value] = value;
  },
});

const lineNumbers = computed(() => {
  return Array.from({ length: currentCode.value.split("\n").length }, (_, index) => index + 1);
});

const isSolved = computed(() => {
  return (
    result.value?.ok === true &&
    result.value.stdout.trim() === currentExercise.value?.expectedOutput.trim()
  );
});

const resultTitle = computed(() => {
  if (status.value === "running") {
    return "Menjalankan compiler...";
  }

  if (!result.value) {
    return "Belum dijalankan";
  }

  if (isSolved.value) {
    return "Latihan selesai";
  }

  if (result.value.ok) {
    return "Program berjalan, tetapi output belum sesuai";
  }

  if (result.value.stage === "compile") {
    return "Masih ada error kompilasi";
  }

  return "Program gagal dieksekusi";
});

watch(selectedId, () => {
  result.value = null;
  visibleHintCount.value = 1;
});

watch(
  () => props.exercises,
  (nextExercises) => {
    selectedId.value = nextExercises[0]?.id ?? "";
    result.value = null;
    visibleHintCount.value = 1;
  },
  { deep: true },
);

async function runCode() {
  if (!currentExercise.value) {
    return;
  }

  status.value = "running";
  result.value = null;

  try {
    result.value = await $fetch<RunnerResponse>("/api/rust/run", {
      method: "POST",
      body: {
        code: currentCode.value,
      },
    });
  } catch (error: unknown) {
    const message =
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof error.data === "object" &&
      error.data !== null &&
      "statusMessage" in error.data &&
      typeof error.data.statusMessage === "string"
        ? error.data.statusMessage
        : "Runner lokal gagal dijalankan.";

    result.value = {
      ok: false,
      stage: "run",
      stdout: "",
      stderr: message,
    };
  } finally {
    status.value = "idle";
  }
}

function resetCode() {
  if (!currentExercise.value) {
    return;
  }

  drafts[selectedId.value] = currentExercise.value.brokenCode;
  result.value = null;
  visibleHintCount.value = 1;
}

function revealHint() {
  if (!currentExercise.value) {
    return;
  }

  visibleHintCount.value = Math.min(
    visibleHintCount.value + 1,
    currentExercise.value.hints.length,
  );
}
</script>

<template>
  <div class="lab-shell" :data-testid="testId">
    <div v-if="exercises.length > 1" class="exercise-tabs">
      <button
        v-for="exercise in exercises"
        :key="exercise.id"
        type="button"
        class="exercise-tab"
        :class="{ active: selectedId === exercise.id }"
        @click="selectedId = exercise.id"
      >
        <span>{{ exercise.title }}</span>
        <small>{{ exercise.difficulty }}</small>
      </button>
    </div>

    <div class="lab-grid" v-if="currentExercise">
      <section class="lesson-card lab-info">
        <p class="eyebrow">Lab</p>
        <h3>{{ currentExercise.title }}</h3>
        <p class="lab-goal">{{ currentExercise.goal }}</p>

        <div class="pill-row">
          <span class="meta-pill">{{ currentExercise.difficulty }}</span>
          <span class="meta-pill">Expected: {{ currentExercise.expectedOutput }}</span>
        </div>

        <div class="lab-focus">
          <h4>Yang sedang diuji</h4>
          <ul class="bullet-list">
            <li v-for="item in currentExercise.focus" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="lab-focus">
          <h4>Hint bertahap</h4>
          <ol class="bullet-list">
            <li
              v-for="(hint, index) in currentExercise.hints.slice(0, visibleHintCount)"
              :key="hint"
            >
              {{ hint }}
              <span v-if="index === visibleHintCount - 1 && visibleHintCount < currentExercise.hints.length">
                ...
              </span>
            </li>
          </ol>
          <button type="button" class="ghost-button" @click="revealHint">
            Tampilkan hint berikutnya
          </button>
        </div>

        <p class="lab-note">
          Runner ini mengeksekusi <code>rustc</code> lokal melalui server Nuxt.
          Gunakan untuk pembelajaran lokal, bukan untuk kode yang tidak dipercaya.
        </p>
      </section>

      <section class="editor-panel">
        <div class="editor-toolbar">
          <strong>Rust Playground Mini</strong>
          <div class="toolbar-actions">
            <button type="button" class="ghost-button" @click="resetCode">
              Reset kode
            </button>
            <button
              type="button"
              class="primary-button"
              data-testid="run-code"
              :disabled="status === 'running'"
              @click="runCode"
            >
              {{ status === "running" ? "Menjalankan..." : "Jalankan kode" }}
            </button>
          </div>
        </div>

        <div class="editor-shell">
          <div class="line-gutter" aria-hidden="true">
            <span v-for="line in lineNumbers" :key="line">{{ line }}</span>
          </div>
          <textarea
            v-model="currentCode"
            data-testid="rust-editor"
            class="code-editor"
            spellcheck="false"
          />
        </div>

        <div class="terminal-panel">
          <div class="terminal-header">
            <strong>{{ resultTitle }}</strong>
            <span v-if="isSolved" class="success-pill">Output sesuai</span>
          </div>

          <pre class="terminal-output" data-testid="terminal-output">{{ result?.stderr || result?.stdout || "Jalankan kode untuk melihat hasil compile atau output program." }}</pre>

          <div v-if="result?.ok && result.stdout" class="stdout-panel">
            <h4>Stdout</h4>
            <pre>{{ result.stdout }}</pre>
          </div>

          <div v-if="isSolved" class="success-panel">
            <h4>Kenapa solusi ini benar</h4>
            <p>{{ currentExercise.explanation }}</p>
          </div>
        </div>
      </section>
    </div>

    <p v-else class="section-copy">
      Belum ada latihan untuk submodule ini.
    </p>
  </div>
</template>
