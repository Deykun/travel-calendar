import useDataStore from '@/features/settings/stores/useDateStore';
import { stringDateToObject } from '@/utils/date';

import useFiltersStore from '../stores/useFilterStore';

type Params = { shouldUseDataFrom?: boolean };

export const useTimeRange = ({ shouldUseDataFrom = false }: Params = {}) => {
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const activeTo = useFiltersStore((store) => store.activeFilters.to);
  const { from, to } = useDataStore((store) => store.date);

  const rangeFrom = shouldUseDataFrom ? from : activeFrom || from;
  const rangeTo = activeTo || to;

  return {
    from: rangeFrom,
    to: rangeTo,
    fromYear: rangeFrom ? stringDateToObject(rangeFrom).year : undefined,
    toYear: rangeTo ? stringDateToObject(rangeTo).year : undefined,
  };
};
