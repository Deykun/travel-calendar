import type { MonthNumber } from "@/features/calendar/types";
import useDataStore from "@/features/settings/stores/useDateStore";
import { getFiltered } from "@/features/settings/utils/get-filtered";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type PreferencesStoreState = {
  modals: {
    shouldShowHome: boolean;
  };
};

const emptyStore: PreferencesStoreState = {
  modals: {
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
    modals: {
      ...state.modals,
      shouldShowHome: !state.modals.shouldShowHome,
    },
  }));
};

export default usePreferencesStore;
