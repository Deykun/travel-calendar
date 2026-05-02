import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Sidebar =
  | {
      type: "setting";
    }
  | {
      type: "day";
      dayKey: string;
    }
  | {
      type: "filters";
    };

type SidebarStore = {
  sidebar: Sidebar | null;
};

const emptyStore: SidebarStore = {
  sidebar: null,
};

export const useSidebarStore = create<SidebarStore>()(
  devtools(
    () =>
      ({
        ...emptyStore,
      }) satisfies SidebarStore,
    { name: "SidebarStore" },
  ),
);

export function openSidebar(sidebar: Sidebar) {
  useSidebarStore.setState({
    sidebar,
  });
}

export function openSidebarSettings() {
  openSidebar({
    type: "setting",
  });
}

export function openSidebarFilters() {
  openSidebar({
    type: "filters",
  });
}

export function closeSidebar() {
  useSidebarStore.setState({
    sidebar: null,
  });
}
