import { Button } from "@/components/button/Buttonn";
import IconGear from "@/components/icons/IconGear";
import {
  openSidebarSettings,
  useSidebarStore,
} from "@/features/sidebar/stores/useSidebarStore";

export const ButtonUpdate = () => {
  const isSidebarOpen = useSidebarStore(
    (state) => state?.sidebar?.type === "setting",
  );

  return (
    <Button
      onClick={openSidebarSettings}
      variant={isSidebarOpen ? "primary" : "secondary"}
    >
      <IconGear />
    </Button>
  );
};
