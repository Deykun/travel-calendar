import type { DateYYYYMMDD } from '@/types';
import { getDateWithoutYear, getYearFromDate } from '@/utils/date';

import type { StackByDay } from '../types';

export const extendYearSummary = (
  stack: StackByDay,
  dateYYYYMMDD: DateYYYYMMDD,
  countriesCodes: string[],
): StackByDay => {
  const year = getYearFromDate(dateYYYYMMDD);
  const dayWithoutYear = getDateWithoutYear(dateYYYYMMDD);

  if (!year) {
    return stack;
  }

  countriesCodes.forEach((countryCode) => {
    if (stack.dateOfUnlockingByCountry[countryCode] === undefined) {
      stack.dateOfUnlockingByCountry[countryCode] = dateYYYYMMDD;
    }
  });

  if (countriesCodes.length > 0 && stack.yearOfUnlockingByDateMMDD[dayWithoutYear] === undefined) {
    stack.yearOfUnlockingByDateMMDD[dayWithoutYear] = year;
  }

  return stack;
};
