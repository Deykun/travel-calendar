import { useTranslation } from "react-i18next";
import { cn } from "../../../utils/tailwind";
import useDataStore from "../../integrations/stores/use-data-store";

import IconTravel from "@/components/icons/IconTravel";

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

  return (
    <span
      className={cn("relative", "inline-flex items-center flex-col", className)}
    >
      <IconTravel total={total} />
      <p className="text-xs text-gray-600">{dayNumber}</p>
    </span>
  );
};
