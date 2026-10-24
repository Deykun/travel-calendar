import type { FiltersStoreState, StreakSummary } from '@/features/filters/stores/useFilterStore';
import type { DateMMDD, DateYYYYMMDD } from '@/types';

export type StackByDay = {
  summaryByDay: FiltersStoreState['filtered']['summaryByDay'];
  streaks: StreakSummary[];
  current: {
    streak: StreakSummary;
  };
  indexInSortingByUnlocking: number;
  dateOfUnlockingByCountry: {
    [countryCode: string]: DateYYYYMMDD;
  };
  yearOfUnlockingByDateMMDD: {
    [dateMMDD: DateMMDD]: number;
  };
};

export type StackByMonth = Pick<FiltersStoreState['filtered'], 'summaryByMonth' | 'summary'>;
