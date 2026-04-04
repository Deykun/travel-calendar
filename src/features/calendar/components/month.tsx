import { useTranslation } from "react-i18next";
import type { MonthMetadata } from "../types";
import { cn } from "../../../utils/tailwind";
import { Day } from "./day";
import { getDayKey } from "../../integrations/utils/get-day-key";

type Props = {
  className?: string;
  month: MonthMetadata;
};

export const Month = ({ className = "", month }: Props) => {
  const { t } = useTranslation();

  return (
    <article className={cn("p-5 border rounded-lg", "text-center", className)}>
      <h2 className="text-md font-semibold">{t(month.name)}</h2>
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
