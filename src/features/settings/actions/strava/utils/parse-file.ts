// https://github.com/Deykun/react-scieski/blob/master/src/utils/tracks.js
import lookup from 'coordinate_to_country';

import type { DateYYYYMMDD } from '@/types';
import { getAppDateIfPossible } from '@/utils/date';

import type { IntegrationStravaActivity } from '../types';

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

const processFileContent = (id: string, fileContent): IntegrationStravaActivity | undefined => {
  const xmlParser = new DOMParser();
  const xmlFileContent = xmlParser.parseFromString(fileContent, 'text/xml');

  let date_start: DateYYYYMMDD | undefined;
  let date_end: DateYYYYMMDD | undefined;
  let activityLatitude: number | undefined;
  let activityLongitude: number | undefined;
  const visitedCountries: string[] = [];

  const rawFragmentsGPS = [...xmlFileContent.querySelectorAll('trkseg')]; // [...] to change NodeList to Array

  rawFragmentsGPS.forEach((rawFragment) => {
    const rawPointsGPX = [...rawFragment.querySelectorAll('trkpt')]; // [...] to change NodeList to Array

    rawPointsGPX.forEach((rawPoint, index) => {
      // export const getAppDateIfPossible = (date: DateLike): DateYYYYMMDD | undefined => {

      if (visitedCountries.length === 0) {
        const latitude = rawPoint.getAttribute('lat') !== null ? rawPoint.getAttribute('lat') : null;
        const longitude = rawPoint.getAttribute('lon') !== null ? rawPoint.getAttribute('lon') : null;

        if (!date_start) {
          const time = rawPoint.querySelector('time')?.textContent;
          const date = getAppDateIfPossible(time);
          if (date) {
            date_start = date;
            date_end = date;
          }
        } else {
          if (index === rawPointsGPX.length - 1) {
            const time = rawPoint.querySelector('time')?.textContent;
            const date = getAppDateIfPossible(time);
            if (date) {
              date_end = date;
            }
          }
        }

        if (latitude && longitude) {
          activityLatitude = Number(latitude);
          activityLongitude = Number(longitude);

          const countryCodes = (lookup(latitude, longitude, true) || []) as string[];

          if (countryCodes.length > 0) {
            visitedCountries.push(...countryCodes.map((countryCodes) => countryCodes.toLowerCase()));
          }
        }
      }
    });
  });

  if (date_start && date_end) {
    return {
      id,
      date_start,
      date_end,
      place: visitedCountries.at(-1) ?? '',
      country_codes: visitedCountries,
      latitude: activityLatitude,
      longitude: activityLongitude,
    };
  }

  return;
};

export const readFile = (file: File): Promise<IntegrationStravaActivity | undefined> => {
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
      const activity = processFileContent(file.name, fileContent);
      resolve(activity);
    };
  });
};
