import { isAfter } from 'date-fns';
import { isBefore } from 'date-fns/isBefore';

import { getDaysInMonth } from '@/features/calendar/utils/get-days';
import useFiltersStore, {
  type FiltersStoreState,
  NUMBER_OF_STREAKS_TO_TRACK,
  type StreakSummary,
  getEmptyStreak,
  getEmptyStreaks,
} from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';
import { filterEmpty, mergeUnique, mergeUniqueAndSort } from '@/utils/array';

import { getDateWithoutYear, getIsFuture, getMonthWithoutDay, stringDateToObject } from '../../../utils/date';
import type { DataStoreState } from '../stores/useDateStore';

export const getFiltered = (dataByDay: DataStoreState['dataByDay']): FiltersStoreState['filtered'] => {
  const { homeCountriesCodes, from, to } = useFiltersStore.getState().activeFilters;

  const dataByDateSorted = Object.keys(dataByDay).sort() as DateYYYYMMDD[];

  let indexInSortingByUnlocking = 0;

  const { summaryByDay, streaks } = dataByDateSorted.reduce(
    (
      stack: {
        summaryByDay: FiltersStoreState['filtered']['summaryByDay'];
        streaks: FiltersStoreState['filtered']['streaks'];
        current: {
          streak: StreakSummary;
        };
      },
      dateYYYYMMDD,
    ) => {
      const dataDay = dataByDay[dateYYYYMMDD];
      if (!dataDay) {
        return stack;
      }

      const isBeforeRange = from && isBefore(dataDay.date, from);
      if (isBeforeRange) {
        return stack;
      }

      const isAfterRange = to && isAfter(dataDay.date, to);
      if (isAfterRange) {
        return stack;
      }

      const isFuture = getIsFuture(dataDay.date);
      if (isFuture) {
        const shouldBeIncludedBecauseFilteredForYear = Boolean(from) || Boolean(to);

        if (!shouldBeIncludedBecauseFilteredForYear) {
          return stack;
        }
      }

      const dayWithoutYear = getDateWithoutYear(dataDay.date);
      const { year } = stringDateToObject(dataDay.date);

      const filteredCountriesForDay = dataDay.countriesCodes.filter(
        (country) => homeCountriesCodes.includes(country) === false,
      );

      if (!stack.summaryByDay[dayWithoutYear]) {
        stack.summaryByDay[dayWithoutYear] = {
          dayKey: dayWithoutYear,
          countriesCodes: [],
          countriesCodesByYear: {},
          sourceDates: [],
          yearsAbroad: [],
          indexInSortingByUnlocking: undefined,
          totalDays: 0,
          totalDaysAbroad: 0,
        };
      }

      stack.summaryByDay[dayWithoutYear].totalDays += 1;
      if (filteredCountriesForDay.length > 0) {
        stack.summaryByDay[dayWithoutYear].totalDaysAbroad += 1;
        stack.summaryByDay[dayWithoutYear].yearsAbroad = mergeUnique(stack.summaryByDay[dayWithoutYear].yearsAbroad, [
          String(year),
        ]);

        if (stack.summaryByDay[dayWithoutYear].indexInSortingByUnlocking === undefined) {
          indexInSortingByUnlocking += 1;
          stack.summaryByDay[dayWithoutYear].indexInSortingByUnlocking = indexInSortingByUnlocking;
        }
      }

      stack.summaryByDay[dayWithoutYear].sourceDates = mergeUnique(stack.summaryByDay[dayWithoutYear].sourceDates, [
        dataDay.date,
      ]);

      stack.summaryByDay[dayWithoutYear].countriesCodes = mergeUniqueAndSort(
        stack.summaryByDay[dayWithoutYear].countriesCodes,
        filteredCountriesForDay,
      );

      stack.summaryByDay[dayWithoutYear].countriesCodesByYear[year] = mergeUniqueAndSort(
        stack.summaryByDay[dayWithoutYear].countriesCodesByYear[year],
        filteredCountriesForDay,
      );

      // It can be both if the selected day is when we go abroad or when we return.
      const isAbroad = filteredCountriesForDay.length > 0;
      const isHome = filteredCountriesForDay.length < dataDay.countriesCodes.length;

      const shouldStopStreak = isHome;
      const shouldExtendStreak = isAbroad && !isHome;
      if (shouldExtendStreak) {
        stack.current.streak = {
          ...stack.current.streak,
          countriesCodes: mergeUnique(stack.current.streak.countriesCodes, filteredCountriesForDay),
          from: stack.current.streak.from || dateYYYYMMDD,
          to: dateYYYYMMDD || stack.current.streak.to,
          count: stack.current.streak.count + 1,
        };
      }

      if (shouldStopStreak) {
        const maxDaysStreak = stack.current.streak;

        stack.streaks.maxDays = [...stack.streaks.maxDays, maxDaysStreak]
          .sort((a, b) => b.count - a.count)
          .slice(0, NUMBER_OF_STREAKS_TO_TRACK);
        stack.streaks.maxCountries = [...stack.streaks.maxCountries, maxDaysStreak]
          .map(
            (streak) =>
              ({ ...streak, type: 'maxCountries', count: streak.countriesCodes.length }) satisfies StreakSummary,
          )
          .sort((a, b) => b.count - a.count)
          .slice(0, NUMBER_OF_STREAKS_TO_TRACK);

        stack.current.streak = getEmptyStreak('maxDays');
      }

      return stack;
    },
    {
      summaryByDay: {},
      streaks: getEmptyStreaks(),
      current: {
        streak: getEmptyStreak('maxDays'),
      },
    },
  );

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
          maxYearsAbroadInDay: 0,
          activeDays: [],
          countriesCodes: [],
          countriesCodesByYear: {},
        },
      },
    );

  return {
    summaryByDay,
    summaryByMonth,
    summary,
    streaks,
  };
};
