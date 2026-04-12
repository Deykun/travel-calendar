import IconTravel from "@/components/icons/IconTravel";
import { ImageFlag } from "@/components/image-flag/ImageFlag";
import useFiltersStore from "@/features/filters/stores/use-filter-store";
import useDataStore from "@/features/integrations/stores/use-data-store";
import { closeOverModal } from "@/features/over-modal/stores/use-hover-modal-store";
import { useFlagsFromCountries } from "@/hooks/useFlagsFromCountries";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";
import { DayDetails } from "./parts/DayDetails";
import { useState } from "react";
import { DayTripDetails } from "./parts/DayTripDetails";
import { format } from "date-fns/format";
import { DatetimeDay } from "@/components/datetime/datetime-day";
import IconX from "@/components/icons/IconX";

type Props = {
  className?: string;
  dayKey: string;
};

const EMPTY_ARRAY: string[] = [];

const modalStyles = cn(
  "rounded-xl",
  "bg-[#e7eff4]",
  "min-w-[400px]",
  "rounded-[20px]",
  "p-2",
  "bg-[#fffa]",
  "backdrop-blur-[7px]",
  "drop-shadow",
  "duration-150",
  "border-t border-b border-[#e3e3e3]",
  "border-b-4",
);

export const ModalDay = ({ className, dayKey }: Props) => {
  const [details, setDetails] = useState<{
    tripsKeys: string[];
    countryCode: string;
  }>({
    tripsKeys: [],
    countryCode: "",
  });

  const yearsAbroad = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.yearsAbroad || EMPTY_ARRAY,
  );
  const countriesCodes = useFiltersStore(
    (store) =>
      store.filtered.summaryByDay[dayKey]?.countriesCodes || EMPTY_ARRAY,
  );
  const sourceDates = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.sourceDates || EMPTY_ARRAY,
  );

  const { t } = useTranslation();

  const total = countriesCodes.filter((country) => country !== "pl").length;

  if (!dayKey) {
    return null;
  }

  return (
    <>
      {details.tripsKeys.length > 0 && (
        <div className={cn(modalStyles, "mb-2")}>
          {details.tripsKeys.map((tripKey) => (
            <DayTripDetails
              key={tripKey}
              tripKey={tripKey}
              showOnlyForCountryCode={details.countryCode || undefined}
            />
          ))}
        </div>
      )}
      <div className={cn("text-center relative", modalStyles, className)}>
        <h2 className="text-xl font-semibold mb-4">
          <DatetimeDay date={sourceDates[0]} />
        </h2>
        <button className="absolute top-2 right-2" onClick={closeOverModal}>
          <IconX className="size-6" />
        </button>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={total} shouldShowAllNumbers />
            <span className="text-black text-sm tracking-wider">
              Visited countries
            </span>
          </div>
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={yearsAbroad.length} shouldShowAllNumbers />
            <span className="text-black text-sm tracking-wider">
              Years abroad
            </span>
          </div>
        </div>
        <div
          className={cn(
            "grid grid-flow-col gap-3",
            "max-w-[400px]",
            "overflow-auto p-2 pb-3",
            "snap-x snap-mandatory touch-pan-x",
          )}
        >
          {sourceDates.map((data) => (
            <DayDetails
              className="snap-center"
              key={data}
              dateWithYear={data}
              setDetails={setDetails}
            />
          ))}
        </div>
      </div>
    </>
  );
};
