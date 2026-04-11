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

const mergeCountriesCodes = (
  countriesA: string[] | undefined,
  countriesB: string[] | undefined,
) => {
  return Array.from(
    new Set([...(countriesA || []), ...(countriesB || [])]),
  ).sort((a, b) => a.localeCompare(b));
};

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
          };
        }

        stack[dayWithoutYear].countriesCodes = mergeCountriesCodes(
          stack[dayWithoutYear].countriesCodes,
          filteredCountriesForDay,
        );

        stack[dayWithoutYear].countriesCodesByYear[year] = mergeCountriesCodes(
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

        stack.summaryByMonth[monthNumber].countriesCodes = mergeCountriesCodes(
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
