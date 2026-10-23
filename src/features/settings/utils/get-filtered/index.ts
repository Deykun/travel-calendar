import { getDaysInMonth } from '@/features/calendar/utils/get-days';
import useFiltersStore, {
  type FiltersStoreState,
  GAP_BY_STREAK_KIND,
  getEmptyStreak,
} from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';
import { filterEmpty, mergeUniqueAndSort } from '@/utils/array';

import { getDateRange, getMonthWithoutDay } from '../../../../utils/date';
import type { DataStoreState } from '../../stores/useDateStore';
import { getKindStreaks } from '../get-kind-streaks';
import { toStreaksByType } from './core/streaks';
import { filterStackByDay } from './filter-stack-by-day';
import type { StackByDay } from './types';

export const getFiltered = (dataByDay: DataStoreState['dataByDay']): FiltersStoreState['filtered'] => {
  console.info('Filtering...');
  const { activeFilters } = useFiltersStore.getState();
  const { homeCountriesCodes } = activeFilters;

  const dataByDateSorted = Object.keys(dataByDay).sort() as DateYYYYMMDD[];
  const sortedFrom = dataByDateSorted.at(0);
  const sortedTo = dataByDateSorted.at(-1);
  const fullDateRange = sortedFrom && sortedTo ? getDateRange(sortedFrom, sortedTo) : dataByDateSorted;

  const { summaryByDay, streaks, current } = fullDateRange.reduce(
    (stack: StackByDay, dateYYYYMMDD) => filterStackByDay(stack, dateYYYYMMDD, { dataByDay, activeFilters }),
    {
      summaryByDay: {},
      streaks: [],
      current: {
        streak: getEmptyStreak('maxDays'),
      },
      indexInSortingByUnlocking: 0,
      yearOfUnlockingByCountry: {},
      yearOfUnlockingByDateMMDD: {},
    },
  );

  // Closes streak when it's live at the end of the range
  if (current.streak.count > 0) {
    streaks.push(current.streak);
  }

  const regularStreaksMaxDays = streaks.sort((a, b) => b.count - a.count);
  const kindStreaksMaxDays = getKindStreaks(regularStreaksMaxDays, GAP_BY_STREAK_KIND.kind);
  const veryKindStreaksMaxDays = getKindStreaks(regularStreaksMaxDays, GAP_BY_STREAK_KIND.veryKind);

  const { summaryByMonth, summary } = Object.values(summaryByDay)
    .filter(filterEmpty)
    .reduce(
      (stack: Pick<FiltersStoreState['filtered'], 'summaryByMonth' | 'summary'>, summaryDay) => {
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

        stack.summaryByMonth[monthNumber].countriesCodes = mergeUniqueAndSort(
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
          stack.summaryByMonth[monthNumber].activeDays = mergeUniqueAndSort(
            stack.summaryByMonth[monthNumber].activeDays,
            [summaryDay.dayKey],
          );
          stack.summary.activeDays = mergeUniqueAndSort(stack.summary.activeDays, [summaryDay.dayKey]);
          stack.summary.countriesCodes = mergeUniqueAndSort(stack.summary.countriesCodes, activeCountriesCodes);
          stack.summary.countriesUnlocked = mergeUniqueAndSort(
            stack.summary.countriesUnlocked,
            summaryDay.countriesUnlockedThisDay,
          );

          if (summaryDay.countriesUnlockedThisDay.length > stack.summary.maxCountriesUnlockedInDay) {
            stack.summary.maxCountriesUnlockedInDay = summaryDay.countriesUnlockedThisDay.length;
          }

          Object.entries(summaryDay.countriesCodesByYear).forEach(([year, countriesCodes]) => {
            if (!stack.summary.countriesCodesByYear[year]) {
              stack.summary.countriesCodesByYear[year] = [];
            }

            stack.summary.countriesCodesByYear[year] = mergeUniqueAndSort(
              stack.summary.countriesCodesByYear[year],
              countriesCodes,
            );
          });
        }

        return stack;
      },
      {
        summaryByMonth: {},
        summary: {
          totalDays: 0,
          totalDaysAbroad: 0,
          maxCountriesInDay: 0,
          maxCountriesUnlockedInDay: 0,
          maxYearsAbroadInDay: 0,
          activeDays: [],
          countriesCodes: [],
          countriesCodesByYear: {},
          countriesUnlocked: [],
        },
      },
    );

  return {
    summaryByDay,
    summaryByMonth,
    summary,
    streaks: {
      regular: toStreaksByType(regularStreaksMaxDays),
      kind: toStreaksByType(kindStreaksMaxDays),
      veryKind: toStreaksByType(veryKindStreaksMaxDays),
    },
  };
};
