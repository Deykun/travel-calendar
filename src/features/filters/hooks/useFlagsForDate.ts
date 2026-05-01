import usePreferencesStore from "@/features/preferences/stores/usePreferencesStore";
import { useMemo } from "react";
import useFiltersStore from "../stores/useFilterStore";
import useDataStore from "@/features/settings/stores/useDateStore";
import { getFlagsEntriesGroupedByYear } from "./flags-for-dates/getFlagsEntriesGroupedByYear";
import { EMPTY_ARRAY, EMPTY_YYYYMMDD_ARRAY } from "@/utils/empty";

export type FlagData = {
  countryCode: string;
  from: number;
  to: number;
  tripsKeys: string[];
};

export function useFlagsForDay(dayKey: string, shouldForceShowHome?: boolean) {
  const shouldShowHome = usePreferencesStore(
    (store) => store.sidebars.shouldShowHome,
  );
  const shouldHighlightAbroadTravel = usePreferencesStore(
    (store) => store.calendar.shouldHighlightAbroadTravel,
  );

  const homeCountriesCodes = useFiltersStore(
    (store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY,
  );
  const sourceDates = useFiltersStore(
    (store) =>
      store.filtered.summaryByDay[dayKey]?.sourceDates || EMPTY_YYYYMMDD_ARRAY,
  );
  const dataByDay = useDataStore((store) => store.dataByDay);

  const { flags, isHighlightAbroadTravelActive } = useMemo(() => {
    const { periodsByIds, countriesByYear } = getFlagsEntriesGroupedByYear({
      dates: sourceDates,
      dataByDay,
    });

    const allFlags = Object.values(periodsByIds);

    const shouldShowHomeToUse = shouldForceShowHome ?? shouldShowHome;

    const abroadFlags = allFlags.filter(({ countryCode }) => {
      return !homeCountriesCodes.includes(countryCode);
    });

    const isHighlightAbroadTravelActive = shouldHighlightAbroadTravel
      ? Object.values(countriesByYear).some((yearCountries = []) => {
          return (
            yearCountries.filter(
              (countryCode) => !homeCountriesCodes.includes(countryCode),
            ).length >= 2
          );
        })
      : false;

    return {
      flags: shouldShowHomeToUse ? allFlags : abroadFlags,
      isHighlightAbroadTravelActive,
    };
  }, [
    dataByDay,
    homeCountriesCodes,
    shouldForceShowHome,
    shouldHighlightAbroadTravel,
    shouldShowHome,
    sourceDates,
  ]);

  return {
    flags,
    isHighlightAbroadTravelActive,
  };
}
