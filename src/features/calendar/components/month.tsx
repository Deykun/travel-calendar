import { useTranslation } from "react-i18next";
import type { MonthMetadata } from "../types";
import { cn } from "../../../utils/tailwind";
import { Day } from "./Day";
import { getDayKey } from "../../integrations/utils/get-day-key";
import { getDaysInMonth } from "../utils/get-days";
import useFiltersStore from "@/features/filters/stores/use-filter-store";
import { FlagHover } from "@/components/flag-hover/FlagHover";

type Props = {
  className?: string;
  month: MonthMetadata;
};

export const Month = ({ className = "", month }: Props) => {
  const { t } = useTranslation();
  const monthSummary = useFiltersStore(
    (store) => store.filtered.summaryByMonth[month.monthNumber],
  );

  const daysAbroad = monthSummary?.daysAbroad.length || 0;
  const visitedCountries = monthSummary?.countriesCodes?.length || 0;

  const daysInMonth = getDaysInMonth(month.monthNumber);

  return (
    <article
      className={cn(
        "p-5 pt-3",
        "bg-white",
        "text-center",
        "rounded-lg",
        "relative hover:z-10",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-5 left-5",
          "text-xs text-gray-600 tracking-wider",
          {
            "text-gray-400": visitedCountries === 0,
          },
        )}
      >
        <FlagHover
          flags={
            monthSummary?.countriesCodes?.map((country) => ({
              countryCode: country,
            })) || []
          }
          place="bottom"
        >
          {visitedCountries} countries
        </FlagHover>
      </span>
      <h2 className="text-xl font-semibold mb-4">{t(month.name)} </h2>
      <span
        className={cn(
          "absolute top-5 right-5",
          "text-xs text-gray-600 tracking-wider",
          {
            "text-[#9a9c00] font-semibold": daysAbroad == daysInMonth,
          },
        )}
      >
        {daysAbroad || 0} / {daysInMonth}
      </span>
      <div className={cn("grid grid-cols-7 gap-x-1.5 gap-y-2")}>
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
