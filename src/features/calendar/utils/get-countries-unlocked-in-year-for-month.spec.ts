import { describe, expect, it } from 'vitest';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import type { DataStoreState } from '@/features/settings/stores/useDateStore';
import type { DateMMDD } from '@/types';

import { getCountriesUnlockedInYearForMonth } from './get-countries-unlocked-in-year-for-month';

type Days = DataStoreState['daysByCountryByMonthByYear'];

const flag = (countryCode: string, from: number, to = from): FlagData => ({ countryCode, from, to, tripsKeys: [] });

const day = (countryCode: string, year: number, month: number, days: Days = {}): Days => {
  days[year] ??= {};
  days[year][month] ??= {};
  days[year][month][countryCode] = [`${('' + month).padStart(2, '0')}-01` as DateMMDD];

  return days;
};

const run = (flags: FlagData[], daysByCountryByMonthByYear: Days = {}, monthNumber: 1 | 3 | 5 = 3) =>
  getCountriesUnlockedInYearForMonth({ year: 2024, monthNumber, flags, daysByCountryByMonthByYear });

describe('getCountriesUnlockedInYearForMonth', () => {
  it('returns empty for no flags', () => {
    expect(run([])).toEqual([]);
  });

  it('counts countries first visited in the month', () => {
    expect(run([flag('de', 2024), flag('fr', 2024)])).toEqual(['de', 'fr']);
  });

  it('skips countries without a flag in the year', () => {
    expect(run([flag('de', 2023), flag('fr', 2025)])).toEqual([]);
  });

  it('skips countries visited in the same month of an earlier year (per store)', () => {
    const days = day('de', 2020, 3);

    expect(run([flag('de', 2024), flag('fr', 2024)], days)).toEqual(['fr']);
  });

  it('skips countries visited in the same month of an earlier year even when flags are limited to the year', () => {
    const days = day('de', 2023, 3);

    expect(run([flag('de', 2024)], days)).toEqual([]);
  });

  it('skips countries whose period started before the year', () => {
    const days = day('de', 2023, 3);

    expect(run([flag('de', 2023, 2025), flag('fr', 2024, 2025)], days)).toEqual(['fr']);
  });

  it('counts a country visited before only in other months', () => {
    const days = day('mt', 2022, 12);
    day('mt', 2023, 5, days);

    expect(run([flag('mt', 2024)], days, 1)).toEqual(['mt']);
  });

  it('counts a country visited in an earlier month of the same year', () => {
    const days = day('de', 2024, 1);

    expect(run([flag('de', 2024)], days, 3)).toEqual(['de']);
  });

  it('ignores the same month of the same year', () => {
    const days = day('de', 2024, 3);

    expect(run([flag('de', 2024)], days, 3)).toEqual(['de']);
  });

  it('ignores later years', () => {
    const days = day('de', 2025, 3);

    expect(run([flag('de', 2024, 2025)], days)).toEqual(['de']);
  });

  it('ignores empty day lists', () => {
    const days: Days = { 2020: { 3: { de: [] } } };

    expect(run([flag('de', 2024)], days)).toEqual(['de']);
  });

  it('dedupes country codes', () => {
    expect(run([flag('de', 2024), flag('de', 2024)])).toEqual(['de']);
  });
});
