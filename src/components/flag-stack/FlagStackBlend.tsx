import { type PropsWithChildren, useEffect } from 'react';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import {
  getLazyFlagsImageKeyIfPossible,
  requestLazyFlagsImage,
  useLazyFlagsImageStore,
} from '@/features/lazy-flags-image/stores/useLazyFlagsImageStore';
import { cn } from '@/utils/tailwind';

import { ImageFlagSimple } from '../image-flag/ImageFlagSimple';
import { Image } from '../image/Image';
import { type SliceMaskMode, getSliceMaskStyle } from './utils/getSliceMaskStyle';

type Props = {
  flags: FlagData[];
  mode?: SliceMaskMode;
};

const SHOW_WHILE_WAITING: 'single' | 'all' = 'single';

export const FlagStackBlend = ({ flags = [], mode = 'sharp' }: PropsWithChildren<Props>) => {
  const key = getLazyFlagsImageKeyIfPossible({ countriesCodes: flags.map(({ countryCode }) => countryCode), mode });
  const image = useLazyFlagsImageStore((store) => store.images[key]);
  const total = flags.length;

  useEffect(() => {
    requestLazyFlagsImage({ countriesCodes: flags.map(({ countryCode }) => countryCode), mode });
  }, [flags, mode]);

  if (image || SHOW_WHILE_WAITING === 'single') {
    const lastFlag = flags[0];

    return (
      <div className="grid">
        {image && (
          <Image
            className={cn(
              'aspect-3/2 object-cover max-w-full shrink-0 rounded-sm drop-shadow',
              'col-start-1 row-start-1',
              'w-8 scale-70 origin-center',
            )}
            src={image}
            alt={flags.map(({ countryCode }) => countryCode).join(', ')}
          />
        )}
        {lastFlag && !image && (
          <div
            key={lastFlag.countryCode}
            className={cn('col-start-1 row-start-1', 'col-start-1 row-start-1', 'w-8 scale-70 origin-center')}
          >
            <ImageFlagSimple countryCode={lastFlag.countryCode} />
          </div>
        )}
      </div>
    );
  }
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
