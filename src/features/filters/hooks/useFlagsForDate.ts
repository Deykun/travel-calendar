import usePreferencesStore from "@/features/preferences/stores/usePreferencesStore";
import { useMemo } from "react";
import useFiltersStore from "../stores/useFilterStore";
import useDataStore from "@/features/settings/stores/useDateStore";
import { mergeStringsWithUnique } from "@/utils/array";
import type { DateYYYYMMDD } from "@/types";

const EMPTY_ARRAY: string[] = [];
const EMPTY_YYYYMMDD_ARRAY: DateYYYYMMDD[] = [];

export type FlagData = {
  countryCode: string;
  from: number;
  to: number;
  tripsKeys: string[];
};

type PeriodsIndex = {
  periodsByIds: {
    [periodId: string]: FlagData;
  };
  idByCountryByYear: {
    [year: string]:
      | undefined
      | {
          [country: string]: undefined | string;
        };
  };
};

export function useFlagsForDay(dayKey: string, shouldForceShowHome?: boolean) {
  const shouldShowHome = usePreferencesStore(
    (store) => store.modals.shouldShowHome,
  );
  const homeCountriesCodes = useFiltersStore(
    (store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY,
  );
  const sourceDates = useFiltersStore(
    (store) =>
      store.filtered.summaryByDay[dayKey]?.sourceDates || EMPTY_YYYYMMDD_ARRAY,
  );
  const dataByDay = useDataStore((store) => store.dataByDay);

  const flags = useMemo(() => {
    const entries = sourceDates.sort().reduce(
      (stack: PeriodsIndex, dateWithYear) => {
        const year = Number(dateWithYear.split("-")[0]);
        const dataForDay = dataByDay[dateWithYear];

        const previousYear = stack.idByCountryByYear[year - 1] || {};
        const currentYear = stack.idByCountryByYear[year] || {};

        /*
            It merges visits to the country from 2019, 2020, and 2021 into a single entry: 2019–2021.
        */
        dataForDay?.countriesCodes.forEach((countryCode) => {
          const periodId = previousYear?.[countryCode];

          if (periodId) {
            currentYear[countryCode] = periodId;
            stack.periodsByIds[periodId].to = year;
            stack.periodsByIds[periodId].tripsKeys = mergeStringsWithUnique(
              stack.periodsByIds[periodId].tripsKeys,
              dataForDay.tripsKeys,
            );
          } else {
            const newPeriodId = `${year}-${countryCode}`;

            currentYear[countryCode] = newPeriodId;
            stack.periodsByIds[newPeriodId] = {
              countryCode,
              from: year,
              to: year,
              tripsKeys: dataForDay.tripsKeys,
            };
          }
        });

        stack.idByCountryByYear[year] = currentYear;

        return stack;
      },
      {
        periodsByIds: {},
        idByCountryByYear: {},
      },
    );

    const flags = Object.values(entries.periodsByIds);

    const shouldShowHomeToUse = shouldForceShowHome ?? shouldShowHome;

    if (shouldShowHomeToUse === false) {
      return flags.filter(({ countryCode }) => {
        return !homeCountriesCodes.includes(countryCode);
      });
    }

    return flags;
  }, [
    dataByDay,
    homeCountriesCodes,
    shouldForceShowHome,
    shouldShowHome,
    sourceDates,
  ]);

  return flags;
}
