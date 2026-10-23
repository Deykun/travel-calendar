import useFiltersStore, {
  type FiltersStoreState,
  GAP_BY_STREAK_KIND,
  getEmptyStreak,
} from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';
import { filterEmpty } from '@/utils/array';

import { getDateRange } from '../../../../utils/date';
import type { DataStoreState } from '../../stores/useDateStore';
import { getKindStreaks } from '../get-kind-streaks';
import { toStreaksByType } from './core/streaks';
import { filterByYear } from './filter-by-year';
import { filterStackByDay } from './filter-stack-by-day';
import { filterStackByMonth } from './filter-stack-by-month';
import type { StackByDay, StackByMonth } from './types';

export const getFiltered = (dataByDay: DataStoreState['dataByDay']): FiltersStoreState['filtered'] => {
  console.info('Filtering...');
  const { activeFilters } = useFiltersStore.getState();

  const dataByDateSorted = Object.keys(dataByDay).sort() as DateYYYYMMDD[];
  const sortedFrom = dataByDateSorted.at(0);
  const sortedTo = dataByDateSorted.at(-1);
  const fullDateRange = sortedFrom && sortedTo ? getDateRange(sortedFrom, sortedTo) : dataByDateSorted;

  const { summaryByDay, streaks, current, yearOfUnlockingByCountry, yearOfUnlockingByDateMMDD } = fullDateRange.reduce(
    (stack: StackByDay, dateYYYYMMDD) => filterStackByDay(stack, dateYYYYMMDD, { dataByDay, activeFilters }),
    {
      summaryByDay: {},
      streaks: [],
      current: {
        streak: getEmptyStreak('maxDays'),
      },
      indexInSortingByUnlocking: 0,
      yearOfUnlockingByCountry: {},
      yearOfUnlockingByDateMMDD: {},
    },
  );

  // Closes streak when it's live at the end of the range
  if (current.streak.count > 0) {
    streaks.push(current.streak);
  }

  const regularStreaksMaxDays = streaks.sort((a, b) => b.count - a.count);
  const kindStreaksMaxDays = getKindStreaks(regularStreaksMaxDays, GAP_BY_STREAK_KIND.kind);
  const veryKindStreaksMaxDays = getKindStreaks(regularStreaksMaxDays, GAP_BY_STREAK_KIND.veryKind);

  const { summaryByMonth, summary } = Object.values(summaryByDay)
    .filter(filterEmpty)
    .reduce((stack: StackByMonth, summaryDay) => filterStackByMonth(stack, summaryDay, { activeFilters }), {
      summaryByMonth: {},
      summary: {
        totalDays: 0,
        totalDaysAbroad: 0,
        maxCountriesInDay: 0,
        maxCountriesUnlockedInDay: 0,
        maxYearsAbroadInDay: 0,
        activeDays: [],
        countriesCodes: [],
        countriesCodesByYear: {},
        countriesUnlocked: [],
      },
    });

  const summaryByYear = filterByYear({ yearOfUnlockingByCountry, yearOfUnlockingByDateMMDD });

  return {
    summaryByDay,
    summaryByMonth,
    summaryByYear,
    summary,
    streaks: {
      regular: toStreaksByType(regularStreaksMaxDays),
      kind: toStreaksByType(kindStreaksMaxDays),
      veryKind: toStreaksByType(veryKindStreaksMaxDays),
    },
  };
};
