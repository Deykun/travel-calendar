import { useEffect, useRef, useState } from 'react';

import { Radiobox } from '@/components/radiobox/Radiobox';
import { MiniCalendarForYear } from '@/features/calendar/components/mini-calendar/MiniCalendarForYear';

export type DateBound = 'from' | 'to';

type Props = {
  year: number;
  isFromActive: boolean;
  isToActive: boolean;
  onYearChange: (bound: DateBound, year: number) => void;
};

export function PaneFilterDateRow({ year, isFromActive, isToActive, onYearChange }: Props) {
  const fromRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const elements = [fromRef.current, toRef.current].filter((element) => element !== null);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    elements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <span ref={fromRef}>
        <Radiobox isActive={isFromActive} onChange={() => onYearChange('from', year)}>
          <span>{year}</span>
          {isHovered && <MiniCalendarForYear year={year} />}
        </Radiobox>
      </span>
      <span ref={toRef}>
        <Radiobox isActive={isToActive} onChange={() => onYearChange('to', year)}>
          <span>{year}</span>
        </Radiobox>
      </span>
    </>
  );
}
