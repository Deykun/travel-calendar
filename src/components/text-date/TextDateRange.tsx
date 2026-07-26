import { useMemo } from 'react';

import type { DateYYYYMMDD } from '@/types';
import { cn } from '@/utils/tailwind';
import { appFormatDate } from './utils/format-date';

type Props = {
  className?: string;
  from: DateYYYYMMDD | undefined;
  to: DateYYYYMMDD | undefined;
};



export const TextDateRange = ({ className = '', from, to }: Props) => {
  const label = useMemo(() => {
    if (from && to) {
      const fromYear = from.split('-')[0];
      const toYear = to.split('-')[0];

      if (fromYear === toYear) {
        return `${appFormatDate(from, { shouldRemoveYear: true }).replace(`.${fromYear}`, '')} - ${appFormatDate(to)}`;
      }

      return `${appFormatDate(from)} - ${appFormatDate(to)}`;
    }

    if (from) {
      return appFormatDate(from);
    }

    if (to) {
      return appFormatDate(to);
    }

    return '';
  }, [from, to]);

  if (!label) {
    return null;
  }

  return <span className={cn('text-xs text-gray-400 tracking-wider', className)}>{label}</span>;
};
