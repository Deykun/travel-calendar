import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { StreakKind } from '@/features/filters/stores/useFilterStore';

export type CounterShowOption =
  | 'numberOfCountries'
  | 'yearsAbroad'
  | 'yearOfUnlocking'
  | 'numberOfUnlockedCountries'
  | 'numberOfUnlockedCountries';

export type PreferencesStoreState = {
  calendar: {
    counterShouldShow: CounterShowOption;
    shouldCounterUseScale: boolean;
    shouldHighlightAbroadTravel: boolean;
    shouldHighlightNewCountries: boolean;
  };
  flags: {
    shouldShowFlags: boolean;
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
  differences: {
    shouldShowDifferencesCounters: boolean;
    shouldHighlightDays: boolean;
    shouldHighlightFlags: boolean;
  };
};

const emptyStore: PreferencesStoreState = {
  calendar: {
    counterShouldShow: 'numberOfCountries',
    shouldCounterUseScale: false,
    shouldHighlightAbroadTravel: false,
    shouldHighlightNewCountries: true,
  },
  flags: {
    shouldShowFlags: true,
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
  differences: {
    shouldShowDifferencesCounters: false,
    shouldHighlightDays: false,
    shouldHighlightFlags: false,
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

export const toggleShouldShowFlags = () => {
  usePreferencesStore.setState((state) => ({
    flags: {
      ...state.flags,
      shouldShowFlags: !state.flags.shouldShowFlags,
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

export const toggleShouldShowDifferencesCounters = () => {
  usePreferencesStore.setState((state) => ({
    differences: {
      ...state.differences,
      shouldShowDifferencesCounters: !state.differences.shouldShowDifferencesCounters,
    },
  }));
};

export const toggleShouldHighlightDays = () => {
  usePreferencesStore.setState((state) => ({
    differences: {
      ...state.differences,
      shouldHighlightDays: !state.differences.shouldHighlightDays,
    },
  }));
};

export const toggleShouldHighlightFlags = () => {
  usePreferencesStore.setState((state) => ({
    differences: {
      ...state.differences,
      shouldHighlightFlags: !state.differences.shouldHighlightFlags,
    },
  }));
};

export const setCounterShouldShow = (value: CounterShowOption) => {
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
