import { setDateFilter, setHomeCountriesCodes } from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';

import { APP_VERSION, setIntegration } from '../stores/useDateStore';
import { getDataFromStravaActivities } from './strava/get-data-from-strava-activities';
import { parseStravaFiles } from './strava/parse-strava-files';
import type { IntegrationStravaActivity } from './strava/types';

type Params = {
  files: File[];
};

type FetchResponse = { isSuccess: true } | { isSuccess: false; reason: string };

export const getDataFromStrava = async ({ files }: Params): Promise<FetchResponse> => {
  if (!files.length) {
    return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
  }

  let activities: IntegrationStravaActivity[] | undefined;

  try {
    activities = await parseStravaFiles(files);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  console.log('activities', activities);

  if (!activities) {
    return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
  }

  const { dataByDay, placesByKey, tripsByKey, totalDaysByCountry, daysByCountry, daysByCountryByMonthByYear } =
    getDataFromStravaActivities(activities);

  const sortedDates = Object.keys(dataByDay) as DateYYYYMMDD[];

  setIntegration({
    version: APP_VERSION,
    status: 'ready',
    integration: {
      type: 'gpx',
      integrationCode: '',
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
