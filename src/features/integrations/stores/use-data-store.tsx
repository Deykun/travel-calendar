import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {
  DateLike,
  MetadataDay,
  MetadataPlace,
  MetadataTrip,
} from "../../../types";

type DataStatus = "missing" | "ready";

type IntegrationType = "nomads.com";

export type DataStoreState = {
  status: DataStatus;
  integration: {
    type: IntegrationType | undefined;
    lastUpdate: DateLike | undefined;
  };
  totalDaysByCountry: {
    [countryCode: string]: number;
  };
  placesByKey: {
    [placeKey: string]: MetadataPlace | undefined;
  };
  dataByDay: {
    [dayKey: string]: MetadataDay | undefined;
  };
  tripsByKey: {
    [tripKey: string]: MetadataTrip | undefined;
  };
};

const emptyStore: DataStoreState = {
  status: "missing",
  integration: {
    type: undefined,
    lastUpdate: undefined,
  },
  totalDaysByCountry: {},
  placesByKey: {},
  dataByDay: {},
  tripsByKey: {},
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
  useDataStore.setState({
    ...newStore,
    // Sorted by number of days
    totalDaysByCountry: Object.fromEntries(
      Object.entries(newStore.totalDaysByCountry).sort((a, b) => b[1] - a[1]),
    ),
  });
};

export default useDataStore;
