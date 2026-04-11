import { ModalDay } from "@/features/calendar/modals/ModalDay";
import { useHoverModalStore } from "../stores/use-hover-modal-store";

export const HoverModalContent = () => {
  const modal = useHoverModalStore((store) => store.modal);

  if (modal?.type === "day" && modal?.dayKey) {
    return <ModalDay dayKey={modal.dayKey} />;
  }

  return null;
};
