import { useMemo } from 'react';

import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { cn } from '@/utils/tailwind';

import type { VisitedCountriesPlace } from './VisitedCountries';

type Props = VisitedCountriesPlace & {
  year: number;
  className?: string;
};

export function VisitedCountriesDifference({ className, year, ...props }: Props) {
  const summaryByYear = useFiltersStore((store) => store.filtered.summaryByYear);

  const total = useMemo(() => {
    if (props.place === 'year') {
      return summaryByYear[year]?.countriesUnlocked.length || 0;
    }

    return 0;
  }, [props.place, summaryByYear, year]);

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
        'flex items-center gap-1 leading-none',
        className,
      )}
    >
      <span className="text-[#fcff4e] font-semibold">+{total}</span>
      <span className="opacity-60">{props.place === 'year' && year}</span>
    </div>
  );
}
