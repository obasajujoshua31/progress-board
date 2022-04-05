import { mapToList } from "./base";

export const phases = new Map<number, string>([
  [1, "FOUNDATION"],
  [2, "DISCOVERY"],
  [3, "DELIVERY"],
]);

export const getAllPhasesResolver = () => {
  return mapToList(phases);
};

export const addPhasesResolver = (phase: string) => {
  let length = phases.size;
  phases.set(length + 1, phase);
  return mapToList(phases);
};
