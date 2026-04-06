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

const EMPTY_ARRAY: string[] = [];

export const Day = ({ className = "", dayNumber, dayKey }: Props) => {
  const countriesCodes = useDataStore(
    (store) => store.summaryByDay[dayKey]?.countriesCodes || EMPTY_ARRAY,
  );
  const countriesCodesByYear = useDataStore(
    (store) => store.summaryByDay[dayKey]?.countriesCodesByYear,
  );

  const maxCountriesInDay = useDataStore(
    (store) => store.summary.maxCountriesInDay,
  );

  const total = countriesCodes.filter((country) => country !== "pl").length;

  return (
    <span className={cn("inline-flex items-center flex-col gap-1", className)}>
      <span>
        <FlagHover countriesCodesByYear={countriesCodesByYear}>
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
