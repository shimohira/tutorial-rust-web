<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useTutorialUi } from "~/composables/useTutorialUi";
import type { RustExercise } from "~/data/tutorial";

interface RunnerResponse {
  ok: boolean;
  stage: "compile" | "run";
  stdout: string;
  stderr: string;
}

const props = defineProps<{
  exercises: RustExercise[];
  moduleId: string;
  submoduleId: string;
  testId?: string;
}>();

const { isExerciseSolved, markExerciseSolved } = useTutorialProgress();
const ui = useTutorialUi();
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

const solvedExerciseCount = computed(() => {
  return props.exercises.filter((exercise) => {
    return isExerciseSolved(props.moduleId, props.submoduleId, exercise.id);
  }).length;
});

const currentExerciseCompleted = computed(() => {
  if (!currentExercise.value) {
    return false;
  }

  return isExerciseSolved(props.moduleId, props.submoduleId, currentExercise.value.id);
});

const resultTitle = computed(() => {
  if (status.value === "running") {
    return ui.value.lab.runningTitle;
  }

  if (!result.value && currentExerciseCompleted.value) {
    return ui.value.lab.completedTitle;
  }

  if (!result.value) {
    return ui.value.lab.notRunYet;
  }

  if (isSolved.value) {
    return ui.value.lab.solvedTitle;
  }

  if (result.value.ok) {
    return ui.value.lab.outputMismatch;
  }

  if (result.value.stage === "compile") {
    return ui.value.lab.compileError;
  }

  return ui.value.lab.runError;
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

watch(isSolved, (nextSolved) => {
  if (!nextSolved || !currentExercise.value) {
    return;
  }

  markExerciseSolved(props.moduleId, props.submoduleId, currentExercise.value.id);
});

function exerciseCompleted(exerciseId: string) {
  return isExerciseSolved(props.moduleId, props.submoduleId, exerciseId);
}

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
        : ui.value.lab.localRunnerFailed;

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
        :class="{ active: selectedId === exercise.id, solved: exerciseCompleted(exercise.id) }"
        @click="selectedId = exercise.id"
      >
        <span>{{ exercise.title }}</span>
        <small>{{ exercise.difficulty }}</small>
        <small v-if="exerciseCompleted(exercise.id)" class="tab-status">
          {{ ui.lab.alreadyDone }}
        </small>
      </button>
    </div>

    <div class="lab-grid" v-if="currentExercise">
      <section class="lesson-card lab-info">
        <p class="eyebrow">{{ ui.lab.labEyebrow }}</p>
        <h3>{{ currentExercise.title }}</h3>
        <p class="lab-goal">{{ currentExercise.goal }}</p>

        <div class="pill-row">
          <span class="meta-pill">{{ currentExercise.difficulty }}</span>
          <span class="meta-pill">{{ ui.lab.expected }}: {{ currentExercise.expectedOutput }}</span>
          <span
            :class="currentExerciseCompleted ? 'success-pill' : 'meta-pill'"
            data-testid="exercise-progress-status"
          >
            {{ currentExerciseCompleted ? ui.lab.statusDone : ui.lab.statusTodo }}
          </span>
          <span class="meta-pill">
            {{ solvedExerciseCount }} / {{ exercises.length }} {{ ui.lab.exercisesDoneSuffix }}
          </span>
        </div>

        <div class="lab-focus">
          <h4>{{ ui.lab.focusTitle }}</h4>
          <ul class="bullet-list">
            <li v-for="item in currentExercise.focus" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="lab-focus">
          <h4>{{ ui.lab.hintsTitle }}</h4>
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
            {{ ui.lab.revealHint }}
          </button>
        </div>

        <p class="lab-note">
          {{ ui.lab.runnerNote }}
        </p>
        <p v-if="currentExerciseCompleted && !result" class="lab-note progress-note">
          {{ ui.lab.savedProgress }}
        </p>
      </section>

      <section class="editor-panel">
        <div class="editor-toolbar">
          <strong>{{ ui.lab.playgroundTitle }}</strong>
          <div class="toolbar-actions">
            <button type="button" class="ghost-button" @click="resetCode">
              {{ ui.lab.resetCode }}
            </button>
            <button
              type="button"
              class="primary-button"
              data-testid="run-code"
              :disabled="status === 'running'"
              @click="runCode"
            >
              {{ status === "running" ? ui.lab.runningCode : ui.lab.runCode }}
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
            <span v-if="currentExerciseCompleted" class="success-pill">{{ ui.lab.matchesOutput }}</span>
          </div>

          <pre class="terminal-output" data-testid="terminal-output">{{ result?.stderr || result?.stdout || ui.lab.terminalPlaceholder }}</pre>

          <div v-if="result?.ok && result.stdout" class="stdout-panel">
            <h4>{{ ui.lab.stdout }}</h4>
            <pre>{{ result.stdout }}</pre>
          </div>

          <div v-if="currentExerciseCompleted && currentExercise" class="success-panel">
            <h4>{{ ui.lab.whyItWorks }}</h4>
            <p>{{ currentExercise.explanation }}</p>
          </div>
        </div>
      </section>
    </div>

    <p v-else class="section-copy">
      {{ ui.lab.noExerciseYet }}
    </p>
  </div>
</template>
