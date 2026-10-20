type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T; // from lodash

export function filterEmpty<T>(value: T): value is Truthy<T> {
  return !!value;
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

/** Evenly spread indexes, always incl. first & last, e.g. (101, 5) → [0, 25, 50, 75, 100] */
export function getSpreadIndexes(length: number, count: number): number[] {
  if (length <= 0 || count <= 0) {
    return [];
  }

  if (length === 1 || count === 1) {
    return [0];
  }

  const step = (length - 1) / (count - 1);
  const indexes = Array.from({ length: count }, (_, i) => Math.round(i * step));

  return Array.from(new Set(indexes)); // dedupe when length < count
}

export function mergeUnique<T>(arrayA: T[] | undefined, arrayB: T[] | undefined): T[] {
  return Array.from(new Set([...(arrayA || []), ...(arrayB || [])]));
}

export function mergeUniqueAndSort<T extends string>(stringsA: T[] | undefined, stringsB: T[] | undefined): T[] {
  return mergeUnique(stringsA, stringsB).sort((a, b) => a.localeCompare(b));
}
