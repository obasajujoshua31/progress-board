import { addPhasesResolver, getAllPhasesResolver } from "./repository/phase";
import {
  addPhaseToProgress,
  addTaskToPhase,
  completeTask,
  getProgress,
  initializeProgress,
} from "./repository/progress";
import { addToTask, getAllTasks } from "./repository/task";

const resolver = {
  Query: {
    allPossibleTasks: () => getAllTasks(),
    allPossiblePhases: () => getAllPhasesResolver(),
    getProgress: (_: any, parent: any) => getProgress(parent.orgId),
  },

  Mutation: {
    addPossibleTask: (_: any, parent: any) => addToTask(parent.task),
    addPossiblePhase: (_: any, parent: any) => addPhasesResolver(parent.phase),
    initProgress: (_: any, parent: any) => initializeProgress(parent.orgId),
    addPhaseToProgress: (_: any, parent: any) =>
      addPhaseToProgress(parent.orgId, parent.phasesIds),

    addTaskToPhase: (_: any, parent: any) =>
      addTaskToPhase(parent.orgId, parent.phaseId, parent.taskIds),

    completeTask: (_: any, parent: any) =>
      completeTask(parent.orgId, parent.phaseId, parent.taskId),
  },
};

export default resolver;
