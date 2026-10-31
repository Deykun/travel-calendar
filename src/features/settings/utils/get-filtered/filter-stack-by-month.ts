import { getDaysInMonth } from '@/features/calendar/utils/get-days';
import type { FiltersStoreState, SummaryDay } from '@/features/filters/stores/useFilterStore';
import { mergeUnique, mergeUniqueAndSort } from '@/utils/array';

import { getMonthWithoutDay } from '../../../../utils/date';
import type { StackByMonth } from './types';

type FilterStackByMonthParams = {
  activeFilters: FiltersStoreState['activeFilters'];
};

export const filterStackByMonth = (
  stack: StackByMonth,
  summaryDay: SummaryDay,
  { activeFilters }: FilterStackByMonthParams,
): StackByMonth => {
  const { homeCountriesCodes } = activeFilters;

  stack.summary.totalDays += summaryDay.totalDays;
  stack.summary.totalDaysAbroad += summaryDay.totalDaysAbroad;

  const monthNumber = getMonthWithoutDay(summaryDay.dayKey);

  if (!stack.summaryByMonth[monthNumber]) {
    stack.summaryByMonth[monthNumber] = {
      monthNumber,
      countriesCodes: [],
      countriesCodesByYear: {},
      activeDays: [],
      total: getDaysInMonth(monthNumber),
    };
  }

  if (
    summaryDay.countriesCodes.filter((country) => homeCountriesCodes.includes(country) === false).length >
    stack.summary.maxCountriesInDay
  ) {
    stack.summary.maxCountriesInDay = summaryDay.countriesCodes.filter(
      (country) => homeCountriesCodes.includes(country) === false,
    ).length;
  }

  if (summaryDay.yearsAbroad.length > stack.summary.maxYearsAbroadInDay) {
    stack.summary.maxYearsAbroadInDay = summaryDay.yearsAbroad.length;
  }

  stack.summaryByMonth[monthNumber].countriesCodes = mergeUnique(
    stack.summaryByMonth[monthNumber].countriesCodes,
    summaryDay.countriesCodes,
  );

  Object.entries(summaryDay.countriesCodesByYear).forEach(([rawYear, countryCodes]) => {
    const year = Number(rawYear);

    if (stack.summaryByMonth[monthNumber]) {
      stack.summaryByMonth[monthNumber].countriesCodesByYear[year] = mergeUniqueAndSort(
        stack.summaryByMonth[monthNumber].countriesCodesByYear[year],
        countryCodes,
      );
    }
  });

  const activeCountriesCodes = summaryDay.countriesCodes.filter(
    (country) => homeCountriesCodes.includes(country) === false,
  );
  const isAbroad = activeCountriesCodes.length > 0;

  if (isAbroad) {
    stack.summaryByMonth[monthNumber].activeDays = mergeUniqueAndSort(stack.summaryByMonth[monthNumber].activeDays, [
      summaryDay.dayKey,
    ]);
    stack.summary.activeDays = mergeUniqueAndSort(stack.summary.activeDays, [summaryDay.dayKey]);
    stack.summary.countriesCodes = mergeUnique(stack.summary.countriesCodes, activeCountriesCodes);
    stack.summary.countriesUnlocked = mergeUnique(stack.summary.countriesUnlocked, summaryDay.countriesUnlockedThisDay);

    if (summaryDay.countriesUnlockedThisDay.length > stack.summary.maxCountriesUnlockedInDay) {
      stack.summary.maxCountriesUnlockedInDay = summaryDay.countriesUnlockedThisDay.length;
    }

    Object.entries(summaryDay.countriesCodesByYear).forEach(([year, countriesCodes]) => {
      if (!stack.summary.countriesCodesByYear[year]) {
        stack.summary.countriesCodesByYear[year] = [];
      }

      stack.summary.countriesCodesByYear[year] = mergeUnique(stack.summary.countriesCodesByYear[year], countriesCodes);
    });
  }

  return stack;
};
