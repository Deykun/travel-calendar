import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { MonthNumber } from '@/features/calendar/types';
import useDataStore from '@/features/settings/stores/useDateStore';
import { getFiltered } from '@/features/settings/utils/get-filtered';
import type { DateMMDD, DateYYYYMMDD } from '@/types';

export type SummaryDay = {
  dayKey: DateMMDD;
  countriesCodes: string[];
  countriesUnlockedThisDay: string[];
  countriesCodesByYear: {
    [year: number | string]: string[];
  };
  yearsAbroad: string[];
  sourceDates: DateYYYYMMDD[];
  indexInSortingByUnlocking: number | undefined;
  totalDays: number;
  totalDaysAbroad: number;
  totalUnlockedCountries: number;
};

type SummaryMonth = {
  monthNumber: MonthNumber;
  countriesCodes: string[];
  countriesCodesByYear: {
    [year: number | string]: string[];
  };
  activeDays: DateMMDD[];
  total: number;
};

export type SummaryYear = {
  countriesUnlocked: {
    [countryCode: string]: DateYYYYMMDD;
  };
  daysUnlocked: DateMMDD[];
};

export type StreakType = 'maxDays' | 'maxCountries';

// Max days allowed between two abroad periods for them to still count as one streak
export const GAP_BY_STREAK_KIND = {
  regular: 0,
  kind: 1,
  veryKind: 2,
} as const;

export type StreakKind = keyof typeof GAP_BY_STREAK_KIND;

export type StreakSummary = {
  type: StreakType;
  countriesCodes: string[];
  daysByCountry: {
    [countryCode: string]: number | undefined;
  };
  from: DateYYYYMMDD | undefined;
  to: DateYYYYMMDD | undefined;
  count: number;
};

export type StreaksByType = {
  [type in StreakType]: StreakSummary[];
};

export type FiltersStoreState = {
  activeFilters: {
    homeCountriesCodes: string[];
    shouldIncludeFuture: boolean;
    from: DateYYYYMMDD | undefined;
    to: DateYYYYMMDD | undefined;
  };
  filtered: {
    summary: {
      totalDays: number;
      totalDaysAbroad: number;
      maxCountriesInDay: number;
      maxCountriesUnlockedInDay: number;
      maxYearsAbroadInDay: number;
      activeDays: DateMMDD[];
      countriesCodes: string[];
      countriesCodesByYear: {
        [year: number | string]: string[];
      };
      countriesUnlocked: string[];
    };
    summaryByDay: {
      [dayKey: string]: SummaryDay | undefined;
    };
    summaryByMonth: {
      [monthKey: string]: SummaryMonth | undefined;
    };
    summaryByYear: {
      [year: number]: SummaryYear | undefined;
    };
    streaks: {
      [kind in StreakKind]: StreaksByType;
    };
  };
};

export const getEmptyStreak = (type: StreakType): StreakSummary => {
  return {
    type: type,
    countriesCodes: [],
    daysByCountry: {},
    from: undefined,
    to: undefined,
    count: 0,
  };
};

export const getEmptyStreaksByType = (): StreaksByType => ({
  maxDays: [],
  maxCountries: [],
});

const emptyStore: FiltersStoreState = {
  activeFilters: {
    homeCountriesCodes: [],
    shouldIncludeFuture: false,
    from: undefined,
    to: undefined,
  },
  filtered: {
    summary: {
      totalDays: 0,
      totalDaysAbroad: 0,
      maxCountriesInDay: 0,
      maxCountriesUnlockedInDay: 0,
      maxYearsAbroadInDay: 0,
      activeDays: [],
      countriesUnlocked: [],
      countriesCodes: [],
      countriesCodesByYear: {},
    },
    summaryByDay: {},
    summaryByMonth: {},
    summaryByYear: {},
    streaks: {
      regular: getEmptyStreaksByType(),
      kind: getEmptyStreaksByType(),
      veryKind: getEmptyStreaksByType(),
    },
  },
};

export const useFiltersStore = create<FiltersStoreState>()(
  devtools(
    persist(
      () => ({
        ...emptyStore,
      }),
      { name: 'filterStore' },
    ),
    { name: 'filterStore' },
  ),
);

export const resetFilterStore = () => {
  useFiltersStore.setState({
    ...emptyStore,
  });
};

export const refreshFiltered = () => {
  const dataByDay = useDataStore.getState().dataByDay;

  const filtered = getFiltered(dataByDay);

  useFiltersStore.setState({
    filtered: {
      ...filtered,
    },
  });
};

export const setHomeCountriesCodes = (countriesCodes: string[]) => {
  useFiltersStore.setState((state) => ({
    ...state,
    activeFilters: {
      ...state.activeFilters,
      homeCountriesCodes: countriesCodes,
    },
  }));

  refreshFiltered();
};

export const toggleHomeCountry = (countryCode: string) => {
  useFiltersStore.setState((state) => ({
    ...state,
    activeFilters: {
      ...state.activeFilters,
      homeCountriesCodes: state.activeFilters.homeCountriesCodes.includes(countryCode)
        ? state.activeFilters.homeCountriesCodes.filter((code) => code !== countryCode)
        : [...state.activeFilters.homeCountriesCodes, countryCode],
    },
  }));

  refreshFiltered();
};

export const setDateFilter = (from: DateYYYYMMDD | undefined, to: DateYYYYMMDD | undefined) => {
  useFiltersStore.setState((state) => ({
    ...state,
    activeFilters: {
      ...state.activeFilters,
      from,
      to,
    },
  }));

  refreshFiltered();
};

export const setFromFilter = (from: DateYYYYMMDD | undefined) => {
  useFiltersStore.setState((state) => ({
    ...state,
    activeFilters: {
      ...state.activeFilters,
      from,
    },
  }));

  refreshFiltered();
};

export const setToFilter = (to: DateYYYYMMDD | undefined) => {
  useFiltersStore.setState((state) => ({
    ...state,
    activeFilters: {
      ...state.activeFilters,
      to,
    },
  }));

  refreshFiltered();
};

export const toggleShouldIncludeFuture = () => {
  useFiltersStore.setState((state) => ({
    ...state,
    activeFilters: {
      ...state.activeFilters,
      shouldIncludeFuture: !state.activeFilters.shouldIncludeFuture,
    },
  }));

  refreshFiltered();
};

export default useFiltersStore;
