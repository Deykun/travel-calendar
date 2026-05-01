import { cn } from "@/utils/tailwind";
import { DAYS_GROUPED_BY_MONTHS } from "../../utils/get-days";
import { Month } from "./Month";
import {
  classNamesLayoutGap,
  classNamesLayoutGrid,
  classNamesLayoutPx,
} from "@/layouts/layout-app";

type Props = {
  className?: string;
};

export const Calendar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        classNamesLayoutGap,
        classNamesLayoutPx,
        classNamesLayoutGrid,
        className,
      )}
    >
      {DAYS_GROUPED_BY_MONTHS.map((month) => (
        <Month key={month.monthNumber} month={month} />
      ))}
    </div>
  );
};
