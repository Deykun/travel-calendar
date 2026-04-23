import { Button } from "@/components/button/Button";
import IconGear from "@/components/icons/IconGear";
import { openModalSettings } from "@/features/over-modal/stores/useHoverModalStore";

export const ButtonUpdate = () => {
  return (
    <Button onClick={openModalSettings} variant="secondary">
      <IconGear />
      <span>Settings</span>
    </Button>
  );
};
