import { ModalDay } from "@/features/calendar/modals/ModalDay/ModalDay";
import {
  useOverModalStore,
  type OverModal,
} from "../stores/use-hover-modal-store";
import { ModalFilters } from "@/features/filters/modals/ModalFilters";
import { useEffect, useState } from "react";

export const OverModalContent = () => {
  const [modal, setModal] = useState<OverModal | null>(null);
  const storeModal = useOverModalStore((store) => store.modal);

  // Keep the modal in local state so it isn’t removed while it’s closing during the animation.
  useEffect(() => {
    if (storeModal) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModal(storeModal);
    }
  }, [storeModal]);

  if (modal?.type === "day" && modal?.dayKey) {
    return <ModalDay dayKey={modal.dayKey} />;
  }

  if (modal?.type === "filters") {
    return <ModalFilters />;
  }

  return null;
};
