import type { DateYYYYMMDD } from "@/types";
import { getDateRange } from "../../../../utils/date";
import type { DataStoreState } from "../../stores/useDateStore";
import { getPlaceKey } from "../../utils/get-place-key";
import { getCountryCodeFromTrip } from "./utils/get-country-code-from-trip";

export type IntegrationNomadsTrip = {
  trip_id: string;
  date_start: DateYYYYMMDD;
  date_end: DateYYYYMMDD;
  place: string;
  country_code: string;
  latitude?: number | undefined;
  longitude?: number | undefined;
};

type TotalDaysByCountry = {
  [countryCode: string]: number;
};

type Response = Pick<
  DataStoreState,
  "placesByKey" | "dataByDay" | "tripsByKey"
> & {
  totalDaysByCountry: TotalDaysByCountry;
};

export const getDataFromTrips = (trips: IntegrationNomadsTrip[]): Response => {
  return trips.reduce(
    (stack: Response, trip) => {
      const dates = getDateRange(trip.date_start, trip.date_end);
      const countryCode =
        trip.country_code.toLowerCase() || getCountryCodeFromTrip(trip) || '??';

      const placeKey = getPlaceKey({
        place: trip.place,
        country: trip.country_code,
      });

      if (!stack.placesByKey[placeKey]) {
        stack.placesByKey[placeKey] = {
          key: placeKey,
          name: trip.place,
          country: countryCode,
          latitude: trip.latitude,
          longitude: trip.longitude,
          tripsKeys: [],
        };
      }

      stack.placesByKey[placeKey].tripsKeys = [
        ...stack.placesByKey[placeKey].tripsKeys,
        trip.trip_id,
      ];

      if (!stack.tripsByKey[trip.trip_id]) {
        stack.tripsByKey[trip.trip_id] = {
          key: trip.trip_id,
          placeKey: placeKey,
          countryCode: countryCode,
          from: trip.date_start,
          to: trip.date_end,
          days: dates.length,
        };
      }

      dates.forEach((date) => {
        if (!stack.dataByDay[date]) {
          stack.dataByDay[date] = {
            date,
            countriesCodes: [],
            placeKeys: [],
            tripsKeys: [],
          };
        }

        stack.dataByDay[date].tripsKeys = [
          ...stack.dataByDay[date].tripsKeys,
          trip.trip_id,
        ];

        if (!stack.dataByDay[date].countriesCodes.includes(countryCode)) {
          stack.dataByDay[date].countriesCodes.push(countryCode);

          stack.totalDaysByCountry[countryCode] =
            (stack.totalDaysByCountry?.[countryCode] || 0) + 1;
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
    },
  );
};
