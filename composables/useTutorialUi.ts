import { computed } from "vue";
import { uiMessages } from "~/data/ui";
import { useTutorialPreferences } from "~/composables/useTutorialPreferences";

export function useTutorialUi() {
  const { locale } = useTutorialPreferences();

  return computed(() => {
    return uiMessages[locale.value];
  });
}
