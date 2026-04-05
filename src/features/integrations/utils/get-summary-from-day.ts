import { getDaysInMonth } from "@/features/calendar/utils/get-days";
import { getDateWithoutYear, getMonthWithoutDay } from "../../../utils/date";
import type { DataStoreState } from "../stores/use-data-store";

type Response = Pick<DataStoreState, "summaryByDay" | "summaryByMonth">;

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
    );

    return stack;
  }, {});

  const summaryByMonth: DataStoreState["summaryByMonth"] = Object.values(
    summaryByDay,
  ).reduce((stack: DataStoreState["summaryByMonth"], summaryDay) => {
    if (!summaryDay) {
      return stack;
    }

    const monthNumber = getMonthWithoutDay(summaryDay.dayKey);

    if (!stack[monthNumber]) {
      stack[monthNumber] = {
        monthNumber,
        countries: [],
        daysAbroad: [],
        total: getDaysInMonth(monthNumber),
      };
    }

    stack[monthNumber].countries = Array.from(
      new Set([...summaryDay.countries, ...stack[monthNumber].countries]),
    );

    if (summaryDay.countries.filter((country) => country !== "pl").length > 0) {
      stack[monthNumber].daysAbroad = Array.from(
        new Set([summaryDay.dayKey, ...stack[monthNumber].daysAbroad]),
      );
    }

    return stack;
  }, {});

  return {
    summaryByDay,
    summaryByMonth,
  };
};
