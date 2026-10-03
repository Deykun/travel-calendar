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
  {
    shouldGroupConsecutiveYears = true,
    countriesUnlockedThisDay = [],
  }: {
    shouldGroupConsecutiveYears?: boolean;
    countriesUnlockedThisDay?: string[];
  } = {},
) {
  const shouldHighlightAbroadTravel = usePreferencesStore((store) => store.calendar.shouldHighlightAbroadTravel);
  const shouldHighlightNewCountries = usePreferencesStore((store) => store.calendar.shouldHighlightNewCountries);

  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes);

  const { flags, isHighlightAbroadTravelActive, isNewCountryActive } = useMemo(() => {
    const { periodsByIds, countriesByYear } = getFlagsEntriesGroupedByYearSimple({
      countriesCodesByYear,
      shouldGroupConsecutiveYears,
      countriesUnlockedThisDay,
    });

    const abroadFlags = Object.values(periodsByIds);

    const isHighlightAbroadTravelActive = shouldHighlightAbroadTravel
      ? Object.values(countriesByYear).some((yearCountries = []) => {
          return yearCountries.filter((countryCode) => !homeCountriesCodes.includes(countryCode)).length >= 2;
        })
      : false;

    const isNewCountry = shouldHighlightNewCountries && countriesUnlockedThisDay.length > 0;

    return {
      flags: abroadFlags,
      isHighlightAbroadTravelActive,
      isNewCountryActive: isNewCountry,
    };
  }, [
    countriesCodesByYear,
    countriesUnlockedThisDay,
    homeCountriesCodes,
    shouldGroupConsecutiveYears,
    shouldHighlightAbroadTravel,
    shouldHighlightNewCountries,
  ]);

  return {
    flags,
    isHighlightAbroadTravelActive,
    isNewCountryActive,
  };
}
