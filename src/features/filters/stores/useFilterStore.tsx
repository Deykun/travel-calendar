import type { MonthNumber } from "@/features/calendar/types";
import useDataStore from "@/features/settings/stores/useDateStore";
import { getFiltered } from "@/features/settings/utils/get-filtered";
import type { DateYYYYMMDD } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type SummaryDay = {
  dayKey: string;
  countriesCodes: string[];
  countriesCodesByYear: {
    [year: number]: string[];
  };
  yearsAbroad: string[];
  sourceDates: DateYYYYMMDD[];
};

type SummaryMonth = {
  monthNumber: MonthNumber;
  countriesCodes: string[];
  countriesCodesByYear: {
    [year: number]: string[];
  };
  daysAbroad: string[];
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
      maxCountriesInDay: number;
      maxYearsAbroadInDay: number;
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
      maxCountriesInDay: 0,
      maxYearsAbroadInDay: 0,
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
      { name: "filterStore" },
    ),
    { name: "filterStore" },
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
      homeCountriesCodes: state.activeFilters.homeCountriesCodes.includes(
        countryCode,
      )
        ? state.activeFilters.homeCountriesCodes.filter(
            (code) => code !== countryCode,
          )
        : [...state.activeFilters.homeCountriesCodes, countryCode],
    },
  }));

  refreshFiltered();
};

export const setDateFilter = (
  from: DateYYYYMMDD | undefined,
  to: DateYYYYMMDD | undefined,
) => {
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
