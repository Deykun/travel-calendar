import type { MonthNumber } from "@/features/calendar/types";
import useDataStore from "@/features/integrations/stores/use-data-store";
import { getFiltered } from "@/features/integrations/utils/get-filtered";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type SummaryDay = {
  dayKey: string;
  countriesCodes: string[];
  countriesCodesByYear: {
    [year: number]: string[];
  };
};

type SummaryMonth = {
  monthNumber: MonthNumber;
  countriesCodes: string[];
  daysAbroad: string[];
  total: number;
};

export type FiltersStoreState = {
  homeCountriesCodes: string[];
  filtered: {
    summary: {
      maxCountriesInDay: number;
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
  homeCountriesCodes: [],
  filtered: {
    summary: {
      maxCountriesInDay: 0,
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

  console.log(filtered);

  useFiltersStore.setState({
    filtered,
  });
};

export const setHomeCountriesCodes = (countriesCodes: string[]) => {
  useFiltersStore.setState({
    homeCountriesCodes: countriesCodes,
  });

  refreshFiltered();
};

export const toggleHomeCountry = (countryCode: string) => {
  useFiltersStore.setState((state) => ({
    homeCountriesCodes: state.homeCountriesCodes.includes(countryCode)
      ? state.homeCountriesCodes.filter((code) => code !== countryCode)
      : [...state.homeCountriesCodes, countryCode],
  }));

  refreshFiltered();
};

export default useFiltersStore;
