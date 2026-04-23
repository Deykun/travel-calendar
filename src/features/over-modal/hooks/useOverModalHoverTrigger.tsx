import { useEffect, useRef } from "react";
import { openOverModal, type OverModal } from "../stores/useHoverModalStore";

export const useOverModalHoverTrigger = (modal: OverModal) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const handleMouseEnter = () => {
      // console.log("mouseenter", modal);
      openOverModal(modal);
    };

    const handleMouseLeave = () => {
      // console.log("mouseleave", modal);
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
