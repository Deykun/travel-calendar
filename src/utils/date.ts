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
