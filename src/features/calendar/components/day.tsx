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

  console.log("daySummary", daySummary);

  const total = (daySummary || []).filter((country) => country !== "pl").length;

  const hasTrip = total > 0;

  return (
    <span
      className={cn("relative", className, {
        "text-gray-300": !hasTrip,
        "text-green-600": hasTrip,
      })}
    >
      {dayNumber}
      {/* {total > 0 && (
        <span className="absolute top-0 right-0 text-xs text-red-700">
          {total}
        </span>
      )} */}
    </span>
  );
};
