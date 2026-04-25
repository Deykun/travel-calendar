import type { MonthNumber } from "@/features/calendar/types";
import useDataStore from "@/features/settings/stores/useDateStore";
import { getFiltered } from "@/features/settings/utils/get-filtered";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type PreferencesStoreState = {
  sidebars: {
    shouldShowHome: boolean;
  };
};

const emptyStore: PreferencesStoreState = {
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
      { name: "preferencesStore" },
    ),
    { name: "preferencesStore" },
  ),
);

export const toggleShouldShowHomeInModal = () => {
  usePreferencesStore.setState((state) => ({
    sidebars: {
      ...state.sidebars,
      shouldShowHome: !state.sidebars.shouldShowHome,
    },
  }));
};

export default usePreferencesStore;
