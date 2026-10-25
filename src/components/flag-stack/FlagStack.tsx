import type { PropsWithChildren } from 'react';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import { cn } from '@/utils/tailwind';

import { ImageFlagSimple } from '../image-flag/ImageFlagSimple';

type Props = {
  className?: string;
  flags?: FlagData[];
};

export const FlagStack = ({ flags = [], className = '' }: PropsWithChildren<Props>) => {
  const lastFlag = flags.at(-1);

  if (!lastFlag) {
    return null;
  }

  return (
    <div className={cn('inline-grid place-items-center', 'h-6', className)}>
      {/* {flags.map(({ countryCode }) => { */}
      {/* return ( */}
      <div className={cn('col-start-1 row-start-1', 'w-8 scale-70 origin-center')}>
        <ImageFlagSimple key={lastFlag.countryCode} countryCode={lastFlag.countryCode} />
      </div>
      {/* ); */}
      {/* })} */}
    </div>
  );
};
