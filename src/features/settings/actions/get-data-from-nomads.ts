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

  const {
    dataByDay,
    placesByKey,
    tripsByKey,
    totalDaysByCountry,
    daysByCountry,
    daysByCountryByMonthByYear,
  } = getDataFromTrips(response.trips);

  const sortedDates = Object.keys(dataByDay) as DateYYYYMMDD[];

  setIntegration({
    status: "ready",
    integration: {
      type: "nomads.com",
      integrationCode: username,
      lastUpdate: Date.now(),
    },
    date: {
      from: sortedDates.at(-1),
      to: sortedDates.at(0),
    },
    totalDaysByCountry,
    daysByCountry,
    dataByDay,
    daysByCountryByMonthByYear,
    placesByKey,
    tripsByKey,
  });

  const homeCountries = Object.entries(daysByCountry)
    .filter(([, activeDays]) => (activeDays || []).length >= 365)
    .map(([countryCode]) => countryCode);

  setHomeCountriesCodes(homeCountries);
  setDateFilter(undefined, undefined);

  return response;
};
