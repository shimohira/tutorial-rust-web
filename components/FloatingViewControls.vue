<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  type TutorialLocale,
  type TutorialTheme,
  useTutorialPreferences,
} from "~/composables/useTutorialPreferences";
import { useTutorialUi } from "~/composables/useTutorialUi";

const { locale, setLocale, setTheme, theme } = useTutorialPreferences();
const ui = useTutorialUi();
const isOpen = ref(false);
const isReady = ref(false);

const localeOptions = computed<
  Array<{
    value: TutorialLocale;
    label: string;
    hint: string;
  }>
>(() => [
  {
    value: "id",
    label: ui.value.app.localeId,
    hint: ui.value.app.localeIdHint,
  },
  {
    value: "en",
    label: ui.value.app.localeEn,
    hint: ui.value.app.localeEnHint,
  },
]);

const themeOptions = computed<
  Array<{
    value: TutorialTheme;
    label: string;
    hint: string;
  }>
>(() => [
  {
    value: "light",
    label: ui.value.app.themeLight,
    hint: ui.value.app.themeLightHint,
  },
  {
    value: "dark",
    label: ui.value.app.themeDark,
    hint: ui.value.app.themeDarkHint,
  },
  {
    value: "reading",
    label: ui.value.app.themeReading,
    hint: ui.value.app.themeReadingHint,
  },
]);

const currentTheme = computed(() => {
  return themeOptions.value.find((option) => option.value === theme.value) ?? themeOptions.value[0];
});

const currentLocale = computed(() => {
  return localeOptions.value.find((option) => option.value === locale.value) ?? localeOptions.value[0];
});

const triggerSummary = computed(() => {
  return `${currentLocale.value.label} · ${currentTheme.value.label}`;
});

function togglePanel() {
  isOpen.value = !isOpen.value;
}

function chooseLocale(nextLocale: TutorialLocale) {
  setLocale(nextLocale);
}

function chooseTheme(nextTheme: TutorialTheme) {
  setTheme(nextTheme);
}

onMounted(() => {
  isReady.value = true;
});
</script>

<template>
  <div class="view-controls" data-testid="view-controls" :data-ready="isReady">
    <button
      type="button"
      class="view-controls-trigger"
      :aria-expanded="isOpen"
      :aria-label="ui.app.controlsOpenAria"
      data-testid="view-controls-toggle"
      @click="togglePanel"
    >
      <span class="view-controls-trigger-kicker">{{ ui.app.openControls }}</span>
      <strong>{{ triggerSummary }}</strong>
    </button>

    <transition name="view-controls-panel">
      <section v-if="isOpen" class="view-controls-panel" :aria-label="ui.app.controlsTitle">
        <p class="view-controls-head">
          <span>{{ ui.app.controlsTitle }}</span>
          <strong>{{ ui.app.controlsBody }}</strong>
        </p>

        <div class="view-controls-groups">
          <section class="view-controls-group" data-testid="view-controls-language">
            <div class="view-controls-group-head">
              <span>{{ ui.app.languageLabel }}</span>
            </div>

            <div class="view-controls-options">
              <button
                v-for="option in localeOptions"
                :key="option.value"
                type="button"
                class="view-controls-option"
                :class="{ active: locale === option.value }"
                :aria-pressed="locale === option.value"
                :data-testid="`locale-option-${option.value}`"
                @click="chooseLocale(option.value)"
              >
                <strong>{{ option.label }}</strong>
                <span>{{ option.hint }}</span>
              </button>
            </div>
          </section>

          <section class="view-controls-group" data-testid="view-controls-theme">
            <div class="view-controls-group-head">
              <span>{{ ui.app.themeLabel }}</span>
            </div>

            <div class="view-controls-options">
              <button
                v-for="option in themeOptions"
                :key="option.value"
                type="button"
                class="view-controls-option"
                :class="{ active: theme === option.value }"
                :aria-pressed="theme === option.value"
                :data-testid="`theme-option-${option.value}`"
                @click="chooseTheme(option.value)"
              >
                <strong>{{ option.label }}</strong>
                <span>{{ option.hint }}</span>
              </button>
            </div>
          </section>
        </div>
      </section>
    </transition>
  </div>
</template>
