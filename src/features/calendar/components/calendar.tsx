import { cn } from "../../../utils/tailwind";
import { getDaysGroupedByMonths } from "../utils/get-days";
import { Month } from "./month";

const calendar = getDaysGroupedByMonths();

export const Calendar = () => {
  return (
    <div className={cn("grid grid-cols-4 gap-2 p-6")}>
      {calendar.map((month) => (
        <Month key={month.monthNumber} month={month} />
      ))}
    </div>
  );
};
