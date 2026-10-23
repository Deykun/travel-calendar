import type { FiltersStoreState, StreakSummary } from '@/features/filters/stores/useFilterStore';
import type { DateMMDD } from '@/types';

export type StackByDay = {
  summaryByDay: FiltersStoreState['filtered']['summaryByDay'];
  streaks: StreakSummary[];
  current: {
    streak: StreakSummary;
  };
  indexInSortingByUnlocking: number;
  yearOfUnlockingByCountry: {
    [countryCode: string]: number;
  };
  yearOfUnlockingByDateMMDD: {
    [dateMMDD: DateMMDD]: number;
  };
};
