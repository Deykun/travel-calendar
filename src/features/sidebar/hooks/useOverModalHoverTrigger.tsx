import { useEffect, useRef } from "react";
import { openSidebar, type OverModal } from "../stores/useSidebarModalStore";

export const useOverModalHoverTrigger = (sidebar: OverModal) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const handleMouseEnter = () => {
      // console.log("mouseenter", sidebar);
      openSidebar(sidebar);
    };

    const handleMouseLeave = () => {
      // console.log("mouseleave", sidebar);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [sidebar]);

  return ref;
};
