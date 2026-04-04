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

  console.log(response);

  const x = getDataFromTrips(response.trips);

  // getPlaceKey

  console.log(x);

  return response;
};
