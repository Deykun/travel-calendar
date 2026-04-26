import { SidebarSettings } from "@/features/settings/sidebars/SidebarSettings";
import { useSidebarStore } from "../stores/useSidebarStore";
import { SidebarDay } from "@/features/calendar/sidebars/SidebarDay";
import { SidebarFilters } from "@/features/filters/sidebars/SidebarFilters";

export const SidebarContent = () => {
  const sidebar = useSidebarStore((store) => store.sidebar);

  if (sidebar?.type === "setting") {
    return <SidebarSettings />;
  }

  if (sidebar?.type === "day" && sidebar?.dayKey) {
    return <SidebarDay dayKey={sidebar.dayKey} />;
  }

  if (sidebar?.type === "filters") {
    return <SidebarFilters />;
  }

  return null;
};
