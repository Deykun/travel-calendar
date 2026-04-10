import { createPortal } from "react-dom";

import styles from "./HoverModalProvider.module.css";
import { cn } from "@/utils/tailwind";
import { useHoverModalStore } from "../stores/use-hover-modal-store";
import { HoverModalContent } from "../components/HoverModalContent";

export function HoverModalProvider() {
  const modal = useHoverModalStore((state) => state.modal);

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
          <HoverModalContent />
        </div>,
        document.body,
      )}
    </>
  );
}
