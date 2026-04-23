type Params = {
  day: number;
  month: number;
};

export const getDayKey = ({ day, month }: Params): string => {
  return `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};
