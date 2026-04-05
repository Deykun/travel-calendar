import Button from "@/components/button/button";
import { openModalIntegration } from "../modals/open-modal-integration";

export const ButtonUpdate = () => {
  return <Button onClick={() => openModalIntegration()}>Integration</Button>;
};
