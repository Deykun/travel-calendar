import { useTranslation } from "react-i18next";
import type { MonthMetadata } from "../types";
import { cn } from "../../../utils/tailwind";
import { Day } from "./day";
import { getDayKey } from "../../integrations/utils/get-day-key";
import useDataStore from "@/features/integrations/stores/use-data-store";
import { getDaysInMonth } from "../utils/get-days";

type Props = {
  className?: string;
  month: MonthMetadata;
};

export const Month = ({ className = "", month }: Props) => {
  const { t } = useTranslation();
  const monthSummary = useDataStore(
    (store) => store.summaryByMonth[month.monthNumber],
  );

  const daysAbroadPercentage = monthSummary
    ? (100 * monthSummary.daysAbroad.length) / monthSummary.total
    : 0;
  const visitedCountries = monthSummary?.countries?.length || 0;
  // {visitedCountries}

  const daysInMonth = getDaysInMonth(month.monthNumber);

  return (
    <article
      className={cn(
        "p-5 rounded-4xl",
        "bg-[#e7eff4]",
        "bg-[linear-gradient(45deg,transparent,white,white)]",
        "text-center relative",
        className,
      )}
    >
      <h2 className="text-md font-semibold mb-4">{t(month.name)} </h2>
      <span
        className={cn("absolute top-5 right-5", "text-xs text-gray-600", {
          "text-green-800 font-semibold":
            monthSummary?.daysAbroad.length === daysInMonth,
        })}
      >
        {monthSummary?.daysAbroad.length || 0} / {daysInMonth}
      </span>
      <div className={cn("grid grid-cols-7 gap-x-2 gap-y-3")}>
        {month.days.map((day) => (
          <Day
            key={day}
            dayKey={getDayKey({ day, month: month.monthNumber })}
            dayNumber={day}
          />
        ))}
      </div>
    </article>
  );
};
