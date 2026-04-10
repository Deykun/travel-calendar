import { useEffect, useRef } from "react";
import {
  openHoverModal,
  type HoverModal,
} from "../stores/use-hover-modal-store";

export const useHoverModalTrigger = (modal: HoverModal) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const handleMouseEnter = () => {
      console.log("mouseenter", modal);
      openHoverModal(modal);
    };

    const handleMouseLeave = () => {
      console.log("mouseleave", modal);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [modal]);

  return ref;
};
