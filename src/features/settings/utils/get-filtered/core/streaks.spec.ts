import { describe, expect, it } from 'vitest';

import { type StreakSummary, getEmptyStreak } from '@/features/filters/stores/useFilterStore';

import type { StackByDay } from '../types';
import { closeCurrentStreak, extendCurrentStreak, toStreaksByType } from './streaks';

const getStack = (streak: Partial<StreakSummary> = {}): StackByDay => ({
  summaryByDay: {},
  streaks: [],
  current: {
    streak: { ...getEmptyStreak('maxDays'), ...streak },
  },
  indexInSortingByUnlocking: 0,
  dateOfUnlockingByCountry: {},
  yearOfUnlockingByDateMMDD: {},
});

const getStreak = (streak: Partial<StreakSummary> = {}): StreakSummary => ({
  ...getEmptyStreak('maxDays'),
  ...streak,
});

describe('extendCurrentStreak', () => {
  it('starts a streak from an empty one', () => {
    const { current } = extendCurrentStreak(getStack(), '2026-01-01', ['fr']);

    expect(current.streak).toEqual(
      getStreak({
        countriesCodes: ['fr'],
        daysByCountry: { fr: 1 },
        from: '2026-01-01',
        to: '2026-01-01',
        count: 1,
      }),
    );
  });

  it('keeps from, moves to and increments count', () => {
    const stack = getStack({ from: '2026-01-01', to: '2026-01-01', count: 1 });

    const { current } = extendCurrentStreak(stack, '2026-01-02', ['fr']);

    expect(current.streak.from).toBe('2026-01-01');
    expect(current.streak.to).toBe('2026-01-02');
    expect(current.streak.count).toBe(2);
  });

  it('merges countries without duplicates and counts days per country', () => {
    const stack = getStack({ countriesCodes: ['fr'], daysByCountry: { fr: 2 }, count: 2 });

    const { current } = extendCurrentStreak(stack, '2026-01-03', ['fr', 'de']);

    expect(current.streak.countriesCodes).toEqual(['fr', 'de']);
    expect(current.streak.daysByCountry).toEqual({ fr: 3, de: 1 });
  });

  it('keeps counts of countries not visited that day', () => {
    const stack = getStack({ countriesCodes: ['fr', 'de'], daysByCountry: { fr: 1, de: 1 }, count: 1 });

    const { current } = extendCurrentStreak(stack, '2026-01-02', ['de']);

    expect(current.streak.daysByCountry).toEqual({ fr: 1, de: 2 });
  });

  it('mutates and returns the same stack', () => {
    const stack = getStack();

    expect(extendCurrentStreak(stack, '2026-01-01', ['fr'])).toBe(stack);
  });
});

describe('closeCurrentStreak', () => {
  it('pushes a non-empty streak and resets current', () => {
    const streak = getStreak({ countriesCodes: ['fr'], from: '2026-01-01', to: '2026-01-02', count: 2 });
    const stack = getStack(streak);

    const result = closeCurrentStreak(stack);

    expect(result.streaks).toEqual([streak]);
    expect(result.current.streak).toEqual(getEmptyStreak('maxDays'));
  });

  it('does not push an empty streak', () => {
    const result = closeCurrentStreak(getStack());

    expect(result.streaks).toEqual([]);
    expect(result.current.streak).toEqual(getEmptyStreak('maxDays'));
  });

  it('appends to existing streaks', () => {
    const previous = getStreak({ count: 3 });
    const stack = getStack({ count: 1 });
    stack.streaks.push(previous);

    const result = closeCurrentStreak(stack);

    expect(result.streaks).toHaveLength(2);
    expect(result.streaks[0]).toBe(previous);
  });

  it('mutates and returns the same stack', () => {
    const stack = getStack({ count: 1 });

    expect(closeCurrentStreak(stack)).toBe(stack);
  });
});

describe('toStreaksByType', () => {
  it('keeps maxDays as given', () => {
    const maxDays = [getStreak({ count: 5 }), getStreak({ count: 2 })];

    expect(toStreaksByType(maxDays).maxDays).toBe(maxDays);
  });

  it('builds maxCountries with count by countries and sorted descending', () => {
    const maxDays = [
      getStreak({ countriesCodes: ['fr'], count: 10 }),
      getStreak({ countriesCodes: ['fr', 'de', 'it'], count: 3 }),
      getStreak({ countriesCodes: ['es', 'pt'], count: 7 }),
    ];

    const { maxCountries } = toStreaksByType(maxDays);

    expect(maxCountries.map((streak) => streak.count)).toEqual([3, 2, 1]);
    expect(maxCountries.map((streak) => streak.countriesCodes)).toEqual([['fr', 'de', 'it'], ['es', 'pt'], ['fr']]);
    expect(maxCountries.every((streak) => streak.type === 'maxCountries')).toBe(true);
  });

  it('does not mutate maxDays when building maxCountries', () => {
    const maxDays = [
      getStreak({ countriesCodes: ['fr'], count: 10 }),
      getStreak({ countriesCodes: ['a', 'b'], count: 1 }),
    ];

    toStreaksByType(maxDays);

    expect(maxDays.map((streak) => streak.count)).toEqual([10, 1]);
    expect(maxDays.every((streak) => streak.type === 'maxDays')).toBe(true);
  });

  it('handles empty input', () => {
    expect(toStreaksByType([])).toEqual({ maxDays: [], maxCountries: [] });
  });
});
