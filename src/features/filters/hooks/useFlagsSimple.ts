import { useMemo } from 'react';

import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';

import useFiltersStore from '../stores/useFilterStore';
import { getFlagsEntriesGroupedByYearSimple } from './flags-for-dates/getFlagsEntriesGroupedByYear';

export function useFlagsSimple(
  countriesCodesByYear:
    | undefined
    | {
        [year: string]: string[];
        [year: number]: string[];
      },
) {
  const shouldHighlightAbroadTravel = usePreferencesStore((store) => store.calendar.shouldHighlightAbroadTravel);

  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes);

  const { flags, isHighlightAbroadTravelActive } = useMemo(() => {
    const { periodsByIds, countriesByYear } = getFlagsEntriesGroupedByYearSimple({
      countriesCodesByYear,
    });

    const abroadFlags = Object.values(periodsByIds);

    const isHighlightAbroadTravelActive = shouldHighlightAbroadTravel
      ? Object.values(countriesByYear).some((yearCountries = []) => {
          return yearCountries.filter((countryCode) => !homeCountriesCodes.includes(countryCode)).length >= 2;
        })
      : false;

    return {
      flags: abroadFlags,
      isHighlightAbroadTravelActive,
    };
  }, [countriesCodesByYear, homeCountriesCodes, shouldHighlightAbroadTravel]);

  return {
    flags,
    isHighlightAbroadTravelActive,
  };
}
