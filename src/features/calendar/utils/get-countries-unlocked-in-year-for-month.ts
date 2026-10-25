import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import type { DataStoreState } from '@/features/settings/stores/useDateStore';

import type { MonthNumber } from '../types';

type DaysByCountryByMonthByYear = DataStoreState['daysByCountryByMonthByYear'];

type Params = {
  year: number;
  monthNumber: MonthNumber;
  flags: FlagData[];
  daysByCountryByMonthByYear: DaysByCountryByMonthByYear;
};

/*
  Any day for `countryCode` in the same `monthNumber` of an earlier year.
  Other months are ignored on purpose: a country first seen in December counts again
  when it first shows up in January.
  Uses raw store data because `flags` may be limited by active filters (e.g. single year).
*/
const wasVisitedInMonthBefore = (
  countryCode: string,
  year: number,
  monthNumber: MonthNumber,
  daysByCountryByMonthByYear: DaysByCountryByMonthByYear,
): boolean =>
  Object.entries(daysByCountryByMonthByYear).some(
    ([yearKey, months]) => Number(yearKey) < year && (months[monthNumber]?.[countryCode]?.length ?? 0) > 0,
  );

/*
  Countries with a flag covering `year` (from <= year <= to) that never appeared
  in `monthNumber` of any earlier year according to `daysByCountryByMonthByYear`.
*/
export const getCountriesUnlockedInYearForMonth = ({
  year,
  monthNumber,
  flags,
  daysByCountryByMonthByYear,
}: Params): string[] => {
  const visitedInYear = flags.filter(({ from, to }) => from <= year && year <= to).map(({ countryCode }) => countryCode);

  return [...new Set(visitedInYear)].filter(
    (countryCode) => !wasVisitedInMonthBefore(countryCode, year, monthNumber, daysByCountryByMonthByYear),
  );
};
