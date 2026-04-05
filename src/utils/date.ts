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

// 2026-03-28 -> 03-28
export function getDateWithoutYear(date: string): string {
  return date.split("-").slice(1).join("-");
}

// 03-28 -> 03
export function getMonthWithoutDay(date: string): MonthNumber {
  return Number(date.split("-").at(0)) as MonthNumber;
}
