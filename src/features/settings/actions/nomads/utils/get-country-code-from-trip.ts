import type { IntegrationNomadsTrip } from "../get-data-from-trips";

const countryByPlace: { [place: string]: string | undefined } = {
  "Sri Lanka": "lk",
  Malta: "mt",
  "Costa Rica": "cr",
  Curaçao: "cw",
  Seychelles: "sc",
  Martinique: "fr",
  Malé: "mv",
  Cyprus: "cy",
  Paraguay: "py",
};

export const getCountryCodeFromTrip = (trip: IntegrationNomadsTrip): string => {
  if (typeof trip.place === "string" && countryByPlace[trip.place]) {
    return countryByPlace[trip.place] as string;
  }

  console.error(`Missing flag for trip.`, trip);

  return "";
};
