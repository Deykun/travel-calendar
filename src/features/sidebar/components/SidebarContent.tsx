import { useEffect, useState } from "react";
import { SidebarSettings } from "@/features/settings/sidebars/SidebarSettings";
import { useSidebarStore, type Sidebar } from "../stores/useSidebarModalStore";
import { SidebarDay } from "@/features/calendar/sidebars/sidebar-day/SidebarDay";
import { SidebarFilters } from "@/features/filters/sidebars/SidebarFilters";

export const SidebarContent = () => {
  const [sidebar, setModal] = useState<Sidebar | null>(null);
  const storeModal = useSidebarStore((store) => store.sidebar);

  // Keep the sidebar in local state so it isn’t removed while it’s closing during the animation.
  useEffect(() => {
    if (storeModal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModal(storeModal);
    }
  }, [storeModal]);

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
