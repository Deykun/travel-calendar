import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Sidebar =
  | {
      type: 'setting';
    }
  | {
      type: 'day';
      dayKey: string;
    }
  | {
      type: 'filters';
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
    { name: 'SidebarStore' },
  ),
);

export function openSidebar(sidebar: Sidebar) {
  useSidebarStore.setState({
    sidebar,
    isCollapsed: false,
  });
}

export function openSidebarSettings() {
  openSidebar({
    type: 'setting',
  });
}

export function openSidebarFilters() {
  openSidebar({
    type: 'filters',
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
