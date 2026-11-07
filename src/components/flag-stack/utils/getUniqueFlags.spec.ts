import { describe, expect, it } from 'vitest';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';

import { getUniqueFlags } from './getUniqueFlags';

const flag = (countryCode: string, rest: Partial<FlagData> = {}): FlagData => ({
  countryCode,
  from: 0,
  to: 0,
  tripsKeys: [],
  ...rest,
});

const codes = (flags: FlagData[]) => flags.map(({ countryCode }) => countryCode);

describe('getUniqueFlags', () => {
  it('returns empty array for empty input', () => {
    expect(getUniqueFlags([])).toEqual([]);
  });

  it('returns all flags when country codes are already unique', () => {
    const flags = [flag('pl'), flag('de'), flag('fr')];

    expect(getUniqueFlags(flags)).toEqual(flags);
  });

  it('removes duplicate country codes', () => {
    const flags = [flag('pl'), flag('de'), flag('pl'), flag('fr'), flag('de')];

    expect(codes(getUniqueFlags(flags))).toEqual(['pl', 'de', 'fr']);
  });

  it('keeps the first occurrence and drops later ones', () => {
    const first = flag('pl', { from: 1, to: 2, tripsKeys: ['a'], wasUnlocked: true });
    const later = flag('pl', { from: 3, to: 4, tripsKeys: ['b'], isDifference: true });

    expect(getUniqueFlags([first, later])).toEqual([first]);
    expect(getUniqueFlags([later, first])).toEqual([later]);
  });

  it('preserves original order', () => {
    const flags = [flag('fr'), flag('pl'), flag('fr'), flag('de'), flag('pl')];

    expect(codes(getUniqueFlags(flags))).toEqual(['fr', 'pl', 'de']);
  });

  it('does not mutate the input', () => {
    const flags = [flag('pl'), flag('pl'), flag('de')];
    const copy = [...flags];

    getUniqueFlags(flags);

    expect(flags).toEqual(copy);
  });
});
