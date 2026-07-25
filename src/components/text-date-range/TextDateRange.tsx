import { useMemo } from 'react';

import type { DateYYYYMMDD } from '@/types';
import { cn } from '@/utils/tailwind';

type Props = {
  className?: string;
  from: DateYYYYMMDD | undefined;
  to: DateYYYYMMDD | undefined;
};

// 31-12-2025 -> 2025.12.31
const formatDate = (date: string): string => {
  return date.split('-').reverse().join('.');
};

export const TextDateRange = ({ className = '', from, to }: Props) => {
  const label = useMemo(() => {
    if (from && to) {
      const fromYear = from.split('-')[0];
      const toYear = to.split('-')[0];

      if (fromYear === toYear) {
        return `${formatDate(from).replace(`.${fromYear}`, '')} - ${formatDate(to)}`;
      }

      return `${formatDate(from)} - ${formatDate(to)}`;
    }

    if (from) {
      return formatDate(from);
    }

    if (to) {
      return formatDate(to);
    }

    return '';
  }, [from, to]);

  if (!label) {
    return null;
  }

  return <span className={cn('text-xs text-gray-400 tracking-wider', className)}>{label}</span>;
};
