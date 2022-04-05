export const mapToList = <K, V>(map: Map<K, V>) => {
  return Array.from(map).map((entry) => ({
    id: entry[0],
    name: entry[1],
  }));
};
