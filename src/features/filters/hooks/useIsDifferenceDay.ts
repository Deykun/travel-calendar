import { useMemo } from 'react';

import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import type { DateMMDD } from '@/types';

import useFiltersStore from '../stores/useFilterStore';
import { useTimeRange } from './useRange';

export function useIsDifferenceDay(date: DateMMDD) {
  const shouldHighlightDays = usePreferencesStore(
    (store) => store.differences.shouldShowDifferencesCounters && store.differences.shouldHighlightDays,
  );
  const summaryByYear = useFiltersStore((store) => store.filtered.summaryByYear);
  const { toYear } = useTimeRange();

  return useMemo(() => {
    if (!shouldHighlightDays) {
      return false;
    }

    if (!toYear) {
      return false;
    }

    return (summaryByYear[toYear]?.daysUnlocked || []).includes(date);
  }, [date, shouldHighlightDays, summaryByYear, toYear]);
}
