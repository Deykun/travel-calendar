import { resetFilterStore } from '@/features/filters/stores/useFilterStore';
import { resetPreferencesStore } from '@/features/preferences/stores/usePreferencesStore';
import { resetDataStore } from '@/features/settings/stores/useDateStore';

export const refreshStore = () => {
  resetDataStore();
  resetFilterStore();
  resetPreferencesStore();
};

const WAS_REFRESHED_KEY = 'TRAVEL_CALENDAR_WAS_REFRESHED';

export const forceRefresh = () => {
  if (sessionStorage.getItem(WAS_REFRESHED_KEY) === 'true') {
    return;
  }

  sessionStorage.setItem(WAS_REFRESHED_KEY, 'true');
  refreshStore();

  setTimeout(() => {
    location.reload();
  }, 5);
};
