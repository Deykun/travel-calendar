import { cn } from "../../../utils/tailwind";

import IconTravel from "@/components/icons/IconTravel";
import { FlagHover } from "@/components/flag-hover/FlagHover";
import useFiltersStore from "@/features/filters/stores/use-filter-store";
import { openOverModal } from "@/features/over-modal/stores/use-hover-modal-store";

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
  const yearsAbroad = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.yearsAbroad || EMPTY_ARRAY,
  );
  const countriesCodesByYear = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.countriesCodesByYear,
  );
  const maxCountriesInDay = useFiltersStore(
    (store) => store.filtered.summary.maxCountriesInDay,
  );

  const total = countriesCodes.length;

  return (
    <button
      onClick={() => openOverModal({ type: "day", dayKey })}
      className={cn(
        "inline-flex items-center flex-col gap-1",
        "p-1",
        "rounded-2xl",
        "duration-150",
        "group",
        {
          "text-[#585910] hover:bg-[#fbff0030] hover:text-[#737102]": total > 0,
          "text-[#c0bfbf] hover:bg-[#f9f7f7]": total === 0,
        },
        className,
      )}
    >
      <FlagHover
        countriesCodesByYear={countriesCodesByYear}
        className="inline-flex flex-col gap-1"
        shouldSkipGroup
      >
        <IconTravel total={total} />
        <p className={cn("text-sm tracking-wider")}>{dayNumber}</p>
      </FlagHover>
    </button>
  );
};
