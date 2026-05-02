import i18nEn from '@/locales/en.json';

import type { IntegrationNomadsTrip } from '../get-data-from-trips';

const countryByLocation: { [location: string]: string | undefined } = {
  'Sri Lanka': 'lk',
  Malta: 'mt',
  'Costa Rica': 'cr',
  Curaçao: 'cw',
  Seychelles: 'sc',
  Martinique: 'fr',
  Malé: 'mv',
  Cyprus: 'cy',
  Paraguay: 'py',
  Belize: 'bz',
  Tajikistan: 'tj',
  Morocco: 'ma',
  Tachileik: 'mm',
  'Sint Maarten': 'sx',
  'Saint Lucia': 'lc',
  'Antigua and Barbuda': 'ag',
  Carcassonne: 'fr',
  Colombia: 'co',
  Botswana: 'bw',
  Uganda: 'ug',
  Rwanda: 'rw',
  'Isle of Man': 'im',
  Newark: 'us',
  'Denver City': 'us',
  'El Salvador': 'sv',
  Italy: 'it',
};

const countryByCountry: { [place: string]: string | undefined } = {
  ia: 'ir',
};

export const getCountryCodeFromTrip = (trip: IntegrationNomadsTrip): string => {
  const place = trip.place || '';
  const country = trip.country || '';

  if (countryByLocation[place]) {
    return countryByLocation[place] as string;
  }

  if (countryByLocation[country]) {
    return countryByLocation[country] as string;
  }

  const countryCodeFromTrip = trip.country_code.toLowerCase();

  if (countryCodeFromTrip) {
    return countryByCountry[countryCodeFromTrip] ?? countryCodeFromTrip;
  }

  const countryKeyFromI18n = Object.entries(i18nEn).find(([, value]) => [place, country].includes(value));

  if (countryKeyFromI18n) {
    const countryCodeFromI18n = countryKeyFromI18n[0].split('.').at(-1);

    if (countryCodeFromI18n) {
      return countryCodeFromI18n;
    }
  }

  console.error(`Missing flag for trip.`, trip);

  return '';
};
