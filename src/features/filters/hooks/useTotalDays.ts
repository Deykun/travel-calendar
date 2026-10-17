import { useMemo } from 'react';

import useDataStore from '@/features/settings/stores/useDateStore';
import { getDaysBetweenDates } from '@/utils/date';

import useFiltersStore from '../stores/useFilterStore';

export const useTotalDays = () => {
  const totalDays = useFiltersStore((store) => store.filtered.summary.totalDays);
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const activeTo = useFiltersStore((store) => store.activeFilters.to);
  const { from, to } = useDataStore((store) => store.date);

  return useMemo(() => {
    const fromToUse = activeFrom || from;
    const toToUse = activeTo || to;

    if (fromToUse && toToUse) {
      return getDaysBetweenDates(fromToUse, toToUse);
    }

    return totalDays;
  }, [activeFrom, activeTo, from, to, totalDays]);
};
