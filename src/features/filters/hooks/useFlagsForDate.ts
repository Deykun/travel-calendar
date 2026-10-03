import { useMemo } from 'react';

import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import type { DateMMDD } from '@/types';
import { EMPTY_ARRAY, EMPTY_YYYYMMDD_ARRAY } from '@/utils/empty';

import useFiltersStore from '../stores/useFilterStore';
import { getFlagsEntriesGroupedByYear } from './flags-for-dates/getFlagsEntriesGroupedByYear';

export type FlagData = {
  countryCode: string;
  from: number;
  to: number;
  tripsKeys: string[];
  wasUnlocked?: boolean;
};

export function useFlagsForDay(dayKey: DateMMDD, shouldForceShowHome?: boolean) {
  const shouldShowHome = usePreferencesStore((store) => store.sidebars.shouldShowHome);
  const shouldHighlightAbroadTravel = usePreferencesStore((store) => store.calendar.shouldHighlightAbroadTravel);
  const shouldHighlightNewCountries = usePreferencesStore((store) => store.calendar.shouldHighlightNewCountries);

  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY);
  const sourceDates = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.sourceDates || EMPTY_YYYYMMDD_ARRAY,
  );
  const countriesUnlockedThisDay = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.countriesUnlockedThisDay || EMPTY_ARRAY,
  );
  const dataByDay = useDataStore((store) => store.dataByDay);

  const { flags, isHighlightAbroadTravelActive, isNewCountryActive } = useMemo(() => {
    const { periodsByIds, countriesByYear } = getFlagsEntriesGroupedByYear({
      dates: sourceDates,
      dataByDay,
      countriesUnlockedThisDay,
    });

    const allFlags = Object.values(periodsByIds);

    const shouldShowHomeToUse = shouldForceShowHome ?? shouldShowHome;

    const abroadFlags = allFlags.filter(({ countryCode }) => {
      return !homeCountriesCodes.includes(countryCode);
    });

    const isHighlightAbroadTravelActive = shouldHighlightAbroadTravel
      ? Object.values(countriesByYear).some((yearCountries = []) => {
          return yearCountries.filter((countryCode) => !homeCountriesCodes.includes(countryCode)).length >= 2;
        })
      : false;

    const isNewCountry = shouldHighlightNewCountries && countriesUnlockedThisDay.length > 0;

    return {
      flags: shouldShowHomeToUse ? allFlags : abroadFlags,
      isHighlightAbroadTravelActive,
      isNewCountryActive: isNewCountry,
    };
  }, [
    countriesUnlockedThisDay,
    dataByDay,
    homeCountriesCodes,
    shouldForceShowHome,
    shouldHighlightAbroadTravel,
    shouldHighlightNewCountries,
    shouldShowHome,
    sourceDates,
  ]);

  return {
    flags,
    isHighlightAbroadTravelActive,
    isNewCountryActive,
  };
}
