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
import { useFlagsForDay } from "@/features/filters/hooks/useFlagsForDate";

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

   const flags = useFlagsForDay(dayKey, false);

  const total = countriesCodes.length;

  const handleClick = useCallback(() => {
    if (isModalOpen) {
      closeOverModal();

      return;
    }

    openOverModal({ type: "day", dayKey });
  }, [dayKey, isModalOpen]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center flex-col gap-1",
        "p-1 pt-2",
        "rounded-sm",
        "duration-150",
        "group",
        {
          "text-[#979797] hover:bg-[#fffb000d] hover:text-white":
            !isModalOpen && total > 0,
          "text-[#3d3d3d] hover:bg-[#4545341c] hover:text-[#656565]":
            !isModalOpen && total === 0,
          "text-white bg-[#fff3] shadow-[0_0_15px_#021019]": isModalOpen,
        },
        className,
      )}
    >
      <FlagHover
        flags={flags}
        className="inline-flex flex-col gap-1"
        shouldSkipGroup
      >
        <IconTravel total={total} />
        <p className={cn("text-sm tracking-wider")}>{dayNumber}</p>
      </FlagHover>
    </button>
  );
};
