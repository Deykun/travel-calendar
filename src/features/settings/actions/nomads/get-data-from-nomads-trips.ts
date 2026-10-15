import { isBefore } from 'date-fns/isBefore';

import type { DateYYYYMMDD } from '@/types';
import { mergeUnique } from '@/utils/array';

import { getDateRange, getDateWithoutYear, stringDateToObject } from '../../../../utils/date';
import type { DataStoreState } from '../../stores/useDateStore';
import { getPlaceKey } from '../../utils/get-place-key';
import { getCountryCodeFromTrip } from './utils/get-country-code-from-trip';

export type IntegrationNomadsTrip = {
  trip_id: string;
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
  'placesByKey' | 'dataByDay' | 'tripsByKey' | 'daysByCountry' | 'daysByCountryByMonthByYear'
> & {
  totalDaysByCountry: TotalDaysByCountry;
};

export const getDataFromNomadsTrips = (items: IntegrationNomadsTrip[]): Response => {
  const unlockedCountries = new Set<string>();

  return items
    .sort((a, b) => (isBefore(a.date_start, b.date_start) ? -1 : 1))
    .reduce(
      (stack: Response, item) => {
        const dates = getDateRange(item.date_start, item.date_end);
        const countryCode = getCountryCodeFromTrip(item) || '??';
        // nomads quirky location
        if (countryCode === 'void') {
          return stack;
        }

        const placeKey = getPlaceKey({
          place: item.place,
          country: item.country_code,
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

        stack.placesByKey[placeKey].tripsKeys = [...stack.placesByKey[placeKey].tripsKeys, item.trip_id];

        if (!stack.tripsByKey[item.trip_id]) {
          stack.tripsByKey[item.trip_id] = {
            key: item.trip_id,
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

          stack.dataByDay[date].tripsKeys = mergeUnique(stack.dataByDay[date].tripsKeys, [item.trip_id]);

          if (!stack.dataByDay[date].countriesCodes.includes(countryCode)) {
            stack.dataByDay[date].countriesCodes.push(countryCode);

            stack.totalDaysByCountry[countryCode] = (stack.totalDaysByCountry?.[countryCode] || 0) + 1;
          }

          if (!unlockedCountries.has(countryCode)) {
            unlockedCountries.add(countryCode);
            stack.dataByDay[date].countriesUnlockedThisDay.push(countryCode);
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
      },
    );
};
