import { getDaysInMonth } from "@/features/calendar/utils/get-days";
import {
  getDateWithoutYear,
  getMonthWithoutDay,
  stringDateToObject,
} from "../../../utils/date";
import type { DataStoreState } from "../stores/use-data-store";

type Response = Pick<
  DataStoreState,
  "summaryByDay" | "summaryByMonth" | "summary"
>;

const mergeCountriesCodes = (
  countriesA: string[] | undefined,
  countriesB: string[] | undefined,
) => {
  return Array.from(
    new Set([...(countriesA || []), ...(countriesB || [])]),
  ).sort((a, b) => a.localeCompare(b));
};

export const getSummaryFromDay = (
  dataByDay: DataStoreState["dataByDay"],
): Response => {
  const summaryByDay: DataStoreState["summaryByDay"] = Object.values(
    dataByDay,
  ).reduce((stack: DataStoreState["summaryByDay"], dataDay) => {
    if (!dataDay) {
      return stack;
    }

    const dayWithoutYear = getDateWithoutYear(dataDay.date);
    const { year } = stringDateToObject(dataDay.date);

    if (!stack[dayWithoutYear]) {
      stack[dayWithoutYear] = {
        dayKey: dayWithoutYear,
        countriesCodes: [],
        countriesCodesByYear: {},
      };
    }

    console.log(
      mergeCountriesCodes(
        stack[dayWithoutYear].countriesCodes,
        dataDay.countriesCodes,
      ),
    );

    stack[dayWithoutYear].countriesCodes = mergeCountriesCodes(
      stack[dayWithoutYear].countriesCodes,
      dataDay.countriesCodes,
    );

    stack[dayWithoutYear].countriesCodesByYear[year] = mergeCountriesCodes(
      stack[dayWithoutYear].countriesCodesByYear[year],
      dataDay.countriesCodes,
    );

    return stack;
  }, {});

  const {
    summaryByMonth,
    summary,
  }: Pick<DataStoreState, "summaryByMonth" | "summary"> = Object.values(
    summaryByDay,
  ).reduce(
    (stack: Pick<DataStoreState, "summaryByMonth" | "summary">, summaryDay) => {
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
        summaryDay.countriesCodes.filter((country) => country !== "pl").length >
        stack.summary.maxCountriesInDay
      ) {
        stack.summary.maxCountriesInDay = summaryDay.countriesCodes.filter(
          (country) => country !== "pl",
        ).length;
      }

      stack.summaryByMonth[monthNumber].countriesCodes = mergeCountriesCodes(
        stack.summaryByMonth[monthNumber].countriesCodes,
        summaryDay.countriesCodes,
      );

      if (
        summaryDay.countriesCodes.filter((country) => country !== "pl").length >
        0
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
