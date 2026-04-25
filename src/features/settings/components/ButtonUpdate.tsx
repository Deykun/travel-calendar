import { Button } from "@/components/button/Button";
import IconGear from "@/components/icons/IconGear";
import { openSidebarSettings } from "@/features/sidebar/stores/useSidebarModalStore";

export const ButtonUpdate = () => {
  return (
    <Button onClick={openSidebarSettings} variant="secondary">
      <IconGear />
      <span>Settings</span>
    </Button>
  );
};
