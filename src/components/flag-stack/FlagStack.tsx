import { type PropsWithChildren, useMemo } from 'react';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import type { CounterShowOption } from '@/features/preferences/stores/usePreferencesStore';
import { cn } from '@/utils/tailwind';

import IconPlaneAlt from '../icons/IconPlaneAlt';
import { ImageFlagSimple } from '../image-flag/ImageFlagSimple';

type Props = {
  className?: string;
  flags?: FlagData[];
  counterShouldShow?: CounterShowOption;
  isActive?: boolean;
};

export const FlagStack = ({
  flags = [],
  className = '',
  counterShouldShow,
  isActive = false,
}: PropsWithChildren<Props>) => {
  const { lastFlag, shouldBeMuted } = useMemo(() => {
    if (counterShouldShow === 'numberOfUnlockedCountries') {
      const lastUnlockedCountry = flags.filter((flag) => flag.wasUnlocked).at(-1);
      return {
        lastFlag: lastUnlockedCountry || flags.at(-1),
        shouldBeMuted: !lastUnlockedCountry && !isActive,
      };
    }

    return {
      lastFlag: flags.at(-1),
      shouldBeMuted: false,
    };
  }, [counterShouldShow, flags, isActive]);

  if (!lastFlag) {
    return null;
  }

  return (
    <div
      className={cn(
        'inline-grid place-items-center',
        'h-6',
        'p-px rounded-md',
        'bg-[#272620] text-[#54544b]',
        className,
      )}
    >
      {/* {flags.map(({ countryCode }) => { */}
      {/* return ( */}
      {shouldBeMuted && (
        <div className={cn('col-start-1 row-start-1')}>
          <IconPlaneAlt className={cn('size-4 text-[#54544b]')} />
        </div>
      )}
      <div
        className={cn('col-start-1 row-start-1', 'w-8 scale-70 origin-center', {
          'scale-50 group-hover:scale-70 duration-300': shouldBeMuted,
        })}
      >
        <ImageFlagSimple
          key={lastFlag.countryCode}
          countryCode={lastFlag.countryCode}
          className={cn({
            'opacity-0 group-hover:opacity-100 duration-300': shouldBeMuted,
          })}
        />
      </div>
      {/* ); */}
      {/* })} */}
    </div>
  );
};
