import { Button } from "@/components/button/Button";
import { openModalIntegration } from "../modals/open-modal-integration";
import IconGear from "@/components/icons/IconGear";

export const ButtonUpdate = () => {
  return (
    <Button onClick={() => openModalIntegration()}>
      <IconGear />
      <span>Integration</span>
    </Button>
  );
};
