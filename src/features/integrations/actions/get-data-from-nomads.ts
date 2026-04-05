import { setIntegration } from "../stores/use-data-store";
import { getSummaryFromDay } from "../utils/get-summary-from-day";
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

  const { dataByDay, placesByKey } = getDataFromTrips(response.trips);

  const { summaryByDay, summaryByMonth, summary } =
    getSummaryFromDay(dataByDay);

  setIntegration({
    status: "ready",
    integration: {
      type: "nomads.com",
      lastUpdate: Date.now(),
    },
    summary,
    summaryByDay,
    summaryByMonth,
    dataByDay,
    placesByKey,
  });

  return response;
};
