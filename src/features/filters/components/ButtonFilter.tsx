import Button from "@/components/button/button";
import { openOverModal } from "@/features/over-modal/stores/use-hover-modal-store";

export const ButtonFilter = () => {
  return (
    <Button onClick={() => openOverModal({ type: "filters" })}>Filter</Button>
  );
};
