import { onMounted } from "vue";
import type { LessonSection, LessonSubmodule } from "~/data/tutorial";

type ModuleProgressStore = Record<string, string[]>;
type TutorialProgressStore = Record<string, ModuleProgressStore>;

interface SubmoduleProgressSnapshot {
  solvedExercises: number;
  totalExercises: number;
  isCompleted: boolean;
  completionRatio: number;
}

interface ModuleProgressSnapshot {
  completedSubmodules: number;
  totalSubmodules: number;
  solvedExercises: number;
  totalExercises: number;
  completionRatio: number;
}

const STORAGE_KEY = "rust-study-progress";

function readProgressFromStorage(): TutorialProgressStore {
  if (!import.meta.client) {
    return {};
  }

  const rawProgress = localStorage.getItem(STORAGE_KEY);

  if (!rawProgress) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawProgress);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const nextProgress: TutorialProgressStore = {};

    for (const [moduleId, submodules] of Object.entries(parsed as Record<string, unknown>)) {
      if (!submodules || typeof submodules !== "object" || Array.isArray(submodules)) {
        continue;
      }

      const moduleProgress: ModuleProgressStore = {};

      for (const [submoduleId, solvedExerciseIds] of Object.entries(
        submodules as Record<string, unknown>,
      )) {
        if (!Array.isArray(solvedExerciseIds)) {
          continue;
        }

        const sanitizedIds = solvedExerciseIds.filter(
          (exerciseId): exerciseId is string => typeof exerciseId === "string",
        );

        moduleProgress[submoduleId] = Array.from(new Set(sanitizedIds));
      }

      nextProgress[moduleId] = moduleProgress;
    }

    return nextProgress;
  } catch {
    return {};
  }
}

function persistProgress(progress: TutorialProgressStore) {
  if (!import.meta.client) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useTutorialProgress() {
  const progress = useState<TutorialProgressStore>("tutorial-progress", () => ({}));
  const hydrated = useState<boolean>("tutorial-progress-hydrated", () => false);

  onMounted(() => {
    if (hydrated.value) {
      return;
    }

    progress.value = readProgressFromStorage();
    hydrated.value = true;
  });

  function getSolvedExerciseIds(moduleId: string, submoduleId: string) {
    return progress.value[moduleId]?.[submoduleId] ?? [];
  }

  function isExerciseSolved(moduleId: string, submoduleId: string, exerciseId: string) {
    return getSolvedExerciseIds(moduleId, submoduleId).includes(exerciseId);
  }

  function markExerciseSolved(moduleId: string, submoduleId: string, exerciseId: string) {
    const solvedExerciseIds = new Set(getSolvedExerciseIds(moduleId, submoduleId));

    if (solvedExerciseIds.has(exerciseId)) {
      return;
    }

    solvedExerciseIds.add(exerciseId);

    progress.value = {
      ...progress.value,
      [moduleId]: {
        ...(progress.value[moduleId] ?? {}),
        [submoduleId]: Array.from(solvedExerciseIds),
      },
    };

    persistProgress(progress.value);
  }

  function clearModuleProgress(moduleId: string) {
    if (!progress.value[moduleId]) {
      return;
    }

    const nextProgress = { ...progress.value };
    delete nextProgress[moduleId];

    progress.value = nextProgress;
    persistProgress(progress.value);
  }

  function getSubmoduleProgress(
    moduleId: string,
    submodule: LessonSubmodule,
  ): SubmoduleProgressSnapshot {
    const solvedExerciseIds = new Set(getSolvedExerciseIds(moduleId, submodule.id));
    const solvedExercises = submodule.exercises.filter((exercise) => {
      return solvedExerciseIds.has(exercise.id);
    }).length;
    const totalExercises = submodule.exercises.length;

    return {
      solvedExercises,
      totalExercises,
      isCompleted: totalExercises > 0 && solvedExercises === totalExercises,
      completionRatio: totalExercises === 0 ? 0 : solvedExercises / totalExercises,
    };
  }

  function getModuleProgress(
    moduleId: string,
    submodules: LessonSubmodule[],
  ): ModuleProgressSnapshot {
    const submoduleSnapshots = submodules.map((submodule) => {
      return getSubmoduleProgress(moduleId, submodule);
    });
    const solvedExercises = submoduleSnapshots.reduce((total, snapshot) => {
      return total + snapshot.solvedExercises;
    }, 0);
    const totalExercises = submoduleSnapshots.reduce((total, snapshot) => {
      return total + snapshot.totalExercises;
    }, 0);
    const completedSubmodules = submoduleSnapshots.filter((snapshot) => {
      return snapshot.isCompleted;
    }).length;
    const totalSubmodules = submodules.length;

    return {
      completedSubmodules,
      totalSubmodules,
      solvedExercises,
      totalExercises,
      completionRatio: totalExercises === 0 ? 0 : solvedExercises / totalExercises,
    };
  }

  function getOverallProgress(sections: LessonSection[]) {
    return sections.reduce(
      (summary, section) => {
        const snapshot = getModuleProgress(section.id, section.submodules);

        summary.completedSubmodules += snapshot.completedSubmodules;
        summary.totalSubmodules += snapshot.totalSubmodules;
        summary.solvedExercises += snapshot.solvedExercises;
        summary.totalExercises += snapshot.totalExercises;

        return summary;
      },
      {
        completedSubmodules: 0,
        totalSubmodules: 0,
        solvedExercises: 0,
        totalExercises: 0,
      },
    );
  }

  return {
    hydrated,
    progress,
    clearModuleProgress,
    getModuleProgress,
    getOverallProgress,
    getSolvedExerciseIds,
    getSubmoduleProgress,
    isExerciseSolved,
    markExerciseSolved,
  };
}
