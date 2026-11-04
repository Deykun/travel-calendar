import { useMemo } from 'react';

import usePreferencesStore, { type FlagsSortOption } from '@/features/preferences/stores/usePreferencesStore';

export const useFlagsSorting = () => {
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);

  const shouldShowFlags = usePreferencesStore((store) => store.flags.shouldShowFlags);
  const sortBy = usePreferencesStore((store) => store.flags.sortBy);

  const { activeSortBy, isDisabled } = useMemo(() => {
    const isCounterShowingLastVisit = counterShouldShow === 'lastYearAbroad';

    const isDisabled = !shouldShowFlags || isCounterShowingLastVisit;
    const activeSortBy: FlagsSortOption = isCounterShowingLastVisit ? 'lastVisited' : sortBy;

    return { activeSortBy, isDisabled };
  }, [shouldShowFlags, sortBy, counterShouldShow]);

  return {
    sortBy: activeSortBy,
    isDisabled,
  };
};
