import { useMemo } from 'react';

import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { BestStreak } from '@/features/streak/components/best-streak/BestStreak';
import { cn } from '@/utils/tailwind';

import { StreakList } from './streak-list/StreakList';

export function StreaksSummary() {
  const streakMaxDays = useFiltersStore((store) => store.filtered.streaks.maxDays?.[0]);
  const streakMaxCountries = useFiltersStore((store) => store.filtered.streaks.maxCountries?.[0]);

  const { isSameStreak } = useMemo(() => {
    const isSameStreak = streakMaxDays?.from === streakMaxCountries?.from;

    return {
      isSameStreak,
    };
  }, [streakMaxDays, streakMaxCountries]);

  return (
    <div className={cn('col-span-4 py-3', 'grid grid-cols-6 gap-4 @min-[1200px]:gap-8 empty:hidden')}>
      {isSameStreak && (
        <>
          <BestStreak type="maxDays" className="col-span-4 @min-[1200px]:col-span-3" />
          <StreakList className="col-span-4 @min-[1200px]:col-span-3" />
        </>
      )}
      {!isSameStreak && (
        <>
          <BestStreak type="maxDays" className="col-span-6 @min-[1200px]:col-span-2" />
          <BestStreak type="maxCountries" className="col-span-6 @min-[1200px]:col-span-2" />
          <StreakList className="col-span-6 @min-[1200px]:col-span-2" />
        </>
      )}
    </div>
  );
}
