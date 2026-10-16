import type { StreakSummary } from '@/features/filters/stores/useFilterStore';
import type { DateYYYYMMDD } from '@/types';
import { filterEmpty, mergeUnique } from '@/utils/array';
import { getDaysBetweenDates, getNextDay } from '@/utils/date';

// Streak ending on `to` is weakly continued by a streak starting after a single day gap
const getExpectedNextStreakStartingDate = (to: DateYYYYMMDD) => getNextDay(getNextDay(to));

const getStreakCount = (streak: StreakSummary): number => {
  if (streak.type === 'maxCountries') {
    return streak.countriesCodes.length;
  }

  return streak.from && streak.to ? getDaysBetweenDates(streak.from, streak.to) : 0;
};

export const mergeStreaks = (streakA: StreakSummary, streakB: StreakSummary): StreakSummary => {
  const countriesCodes = mergeUnique(streakA.countriesCodes, streakB.countriesCodes);

  const daysByCountry = countriesCodes.reduce((stack: StreakSummary['daysByCountry'], countryCode) => {
    stack[countryCode] = (streakA.daysByCountry[countryCode] ?? 0) + (streakB.daysByCountry[countryCode] ?? 0);

    return stack;
  }, {});

  // YYYY-MM-DD sorts correctly as plain strings
  const dates = [streakA.from, streakA.to, streakB.from, streakB.to].filter(filterEmpty).sort();

  const merged: StreakSummary = {
    type: streakA.type,
    countriesCodes,
    daysByCountry,
    from: dates.at(0),
    to: dates.at(-1),
    count: 0,
  };

  return { ...merged, count: getStreakCount(merged) };
};

export const getWeakStreaks = (streaks: StreakSummary[]): StreakSummary[] => {
  const sortedByStart = [...streaks].sort((a, b) => (a.from ?? '').localeCompare(b.from ?? ''));

  const mergedStreaks = sortedByStart.reduce((stack: StreakSummary[], streak) => {
    const previous = stack.at(-1);

    // Chained: merged `to` becomes previous `to`, so a 3rd streak after another gap merges too
    if (previous?.to && streak.from === getExpectedNextStreakStartingDate(previous.to)) {
      stack[stack.length - 1] = mergeStreaks(previous, streak);
    } else {
      stack.push(streak);
    }

    return stack;
  }, []);

  return mergedStreaks.sort((a, b) => b.count - a.count);
};
