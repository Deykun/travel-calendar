import { ModalDay } from "@/features/calendar/modals/ModalDay/ModalDay";
import { useOverModalStore } from "../stores/use-hover-modal-store";
import { ModalFilters } from "@/features/filters/modals/ModalFilters";

export const OverModalContent = () => {
  const modal = useOverModalStore((store) => store.modal);

  if (modal?.type === "day" && modal?.dayKey) {
    return <ModalDay dayKey={modal.dayKey} />;
  }

  if (modal?.type === "filters") {
    return <ModalFilters />;
  }

  return null;
};
