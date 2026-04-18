import { Button } from "@/components/button/Button";
import {
  closeOverModal,
  openOverModal,
  useOverModalStore,
} from "@/features/over-modal/stores/use-hover-modal-store";

export const ButtonFilter = () => {
  const isModalOpen = useOverModalStore(
    (state) => state?.modal?.type === "filters",
  );

  return (
    <Button
      onClick={() =>
        isModalOpen ? closeOverModal() : openOverModal({ type: "filters" })
      }
    >
      Filter
    </Button>
  );
};
