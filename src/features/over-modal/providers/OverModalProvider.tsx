import { createPortal } from "react-dom";

import styles from "./OverModalProvider.module.css";
import { cn } from "@/utils/tailwind";
import { OverModalContent } from "../components/OverModalContent";
import { useOverModalStore } from "../stores/use-hover-modal-store";

export function OverModalProvider() {
  const modal = useOverModalStore((state) => state?.modal);

  if (!modal) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div
          className={cn(
            "fixed bottom-3 left-1/2 -translate-x-1/2 z-10",
            styles["container"],
          )}
        >
          <OverModalContent />
        </div>,
        document.body,
      )}
    </>
  );
}
