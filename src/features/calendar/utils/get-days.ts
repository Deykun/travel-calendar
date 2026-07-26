import type { MonthMetadata, MonthNumber } from '../types';

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

const getDaysGroupedByMonths = (): MonthMetadata[] => {
  return DAYS_IN_MONTH.map((numberOfDaysInMonth, monthIndex) => {
    const monthNumber = (monthIndex + 1) as MonthNumber;

    return {
      monthNumber,
      name: `month.name.${monthNumber}`,
      days: [...new Array(numberOfDaysInMonth)].map((_, dayIndex) => dayIndex + 1),
    };
  });
};

export const DAYS_GROUPED_BY_MONTHS = getDaysGroupedByMonths();

export const DAYS_GROUPED_BY_MONTHS_BY_DAYS_IN_YEAR: {
  365: MonthMetadata[];
  366: MonthMetadata[];
} = {
  365: DAYS_GROUPED_BY_MONTHS.map((month) =>
    month.monthNumber === 2
      ? {
          ...month,
          days: [...month.days].slice(0, -1),
        }
      : month,
  ),
  366: DAYS_GROUPED_BY_MONTHS,
};

export const getDaysInMonth = (monthNumber: MonthNumber) => {
  const daysInMonth = DAYS_IN_MONTH[monthNumber - 1];

  if (typeof daysInMonth !== 'number') {
    throw new Error(`Invalid month number: ${monthNumber}`);
  }

  return daysInMonth;
};
