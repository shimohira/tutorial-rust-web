import { computed } from "vue";
import {
  getLessonSectionById as getBaseLessonSectionById,
  getModuleExercisesById as getBaseModuleExercisesById,
  getSubmoduleUsageExamplesById as getBaseSubmoduleUsageExamplesById,
  lessonSections as baseLessonSections,
  moduleIds as baseModuleIds,
  overviewCards as baseOverviewCards,
  roadmapPhases as baseRoadmapPhases,
} from "~/data/tutorial";
import { englishOverviewCards, englishRoadmapPhases, englishSectionTextOverrides } from "~/data/tutorial.en";
import { useTutorialPreferences } from "~/composables/useTutorialPreferences";
import type { LessonSection, LessonSubmodule, RustExercise } from "~/data/tutorial";

function translateDifficultyToEnglish(value: string) {
  if (value === "Pemula") {
    return "Starter";
  }

  if (value === "Menengah") {
    return "Intermediate";
  }

  if (value === "Lanjutan") {
    return "Advanced";
  }

  return value;
}

function localizeExercise(locale: "id" | "en", exercise: RustExercise, override?: Partial<RustExercise>) {
  if (locale === "id") {
    return exercise;
  }

  return {
    ...exercise,
    difficulty: translateDifficultyToEnglish(exercise.difficulty),
    ...override,
  };
}

function localizeSubmodule(
  locale: "id" | "en",
  submodule: LessonSubmodule,
  override?: {
    title?: string;
    summary?: string;
    exercises?: Record<string, Partial<RustExercise>>;
  },
): LessonSubmodule {
  if (locale === "id") {
    return submodule;
  }

  return {
    ...submodule,
    title: override?.title ?? submodule.title,
    summary: override?.summary ?? submodule.summary,
    exercises: submodule.exercises.map((exercise) => {
      return localizeExercise(locale, exercise, override?.exercises?.[exercise.id]);
    }),
  };
}

function localizeSection(locale: "id" | "en", section: LessonSection): LessonSection {
  if (locale === "id") {
    return section;
  }

  const override = englishSectionTextOverrides[section.id];

  return {
    ...section,
    badge: override?.badge ?? section.badge,
    title: override?.title ?? section.title,
    summary: override?.summary ?? section.summary,
    submodules: section.submodules.map((submodule) => {
      return localizeSubmodule(locale, submodule, override?.submodules?.[submodule.id]);
    }),
  };
}

export function useTutorialContent() {
  const { locale } = useTutorialPreferences();

  const lessonSections = computed(() => {
    return baseLessonSections.map((section) => {
      return localizeSection(locale.value, section);
    });
  });

  const moduleIds = computed(() => {
    return locale.value === "en" ? lessonSections.value.map((section) => section.id) : baseModuleIds;
  });

  const overviewCards = computed(() => {
    return locale.value === "en" ? englishOverviewCards : baseOverviewCards;
  });

  const roadmapPhases = computed(() => {
    return locale.value === "en" ? englishRoadmapPhases : baseRoadmapPhases;
  });

  function getLessonSectionById(id: string) {
    if (locale.value === "id") {
      return getBaseLessonSectionById(id);
    }

    return lessonSections.value.find((section) => section.id === id);
  }

  function getModuleExercisesById(id: string) {
    if (locale.value === "id") {
      return getBaseModuleExercisesById(id);
    }

    const section = getLessonSectionById(id);
    return section?.submodules.flatMap((submodule) => submodule.exercises) ?? [];
  }

  function getSubmoduleUsageExamplesById(id: string) {
    return getBaseSubmoduleUsageExamplesById(id);
  }

  return {
    getLessonSectionById,
    getModuleExercisesById,
    getSubmoduleUsageExamplesById,
    lessonSections,
    moduleIds,
    overviewCards,
    roadmapPhases,
  };
}
