import type { DateLike, DateYYYYMMDD } from '@/types';
import { getSpreadIndexes } from '@/utils/array';
import { getAppDateIfPossible, getDaysBetweenDates } from '@/utils/date';
import { createLocationFinder, getCountryCodeFromStringIfPossible } from '@/utils/location';

import type { IntegrationStravaActivity } from '../types';
import { STRAVA_PREFLIGHT_POINTS_TO_CHECK } from './constants';

const locationFinder = createLocationFinder();

export type ParseFileMode = 'preflight' | 'allPoints';

export type TrackPoint = {
  latitude?: number | undefined;
  longitude?: number | undefined;
  time?: DateLike | null | undefined;
};

// Shared by GPX / FIT parsers. toPoint runs only for sampled points in 'preflight' mode,
// so expensive per-point work (DOM queries) stays lazy.
export const buildActivity = <T extends object>(
  id: string,
  rawPoints: T[],
  toPoint: (rawPoint: T) => TrackPoint,
  mode: ParseFileMode,
): IntegrationStravaActivity | undefined => {
  const pointsToCheck =
    mode === 'preflight'
      ? getSpreadIndexes(rawPoints.length, STRAVA_PREFLIGHT_POINTS_TO_CHECK)
          .map((index) => rawPoints[index])
          .filter((rawPoint): rawPoint is T => rawPoint !== undefined)
      : rawPoints;

  let date_start: DateYYYYMMDD | undefined;
  let date_end: DateYYYYMMDD | undefined;
  let activityLatitude: number | undefined;
  let activityLongitude: number | undefined;
  const visitedCountries = new Set<string>();
  const coordinatesByCountry: IntegrationStravaActivity['coordinatesByCountry'] = {};

  pointsToCheck.forEach((rawPoint) => {
    const { latitude, longitude, time } = toPoint(rawPoint);

    const date = getAppDateIfPossible(time ?? undefined);

    if (date) {
      date_start = date_start ?? date;
      date_end = date; // last checked point wins
    }

    if (latitude !== undefined && longitude !== undefined) {
      // first point with coords is the activity location
      activityLatitude = activityLatitude ?? latitude;
      activityLongitude = activityLongitude ?? longitude;

      locationFinder.getCountries(latitude, longitude).forEach((countryCode) => {
        const verifiedCountry = getCountryCodeFromStringIfPossible(countryCode);

        if (verifiedCountry && !visitedCountries.has(verifiedCountry)) {
          visitedCountries.add(verifiedCountry);
          // first point in a new country is that country's location
          coordinatesByCountry[verifiedCountry] = { latitude, longitude };
        }
      });
    }
  });

  if (date_start && date_end) {
    const daysBetween = getDaysBetweenDates(date_start, date_end);
    if (daysBetween > 10) {
      console.error('Rejected the activity because it was ridiculously long.', {
        id,
        date_start,
        date_end,
      });

      return;
    }

    const isStartOf2000 = date_start === '2000-01-01';
    if (isStartOf2000) {
      console.error('Rejected the activity because it is 2000-01-01 (Endomondo broken time).', {
        id,
        date_start,
        date_end,
      });

      return;
    }

    return {
      id,
      date_start,
      date_end,
      place: '',
      country_codes: [...visitedCountries],
      latitude: activityLatitude,
      longitude: activityLongitude,
      coordinatesByCountry,
    };
  }

  return;
};
