import { Button } from "@/components/button/Button";
import IconFilter from "@/components/icons/IconFilter";
import {
  closeOverModal,
  openOverModal,
  useOverModalStore,
} from "@/features/over-modal/stores/useHoverModalStore";

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
      <IconFilter />
      <span>Filter</span>
    </Button>
  );
};
