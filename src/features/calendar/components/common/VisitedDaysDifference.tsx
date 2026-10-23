import { useMemo } from 'react';

import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { cn } from '@/utils/tailwind';

import type { VisitedDaysPlace } from './VisitedDays';

type Props = VisitedDaysPlace & {
  year: number;
  className?: string;
};

export function VisitedDaysDifference({ className, year, ...props }: Props) {
  const summaryByYear = useFiltersStore((store) => store.filtered.summaryByYear);

  const total = useMemo(() => {
    if (props.place === 'year') {
      return summaryByYear[year]?.daysUnlocked.length || 0;
    }

    if (props.place === 'month') {
      return (
        summaryByYear[year]?.daysUnlocked.filter((dateMMDD) => {
          console.log(dateMMDD, `${props.monthNumber}-`.padStart(3, '0'));
          return dateMMDD.startsWith(`${props.monthNumber}-`.padStart(3, '0'));
        }).length || 0
      );
    }

    return 0;
  }, [props, summaryByYear, year]);

  if (props.place === 'streaks' || total < 1) {
    return null;
  }

  return (
    <div
      className={cn(
        'block text-right text-[10px] tracking-wider',
        {
          'mt-2': props.place === 'year',
          'mt-1': props.place !== 'year',
        },
        'flex items-center justify-end gap-1 leading-none',
        className,
      )}
    >
      <span className="opacity-60">{props.place === 'year' && year}</span>
      <span className="text-[#fcff4e] font-semibold">+{total}</span>
    </div>
  );
}
