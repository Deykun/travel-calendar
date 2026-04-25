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
        "grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-8",
        "px-12",
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
