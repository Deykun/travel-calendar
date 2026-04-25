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
  Belize: "bz",
  Tajikistan: "tj",
  Morocco: "ma",
};

const countryByCountry: { [place: string]: string | undefined } = {
  ia: "ir",
};

export const getCountryCodeFromTrip = (trip: IntegrationNomadsTrip): string => {
  if (typeof trip.place === "string" && countryByPlace[trip.place]) {
    return countryByPlace[trip.place] as string;
  }

  const countryCodeFromTrip = trip.country_code.toLowerCase();

  if (countryCodeFromTrip) {
    return countryByCountry[countryCodeFromTrip] ?? countryCodeFromTrip;
  }

  console.error(`Missing flag for trip.`, trip);

  return "";
};
