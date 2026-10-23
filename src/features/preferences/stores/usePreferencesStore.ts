import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { StreakKind } from '@/features/filters/stores/useFilterStore';

export type PreferencesStoreState = {
  calendar: {
    counterShouldShow:
      | 'numberOfCountries'
      | 'yearsAbroad'
      | 'yearOfUnlocking'
      | 'numberOfUnlockedCountries'
      | 'numberOfUnlockedCountries';
    shouldCounterUseScale: boolean;
    shouldHighlightAbroadTravel: boolean;
    shouldHighlightNewCountries: boolean;
  };
  sidebars: {
    shouldShowHome: boolean;
  };
  streaks: {
    typeToShow: StreakKind;
    shouldHighlightNewCountries: boolean;
  };
  date: {
    shouldFilterToSingleYear: boolean;
  };
};

const emptyStore: PreferencesStoreState = {
  calendar: {
    counterShouldShow: 'numberOfCountries',
    shouldCounterUseScale: false,
    shouldHighlightAbroadTravel: false,
    shouldHighlightNewCountries: true,
  },
  sidebars: {
    shouldShowHome: false,
  },
  streaks: {
    typeToShow: 'kind',
    shouldHighlightNewCountries: true,
  },
  date: {
    shouldFilterToSingleYear: false,
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

export const resetPreferencesStore = () => {
  usePreferencesStore.setState({
    ...emptyStore,
  });
};

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

export const toggleShouldHighlightNewCountriesInCalendar = () => {
  usePreferencesStore.setState((state) => ({
    calendar: {
      ...state.calendar,
      shouldHighlightNewCountries: !state.calendar.shouldHighlightNewCountries,
    },
  }));
};

export const toggleShouldHighlightNewCountriesInStreaks = () => {
  usePreferencesStore.setState((state) => ({
    streaks: {
      ...state.streaks,
      shouldHighlightNewCountries: !state.streaks.shouldHighlightNewCountries,
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

export const toggleShouldFilterToSingleYear = () => {
  usePreferencesStore.setState((state) => ({
    date: {
      ...state.date,
      shouldFilterToSingleYear: !state.date.shouldFilterToSingleYear,
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

export const setStreakTypeToUse = (typeToShow: PreferencesStoreState['streaks']['typeToShow']) => {
  usePreferencesStore.setState((state) => ({
    streaks: {
      ...state.streaks,
      typeToShow: typeToShow,
    },
  }));
};

export default usePreferencesStore;
