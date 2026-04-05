import { useTranslation } from "react-i18next";
import { cn } from "../../../utils/tailwind";
import useDataStore from "../../integrations/stores/use-data-store";

import IconTravel from "@/components/icons/IconTravel";
import { FlagHover } from "@/components/flag-hover/FlagHover";

type Props = {
  className?: string;
  dayNumber: number;
  dayKey: string;
};

export const Day = ({ className = "", dayNumber, dayKey }: Props) => {
  const { t } = useTranslation();
  const daySummary = useDataStore((store) => store.summaryByDay[dayKey]);
  const maxCountriesInDay = useDataStore(
    (store) => store.summary.maxCountriesInDay,
  );

  const countries = daySummary?.countries || [];

  const total = countries.filter((country) => country !== "pl").length;

  return (
    <span
      className={cn(
        "relative",
        "inline-flex items-center flex-col gap-1",
        className,
      )}
    >
      <span>
        <FlagHover countries={countries}>
          <IconTravel total={total} />
        </FlagHover>
      </span>
      <p
        className={cn("text-xs text-gray-600 tracking-wider", {
          ["text-[#664300] font-bold"]: maxCountriesInDay === total,
        })}
      >
        {dayNumber}
      </p>
    </span>
  );
};
