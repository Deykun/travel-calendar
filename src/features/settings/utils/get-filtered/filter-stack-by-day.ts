import { isAfter } from 'date-fns';
import { isBefore } from 'date-fns/isBefore';

import type { FiltersStoreState } from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';
import { mergeUnique } from '@/utils/array';

import { getDateWithoutYear, getIsFuture, stringDateToObject } from '../../../../utils/date';
import type { DataStoreState } from '../../stores/useDateStore';
import { closeCurrentStreak, extendCurrentStreak } from './core/streaks';
import { extendYearSummary } from './core/year-summary';
import type { StackByDay } from './types';

type FilterStackByDayParams = {
  dataByDay: DataStoreState['dataByDay'];
  activeFilters: FiltersStoreState['activeFilters'];
};

export const filterStackByDay = (
  stack: StackByDay,
  dateYYYYMMDD: DateYYYYMMDD,
  { dataByDay, activeFilters }: FilterStackByDayParams,
): StackByDay => {
  const { homeCountriesCodes, from, to, shouldIncludeFuture } = activeFilters;
  const dataDay = dataByDay[dateYYYYMMDD];

  if (!dataDay) {
    // No data should result in ended streak
    stack = closeCurrentStreak(stack);

    return stack;
  }

  const filteredCountriesForDay = dataDay.countriesCodes.filter(
    (country) => homeCountriesCodes.includes(country) === false,
  );

  const dayWithoutYear = getDateWithoutYear(dataDay.date);
  const { year } = stringDateToObject(dataDay.date);
  const isFuture = getIsFuture(dataDay.date);

  if (!isFuture || shouldIncludeFuture) {
    stack = extendYearSummary(stack, dataDay.date, filteredCountriesForDay);
  }

  const isLastDayOfRange = to === dataDay.date;

  const isBeforeRange = from && isBefore(dataDay.date, from);
  if (isBeforeRange) {
    return stack;
  }

  const isAfterRange = to && isAfter(dataDay.date, to);
  if (isAfterRange) {
    return stack;
  }

  if (isFuture && !shouldIncludeFuture) {
    return stack;
  }

  if (!year) {
    return stack;
  }

  const filteredUnlockedForDay = (dataDay.countriesUnlockedThisDay ?? []).filter(
    (country) => homeCountriesCodes.includes(country) === false,
  );

  if (!stack.summaryByDay[dayWithoutYear]) {
    stack.summaryByDay[dayWithoutYear] = {
      dayKey: dayWithoutYear,
      countriesCodes: [],
      countriesUnlockedThisDay: [],
      countriesCodesByYear: {},
      sourceDates: [],
      yearsAbroad: [],
      indexInSortingByUnlocking: undefined,
      totalDays: 0,
      totalDaysAbroad: 0,
      totalUnlockedCountries: 0,
    };
  }

  stack.summaryByDay[dayWithoutYear].totalDays += 1;
  if (filteredCountriesForDay.length > 0) {
    stack.summaryByDay[dayWithoutYear].totalDaysAbroad += 1;
    stack.summaryByDay[dayWithoutYear].yearsAbroad = mergeUnique(stack.summaryByDay[dayWithoutYear].yearsAbroad, [
      String(year),
    ]);

    if (stack.summaryByDay[dayWithoutYear].indexInSortingByUnlocking === undefined) {
      stack.indexInSortingByUnlocking += 1;
      stack.summaryByDay[dayWithoutYear].indexInSortingByUnlocking = stack.indexInSortingByUnlocking;
    }

    if (filteredUnlockedForDay.length) {
      stack.summaryByDay[dayWithoutYear].totalUnlockedCountries += filteredUnlockedForDay.length;
      stack.summaryByDay[dayWithoutYear].countriesUnlockedThisDay = mergeUnique(
        stack.summaryByDay[dayWithoutYear].countriesUnlockedThisDay,
        filteredUnlockedForDay,
      );
    }
  }

  stack.summaryByDay[dayWithoutYear].sourceDates = mergeUnique(stack.summaryByDay[dayWithoutYear].sourceDates, [
    dataDay.date,
  ]);

  stack.summaryByDay[dayWithoutYear].countriesCodes = mergeUnique(
    stack.summaryByDay[dayWithoutYear].countriesCodes,
    filteredCountriesForDay,
  );

  stack.summaryByDay[dayWithoutYear].countriesCodesByYear[year] = mergeUnique(
    stack.summaryByDay[dayWithoutYear].countriesCodesByYear[year],
    filteredCountriesForDay,
  );

  // It can be both if the selected day is when we go abroad or when we return.
  const isAbroad = filteredCountriesForDay.length > 0;

  // We don't break streaks if someone visits the country but the same day they were abroad
  const shouldStopStreak = !isAbroad || isLastDayOfRange;
  const shouldExtendStreak = isAbroad;

  if (shouldExtendStreak) {
    stack = extendCurrentStreak(stack, dateYYYYMMDD, filteredCountriesForDay);
  }

  if (shouldStopStreak) {
    stack = closeCurrentStreak(stack);
  }

  return stack;
};
