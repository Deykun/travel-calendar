import { useTranslation } from "react-i18next";
import { cn } from "../../../utils/tailwind";
import useDataStore from "../../integrations/stores/use-data-store";

type Props = {
  className?: string;
  dayNumber: number;
  dayKey: string;
};

export const Day = ({ className = "", dayNumber, dayKey }: Props) => {
  const { t } = useTranslation();
  const daySummary = useDataStore((store) => store.summaryByDay[dayKey]);

  const total = (daySummary?.countries || []).filter(
    (country) => country !== "pl",
  ).length;

  const hasTrip = total > 0;

  return (
    <span
      className={cn("relative", className, {
        "text-gray-800": !hasTrip,
        "text-green-800": hasTrip,
      })}
    >
      {dayNumber}
      {total > 0 && (
        <span className="absolute top-0 right-0 text-xs bg-red-700 text-white px-1">
          {total}
        </span>
      )}
    </span>
  );
};
