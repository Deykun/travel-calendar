import type { DataStoreState } from '../../../stores/useDateStore';

const FULL_YEAR_DAYS = 365;

// Home = every country with a full year of active days; none → the single most active country
export const getHomeCountriesForStrava = (daysByCountry: DataStoreState['daysByCountry']): string[] => {
  const countriesByActiveDays = Object.entries(daysByCountry)
    .map(([countryCode, activeDays]) => ({ countryCode, activeDays: (activeDays || []).length }))
    .sort((a, b) => b.activeDays - a.activeDays);

  const fullYearCountries = countriesByActiveDays.filter(({ activeDays }) => activeDays >= FULL_YEAR_DAYS);
  const topCountry = countriesByActiveDays.at(0);

  const homeCountries = fullYearCountries.length > 0 ? fullYearCountries : topCountry ? [topCountry] : [];

  return homeCountries.map(({ countryCode }) => countryCode);
};
