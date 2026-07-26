import type { DateYYYYMMDD } from '@/types';

// 31-12-2025 -> 2025.12.31
export const appFormatDate = (date: DateYYYYMMDD, options?: { shouldRemoveYear?: boolean }): string => {
  const [year, month, day] = date.split('-');

  return options?.shouldRemoveYear === true ? [day, month].join('.') : [day, month, year].join('.');
};
