import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { DateLike, MetadataDay, MetadataPlace } from "../../../types";
import type { MonthNumber } from "@/features/calendar/types";

type DataStatus = "missing" | "ready";

type IntegrationType = "nomads.com";

type SummaryDay = {
  dayKey: string;
  countries: string[];
};

type SummaryMonth = {
  monthNumber: MonthNumber;
  countries: string[];
  daysAbroad: string[];
  total: number;
};

export type DataStoreState = {
  status: DataStatus;
  integration: {
    type: IntegrationType | undefined;
    lastUpdate: DateLike | undefined;
  };
  summary: {
    maxCountriesInDay: number;
  };
  summaryByDay: {
    [dayKey: string]: SummaryDay | undefined;
  };
  summaryByMonth: {
    [monthKey: string]: SummaryMonth | undefined;
  };
  placesByKey: {
    [placeKey: string]: MetadataPlace | undefined;
  };
  dataByDay: {
    [dayKey: string]: MetadataDay | undefined;
  };
};

const emptyStore: DataStoreState = {
  status: "missing",
  integration: {
    type: undefined,
    lastUpdate: undefined,
  },
  summary: {
    maxCountriesInDay: 0,
  },
  summaryByDay: {},
  summaryByMonth: {},
  placesByKey: {},
  dataByDay: {},
};

export const useDataStore = create<DataStoreState>()(
  devtools(
    persist(
      () => ({
        ...emptyStore,
      }),
      { name: "dataStore" },
    ),
    { name: "dataStore" },
  ),
);

export const setIntegration = (newStore: DataStoreState) => {
  useDataStore.setState(newStore);
};

export default useDataStore;
