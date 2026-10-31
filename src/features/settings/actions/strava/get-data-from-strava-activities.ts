import { isBefore } from 'date-fns/isBefore';

import type { DateYYYYMMDD } from '@/types';
import { mergeUnique } from '@/utils/array';

import { getDateRange, getDateWithoutYear, stringDateToObject } from '../../../../utils/date';
import type { DataStoreState } from '../../stores/useDateStore';
import { getPlaceKey } from '../../utils/get-place-key';
import type { IntegrationStravaActivity } from './types';

export type IntegrationNomadsTrip = {
  id: string;
  date_start: DateYYYYMMDD;
  date_end: DateYYYYMMDD;
  place: string;
  country_code: string;
  country: string;
  latitude?: number | undefined;
  longitude?: number | undefined;
};

type TotalDaysByCountry = {
  [countryCode: string]: number;
};

type Response = Pick<
  DataStoreState,
  'placesByKey' | 'dataByDay' | 'tripsByKey' | 'daysByCountry' | 'daysByCountryByMonthByYear' | 'unlockingDateByCountry'
> & {
  totalDaysByCountry: TotalDaysByCountry;
};

export const getDataFromStravaActivities = (items: IntegrationStravaActivity[]): Response => {
  const unlockedCountries = new Set<string>();

  // Activity can be in multiple countries, that separates them
  const itemsToUse = items.reduce((stack: IntegrationStravaActivity[], item) => {
    (item.country_codes || []).forEach((countryCode) => {
      if (countryCode) {
        stack.push({
          ...item,
          country_codes: [countryCode],
          latitude: item.coordinatesByCountry[countryCode]?.latitude || item.latitude,
          longitude: item.coordinatesByCountry[countryCode]?.longitude || item.longitude,
        });
      }
    });

    return stack;
  }, []);

  // Sort by start date, then by end date (longest trips first) when start dates match.
  return itemsToUse
    .sort((a, b) => (isBefore(a.date_end, b.date_end) ? 1 : -1))
    .sort((a, b) => (isBefore(a.date_start, b.date_start) ? -1 : 1))
    .reduce(
      (stack: Response, item) => {
        const dates = getDateRange(item.date_start, item.date_end);
        const countryCode = item?.country_codes?.at(-1);

        if (!countryCode) {
          return stack;
        }

        const placeKey = getPlaceKey({
          place: countryCode,
          country: countryCode,
        });

        if (!stack.placesByKey[placeKey]) {
          stack.placesByKey[placeKey] = {
            key: placeKey,
            name: item.place,
            country: countryCode,
            latitude: item.latitude,
            longitude: item.longitude,
            tripsKeys: [],
          };
        }

        stack.placesByKey[placeKey].tripsKeys = [...stack.placesByKey[placeKey].tripsKeys, item.id];

        if (!stack.tripsByKey[item.id]) {
          stack.tripsByKey[item.id] = {
            key: item.id,
            placeKey: placeKey,
            countryCode: countryCode,
            from: item.date_start,
            to: item.date_end,
            days: dates.length,
          };
        }

        dates.forEach((date) => {
          const dayWithoutYear = getDateWithoutYear(date);

          if (!stack.dataByDay[date]) {
            stack.dataByDay[date] = {
              date,
              countriesCodes: [],
              countriesUnlockedThisDay: [],
              placeKeys: [],
              tripsKeys: [],
            };
          }

          stack.daysByCountry[countryCode] = mergeUnique(stack.daysByCountry[countryCode], [dayWithoutYear]);

          const { year, month } = stringDateToObject(date);

          if (!year) {
            return stack;
          }

          if (!stack.daysByCountryByMonthByYear[year]) {
            stack.daysByCountryByMonthByYear[year] = {};
          }

          if (!stack.daysByCountryByMonthByYear[year][month]) {
            stack.daysByCountryByMonthByYear[year][month] = {};
          }

          stack.daysByCountryByMonthByYear[year][month][countryCode] = mergeUnique(
            stack.daysByCountryByMonthByYear[year][month][countryCode],
            [dayWithoutYear],
          );

          stack.dataByDay[date].tripsKeys = mergeUnique(stack.dataByDay[date].tripsKeys, [item.id]);

          if (!stack.dataByDay[date].countriesCodes.includes(countryCode)) {
            stack.dataByDay[date].countriesCodes.push(countryCode);

            stack.totalDaysByCountry[countryCode] = (stack.totalDaysByCountry?.[countryCode] || 0) + 1;
          }

          if (!unlockedCountries.has(countryCode)) {
            unlockedCountries.add(countryCode);
            stack.dataByDay[date].countriesUnlockedThisDay.push(countryCode);
            stack.unlockingDateByCountry[countryCode] = date;
          }

          if (!stack.dataByDay[date].placeKeys.includes(placeKey)) {
            stack.dataByDay[date].placeKeys.push(placeKey);
          }
        });

        return stack;
      },
      {
        placesByKey: {},
        dataByDay: {},
        tripsByKey: {},
        totalDaysByCountry: {},
        daysByCountry: {},
        daysByCountryByMonthByYear: {},
        unlockingDateByCountry: {},
      },
    );
};
