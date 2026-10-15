import { setDateFilter, setHomeCountriesCodes } from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';

import { APP_VERSION, setIntegration } from '../stores/useDateStore';
import type { IntegrationStravaActivity } from './strava/types';

type Params = {
  username: string;
};

type IntegrationStravaResponse = {
  trips: IntegrationStravaActivity[];
};

type FetchResponse = { isSuccess: true } | { isSuccess: false; reason: string };

export const getDataFromStrava = async ({ username }: Params): Promise<FetchResponse> => {
  if (!username) {
    return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
  }

  let StravaData: IntegrationStravaResponse | undefined;

  try {
    const response = await fetch(`https://Strava.com/@${username}.json`);

    if (!response.ok) {
      return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
    }

    StravaData = (await response.json()) as IntegrationStravaResponse;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  if (!StravaData) {
    return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
  }

  const { dataByDay, placesByKey, tripsByKey, totalDaysByCountry, daysByCountry, daysByCountryByMonthByYear } =
    getDataFromNomadsTrips(StravaData.trips);

  const sortedDates = Object.keys(dataByDay) as DateYYYYMMDD[];

  setIntegration({
    version: APP_VERSION,
    status: 'ready',
    integration: {
      type: 'Strava.com',
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
