import { cn } from "../../../utils/tailwind";
import { getDaysGroupedByMonths } from "../utils/get-days";
import { Month } from "./Month";

const calendar = getDaysGroupedByMonths();

// grid-cols-[repeat(auto-fit,minmax(320px,1fr))]

export const Calendar = () => {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-8",
      )}
    >
      {calendar.map((month) => (
        <Month key={month.monthNumber} month={month} />
      ))}
    </div>
  );
};
