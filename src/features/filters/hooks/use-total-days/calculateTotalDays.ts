import type { DateYYYYMMDD } from '@/types';
import { getDaysBetweenDates } from '@/utils/date';

type CalculateTotalDaysParams = {
  dataFrom: DateYYYYMMDD | undefined;
  dataTo: DateYYYYMMDD | undefined;
  pickedFrom: DateYYYYMMDD | undefined;
  pickedTo: DateYYYYMMDD | undefined;
  // undefined when future should be included
  today: DateYYYYMMDD | undefined;
  fallback: number;
};

// YYYY-MM-DD strings compare correctly lexicographically
const latestOf = (...dates: (DateYYYYMMDD | undefined)[]) => dates.filter(Boolean).sort().at(-1);
const earliestOf = (...dates: (DateYYYYMMDD | undefined)[]) => dates.filter(Boolean).sort().at(0);

export const calculateTotalDays = ({
  dataFrom,
  dataTo,
  pickedFrom,
  pickedTo,
  today,
  fallback,
}: CalculateTotalDaysParams): number => {
  // Picked range clamped to data range (and to today when future is excluded)
  const from = latestOf(pickedFrom, dataFrom);
  const to = earliestOf(pickedTo, dataTo, today);

  if (!from || !to) {
    return fallback;
  }

  return from > to ? 0 : getDaysBetweenDates(from, to);
};
