import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type PreferencesStoreState = {
  calendar: {
    counterShouldShow: 'numberOfCountries' | 'yearsAbroad';
    shouldCounterUseScale: boolean;
    shouldHighlightAbroadTravel: boolean;
  };
  sidebars: {
    shouldShowHome: boolean;
  };
};

const emptyStore: PreferencesStoreState = {
  calendar: {
    counterShouldShow: 'numberOfCountries',
    shouldCounterUseScale: false,
    shouldHighlightAbroadTravel: false,
  },
  sidebars: {
    shouldShowHome: false,
  },
};

export const usePreferencesStore = create<PreferencesStoreState>()(
  devtools(
    persist(
      () => ({
        ...emptyStore,
      }),
      { name: 'preferencesStore' },
    ),
    { name: 'preferencesStore' },
  ),
);

export const toggleShouldShowHomeInSidebar = () => {
  usePreferencesStore.setState((state) => ({
    sidebars: {
      ...state.sidebars,
      shouldShowHome: !state.sidebars.shouldShowHome,
    },
  }));
};

export const toggleShouldHighlightAbroadTravel = () => {
  usePreferencesStore.setState((state) => ({
    calendar: {
      ...state.calendar,
      shouldHighlightAbroadTravel: !state.calendar.shouldHighlightAbroadTravel,
    },
  }));
};

export const toggleShouldCounterUseScale = () => {
  usePreferencesStore.setState((state) => ({
    calendar: {
      ...state.calendar,
      shouldCounterUseScale: !state.calendar.shouldCounterUseScale,
    },
  }));
};

export const setCounterShouldShow = (value: PreferencesStoreState['calendar']['counterShouldShow']) => {
  usePreferencesStore.setState((state) => ({
    calendar: {
      ...state.calendar,
      counterShouldShow: value,
    },
  }));
};

export default usePreferencesStore;
