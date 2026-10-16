import { parseISO } from 'date-fns';

import type { MonthNumber } from '@/features/calendar/types';
import type { DateLike, DateMMDD, DateYYYYMMDD } from '@/types';

// 2026-03-28
export function getDateRange(from: DateLike, to: DateLike): DateYYYYMMDD[] {
  const dates: DateYYYYMMDD[] = [];
  const current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    dates.push(current.toISOString().split('T')[0] as DateYYYYMMDD);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function getDaysBetweenDates(from: DateLike, to: DateLike): number {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays + 1;
}

// inclusive on both ends; YYYY-MM-DD strings compare correctly lexicographically
export function isDateBetween({
  date,
  from,
  to,
}: {
  date: DateYYYYMMDD;
  from: DateYYYYMMDD;
  to: DateYYYYMMDD;
}): boolean {
  return date >= from && date <= to;
}

export function stringDateToObject(date: DateYYYYMMDD) {
  const parts = date.split('-').map(Number);
  if (parts.length !== 3) {
    console.error(`Invalid date string in ${date}`);
  }

  const [year, month, day] = parts as [number, number, number];

  return {
    year,
    month: month as MonthNumber,
    day,
  };
}

export function objectDateToString({ year, month, day }: { year: number; month: number; day: number }) {
  return `${year}-${('' + month).padStart(2, '0')}-${('' + day).padStart(2, '0')}` as DateYYYYMMDD;
}

// 2026-03-28 -> 03-28
export function getDateWithoutYear(date: DateYYYYMMDD): DateMMDD {
  return date.split('-').slice(1).join('-') as DateMMDD;
}

export function getYearFromDate(date: string): number {
  return Number(date.split('-').at(0));
}

// 03-28 -> 03
export function getMonthWithoutDay(date: string): MonthNumber {
  return Number(date.split('-').at(0)) as MonthNumber;
}

export function getIsFuture(date: string): boolean {
  return new Date(date) > new Date();
}

export function getArrayOfYears(from?: DateYYYYMMDD, to?: DateYYYYMMDD) {
  if (!from || !to) {
    return [];
  }

  const fromYear = Number(from.split('-').at(0));
  const toYear = Number(to.split('-').at(0));

  const years: number[] = [];

  for (let year = fromYear; year <= toYear; year++) {
    years.push(year);
  }

  return years;
}

export const getDaysInYear = (year: number) => {
  return new Date(year, 1, 29).getMonth() == 1 ? 366 : 365;
};

// 2026-03-28T10:00:00Z | Date | timestamp -> 2026-03-28 in local time, undefined when unparsable
export const getAppDateIfPossible = (date: DateLike | undefined): DateYYYYMMDD | undefined => {
  if (!date) {
    return undefined;
  }

  // parseISO treats date-only strings as local midnight, new Date() would shift them to UTC
  const parsed = typeof date === 'string' ? parseISO(date) : new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return objectDateToString({ year: parsed.getFullYear(), month: parsed.getMonth() + 1, day: parsed.getDate() });
};

// 2026-03-01 -> 2026-02-28
export const getPreviousDay = (date: DateYYYYMMDD): DateYYYYMMDD => {
  const { year, month, day } = stringDateToObject(date);
  // local Date ctor rolls day 0 over to the last day of the previous month/year
  const previous = new Date(year, month - 1, day - 1);

  return objectDateToString({ year: previous.getFullYear(), month: previous.getMonth() + 1, day: previous.getDate() });
};

// 2026-02-28 -> 2026-03-01
export const getNextDay = (date: DateYYYYMMDD): DateYYYYMMDD => {
  const { year, month, day } = stringDateToObject(date);
  // local Date ctor rolls day > month length over to the next month/year
  const next = new Date(year, month - 1, day + 1);

  return objectDateToString({ year: next.getFullYear(), month: next.getMonth() + 1, day: next.getDate() });
};
