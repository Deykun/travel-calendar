import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { MonthNumber } from '@/features/calendar/types';
import type { StreakType } from '@/features/filters/stores/useFilterStore';
import type { DateMMDD } from '@/types';

export type SettingsScrollTarget = 'data' | 'strava' | 'nomads' | 'home' | 'trips';

export type Sidebar =
  | {
      type: 'setting';
      scrollTo?: SettingsScrollTarget;
    }
  | {
      type: 'share';
    }
  | {
      type: 'day';
      dayKey: DateMMDD;
    }
  | {
      type: 'month';
      monthNumber: MonthNumber;
    }
  | {
      type: 'filters';
    }
  | {
      type: 'country';
      countryCode: string;
    }
  | {
      type: 'streak';
      streakType: StreakType;
      index: number;
    };

type SidebarStore = {
  sidebar: Sidebar | null;
  isCollapsed: boolean;
};

const emptyStore: SidebarStore = {
  sidebar: {
    type: 'setting',
  },
  isCollapsed: false,
};

export const useSidebarStore = create<SidebarStore>()(
  devtools(
    () =>
      ({
        ...emptyStore,
      }) satisfies SidebarStore,
    { name: 'sidebarStore' },
  ),
);

export function openSidebar(sidebar: Sidebar) {
  useSidebarStore.setState({
    sidebar,
    isCollapsed: false,
  });
}

export function openSidebarSettings(scrollTo?: SettingsScrollTarget) {
  openSidebar({
    type: 'setting',
    scrollTo,
  });
}

export function openSidebarFilters() {
  openSidebar({
    type: 'filters',
  });
}

export function openSidebarShare() {
  openSidebar({
    type: 'share',
  });
}

export function collapseSidebar() {
  useSidebarStore.setState({
    isCollapsed: true,
  });
}

export function closeSidebar() {
  useSidebarStore.setState({
    sidebar: {
      type: 'setting',
    },
    isCollapsed: true,
  });
}
