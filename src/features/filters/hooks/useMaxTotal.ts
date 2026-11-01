import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';

import useFiltersStore from '../stores/useFilterStore';
import { useTimeRange } from './useRange';

// TODO: cache in store at some point
export const useMaxTotal = () => {
  const { fromYear, toYear } = useTimeRange({ shouldUseDataFrom: true });
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);

  const maxTotal = useFiltersStore((store) => {
    if (counterShouldShow === 'numberOfCountries') {
      return store.filtered.summary.maxCountriesInDay;
    }

    if (counterShouldShow === 'yearOfUnlocking' || counterShouldShow === 'lastYearAbroad') {
      if (toYear && fromYear) {
        return toYear - fromYear;
      }

      return 0;
    }

    if (counterShouldShow === 'yearsAbroad') {
      return store.filtered.summary.maxYearsAbroadInDay;
    }

    if (counterShouldShow === 'numberOfUnlockedCountries') {
      return store.filtered.summary.maxCountriesUnlockedInDay;
    }

    return store.filtered.summary.maxYearsAbroadInDay;
  });

  return maxTotal;
};
