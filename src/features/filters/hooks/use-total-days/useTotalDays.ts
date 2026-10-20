import useDataStore from '@/features/settings/stores/useDateStore';
import { getAppDateIfPossible } from '@/utils/date';

import useFiltersStore from '../../stores/useFilterStore';
import { calculateTotalDays } from './calculateTotalDays';

export const useTotalDays = () => {
  const shouldIncludeFuture = useFiltersStore((store) => store.activeFilters.shouldIncludeFuture);
  const fallback = useFiltersStore((store) => store.filtered.summary.totalDays);
  const pickedFrom = useFiltersStore((store) => store.activeFilters.from);
  const pickedTo = useFiltersStore((store) => store.activeFilters.to);
  const { from: dataFrom, to: dataTo } = useDataStore((store) => store.date);

  return calculateTotalDays({
    dataFrom,
    dataTo,
    pickedFrom,
    pickedTo,
    today: shouldIncludeFuture ? undefined : getAppDateIfPossible(new Date()),
    fallback,
  });
};
