import { Phase, TaskWithIsCompleted } from "../model";
import { phases } from "./phase";
import { tasks } from "./task";

let progress = new Map<string, Phase[]>();

export const initializeProgress = (orgId: string) => {
  if (progress.has(orgId)) return false;

  progress.set(orgId, []);
  return true;
};

export const addPhaseToProgress = (orgId: string, phasesIds: number[]) => {
  if (!progress.has(orgId)) progress.set(orgId, []);

  const orgPhases = progress.get(orgId);

  if (typeof orgPhases != "undefined") {
    phasesIds.forEach((id) => {
      const phase = phases.get(id);
      if (phase) {
        const addedPhase = orgPhases.find((phase) => phase.phase.id === id);
        if (!addedPhase)
          orgPhases.push({
            phase: { id, name: phase, isCompleted: false },
            tasks: [],
          });
      }
    });
  }

  return orgPhases?.length ? orgPhases : [];
};

export const addTaskToPhase = (
  orgId: string,
  phaseId: number,
  taskIds: number[]
) => {
  if (!progress.has(orgId)) progress.set(orgId, []);

  const orgPhases = progress.get(orgId);

  let phase = orgPhases?.find((ph) => ph.phase.id === phaseId);

  if (!phase) {
    let foundPhase = phases.get(phaseId);

    if (!foundPhase) throw new Error("Unable to add incorrect phase");

    phase = {
      phase: {
        id: phaseId,
        isCompleted: false,
        name: foundPhase,
      },
      tasks: [],
    };
    orgPhases?.push(phase);
  }

  const newTasks = taskIds.reduce<TaskWithIsCompleted[]>((acc, id) => {
    const task = tasks.get(id);

    if (task) {
      const phaseTask = phase?.tasks.find((tsk) => tsk.id === id);

      if (!phaseTask)
        acc.push({
          id,
          name: task,
          isCompleted: false,
        });
    }

    return acc;
  }, []);

  phase.tasks.push(...newTasks);
  return orgPhases;
};

export const completeTask = (
  orgId: string,
  phaseId: number,
  taskId: number
) => {
  const orgPhases = progress.get(orgId);

  if (typeof orgPhases == "undefined") return false;

  const phaseIndex = orgPhases.findIndex((phase) => phase.phase.id === phaseId);

  if (phaseIndex < 0) return false;

  const phase = orgPhases[phaseIndex];

  if (phaseIndex === 0) {
    if (!completeSpecificTaskSucceeds(phase, taskId)) return false;

    if (phaseIsCompleted(phase)) phase.phase.isCompleted = true;

    return true;
  }

  const otherPhases = orgPhases.slice(0, phaseIndex);

  const otherPhasesCompleted = otherPhases.every(
    (phase) => phase.phase.isCompleted
  );

  if (!otherPhasesCompleted) return false;

  if (!completeSpecificTaskSucceeds(phase, taskId)) return false;

  if (phaseIsCompleted(phase)) phase.phase.isCompleted = true;

  return true;
};

export const getProgress = (orgId: string) => {
  const orgProgress = progress.get(orgId);
  return orgProgress ? orgProgress : [];
};

const phaseIsCompleted = (phase: Phase): boolean => {
  return phase.tasks.every((tsk) => tsk.isCompleted);
};

const completeSpecificTaskSucceeds = (phase: Phase, taskId: number) => {
  const task = phase.tasks.find((tsk) => tsk.id === taskId);

  if (!task) return false;

  task.isCompleted = true

  return true;
};
