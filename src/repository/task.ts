import { mapToList } from "./base";

export const tasks = new Map<number, string>([
  [1, "Setup virtual office"],
  [2, "Set mission and Vision"],
  [3, "Select business name"],
  [4, "Buy Domain"],
  [5, "Create Domain"],
  [7, "Operations research and Analysis"],
  [8, "Release Marketing Website"],
  [9, "Release MVP"],
  [10, "Press Release"],
  [11, "Plan Advertisement Campaigns"],
]);

export const getAllTasks = () => {
  return mapToList(tasks);
};

export const addToTask = (task: string) => {
  const length = tasks.size;

  tasks.set(length + 1, task);
  return mapToList(tasks);
};
