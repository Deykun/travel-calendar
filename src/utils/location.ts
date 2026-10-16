import lookup from 'coordinate_to_country';

type CacheKey = `${number}|${number}`;

const roundToPrecision = (value: number, precision: number): number => {
  const factor = 10 ** precision;

  return Math.round(value * factor) / factor;
};

// Precisions
// 3 -> ~111m, 4 -> ~11m, 5 -> ~1.1m,
const getCacheKey = (latitude: number, longitude: number): CacheKey => {
  return `${roundToPrecision(latitude, 3)}|${roundToPrecision(longitude, 3)}`;
};

export const createLocationFinder = () => {
  const cache: {
    [key: CacheKey]: string[] | undefined;
  } = {};

  return {
    getCountries: (latitude: number, longitude: number): string[] => {
      const key = getCacheKey(latitude, longitude);

      if (cache[key]) {
        return cache[key];
      }

      cache[key] = (lookup(latitude, longitude, true) || []) as string[];

      return cache[key];
    },
  };
};
