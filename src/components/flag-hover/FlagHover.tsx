import { type PropsWithChildren, useEffect, useRef, useState } from 'react';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import { cn } from '@/utils/tailwind';

import { FlagHoverPanel, type PanelFrom } from './FlagHoverPanel';

export type Props = {
  flags?: FlagData[];
  from?: PanelFrom;
  className?: string;
  shouldSkipGroup?: boolean;
};

export const FlagHover = ({
  flags,
  children,
  from = 'top-center',
  className = '',
  shouldSkipGroup = false,
}: PropsWithChildren<Props>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const parent = ref.current?.parentElement;

    if (!parent) {
      return;
    }

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'relative hover:z-10',
        {
          group: !shouldSkipGroup,
        },
        className,
      )}
    >
      {isHovered && <FlagHoverPanel flags={flags} from={from} />}
      {children}
    </div>
  );
};
