import { useMemo } from 'react';

import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { cn } from '@/utils/tailwind';

import { getCountriesUnlockedInYear } from '../../utils/get-countries-unlocked-in-year';
import type { VisitedCountriesPlace } from './VisitedCountries';

type Props = VisitedCountriesPlace & {
  year: number;
  className?: string;
};

export function VisitedCountriesDifference({ className, year, ...props }: Props) {
  const summaryByYear = useFiltersStore((store) => store.filtered.summaryByYear);

  const total = useMemo(() => {
    const countriesUnlocked = summaryByYear[year]?.countriesUnlocked ?? {};

    if (props.place === 'year') {
      return Object.keys(countriesUnlocked).length;
    }

    if (props.place === 'month') {
      return getCountriesUnlockedInYear(year, props.flags).length;
    }

    return 0;
  }, [props, summaryByYear, year]);

  if (props.place === 'streaks' || total < 1) {
    return null;
  }

  return (
    <div
      className={cn(
        'block text-right text-[10px]',
        {
          'mt-2': props.place === 'year',
          'mt-1': props.place !== 'year',
        },
        'starting:opacity-0 opacity-100',
        'starting:translate-y-1 translate-y-0',
        'duration-300',
        'flex items-center gap-1 leading-none',
        className,
      )}
    >
      <span className="text-[#ff4e4e] font-semibold tracking-widest">+{total}</span>
      <span className="opacity-60">{year}</span>
    </div>
  );
}
