import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';

/*
  Countries with a flag covering `year` (from <= year <= to) that have no earlier flag,
  i.e. the first visit happened in that year.
*/
export const getCountriesUnlockedInYear = (year: number, flags: FlagData[]): string[] => {
  const visitedBefore = new Set(flags.filter(({ from }) => from < year).map(({ countryCode }) => countryCode));

  const visitedInYear = flags.filter(({ from, to }) => from <= year && year <= to).map(({ countryCode }) => countryCode);

  return [...new Set(visitedInYear)].filter((countryCode) => !visitedBefore.has(countryCode));
};
