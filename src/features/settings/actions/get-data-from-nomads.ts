import {
  setDateFilter,
  setHomeCountriesCodes,
} from "@/features/filters/stores/useFilterStore";
import { setIntegration } from "../stores/useDateStore";
import {
  getDataFromTrips,
  type IntegrationNomadsTrip,
} from "./nomads/get-data-from-trips";
import type { DateYYYYMMDD } from "@/types";

type Params = {
  username: string;
};

type IntegrationNomadsApiResponse = {
  trips: IntegrationNomadsTrip[];
};

export const getDataFromNomads = async ({ username }: Params) => {
  if (!username) {
    return;
  }

  const response = (await fetch(`https://nomads.com/@${username}.json`).then(
    (response) => response.json(),
  )) as unknown as IntegrationNomadsApiResponse;

  const { dataByDay, placesByKey, tripsByKey, totalDaysByCountry } =
    getDataFromTrips(response.trips);

  const mostCommonCountry = Object.entries(totalDaysByCountry).reduce(
    (stack, [countryCode, totalDays = 0]) => {
      if (stack.totalDays < totalDays) {
        stack.countryCode = countryCode;
        stack.totalDays = totalDays;
      }
      return stack;
    },
    {
      countryCode: "",
      totalDays: 0,
    },
  );

  const sortedDates = Object.keys(dataByDay) as DateYYYYMMDD[];

  setIntegration({
    status: "ready",
    integration: {
      type: "nomads.com",
      lastUpdate: Date.now(),
    },
    date: {
      from: sortedDates.at(-1),
      to: sortedDates.at(0),
    },
    totalDaysByCountry,
    dataByDay,
    placesByKey,
    tripsByKey,
  });

  if (mostCommonCountry.countryCode) {
    setHomeCountriesCodes([mostCommonCountry.countryCode]);
  }

  setDateFilter(undefined, undefined);

  return response;
};
