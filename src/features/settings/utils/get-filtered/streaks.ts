import { type StreakSummary, type StreaksByType, getEmptyStreak } from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';
import { mergeUnique } from '@/utils/array';

import type { StackByDay } from './types';

export const extendCurrentStreak = (
  stack: StackByDay,
  dateYYYYMMDD: DateYYYYMMDD,
  countriesCodes: string[],
): StackByDay => {
  const { streak } = stack.current;

  stack.current.streak = {
    ...streak,
    countriesCodes: mergeUnique(streak.countriesCodes, countriesCodes),
    daysByCountry: {
      ...streak.daysByCountry,
      ...countriesCodes.reduce((newCountriesStack: StreakSummary['daysByCountry'], countryCode) => {
        newCountriesStack[countryCode] = (streak.daysByCountry?.[countryCode] ?? 0) + 1;

        return newCountriesStack;
      }, {}),
    },
    from: streak.from || dateYYYYMMDD,
    to: dateYYYYMMDD || streak.to,
    count: streak.count + 1,
  };

  return stack;
};

export const closeCurrentStreak = (stack: StackByDay): StackByDay => {
  if (stack.current.streak.count > 0) {
    stack.streaks.push(stack.current.streak);
  }

  stack.current.streak = getEmptyStreak('maxDays');

  return stack;
};

const toMaxCountriesStreaks = (streaks: StreakSummary[]): StreakSummary[] =>
  streaks
    .map(
      (streak) =>
        ({
          ...streak,
          type: 'maxCountries',
          count: streak.countriesCodes.length,
        }) satisfies StreakSummary,
    )
    .sort((a, b) => b.count - a.count);

export const toStreaksByType = (maxDays: StreakSummary[]): StreaksByType => ({
  maxDays,
  maxCountries: toMaxCountriesStreaks(maxDays),
});
