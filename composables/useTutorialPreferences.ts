import { onMounted, watch } from "vue";

export type TutorialLocale = "id" | "en";
export type TutorialTheme = "light" | "dark" | "reading";

interface TutorialPreferencesStore {
  locale: TutorialLocale;
  theme: TutorialTheme;
}

const STORAGE_KEY = "rust-study-preferences";
let hasAttachedPreferenceWatcher = false;

function sanitizeLocale(value: unknown): TutorialLocale {
  return value === "en" ? "en" : "id";
}

function sanitizeTheme(value: unknown): TutorialTheme {
  return value === "dark" || value === "reading" ? value : "light";
}

function readPreferencesFromStorage(): TutorialPreferencesStore {
  if (!import.meta.client) {
    return {
      locale: "id",
      theme: "light",
    };
  }

  const rawPreferences = localStorage.getItem(STORAGE_KEY);

  if (!rawPreferences) {
    return {
      locale: "id",
      theme: "light",
    };
  }

  try {
    const parsed = JSON.parse(rawPreferences);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {
        locale: "id",
        theme: "light",
      };
    }

    return {
      locale: sanitizeLocale((parsed as Record<string, unknown>).locale),
      theme: sanitizeTheme((parsed as Record<string, unknown>).theme),
    };
  } catch {
    return {
      locale: "id",
      theme: "light",
    };
  }
}

function persistPreferences(preferences: TutorialPreferencesStore) {
  if (!import.meta.client) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

function applyDocumentPreferences(locale: TutorialLocale, theme: TutorialTheme) {
  if (!import.meta.client) {
    return;
  }

  document.documentElement.lang = locale;
  document.documentElement.dataset.theme = theme;
}

export function useTutorialPreferences() {
  const locale = useState<TutorialLocale>("tutorial-locale", () => "id");
  const theme = useState<TutorialTheme>("tutorial-theme", () => "light");
  const hydrated = useState<boolean>("tutorial-preferences-hydrated", () => false);

  onMounted(() => {
    if (!hydrated.value) {
      const storedPreferences = readPreferencesFromStorage();
      locale.value = storedPreferences.locale;
      theme.value = storedPreferences.theme;
      hydrated.value = true;
    }

    applyDocumentPreferences(locale.value, theme.value);
  });

  if (import.meta.client && !hasAttachedPreferenceWatcher) {
    hasAttachedPreferenceWatcher = true;
    watch(
      [locale, theme],
      ([nextLocale, nextTheme]) => {
        if (!hydrated.value) {
          return;
        }

        persistPreferences({
          locale: nextLocale,
          theme: nextTheme,
        });
        applyDocumentPreferences(nextLocale, nextTheme);
      },
      {
        deep: false,
      },
    );
  }

  function setLocale(nextLocale: TutorialLocale) {
    locale.value = nextLocale;
  }

  function setTheme(nextTheme: TutorialTheme) {
    theme.value = nextTheme;
  }

  return {
    hydrated,
    locale,
    setLocale,
    setTheme,
    theme,
  };
}
