import type { DateMMDD } from '@/types';

type Params = {
  day: number;
  month: number;
};

export const getDayKey = ({ day, month }: Params): DateMMDD => {
  return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` as DateMMDD;
};
