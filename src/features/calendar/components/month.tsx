import { useTranslation } from "react-i18next";
import type { MonthMetadata } from "../types";
import { cn } from "../../../utils/tailwind";

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
          <span key={day}>{day}</span>
        ))}
      </div>
    </article>
  );
};
