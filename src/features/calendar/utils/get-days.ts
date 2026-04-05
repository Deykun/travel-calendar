import type { MonthMetadata, MonthNumber } from "../types";

const DAYS_IN_MONTH = [
  31, // jan
  29, // feb
  31, // mar
  30, // apr
  31, // may
  30, // jun
  31, // jul
  31, // aug
  30, // sep
  31, // oct
  30, // nov
  31, // dec
];

export const getDaysGroupedByMonths = (): MonthMetadata[] => {
  return DAYS_IN_MONTH.map((numberOfDaysInMonth, monthIndex) => {
    const monthNumber = (monthIndex + 1) as MonthNumber;

    return {
      monthNumber,
      name: `month.name.${monthNumber}`,
      days: [...new Array(numberOfDaysInMonth)].map(
        (_, dayIndex) => dayIndex + 1,
      ),
    };
  });
};

export const getDaysInMonth = (monthNumber: MonthNumber) => {
  return DAYS_IN_MONTH[monthNumber - 1];
};
