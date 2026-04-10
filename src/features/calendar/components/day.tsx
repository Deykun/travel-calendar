import { cn } from "../../../utils/tailwind";
import useDataStore from "../../integrations/stores/use-data-store";

import IconTravel from "@/components/icons/IconTravel";
import { FlagHover } from "@/components/flag-hover/FlagHover";
import { useHoverModalTrigger } from "@/features/hover-modal/hooks/useHoverModalTrigger";
import useFiltersStore from "@/features/filters/stores/use-filter-store";

type Props = {
  className?: string;
  dayNumber: number;
  dayKey: string;
};

const EMPTY_ARRAY: string[] = [];

export const Day = ({ className = "", dayNumber, dayKey }: Props) => {
  const countriesCodes = useFiltersStore(
    (store) =>
      store.filtered.summaryByDay[dayKey]?.countriesCodes || EMPTY_ARRAY,
  );
  const countriesCodesByYear = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.countriesCodesByYear,
  );
  const maxCountriesInDay = useFiltersStore(
    (store) => store.filtered.summary.maxCountriesInDay,
  );

  const dayRef = useHoverModalTrigger({ type: "day", dayKey });

  const total = countriesCodes.length;

  return (
    <span
      ref={dayRef}
      className={cn("inline-flex items-center flex-col gap-1", className)}
    >
      <span>
        <FlagHover countriesCodesByYear={countriesCodesByYear}>
          <IconTravel total={total} />
        </FlagHover>
      </span>
      <p
        className={cn("text-sm text-gray-600 tracking-wider", {
          ["text-[#664300] font-bold"]: maxCountriesInDay === total,
        })}
      >
        {dayNumber}
      </p>
    </span>
  );
};
