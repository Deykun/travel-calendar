import useDataStore from '@/features/settings/stores/useDateStore';
import { stringDateToObject } from '@/utils/date';

import useFiltersStore from '../stores/useFilterStore';

export const useTimeRange = () => {
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const activeTo = useFiltersStore((store) => store.activeFilters.to);
  const { from, to } = useDataStore((store) => store.date);

  const rangeFrom = activeFrom || from;
  const rangeTo = activeTo || to;

  return {
    from: rangeFrom,
    to: rangeTo,
    fromYear: rangeFrom ? stringDateToObject(rangeFrom).year : undefined,
    toYear: rangeTo ? stringDateToObject(rangeTo).year : undefined,
  };
};
