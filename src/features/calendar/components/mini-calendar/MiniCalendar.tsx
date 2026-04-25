import { cn } from "@/utils/tailwind";
import { DAYS_GROUPED_BY_MONTHS } from "../../utils/get-days";
import { useTranslation } from "react-i18next";
import type { DateMMDD } from "@/types";
import { getDayKey } from "@/features/settings/utils/get-day-key";
import type { PropsWithChildren } from "react";

type Props = {
  className?: string;
  activeDays?: DateMMDD[];
};

export const MiniCalendar = ({
  className,
  activeDays = [],
  children,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "px-12",
        "z-50",
        "p-5 pt-2 text-center rounded-2xl",
        "text-white bg-black",
        "translate-y-3 group-hover:-translate-y-4",
        "duration-150",
        "fixed bottom-2 left-105",
        "opacity-0 group-hover:opacity-100",
        "pointer-events-none",
        "transition-bounce",
        className,
      )}
    >
      {children && (
        <strong className="block mb-3 text-sm tracking-wider font-semibold">
          {children}
        </strong>
      )}
      <div className="grid grid-cols-4 gap-4">
        {DAYS_GROUPED_BY_MONTHS.map((month) => (
          <div
            key={month.monthNumber}
            className={cn("p-1.5 bg-[#3d3d3d6e] rounded-[10px]")}
          >
            <strong className="block mb-2 text-xs tracking-wider font-semibold">
              {t(month.name)}
            </strong>
            <div className={cn("grid grid-cols-7 gap-x-1 gap-y-1")}>
              {month.days.map((day) => (
                <span
                  key={day}
                  className={cn(
                    "inline-flex size-2 rounded-xs",
                    "bg-[#272620]",
                    {
                      "bg-[#d8da51]": activeDays.includes(
                        getDayKey({ day, month: month.monthNumber }),
                      ),
                    },
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
