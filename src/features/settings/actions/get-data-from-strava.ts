import { setDateFilter, setHomeCountriesCodes } from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';

import { APP_VERSION, setIntegration } from '../stores/useDateStore';
import { getDataFromStravaActivities } from './strava/get-data-from-strava-activities';
import { parseStravaFiles } from './strava/parse-strava-files';
import type { IntegrationStravaActivity } from './strava/types';
import { flattenActivities } from './strava/utils/flatten-activities';
import { getHomeCountriesForStrava } from './strava/utils/get-home-countries-for-strava';

type Params = {
  files: File[];
};

type FetchResponse = { isSuccess: true } | { isSuccess: false; reason: string };

const setStoreWithActivities = (activities: IntegrationStravaActivity[]) => {
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

  setHomeCountriesCodes(getHomeCountriesForStrava(daysByCountry));
  setDateFilter(undefined, undefined);
};

export const getDataFromStrava = async ({ files }: Params): Promise<FetchResponse> => {
  if (!files.length) {
    return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
  }

  let activities: IntegrationStravaActivity[] = [];

  try {
    activities = await parseStravaFiles(files, 'firstCountry');
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }

  if (activities.length === 0) {
    return { isSuccess: false, reason: 'integration.errors.unableToFetch' };
  }

  const activitiesToUse = flattenActivities(activities);

  setStoreWithActivities(activitiesToUse);

  // activities = await parseStravaFiles(files, 'allCountries');

  // const hasActivityWithMultipleCountries = activities.some((activity) => activity.country_codes.length > 1);
  // if (hasActivityWithMultipleCountries) {
  //   setStoreWithActivities(activities);
  // }

  return { isSuccess: true };
};
