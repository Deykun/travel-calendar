import { getDateWithoutYear } from "../../../utils/date";
import type { DataStoreState } from "../stores/use-data-store";

type Response = DataStoreState["summaryByDay"];

export const getSummaryFromDay = (
  dataByDay: DataStoreState["dataByDay"],
): Response => {
  return Object.values(dataByDay).reduce((stack: Response, dataDay) => {
    if (!dataDay) {
      return stack;
    }

    const dayWithoutYear = getDateWithoutYear(dataDay.date);

    if (!stack[dayWithoutYear]) {
      stack[dayWithoutYear] = [];
    }

    stack[dayWithoutYear] = Array.from(
      new Set([...dataDay.countries, ...stack[dayWithoutYear]]),
    );

    return stack;
  }, {});
};
