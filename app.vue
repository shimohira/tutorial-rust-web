<script setup lang="ts">
import { useTutorialPreferences } from "~/composables/useTutorialPreferences";

const { locale, theme } = useTutorialPreferences();

const bootstrapPreferencesScript = `(() => {
  const DEFAULT_LOCALE = "id";
  const DEFAULT_THEME = "light";

  try {
    const raw = localStorage.getItem("rust-study-preferences");

    if (!raw) {
      document.documentElement.lang = DEFAULT_LOCALE;
      document.documentElement.dataset.theme = DEFAULT_THEME;
      return;
    }

    const parsed = JSON.parse(raw);
    const locale = parsed && parsed.locale === "en" ? "en" : DEFAULT_LOCALE;
    const theme =
      parsed && (parsed.theme === "dark" || parsed.theme === "reading")
        ? parsed.theme
        : DEFAULT_THEME;

    document.documentElement.lang = locale;
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.lang = DEFAULT_LOCALE;
    document.documentElement.dataset.theme = DEFAULT_THEME;
  }
})();`;

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    "data-theme": theme.value,
  },
  script: [
    {
      children: bootstrapPreferencesScript,
      key: "tutorial-preferences-bootstrap",
      tagPosition: "head",
      type: "text/javascript",
    },
  ],
}));
</script>

<template>
  <FloatingViewControls />
  <NuxtPage />
</template>
