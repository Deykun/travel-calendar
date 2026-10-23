import type { FiltersStoreState, SummaryYear } from '@/features/filters/stores/useFilterStore';
import type { DateMMDD } from '@/types';
import { mergeUniqueAndSort } from '@/utils/array';

import type { StackByDay } from './types';

type FilterByYearParams = Pick<StackByDay, 'yearOfUnlockingByCountry' | 'yearOfUnlockingByDateMMDD'>;

type SummaryByYear = FiltersStoreState['filtered']['summaryByYear'];

const getOrCreateSummaryYear = (summaryByYear: SummaryByYear, year: number): SummaryYear => {
  const existing = summaryByYear[year];

  if (existing) {
    return existing;
  }

  const created: SummaryYear = {
    countriesUnlocked: [],
    daysUnlocked: [],
  };

  summaryByYear[year] = created;

  return created;
};

export const filterByYear = ({
  yearOfUnlockingByCountry,
  yearOfUnlockingByDateMMDD,
}: FilterByYearParams): SummaryByYear => {
  const summaryByYear: SummaryByYear = {};

  Object.entries(yearOfUnlockingByCountry).forEach(([countryCode, year]) => {
    const summaryYear = getOrCreateSummaryYear(summaryByYear, year);

    summaryYear.countriesUnlocked = mergeUniqueAndSort(summaryYear.countriesUnlocked, [countryCode]);
  });

  Object.entries(yearOfUnlockingByDateMMDD).forEach(([dateMMDD, year]) => {
    const summaryYear = getOrCreateSummaryYear(summaryByYear, year);

    summaryYear.daysUnlocked = mergeUniqueAndSort(summaryYear.daysUnlocked, [dateMMDD as DateMMDD]);
  });

  return summaryByYear;
};
