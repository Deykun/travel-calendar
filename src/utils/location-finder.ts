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

export type LocationFinder = {
  getCountries: (latitude: number, longitude: number) => string[];
};

let finderPromise: Promise<LocationFinder> | undefined;

// coordinate_to_country bundles ~48MB of geojson borders - loaded on first call only, shared by all callers
export const getLocationFinder = (): Promise<LocationFinder> => {
  finderPromise ??= import('coordinate_to_country').then(({ default: lookup }) => {
    const cache: {
      [key: CacheKey]: string[] | undefined;
    } = {};

    return {
      getCountries: (latitude, longitude) => {
        const key = getCacheKey(latitude, longitude);

        cache[key] ??= lookup(latitude, longitude, true);

        return cache[key];
      },
    };
  });

  return finderPromise;
};
