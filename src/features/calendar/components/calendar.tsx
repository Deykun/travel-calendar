import { cn } from "../../../utils/tailwind";
import { getDaysGroupedByMonths } from "../utils/get-days";
import { Month } from "./Month";

const calendar = getDaysGroupedByMonths();

type Props = {
  className?: string;
};

export const Calendar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-8",
        className,
      )}
    >
      {calendar.map((month) => (
        <Month key={month.monthNumber} month={month} />
      ))}
    </div>
  );
};
