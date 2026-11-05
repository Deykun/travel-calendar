import { useEffect, useRef } from 'react';

import { type Sidebar, openSidebar } from '../stores/useSidebarStore';

export const useOverModalHoverTrigger = (sidebar: Sidebar) => {
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

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [sidebar]);

  return ref;
};
