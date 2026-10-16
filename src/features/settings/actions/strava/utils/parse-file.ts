// https://github.com/Deykun/react-scieski/blob/master/src/utils/tracks.js
import type { DateYYYYMMDD } from '@/types';
import { filterEmpty, getSpreadIndexes } from '@/utils/array';
import { getAppDateIfPossible } from '@/utils/date';
import { createLocationFinder } from '@/utils/location';

import type { IntegrationStravaActivity } from '../types';
import { STRAVA_PREFLIGHT_POINTS_TO_CHECK } from './constants';

const locationFinder = createLocationFinder();

export type ParseFileMode = 'preflight' | 'allPoints';

export const createPoint = ({
  latitude,
  longitude,
  time,
  altitude = 0,
}: {
  latitude: number;
  longitude: number;
  time: string;
  altitude: number;
}) => {
  return { latitude: Number(latitude), longitude: Number(longitude), time: time, altitude: Number(altitude) };
};

const processFileContent = (id: string, fileContent, mode: ParseFileMode): IntegrationStravaActivity | undefined => {
  const xmlParser = new DOMParser();
  const xmlFileContent = xmlParser.parseFromString(fileContent, 'text/xml');

  let date_start: DateYYYYMMDD | undefined;
  let date_end: DateYYYYMMDD | undefined;
  let activityLatitude: number | undefined;
  let activityLongitude: number | undefined;
  const visitedCountries = new Set<string>();

  const rawPointsGPX = [...xmlFileContent.querySelectorAll('trkpt')];

  const pointsToCheck =
    mode === 'preflight'
      ? getSpreadIndexes(rawPointsGPX.length, STRAVA_PREFLIGHT_POINTS_TO_CHECK)
          .map((index) => rawPointsGPX[index])
          .filter(filterEmpty)
      : rawPointsGPX;

  pointsToCheck.forEach((rawPoint) => {
    const date = getAppDateIfPossible(rawPoint.querySelector('time')?.textContent);
    if (date) {
      date_start = date_start ?? date;
      date_end = date; // last checked point wins
    }

    const latitude = rawPoint.getAttribute('lat');
    const longitude = rawPoint.getAttribute('lon');

    if (latitude && longitude) {
      // first point with coords is the activity location
      activityLatitude = activityLatitude ?? Number(latitude);
      activityLongitude = activityLongitude ?? Number(longitude);

      locationFinder.getCountries(Number(latitude), Number(longitude)).forEach((countryCode) => {
        visitedCountries.add(countryCode.toLowerCase());
      });
    }
  });

  if (date_start && date_end) {
    return {
      id,
      date_start,
      date_end,
      place: '',
      country_codes: [...visitedCountries],
      latitude: activityLatitude,
      longitude: activityLongitude,
    };
  }

  return;
};

export const readFile = (file: File, mode: ParseFileMode): Promise<IntegrationStravaActivity | undefined> => {
  return new Promise<IntegrationStravaActivity | undefined>((resolve) => {
    const reader = new FileReader();
    reader.onabort = () => {
      console.warn('File on abort.');
      return resolve(undefined);
    };
    reader.onerror = () => {
      console.warn('File on error.');
      return resolve(undefined);
    };

    reader.readAsBinaryString(file);

    reader.onloadend = () => {
      const fileContent = reader.result;
      const activity = processFileContent(file.name, fileContent, mode);
      resolve(activity);
    };
  });
};
