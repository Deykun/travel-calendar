import { describe, expect, it } from 'vitest';

import { getSliceMaskStyle } from './getSliceMaskStyle';

describe('getSliceMaskStyle', () => {
  it('returns empty style for a single item', () => {
    expect(getSliceMaskStyle(0, 1)).toEqual({});
  });

  it('returns empty style for zero items', () => {
    expect(getSliceMaskStyle(0, 0)).toEqual({});
  });

  it('leaves the first (bottom) layer unmasked', () => {
    expect(getSliceMaskStyle(0, 4, 'sharp')).toEqual({});
    expect(getSliceMaskStyle(0, 4, 'blend')).toEqual({});
  });

  // Both modes: seam tilted 20deg (gradient angle 110deg). Boundaries are measured on the
  // horizontal midline and projected onto the tilted gradient line of a 3:2 box.
  describe('sharp', () => {
    it('is the default mode', () => {
      expect(getSliceMaskStyle(1, 4)).toEqual(getSliceMaskStyle(1, 4, 'sharp'));
    });

    it('tilts the gradient by the seam angle', () => {
      expect(getSliceMaskStyle(1, 4, 'sharp').maskImage).toMatch(/^linear-gradient\(110deg, /);
    });

    it('hides second of 4 left of the 25% boundary with a hard edge', () => {
      const { maskImage, WebkitMaskImage } = getSliceMaskStyle(1, 4, 'sharp');

      expect(maskImage).toBe('linear-gradient(110deg, transparent 29.88%, #000 29.88%)');
      expect(WebkitMaskImage).toBe(maskImage);
    });

    it('hides last of 4 left of the 75% boundary', () => {
      expect(getSliceMaskStyle(3, 4, 'sharp').maskImage).toBe('linear-gradient(110deg, transparent 70.12%, #000 70.12%)');
    });

    it('hides second of 2 left of the 50% boundary (box center, unaffected by tilt)', () => {
      expect(getSliceMaskStyle(1, 2, 'sharp').maskImage).toBe('linear-gradient(110deg, transparent 50%, #000 50%)');
    });

    it('rounds awkward fractions to 2 decimals', () => {
      expect(getSliceMaskStyle(1, 3, 'sharp').maskImage).toBe('linear-gradient(110deg, transparent 36.59%, #000 36.59%)');
    });
  });

  // Blend: zone = half a slice, measured on the midline and projected the same way.
  describe('blend', () => {
    it('tilts the gradient by the seam angle', () => {
      expect(getSliceMaskStyle(1, 4, 'blend').maskImage).toMatch(/^linear-gradient\(110deg, /);
    });

    it('second of 4 fades in around the 25% boundary', () => {
      expect(getSliceMaskStyle(1, 4, 'blend').maskImage).toBe(
        'linear-gradient(110deg, transparent 24.85%, #000 34.91%)',
      );
    });

    it('last of 4 fades in around the 75% boundary', () => {
      expect(getSliceMaskStyle(3, 4, 'blend').maskImage).toBe(
        'linear-gradient(110deg, transparent 65.09%, #000 75.15%)',
      );
    });

    it('second of 2 fades in around the 50% boundary', () => {
      expect(getSliceMaskStyle(1, 2, 'blend').maskImage).toBe(
        'linear-gradient(110deg, transparent 39.94%, #000 60.06%)',
      );
    });

    it('keeps the seam centered on the box center for the middle boundary', () => {
      // 50% on the midline is the box center, which is always 50% along any gradient line.
      const { maskImage } = getSliceMaskStyle(1, 2, 'blend');
      const stops = [...String(maskImage).matchAll(/([\d.]+)%/g)].map((m) => Number(m[1]));

      expect(stops).toHaveLength(2);
      expect((stops[0]! + stops[1]!) / 2).toBeCloseTo(50, 1);
    });
  });

  describe('cache', () => {
    it('returns the same object for the same inputs', () => {
      expect(getSliceMaskStyle(2, 5, 'blend')).toBe(getSliceMaskStyle(2, 5, 'blend'));
      expect(getSliceMaskStyle(0, 5, 'blend')).toBe(getSliceMaskStyle(0, 3, 'sharp'));
    });

    it('does not mix up modes or positions', () => {
      expect(getSliceMaskStyle(2, 5, 'blend')).not.toBe(getSliceMaskStyle(2, 5, 'sharp'));
      expect(getSliceMaskStyle(2, 5, 'sharp')).not.toBe(getSliceMaskStyle(3, 5, 'sharp'));
    });
  });
});
