import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { MonthNumber } from '@/features/calendar/types';
import type { StreakType } from '@/features/filters/stores/useFilterStore';
import type { DateMMDD } from '@/types';

export const SCROLL_TARGET = {
  DATA: 'data',
  STRAVA: 'strava',
  NOMADS: 'nomads',
  HOME: 'home',
  TRIPS: 'trips',
  DATES: 'dates',
} as const;

export type SidebarScrollTarget = (typeof SCROLL_TARGET)[keyof typeof SCROLL_TARGET];

type SidebarBase = {
  scrollTo?: SidebarScrollTarget;
};

export type Sidebar = SidebarBase &
  (
    | {
        type: 'setting';
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
      }
  );

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

export function openSidebarSettings(scrollTo?: SidebarScrollTarget) {
  openSidebar({
    type: 'setting',
    scrollTo,
  });
}

export function openSidebarFilters(scrollTo?: SidebarScrollTarget) {
  openSidebar({
    type: 'filters',
    scrollTo,
  });
}

export function openSidebarShare(scrollTo?: SidebarScrollTarget) {
  openSidebar({
    type: 'share',
    scrollTo,
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
