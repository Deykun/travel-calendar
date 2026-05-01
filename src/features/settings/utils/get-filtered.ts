import { getDaysInMonth } from "@/features/calendar/utils/get-days";
import {
  getDateWithoutYear,
  getIsFuture,
  getMonthWithoutDay,
  stringDateToObject,
} from "../../../utils/date";
import type { DataStoreState } from "../stores/useDateStore";
import useFiltersStore, {
  type FiltersStoreState,
} from "@/features/filters/stores/useFilterStore";
import { mergeUnique, mergeUniqueAndSort } from "@/utils/array";
import { isBefore } from "date-fns/isBefore";
import { isAfter } from "date-fns";

export const getFiltered = (
  dataByDay: DataStoreState["dataByDay"],
): FiltersStoreState["filtered"] => {
  const { homeCountriesCodes, from, to } =
    useFiltersStore.getState().activeFilters;

  const summaryByDay: FiltersStoreState["filtered"]["summaryByDay"] =
    Object.values(dataByDay).reduce(
      (stack: FiltersStoreState["filtered"]["summaryByDay"], dataDay) => {
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
          const shouldBeIncludedBecauseFilteredForYear = Boolean(to);

          if (!shouldBeIncludedBecauseFilteredForYear) {
            return stack;
          }
        }

        const dayWithoutYear = getDateWithoutYear(dataDay.date);
        const { year } = stringDateToObject(dataDay.date);

        const filteredCountriesForDay = dataDay.countriesCodes.filter(
          (country) => homeCountriesCodes.includes(country) === false,
        );

        if (!stack[dayWithoutYear]) {
          stack[dayWithoutYear] = {
            dayKey: dayWithoutYear,
            countriesCodes: [],
            countriesCodesByYear: {},
            sourceDates: [],
            yearsAbroad: [],
          };
        }

        if (filteredCountriesForDay.length > 0) {
          stack[dayWithoutYear].yearsAbroad = mergeUnique(
            stack[dayWithoutYear].yearsAbroad,
            [String(year)],
          );
        }

        stack[dayWithoutYear].sourceDates = mergeUnique(
          stack[dayWithoutYear].sourceDates,
          [dataDay.date],
        );

        stack[dayWithoutYear].countriesCodes = mergeUniqueAndSort(
          stack[dayWithoutYear].countriesCodes,
          filteredCountriesForDay,
        );

        stack[dayWithoutYear].countriesCodesByYear[year] = mergeUniqueAndSort(
          stack[dayWithoutYear].countriesCodesByYear[year],
          filteredCountriesForDay,
        );

        return stack;
      },
      {},
    );

  const {
    summaryByMonth,
    summary,
  }: Pick<FiltersStoreState["filtered"], "summaryByMonth" | "summary"> =
    Object.values(summaryByDay).reduce(
      (
        stack: Pick<
          FiltersStoreState["filtered"],
          "summaryByMonth" | "summary"
        >,
        summaryDay,
      ) => {
        if (!summaryDay) {
          return stack;
        }

        const monthNumber = getMonthWithoutDay(summaryDay.dayKey);

        if (!stack.summaryByMonth[monthNumber]) {
          stack.summaryByMonth[monthNumber] = {
            monthNumber,
            countriesCodes: [],
            countriesCodesByYear: {},
            daysAbroad: [],
            total: getDaysInMonth(monthNumber),
          };
        }

        if (
          summaryDay.countriesCodes.filter(
            (country) => homeCountriesCodes.includes(country) === false,
          ).length > stack.summary.maxCountriesInDay
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

        Object.entries(summaryDay.countriesCodesByYear).forEach(
          ([rawYear, countryCodes]) => {
            const year = Number(rawYear);

            if (stack.summaryByMonth[monthNumber]) {
              stack.summaryByMonth[monthNumber].countriesCodesByYear[year] =
                mergeUniqueAndSort(
                  stack.summaryByMonth[monthNumber].countriesCodesByYear[year],
                  countryCodes,
                );
            }
          },
        );

        if (
          summaryDay.countriesCodes.filter(
            (country) => homeCountriesCodes.includes(country) === false,
          ).length > 0
        ) {
          stack.summaryByMonth[monthNumber].daysAbroad = Array.from(
            new Set([
              summaryDay.dayKey,
              ...stack.summaryByMonth[monthNumber].daysAbroad,
            ]),
          );
        }

        return stack;
      },
      {
        summaryByMonth: {},
        summary: {
          maxCountriesInDay: 0,
          maxYearsAbroadInDay: 0,
        },
      },
    );

  return {
    summaryByDay,
    summaryByMonth,
    summary,
  };
};
