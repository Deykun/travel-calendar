import type { DateMMDD } from '@/types';

import type { StackByDay } from '../types';

export const extendYearSummary = (
  stack: StackByDay,
  year: number,
  dayWithoutYear: DateMMDD,
  countriesCodes: string[],
): StackByDay => {
  if (!year) {
    return stack;
  }

  countriesCodes.forEach((countryCode) => {
    if (stack.yearOfUnlockingByCountry[countryCode] === undefined) {
      stack.yearOfUnlockingByCountry[countryCode] = year;
    }
  });

  if (countriesCodes.length > 0 && stack.yearOfUnlockingByDateMMDD[dayWithoutYear] === undefined) {
    stack.yearOfUnlockingByDateMMDD[dayWithoutYear] = year;
  }

  return stack;
};
