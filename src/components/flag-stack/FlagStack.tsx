import { type PropsWithChildren, useMemo } from 'react';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import type { CounterShowOption } from '@/features/preferences/stores/usePreferencesStore';
import { cn } from '@/utils/tailwind';

import { ImageFlagSimple } from '../image-flag/ImageFlagSimple';

type Props = {
  className?: string;
  flags?: FlagData[];
  counterShouldShow?: CounterShowOption;
};

export const FlagStack = ({ flags = [], className = '', counterShouldShow }: PropsWithChildren<Props>) => {
  const { lastFlag, shouldBeMuted } = useMemo(() => {
    if (counterShouldShow === 'numberOfUnlockedCountries') {
      const lastUnlockedCountry = flags.filter((flag) => flag.wasUnlocked).at(-1);
      return {
        lastFlag: lastUnlockedCountry || flags.at(-1),
        shouldBeMuted: !lastUnlockedCountry,
      };
    }

    return {
      lastFlag: flags.at(-1),
      shouldBeMuted: false,
    };
  }, [counterShouldShow, flags]);

  if (!lastFlag) {
    return null;
  }

  return (
    <div
      className={cn(
        'inline-grid place-items-center',
        'h-6',
        'p-px bg-[#3d3d3d6e] rounded-md',
        {
          'saturate-0 group-hover:saturate-100 duration-300': shouldBeMuted,
        },
        className,
      )}
    >
      {/* {flags.map(({ countryCode }) => { */}
      {/* return ( */}
      <div className={cn('col-start-1 row-start-1', 'w-8 scale-70 origin-center')}>
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
