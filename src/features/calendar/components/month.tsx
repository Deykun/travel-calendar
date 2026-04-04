import { useTranslation } from "react-i18next";
import type { MonthMetadata } from "../types";
import { cn } from "../../../utils/tailwind";

type Props = {
  month: MonthMetadata;
};

export const Month = ({ month }: Props) => {
  const { t } = useTranslation();

  return (
    <article>
      <h2>{t(month.name)}</h2>
      <div className={cn("grid grid-cols-7 gap-2")}>
        {month.days.map((day) => (
          <span>{day}</span>
        ))}
      </div>
    </article>
  );
};
