import type { FiltersStoreState, StreakSummary } from '@/features/filters/stores/useFilterStore';

export type StackByDay = {
  summaryByDay: FiltersStoreState['filtered']['summaryByDay'];
  streaks: StreakSummary[];
  current: {
    streak: StreakSummary;
  };
};
