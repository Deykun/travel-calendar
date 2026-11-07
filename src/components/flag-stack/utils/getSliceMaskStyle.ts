import type { CSSProperties } from 'react';

export type SliceMaskMode = 'sharp' | 'blend';

/** Blend mode: crossfade zone width as a fraction of one slice width. */
const BLEND_ZONE_RATIO = 0.8;

/** Seam tilt from vertical in degrees (both modes), positive leans the top to the right. Keep within (-89, 89). */
const SEAM_ANGLE = -20;

/** Width / height of the masked box (the 3x2 flag wrapper). Needed to map midline positions onto a tilted gradient line. */
const BOX_ASPECT = 3 / 2;

const pct = (value: number) => `${Number(value.toFixed(2))}%`;

/**
 * Maps a horizontal position (% of width, measured on the box's vertical midline) onto a
 * linear-gradient stop for the given CSS gradient angle. CSS measures stops along a gradient
 * line through the box center whose length is |w·sin A| + |h·cos A|, so without this
 * projection a tilted seam would drift toward the center.
 */
const toStop = (midlineX: number, gradientAngleDeg: number) => {
  const rad = (gradientAngleDeg * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const gradientLength = Math.abs(sin) + Math.abs(cos) / BOX_ASPECT;
  const scale = sin / gradientLength;

  return 50 + (midlineX - 50) * scale;
};

/**
 * Horizontal slice mask for layer `index` of `total`, stacked in DOM order (later = on top).
 *
 * Each layer is transparent left of its own boundary (index/total) and opaque to the right;
 * the layer above covers whatever is further right. Masking one edge only (instead of both)
 * keeps the crossfade a plain "over" composite, so the background never bleeds through.
 * First layer is unmasked.
 *
 * Seam is tilted by SEAM_ANGLE in both modes.
 *
 * - sharp: hard edge at the boundary.
 * - blend: boundary ± (BLEND_ZONE_RATIO / 2) of a slice width fades from transparent to opaque.
 */
const computeSliceMaskStyle = (index: number, total: number, mode: SliceMaskMode): CSSProperties => {
  const slice = 100 / total;
  const start = index * slice;
  const feather = mode === 'blend' ? (slice * BLEND_ZONE_RATIO) / 2 : 0;
  const gradientAngle = 90 + SEAM_ANGLE;
  const from = pct(toStop(start - feather, gradientAngle));
  const to = pct(toStop(start + feather, gradientAngle));
  const mask = `linear-gradient(${gradientAngle}deg, transparent ${from}, #000 ${to})`;

  return {
    maskImage: mask,
    WebkitMaskImage: mask,
  };
};

const EMPTY_STYLE: CSSProperties = {};

/** Input space is tiny (index/total/mode) and the call runs for every flag on every render, so results are memoized for the module lifetime. */
const cache = new Map<string, CSSProperties>();

export const getSliceMaskStyle = (index: number, total: number, mode: SliceMaskMode = 'sharp'): CSSProperties => {
  if (total < 2 || index === 0) {
    return EMPTY_STYLE;
  }

  const key = `${mode}:${index}/${total}`;
  const cached = cache.get(key);

  if (cached) {
    return cached;
  }

  const style = computeSliceMaskStyle(index, total, mode);
  cache.set(key, style);

  return style;
};
