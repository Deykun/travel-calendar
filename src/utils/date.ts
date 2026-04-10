import type { MonthNumber } from "@/features/calendar/types";

// 2026-03-28
export function getDateRange(from: string, to: string): string[] {
  const dates: string[] = [];
  const current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function stringDateToObject(date: string) {
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
export function getDateWithoutYear(date: string): string {
  return date.split("-").slice(1).join("-");
}

export function getYearFromDate(date: string): number {
  return Number(date.split("-").at(0));
}

// 03-28 -> 03
export function getMonthWithoutDay(date: string): MonthNumber {
  return Number(date.split("-").at(0)) as MonthNumber;
}
