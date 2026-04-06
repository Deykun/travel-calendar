import { getDateRange } from "../../../../utils/date";
import type { DataStoreState } from "../../stores/use-data-store";
import { getPlaceKey } from "../../utils/get-place-key";

export type IntegrationNomadsTrip = {
  date_start: string;
  date_end: string;
  place: string;
  country_code: string;
  latitude?: number | undefined;
  longitude?: number | undefined;
};

type Response = Pick<DataStoreState, "placesByKey" | "dataByDay">;

export const getDataFromTrips = (trips: IntegrationNomadsTrip[]): Response => {
  return trips.reduce(
    (stack: Response, trip) => {
      const dates = getDateRange(trip.date_start, trip.date_end);
      const country = trip.country_code.toLowerCase();

      dates.forEach((date) => {
        const placeKey = getPlaceKey({
          place: trip.place,
          country: trip.country_code,
        });

        if (!stack.placesByKey[placeKey]) {
          stack.placesByKey[placeKey] = {
            key: placeKey,
            name: trip.place,
            country,
            latitude: trip.latitude,
            longitude: trip.longitude,
          };
        }

        if (!stack.dataByDay[date]) {
          stack.dataByDay[date] = {
            date,
            countriesCodes: [],
            placeKeys: [],
          };
        }

        if (!stack.dataByDay[date].countriesCodes.includes(country)) {
          stack.dataByDay[date].countriesCodes.push(country);
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
    },
  );
};
