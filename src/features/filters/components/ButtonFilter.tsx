import { Button } from "@/components/button/Button";
import IconFilter from "@/components/icons/IconFilter";
import {
  closeSidebar,
  openSidebar,
  useSidebarStore,
} from "@/features/sidebar/stores/useSidebarStore";

export const ButtonFilter = () => {
  const isSidebarOpen = useSidebarStore(
    (state) => state?.sidebar?.type === "filters",
  );

  return (
    <Button
      onClick={() =>
        isSidebarOpen ? closeSidebar() : openSidebar({ type: "filters" })
      }
    >
      <IconFilter />
    </Button>
  );
};
