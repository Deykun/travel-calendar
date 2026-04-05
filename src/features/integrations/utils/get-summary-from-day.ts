import { getDaysInMonth } from "@/features/calendar/utils/get-days";
import { getDateWithoutYear, getMonthWithoutDay } from "../../../utils/date";
import type { DataStoreState } from "../stores/use-data-store";

type Response = Pick<
  DataStoreState,
  "summaryByDay" | "summaryByMonth" | "summary"
>;

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

    if (!stack[dayWithoutYear]) {
      stack[dayWithoutYear] = {
        dayKey: dayWithoutYear,
        countries: [],
      };
    }

    stack[dayWithoutYear].countries = Array.from(
      new Set([...dataDay.countries, ...stack[dayWithoutYear].countries]),
    ).sort((a, b) => a.localeCompare(b));

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
          countries: [],
          daysAbroad: [],
          total: getDaysInMonth(monthNumber),
        };
      }

      if (
        summaryDay.countries.filter((country) => country !== "pl").length >
        stack.summary.maxCountriesInDay
      ) {
        stack.summary.maxCountriesInDay = summaryDay.countries.filter(
          (country) => country !== "pl",
        ).length;
      }

      stack.summaryByMonth[monthNumber].countries = Array.from(
        new Set([
          ...summaryDay.countries,
          ...stack.summaryByMonth[monthNumber].countries,
        ]),
      ).sort((a, b) => a.localeCompare(b));

      if (
        summaryDay.countries.filter((country) => country !== "pl").length > 0
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
