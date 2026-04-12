import { createPortal } from "react-dom";

import { useModalStore } from "../stores/use-modal-store";

import styles from "./modal-provider.module.css";
import { cn } from "@/utils/tailwind";

export function ModalProvider() {
  const modal = useModalStore((state) => state.modal);

  if (!modal) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div
          className={cn(
            "fixed w-full z-1000 min-h-screen left-0 top-0",
            styles["container"],
          )}
        >
          <div className="w-full h-dvh overflow-auto grid place-items-center">
            {modal}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
