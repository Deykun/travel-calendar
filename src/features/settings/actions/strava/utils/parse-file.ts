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

const processFileContent = (fileContent): IntegrationStravaActivity | undefined => {
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

        // console.log({ time });
        //   let altitude = rawPoint.querySelector('ele') !== null ? rawPoint.querySelector('ele').textContent : 0;

        console.log(latitude, longitude);
        if (latitude && longitude) {
          activityLatitude = Number(latitude);
          activityLongitude = Number(longitude);

          const countryCode = lookup(latitude, longitude, true);

          // console.log(y);

          if (countryCode) {
            visitedCountries.push(countryCode.toLowerCase());
          }
        }
      }

      //   if (latitude !== null && longitude !== null) {
      //     let newPoint = createPoint(latitude, longitude, time, altitude);
      //     points.push(newPoint);
      //   }
    });

    // if (points.length > 0) {
    //   fragments.push(points);
    //   points = [];
    // }
  });

  if (date_start && date_end) {
    return {
      id: 'ss',
      date_start,
      date_end,
      place: visitedCountries.at(-1) ?? '',
      country_codes: visitedCountries,
      latitude: activityLatitude,
      longitude: activityLongitude,
    };
  }

  // return trackData;
  return;
};

export const readFile = (file: File) => {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => {
      console.warn('File on abort.');
      return resolve();
    };
    reader.onerror = () => {
      console.warn('File on error.');
      return resolve();
    };

    reader.readAsBinaryString(file);

    reader.onloadend = () => {
      const fileContent = reader.result;
      const activity = processFileContent(fileContent);
      console.log(activity);
      //   track.status = 'success';
      return resolve();
    };
  });
};
