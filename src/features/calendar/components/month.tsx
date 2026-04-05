import { useTranslation } from "react-i18next";
import type { MonthMetadata } from "../types";
import { cn } from "../../../utils/tailwind";
import { Day } from "./day";
import { getDayKey } from "../../integrations/utils/get-day-key";
import useDataStore from "@/features/integrations/stores/use-data-store";

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

  return (
    <article
      className={cn("p-5 rounded-lg", "bg-[#e7eff4]", "text-center", className)}
    >
      <h2 className="text-md font-semibold">
        {t(month.name)} {daysAbroadPercentage.toFixed(1)}%{visitedCountries}
      </h2>
      <div className={cn("grid grid-cols-7 gap-2")}>
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
