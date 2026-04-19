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

type Props = {
  className?: string;
  dayKey: string;
};

const EMPTY_ARRAY: string[] = [];

const modalStyles = cn("rounded-lg", "p-4", "bg-white border border-[#e5e5e5]");

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
  const dataByDay = useDataStore((store) => store.dataByDay);

  const { t } = useTranslation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetails({
      tripsKeys: [],
      countryCode: "",
    });
  }, [dayKey]);

  const flags = useMemo(() => {
    return sourceDates.reduce(
      (
        stack: {
          countryCode: string;
          year: string;
          tripsKeys: string[];
        }[],
        dateWithYear,
      ) => {
        const [year] = dateWithYear.split("-");
        const dataForDay = dataByDay[dateWithYear];

        dataForDay?.countriesCodes.forEach((countryCode) => {
          stack.push({
            year,
            countryCode,
            tripsKeys: dataForDay.tripsKeys,
          });
        });

        return stack;
      },
      [],
    );
  }, [dataByDay, sourceDates]);

  if (!dayKey) {
    return null;
  }

  return (
    <>
      <div className={cn("text-center relative", modalStyles, className)}>
        <h2 className="text-xl font-semibold mb-4">
          <DatetimeDay date={sourceDates[0]} />
        </h2>
        <button className="absolute top-2 right-2" onClick={closeOverModal}>
          <IconX className="size-6" />
        </button>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={countriesCodes.length} shouldShowAllNumbers />
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
        <div className={cn("flex flex-wrap justify-center gap-3", "p-2 pb-3")}>
          {flags.map(({ year, countryCode, tripsKeys }) => (
            <DayDetails
              className="w-13"
              key={`${year}-${countryCode}`}
              year={year}
              countryCode={countryCode}
              tripsKeys={tripsKeys}
              setDetails={setDetails}
            />
          ))}
        </div>
      </div>
      {details.tripsKeys.length > 0 && (
        <div className={cn(modalStyles, "mt-8")}>
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
