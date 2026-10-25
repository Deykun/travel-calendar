import { useMemo } from 'react';

import useFiltersStore from '@/features/filters/stores/useFilterStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { cn } from '@/utils/tailwind';

import { getCountriesUnlockedInYearForMonth } from '../../utils/get-countries-unlocked-in-year-for-month';
import type { VisitedCountriesPlace } from './VisitedCountries';

type Props = VisitedCountriesPlace & {
  year: number;
  className?: string;
};

export function VisitedCountriesDifference({ className, year, ...props }: Props) {
  const summaryByYear = useFiltersStore((store) => store.filtered.summaryByYear);
  const daysByCountryByMonthByYear = useDataStore((store) => store.daysByCountryByMonthByYear);

  const total = useMemo(() => {
    if (props.place === 'year') {
      const countriesUnlocked = summaryByYear[year]?.countriesUnlocked ?? {};

      return Object.keys(countriesUnlocked).length;
    }

    if (props.place === 'month') {
      return getCountriesUnlockedInYearForMonth({
        year,
        monthNumber: props.monthNumber,
        flags: props.flags,
        daysByCountryByMonthByYear,
      }).length;
    }

    return 0;
  }, [daysByCountryByMonthByYear, props, summaryByYear, year]);

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
      data-type="difference"
    >
      <span className="text-[#ff4e4e] font-semibold tracking-widest">+{total}</span>
      <span className="opacity-60">{year}</span>
    </div>
  );
}
