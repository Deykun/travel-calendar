import { cn } from "../../../utils/tailwind";

import IconTravel from "@/components/icons/IconTravel";
import { FlagHover } from "@/components/flag-hover/FlagHover";
import useFiltersStore from "@/features/filters/stores/use-filter-store";
import {
  closeOverModal,
  openOverModal,
  useOverModalStore,
} from "@/features/over-modal/stores/use-hover-modal-store";
import { useCallback } from "react";

type Props = {
  className?: string;
  dayNumber: number;
  dayKey: string;
};

const EMPTY_ARRAY: string[] = [];

export const Day = ({ className = "", dayNumber, dayKey }: Props) => {
  const isModalOpen = useOverModalStore(
    (state) => state?.modal?.type === "day" && state.modal.dayKey === dayKey,
  );
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

  const handleClick = useCallback(() => {
    if (isModalOpen) {
      closeOverModal();

      return;
    }
    
    openOverModal({ type: "day", dayKey })
  }, [dayKey, isModalOpen])

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center flex-col gap-1",
        "p-1",
        "rounded-2xl",
        "duration-150",
        "group",
        {
          "text-[#585910] hover:bg-[#fbff0030] hover:text-[#737102]": total > 0,
          "text-[#c0bfbf] hover:bg-[#f9f7f7]": total === 0,
          "bg-[#fbff0030] text-[#737102]": total > 0 && isModalOpen,
          "bg-[#f9f7f7] text-[#c0bfbf]": total === 0 && isModalOpen,
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
