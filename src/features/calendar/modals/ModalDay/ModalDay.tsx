import IconTravel from "@/components/icons/IconTravel";
import useFiltersStore from "@/features/filters/stores/use-filter-store";
import useDataStore from "@/features/integrations/stores/use-data-store";
import { closeOverModal } from "@/features/over-modal/stores/use-hover-modal-store";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";
import { DayDetails } from "./parts/DayDetails";
import { useEffect, useMemo, useState } from "react";
import { DayTripDetails } from "./parts/DayTripDetails";
import { DatetimeDay } from "@/components/datetime/datetime-day";
import IconX from "@/components/icons/IconX";
import { ToggleShowHome } from "@/features/preferences/components/ToggleShowHome";
import usePreferencesStore from "@/features/preferences/stores/usePreferencesStore";
import { useFlagsForDay } from "@/features/filters/hooks/useFlagsForDate";

type Props = {
  className?: string;
  dayKey: string;
};

const EMPTY_ARRAY: string[] = [];

const modalStyles = cn("rounded-lg", "p-4", "bg-black border border-[#2b2b27]");

const getFlagKey = ({
  year,
  countryCode,
}: {
  year: number;
  countryCode: string;
}) => {
  return `${year}-${countryCode}`;
};

export const ModalDay = ({ className, dayKey }: Props) => {
  const [details, setDetails] = useState<{
    flagKey: string;
    tripsKeys: string[];
    countryCode: string;
  }>({
    flagKey: "",
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetails({
      flagKey: "",
      tripsKeys: [],
      countryCode: "",
    });
  }, [dayKey]);

  const flags = useFlagsForDay(dayKey);

  if (!dayKey) {
    return null;
  }

  return (
    <>
      <div className={cn("text-center relative", modalStyles, className)}>
        <h2 className="text-2xl text-white font-semibold mb-6">
          <DatetimeDay date={`2000-${dayKey}`} />
        </h2>
        <button className="absolute top-2 right-2" onClick={closeOverModal}>
          <IconX className="size-6" />
        </button>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={countriesCodes.length} shouldShowAllNumbers />
            <span className="text-[#979797] text-sm tracking-wider">
              Visited countries
            </span>
          </div>
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={yearsAbroad.length} shouldShowAllNumbers />
            <span className="text-[#979797] text-sm tracking-wider">
              Years abroad
            </span>
          </div>
        </div>
        <div className={cn("flex flex-wrap justify-center gap-3", "p-2 pb-3")}>
          {flags.map(({ from, to, countryCode, tripsKeys }) => (
            <DayDetails
              className="w-14 h-20"
              key={getFlagKey({ year: from, countryCode })}
              from={from}
              to={to}
              countryCode={countryCode}
              setDetails={() =>
                setDetails({
                  flagKey: getFlagKey({ year: from, countryCode }),
                  countryCode,
                  tripsKeys,
                })
              }
              isActive={
                details.flagKey === getFlagKey({ year: from, countryCode })
              }
            />
          ))}
        </div>
        <ToggleShowHome className="mt-4" />
      </div>
      {details.tripsKeys.length > 0 && (
        <div className={cn(modalStyles, "mt-8", "flex flex-col gap-5")}>
          {details.tripsKeys.map((tripKey) => (
            <DayTripDetails
              key={tripKey}
              tripKey={tripKey}
              showOnlyForCountryCode={details.countryCode || undefined}
            />
          ))}
        </div>
      )}
    </>
  );
};
