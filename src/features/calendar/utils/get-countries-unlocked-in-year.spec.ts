import { describe, expect, it } from 'vitest';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';

import { getCountriesUnlockedInYear } from './get-countries-unlocked-in-year';

const flag = (countryCode: string, from: number, to = from): FlagData => ({ countryCode, from, to, tripsKeys: [] });

describe('getCountriesUnlockedInYear', () => {
  it('returns empty for no flags', () => {
    expect(getCountriesUnlockedInYear(2024, [])).toEqual([]);
  });

  it('counts countries first visited in the year', () => {
    expect(getCountriesUnlockedInYear(2024, [flag('de', 2024), flag('fr', 2024)])).toEqual(['de', 'fr']);
  });

  it('skips countries without a flag in the year', () => {
    expect(getCountriesUnlockedInYear(2024, [flag('de', 2023), flag('fr', 2025)])).toEqual([]);
  });

  it('skips countries visited in an earlier year', () => {
    expect(getCountriesUnlockedInYear(2024, [flag('de', 2020), flag('de', 2024), flag('fr', 2024)])).toEqual(['fr']);
  });

  it('skips countries whose period started before the year', () => {
    expect(getCountriesUnlockedInYear(2024, [flag('de', 2023, 2025), flag('fr', 2024, 2025)])).toEqual(['fr']);
  });

  it('counts a country whose period starts in the year and continues', () => {
    expect(getCountriesUnlockedInYear(2024, [flag('de', 2024, 2026)])).toEqual(['de']);
  });

  it('dedupes country codes', () => {
    expect(getCountriesUnlockedInYear(2024, [flag('de', 2024), flag('de', 2024)])).toEqual(['de']);
  });
});
