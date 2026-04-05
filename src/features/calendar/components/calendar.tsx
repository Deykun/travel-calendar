import { cn } from "../../../utils/tailwind";
import { getDaysGroupedByMonths } from "../utils/get-days";
import { Month } from "./month";

const calendar = getDaysGroupedByMonths();

export const Calendar = () => {
  return (
    <div className={cn("grid grid-cols-4 gap-8 p-6 px-12")}>
      {calendar.map((month) => (
        <Month key={month.monthNumber} month={month} />
      ))}
    </div>
  );
};
