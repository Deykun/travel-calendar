import { cn } from "@/utils/tailwind";
import { DAYS_GROUPED_BY_MONTHS } from "../../utils/get-days";
import { Month } from "./Month";

type Props = {
  className?: string;
};

export const Calendar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "gap-4 @min-[1200px]:gap-8",
        "px-4 @min-[900px]:px-6 @min-[1200px]:px-12",
        "grid grid-cols-1 @min-[780px]:grid-cols-2 @min-[1200px]:grid-cols-3 @min-[1500px]:grid-cols-4",
        "overflow-hidden",
        className,
      )}
    >
      {DAYS_GROUPED_BY_MONTHS.map((month) => (
        <Month key={month.monthNumber} month={month} />
      ))}
    </div>
  );
};
