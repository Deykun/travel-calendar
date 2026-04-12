import { getDaysInMonth } from "@/features/calendar/utils/get-days";
import {
  getDateWithoutYear,
  getMonthWithoutDay,
  stringDateToObject,
} from "../../../utils/date";
import type { DataStoreState } from "../stores/use-data-store";
import useFiltersStore, {
  type FiltersStoreState,
} from "@/features/filters/stores/use-filter-store";
import { mergeStringsWithUnique, mergeUniqueAndSort } from "@/utils/array";

export const getFiltered = (
  dataByDay: DataStoreState["dataByDay"],
): FiltersStoreState["filtered"] => {
  const { homeCountriesCodes } = useFiltersStore.getState();

  const summaryByDay: FiltersStoreState["filtered"]["summaryByDay"] =
    Object.values(dataByDay).reduce(
      (stack: FiltersStoreState["filtered"]["summaryByDay"], dataDay) => {
        if (!dataDay) {
          return stack;
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
          stack[dayWithoutYear].yearsAbroad = mergeStringsWithUnique(
            stack[dayWithoutYear].yearsAbroad,
            [String(year)],
          );
        }

        stack[dayWithoutYear].sourceDates = mergeStringsWithUnique(
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

        stack.summaryByMonth[monthNumber].countriesCodes = mergeUniqueAndSort(
          stack.summaryByMonth[monthNumber].countriesCodes,
          summaryDay.countriesCodes,
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
        },
      },
    );

  return {
    summaryByDay,
    summaryByMonth,
    summary,
  };
};
