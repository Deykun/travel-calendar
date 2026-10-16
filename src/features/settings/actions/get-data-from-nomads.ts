import { setDateFilter, setHomeCountriesCodes } from '@/features/filters/stores/useFilterStore';
import { openSidebarFilters } from '@/features/sidebar/stores/useSidebarStore';
import type { DateYYYYMMDD } from '@/types';

import { APP_VERSION, setIntegration } from '../stores/useDateStore';
import { type IntegrationNomadsTrip, getDataFromNomadsTrips } from './nomads/get-data-from-nomads-trips';

type Params = {
  username: string;
};

type IntegrationNomadsApiResponse = {
  trips: IntegrationNomadsTrip[];
};

type FetchResponse = { isSuccess: true } | { isSuccess: false; reason: string };

export const getDataFromNomads = async ({ username }: Params): Promise<FetchResponse> => {
  if (!username) {
    return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
  }

  let nomadsData: IntegrationNomadsApiResponse | undefined;

  try {
    const response = await fetch(`https://nomads.com/@${username}.json`);

    if (!response.ok) {
      return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
    }

    nomadsData = (await response.json()) as IntegrationNomadsApiResponse;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  if (!nomadsData) {
    return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
  }

  const {
    dataByDay,
    placesByKey,
    tripsByKey,
    totalDaysByCountry,
    daysByCountry,
    daysByCountryByMonthByYear,
    unlockingDateByCountry,
  } = getDataFromNomadsTrips(nomadsData.trips);

  const sortedDates = Object.keys(dataByDay) as DateYYYYMMDD[];

  setIntegration({
    version: APP_VERSION,
    status: 'ready',
    integration: {
      type: 'nomads.com',
      integrationCode: username,
      lastUpdate: Date.now(),
    },
    date: {
      from: sortedDates.at(0),
      to: sortedDates.at(-1),
    },
    totalDaysByCountry,
    daysByCountry,
    dataByDay,
    daysByCountryByMonthByYear,
    unlockingDateByCountry,
    placesByKey,
    tripsByKey,
  });

  const homeCountries = Object.entries(daysByCountry)
    .filter(([, activeDays]) => (activeDays || []).length >= 365)
    .map(([countryCode]) => countryCode);

  setHomeCountriesCodes(homeCountries);
  setDateFilter(undefined, undefined);
  openSidebarFilters();

  return { isSuccess: true };
};
