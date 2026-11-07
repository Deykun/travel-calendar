import { type PropsWithChildren } from 'react';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import { cn } from '@/utils/tailwind';

import { ImageFlagSimple } from '../image-flag/ImageFlagSimple';
import { type SliceMaskMode, getSliceMaskStyle } from './utils/getSliceMaskStyle';

type Props = {
  flags: FlagData[];
  mode?: SliceMaskMode;
};

export const FlagStackBlend = ({ flags = [], mode = 'sharp' }: PropsWithChildren<Props>) => {
  const total = flags.length;

  return (
    <div className="grid">
      {flags.toReversed().map(({ countryCode }, index) => {
        return (
          <div
            key={countryCode}
            className={cn('col-start-1 row-start-1', 'w-8 scale-70 group-hover:scale-80 duration-300 origin-center')}
            style={getSliceMaskStyle(index, total, mode)}
          >
            <ImageFlagSimple countryCode={countryCode} />
          </div>
        );
      })}
    </div>
  );
};
