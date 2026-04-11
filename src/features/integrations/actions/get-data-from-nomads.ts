import { setHomeCountriesCodes } from "@/features/filters/stores/use-filter-store";
import { setIntegration } from "../stores/use-data-store";
import {
  getDataFromTrips,
  type IntegrationNomadsTrip,
} from "./nomads/get-data-from-trips";

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

  const { dataByDay, placesByKey, totalDaysByCountry } = getDataFromTrips(
    response.trips,
  );

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

  setIntegration({
    status: "ready",
    integration: {
      type: "nomads.com",
      lastUpdate: Date.now(),
    },
    totalDaysByCountry,
    dataByDay,
    placesByKey,
  });

  if (mostCommonCountry.countryCode) {
    setHomeCountriesCodes([mostCommonCountry.countryCode]);
  }

  return response;
};
