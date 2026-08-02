import { resetFilterStore } from '@/features/filters/stores/useFilterStore';
import { resetPreferencesStore } from '@/features/preferences/stores/usePreferencesStore';
import { resetDataStore } from '@/features/settings/stores/useDateStore';

export const refreshStore = () => {
  resetDataStore();
  resetFilterStore();
  resetPreferencesStore();
};

export const forceRefresh = () => {
  const currentLocation = location.href;
  if (currentLocation.includes('wasRefreshed=1')) {
    return;
  }

  refreshStore();

  setTimeout(() => {
    location.href = `${currentLocation.split('?').at(0)}?wasRefreshed=1`;
  }, 5);
};
