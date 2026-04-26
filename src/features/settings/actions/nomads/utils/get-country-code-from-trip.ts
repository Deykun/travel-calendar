import type { IntegrationNomadsTrip } from "../get-data-from-trips";

const countryByLocation: { [location: string]: string | undefined } = {
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
  Tachileik: "mm",
  "Sint Maarten": "sx",
  "Saint Lucia": "lc",
  "Antigua and Barbuda": "ag",
  Carcassonne: "fr",
  Colombia: "co",
  Botswana: "bw",
  Uganda: "ug",
  Rwanda: "rw",
  "Isle of Man": "im",
  Newark: "us",
  "Denver City": "us",
  "El Salvador": "sv",
  Italy: "it",
};

const countryByCountry: { [place: string]: string | undefined } = {
  ia: "ir",
};

export const getCountryCodeFromTrip = (trip: IntegrationNomadsTrip): string => {
  if (typeof trip.place === "string" && countryByLocation[trip.place]) {
    return countryByLocation[trip.place] as string;
  }

  if (typeof trip.country === "string" && countryByLocation[trip.country]) {
    return countryByLocation[trip.country] as string;
  }

  const countryCodeFromTrip = trip.country_code.toLowerCase();

  if (countryCodeFromTrip) {
    return countryByCountry[countryCodeFromTrip] ?? countryCodeFromTrip;
  }

  console.error(`Missing flag for trip.`, trip);

  return "";
};
