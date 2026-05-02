import { setDateFilter, setHomeCountriesCodes } from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';

import { setIntegration } from '../stores/useDateStore';
import { type IntegrationNomadsTrip, getDataFromTrips } from './nomads/get-data-from-trips';

type Params = {
  username: string;
};

type IntegrationNomadsApiResponse = {
  trips: IntegrationNomadsTrip[];
};

type FetchResponse = { isSuccess: true } | { isSuccess: false; reason: string };

export const getDataFromNomads = async ({ username }: Params): Promise<FetchResponse> => {
  console.log('called');
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

  const { dataByDay, placesByKey, tripsByKey, totalDaysByCountry, daysByCountry, daysByCountryByMonthByYear } =
    getDataFromTrips(nomadsData.trips);

  const sortedDates = Object.keys(dataByDay) as DateYYYYMMDD[];

  setIntegration({
    status: 'ready',
    integration: {
      type: 'nomads.com',
      integrationCode: username,
      lastUpdate: Date.now(),
    },
    date: {
      from: sortedDates.at(-1),
      to: sortedDates.at(0),
    },
    totalDaysByCountry,
    daysByCountry,
    dataByDay,
    daysByCountryByMonthByYear,
    placesByKey,
    tripsByKey,
  });

  const homeCountries = Object.entries(daysByCountry)
    .filter(([, activeDays]) => (activeDays || []).length >= 365)
    .map(([countryCode]) => countryCode);

  setHomeCountriesCodes(homeCountries);
  setDateFilter(undefined, undefined);

  return { isSuccess: true };
};
