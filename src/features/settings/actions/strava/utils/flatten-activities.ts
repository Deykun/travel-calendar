import { getNextDay } from '@/utils/date';

import type { IntegrationStravaActivity } from '../types';

// Order-insensitive set key, so ['PL', 'DE'] and ['DE', 'PL'] merge
const getCountriesKey = (countryCodes: string[]) => [...new Set(countryCodes)].sort().join(',');

// Same date range or overlapping, or next starts the day after current ends
const getCanMerge = (current: IntegrationStravaActivity, next: IntegrationStravaActivity) =>
  next.date_start <= current.date_end || next.date_start === getNextDay(current.date_end);

// Merges activities with the same countries set that overlap or are on consecutive days into one
export const flattenActivities = (activities: IntegrationStravaActivity[]): IntegrationStravaActivity[] => {
  const byCountries = new Map<string, IntegrationStravaActivity[]>();

  for (const activity of activities) {
    const key = getCountriesKey(activity.country_codes);
    byCountries.set(key, [...(byCountries.get(key) ?? []), activity]);
  }

  const merged: IntegrationStravaActivity[] = [];

  for (const group of byCountries.values()) {
    // YYYY-MM-DD compares correctly as plain strings
    const sorted = [...group].sort((a, b) => a.date_start.localeCompare(b.date_start));

    let current: IntegrationStravaActivity | undefined;

    for (const activity of sorted) {
      if (current && getCanMerge(current, activity)) {
        current = {
          ...current,
          date_end: activity.date_end > current.date_end ? activity.date_end : current.date_end,
        };
        continue;
      }

      if (current) {
        merged.push(current);
      }

      current = { ...activity };
    }

    if (current) {
      merged.push(current);
    }
  }

  return merged.sort((a, b) => a.date_start.localeCompare(b.date_start));
};
