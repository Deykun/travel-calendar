import { describe, expect, it } from 'vitest';

import type { DateYYYYMMDD } from '@/types';

import { calculateTotalDays } from './calculateTotalDays';

const TODAY: DateYYYYMMDD = '2026-10-20';

type Params = Parameters<typeof calculateTotalDays>[0];

const calc = (params: Partial<Params>) =>
  calculateTotalDays({
    dataFrom: undefined,
    dataTo: undefined,
    pickedFrom: undefined,
    pickedTo: undefined,
    today: undefined,
    fallback: 0,
    ...params,
  });

describe('calculateTotalDays', () => {
  it('uses full data range when nothing is picked', () => {
    expect(calc({ dataFrom: '2026-01-01', dataTo: '2026-01-10' })).toBe(10);
  });

  it('uses picked range when data has no range', () => {
    expect(calc({ pickedFrom: '2026-01-01', pickedTo: '2026-01-10', fallback: 42 })).toBe(10);
  });

  it('falls back when neither range is complete', () => {
    expect(calc({ fallback: 42 })).toBe(42);
    expect(calc({ dataFrom: '2026-01-01', fallback: 42 })).toBe(42);
    expect(calc({ pickedTo: '2026-01-10', fallback: 42 })).toBe(42);
  });

  it('uses picked range when it is inside the data range', () => {
    expect(
      calc({ dataFrom: '2026-01-01', dataTo: '2026-01-31', pickedFrom: '2026-01-05', pickedTo: '2026-01-09' }),
    ).toBe(5);
  });

  it('clamps picked from to data from when picked earlier', () => {
    expect(calc({ dataFrom: '2026-01-10', dataTo: '2026-01-20', pickedFrom: '2025-12-01' })).toBe(11);
  });

  it('clamps picked to to data to when picked later', () => {
    expect(calc({ dataFrom: '2026-01-10', dataTo: '2026-01-20', pickedTo: '2026-03-01' })).toBe(11);
  });

  it('clamps both ends when picked range is wider than data', () => {
    expect(
      calc({ dataFrom: '2026-01-10', dataTo: '2026-01-20', pickedFrom: '2025-01-01', pickedTo: '2027-01-01' }),
    ).toBe(11);
  });

  it('returns 0 when picked range is entirely outside data range', () => {
    expect(
      calc({ dataFrom: '2026-01-10', dataTo: '2026-01-20', pickedFrom: '2026-02-01', pickedTo: '2026-02-10' }),
    ).toBe(0);
    expect(
      calc({ dataFrom: '2026-01-10', dataTo: '2026-01-20', pickedFrom: '2025-01-01', pickedTo: '2025-01-10' }),
    ).toBe(0);
  });

  describe('with today (future excluded)', () => {
    it('caps to at today when data range extends into the future', () => {
      expect(calc({ dataFrom: '2026-10-11', dataTo: '2026-12-31', today: TODAY })).toBe(10);
    });

    it('caps picked to at today', () => {
      expect(calc({ dataFrom: '2026-01-01', dataTo: '2026-12-31', pickedTo: '2026-11-30', today: TODAY })).toBe(293);
    });

    it('does not cap when data range ends before today', () => {
      expect(calc({ dataFrom: '2026-01-01', dataTo: '2026-01-10', today: TODAY })).toBe(10);
    });

    it('returns 0 when picked range starts after today', () => {
      expect(calc({ dataFrom: '2026-01-01', dataTo: '2026-12-31', pickedFrom: '2026-11-01', today: TODAY })).toBe(0);
    });

    it('counts today as last day inclusive', () => {
      expect(calc({ dataFrom: TODAY, dataTo: '2026-12-31', today: TODAY })).toBe(1);
    });
  });

  describe('without today (future included)', () => {
    it('does not cap to at today', () => {
      expect(calc({ dataFrom: '2026-10-11', dataTo: '2026-12-31' })).toBe(82);
    });
  });
});
