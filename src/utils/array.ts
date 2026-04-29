export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

export function mergeUnique<T>(
  arrayA: T[] | undefined,
  arrayB: T[] | undefined,
): T[] {
  return Array.from(new Set([...(arrayA || []), ...(arrayB || [])]));
}

export const mergeUniqueAndSort = (
  stringsA: string[] | undefined,
  stringsB: string[] | undefined,
) => {
  return mergeUnique(stringsA, stringsB).sort((a, b) => a.localeCompare(b));
};
