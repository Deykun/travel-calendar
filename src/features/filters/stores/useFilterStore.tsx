import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { MonthNumber } from '@/features/calendar/types';
import useDataStore from '@/features/settings/stores/useDateStore';
import { getFiltered } from '@/features/settings/utils/get-filtered';
import type { DateMMDD, DateYYYYMMDD } from '@/types';

type SummaryDay = {
  dayKey: DateMMDD;
  countriesCodes: string[];
  countriesCodesByYear: {
    [year: number | string]: string[];
  };
  yearsAbroad: string[];
  sourceDates: DateYYYYMMDD[];
  indexInSortingByUnlocking: number | undefined;
  totalDays: number;
  totalDaysAbroad: number;
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

export type FiltersStoreState = {
  activeFilters: {
    homeCountriesCodes: string[];
    from: DateYYYYMMDD | undefined;
    to: DateYYYYMMDD | undefined;
  };
  filtered: {
    summary: {
      totalDays: number;
      totalDaysAbroad: number;
      maxCountriesInDay: number;
      maxYearsAbroadInDay: number;
      activeDays: DateMMDD[];
      countriesCodes: string[];
      countriesCodesByYear: {
        [year: number | string]: string[];
      };
    };
    summaryByDay: {
      [dayKey: string]: SummaryDay | undefined;
    };
    summaryByMonth: {
      [monthKey: string]: SummaryMonth | undefined;
    };
  };
};

const emptyStore: FiltersStoreState = {
  activeFilters: {
    homeCountriesCodes: [],
    from: undefined,
    to: undefined,
  },
  filtered: {
    summary: {
      totalDays: 0,
      totalDaysAbroad: 0,
      maxCountriesInDay: 0,
      maxYearsAbroadInDay: 0,
      activeDays: [],
      countriesCodes: [],
      countriesCodesByYear: {},
    },
    summaryByDay: {},
    summaryByMonth: {},
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

export default useFiltersStore;
