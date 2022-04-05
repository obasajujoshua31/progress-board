export type Task = Entry;

type Entry = {
  id: number;
  name: string;
};

export type Phase = {
  phase: Entry & { isCompleted: boolean };
  tasks: TaskWithIsCompleted[];
};

export type TaskWithIsCompleted = Entry & {
  isCompleted: boolean;
};
