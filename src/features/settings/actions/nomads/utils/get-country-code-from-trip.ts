import { getCountryCodeFromStringIfPossible } from '@/utils/location';

import type { IntegrationNomadsTrip } from '../get-data-from-nomads-trips';

export const getCountryCodeFromTrip = (trip: IntegrationNomadsTrip): string => {
  const countryCode =
    getCountryCodeFromStringIfPossible(trip.place) ||
    getCountryCodeFromStringIfPossible(trip.country) ||
    getCountryCodeFromStringIfPossible(trip.country_code) ||
    '';

  return countryCode;
};
