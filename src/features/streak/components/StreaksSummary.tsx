import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { BestStreak } from '@/features/streak/components/best-streak/BestStreak';
import { cn } from '@/utils/tailwind';

import { StreakList } from './streak-list/StreakList';

export function StreaksSummary() {
  const sameStreakForDaysAndCountries = useFiltersStore(
    (store) => store.filtered.streaks.maxDays?.[0]?.from === store.filtered.streaks.maxCountries?.[0]?.from,
  );

  return (
    <div className={cn('col-span-4 py-3', 'grid grid-cols-3 gap-4 @min-[1200px]:gap-8')}>
      <BestStreak type="maxDays" className="col-span-4 @min-[1200px]:col-span-1" />
      <BestStreak type="maxCountries" className="col-span-4 @min-[1200px]:col-span-1" />
      <StreakList className="col-span-4 @min-[1200px]:col-span-1" />
    </div>
  );
}
