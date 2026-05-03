import useFiltersStore from '@/features/filters/stores/useFilterStore';
import useDataStore from '@/features/settings/stores/useDateStore';

export const getCurrentSetupLink = () => {
  const dataStore = useDataStore.getState();
  const filterStore = useFiltersStore.getState();

  // Currently only nomads.com is supported
  const username = dataStore.integration.integrationCode;

  let hash = `#u:${username}`;

  if (filterStore.activeFilters.homeCountriesCodes.length > 0) {
    hash += `&h:${filterStore.activeFilters.homeCountriesCodes.join('-')}`;
  }

  const currentHref = location.href.split('#').at(0);

  return `${currentHref}${hash}`;
};
