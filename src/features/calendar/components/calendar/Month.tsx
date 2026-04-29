import { useTranslation } from "react-i18next";

import { Day } from "./Day";

import useFiltersStore from "@/features/filters/stores/useFilterStore";
import { FlagHover } from "@/components/flag-hover/FlagHover";

import { cn } from "@/utils/tailwind";
import { getDayKey } from "@/features/settings/utils/get-day-key";
import type { MonthMetadata } from "../../types";
import { getDaysInMonth } from "../../utils/get-days";
import { useFlagsSimple } from "@/features/filters/hooks/useFlagsSimple";

type Props = {
  className?: string;
  month: MonthMetadata;
};

export const Month = ({ className = "", month }: Props) => {
  const { t } = useTranslation();
  const monthSummary = useFiltersStore(
    (store) => store.filtered.summaryByMonth[month.monthNumber],
  );

  const countriesCodesByYear = useFiltersStore(
    (store) =>
      store.filtered.summaryByMonth[month.monthNumber]?.countriesCodesByYear,
  );

  const { flags } = useFlagsSimple(countriesCodesByYear);

  const daysAbroad = monthSummary?.daysAbroad.length || 0;

  const daysInMonth = getDaysInMonth(month.monthNumber);

  return (
    <article
      className={cn(
        "p-5 pt-3",
        "bg-[#111110]",
        "text-center",
        "rounded-lg",
        "relative hover:z-10",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-5 left-5",
          "text-xs text-gray-400 tracking-wider",
          {
            "text-gray-500": flags.length === 0,
          },
        )}
      >
        <FlagHover flags={flags} place="bottom">
          {t("summary.countries", {
            postProcess: "interval",
            count: flags.length,
          })}
        </FlagHover>
      </span>
      <h2 className={cn("text-2xl text-white", "font-semibold mb-4")}>
        {t(month.name)}{" "}
      </h2>
      <span
        className={cn(
          "absolute top-5 right-5",
          "text-xs text-gray-400 tracking-wider",
          {
            "text-[#fcff4e] font-semibold": daysAbroad === daysInMonth,
          },
        )}
      >
        {daysAbroad || 0} / {daysInMonth}
      </span>
      <div className={cn("grid grid-cols-7 gap-x-1.5 gap-y-1")}>
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
