import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { DateLike, DateMMDD, DateYYYYMMDD, MetadataDay, MetadataPlace, MetadataTrip } from '../../../types';

type DataStatus = 'missing' | 'ready';

type IntegrationType = 'nomads.com';

export type DataStoreState = {
  version: string;
  status: DataStatus;
  integration: {
    type: IntegrationType | undefined;
    integrationCode: string | undefined;
    lastUpdate: DateLike | undefined;
  };
  date: {
    from: DateYYYYMMDD | undefined;
    to: DateYYYYMMDD | undefined;
  };
  totalDaysByCountry: {
    [countryCode: string]: number;
  };
  daysByCountry: {
    [countryCode: string]: DateMMDD[] | undefined;
  };
  daysByCountryByMonthByYear: {
    [year: string | number]: {
      [month: string | number]:
        | undefined
        | {
            [countryCode: string]: DateMMDD[] | undefined;
          };
    };
  };
  placesByKey: {
    [placeKey: string]: MetadataPlace | undefined;
  };
  dataByDay: {
    [dayKey: DateYYYYMMDD]: MetadataDay | undefined;
  };
  tripsByKey: {
    [tripKey: string]: MetadataTrip | undefined;
  };
};

export const APP_VERSION = '1.1.0';

const emptyStore: DataStoreState = {
  version: APP_VERSION,
  status: 'missing',
  integration: {
    type: undefined,
    integrationCode: undefined,
    lastUpdate: undefined,
  },
  date: {
    from: undefined,
    to: undefined,
  },
  totalDaysByCountry: {},
  daysByCountry: {},
  daysByCountryByMonthByYear: {},
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
      { name: 'dataStore' },
    ),
    { name: 'dataStore' },
  ),
);

export const resetDataStore = () => {
  useDataStore.setState({
    ...emptyStore,
  });
};

export const setIntegration = (newStore: DataStoreState) => {
  useDataStore.setState({
    ...newStore,
    // Sorted by number of days
    totalDaysByCountry: Object.fromEntries(Object.entries(newStore.totalDaysByCountry).sort((a, b) => b[1] - a[1])),
  });
};

export default useDataStore;
