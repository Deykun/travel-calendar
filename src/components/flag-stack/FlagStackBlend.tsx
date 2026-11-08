import { type PropsWithChildren, useEffect } from 'react';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import {
  getLazyFlagsImageKeyIfPossible,
  requestLazyFlagsImage,
  useLazyFlagsImageStore,
} from '@/features/lazy-flags-image/stores/useLazyFlagsImageStore';
import { cn } from '@/utils/tailwind';

import { ImageFlagSimple } from '../image-flag/ImageFlagSimple';
import { type SliceMaskMode, getSliceMaskStyle } from './utils/getSliceMaskStyle';

type Props = {
  flags: FlagData[];
  mode?: SliceMaskMode;
};

export const FlagStackBlend = ({ flags = [], mode = 'sharp' }: PropsWithChildren<Props>) => {
  const key = getLazyFlagsImageKeyIfPossible({ countriesCodes: flags.map(({ countryCode }) => countryCode), mode });
  const image = useLazyFlagsImageStore((store) => store.images[key]);
  const total = flags.length;

  useEffect(() => {
    requestLazyFlagsImage({ countriesCodes: flags.map(({ countryCode }) => countryCode), mode });
  }, [flags, mode]);

  return (
    <div className="grid">
      {flags.toReversed().map(({ countryCode }, index) => {
        return (
          <div
            key={countryCode}
            className={cn('col-start-1 row-start-1', 'w-8 scale-70 origin-center')}
            style={getSliceMaskStyle(index, total, mode)}
          >
            <ImageFlagSimple countryCode={countryCode} />
          </div>
        );
      })}
    </div>
  );
};
