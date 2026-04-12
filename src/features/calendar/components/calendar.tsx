import { cn } from "../../../utils/tailwind";
import { getDaysGroupedByMonths } from "../utils/get-days";
import { Month } from "./Month";

const calendar = getDaysGroupedByMonths();

// grid-cols-[repeat(auto-fit,minmax(320px,1fr))]

export const Calendar = () => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 p-6 px-12",
      )}
    >
      {calendar.map((month) => (
        <Month key={month.monthNumber} month={month} />
      ))}
    </div>
  );
};
