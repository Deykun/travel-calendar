export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

export const mergeStringsWithUnique = (
  stringsA: string[] | undefined,
  stringsB: string[] | undefined,
) => {
  return Array.from(new Set([...(stringsA || []), ...(stringsB || [])]));
};

export const mergeUniqueAndSort = (
  stringsA: string[] | undefined,
  stringsB: string[] | undefined,
) => {
  return mergeStringsWithUnique(stringsA, stringsB).sort((a, b) =>
    a.localeCompare(b),
  );
};
