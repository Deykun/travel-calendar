import type { MonthNumber } from "@/features/calendar/types";
import type { AppMMDD, DateYYYYMMDD, DateLike } from "@/types";

// 2026-03-28
export function getDateRange(from: DateLike, to: DateLike): DateYYYYMMDD[] {
  const dates: DateYYYYMMDD[] = [];
  const current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    dates.push(current.toISOString().split("T")[0] as DateYYYYMMDD);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function stringDateToObject(date: DateYYYYMMDD) {
  const parts = date.split("-").map(Number);
  if (parts.length !== 3) {
    console.error(`Invalid date string in ${date}`);
  }

  const [year, month, day] = parts;

  return {
    year,
    month: month as MonthNumber,
    day,
  };
}

// 2026-03-28 -> 03-28
export function getDateWithoutYear(date: DateYYYYMMDD): AppMMDD {
  return date.split("-").slice(1).join("-") as AppMMDD;
}

export function getYearFromDate(date: string): number {
  return Number(date.split("-").at(0));
}

// 03-28 -> 03
export function getMonthWithoutDay(date: string): MonthNumber {
  return Number(date.split("-").at(0)) as MonthNumber;
}

export function getIsFuture(date: string): boolean {
  return new Date(date) > new Date();
}

export function getArrayOfYears(from: DateYYYYMMDD, to: DateYYYYMMDD) {
  const fromYear = Number(from.split("-").at(0));
  const toYear = Number(to.split("-").at(0));

  const years: number[] = [];

  for (let year = fromYear; year <= toYear; year++) {
    years.push(year);
  }

  return years.reverse();
}
