import { type PropsWithChildren, useMemo } from 'react';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import { useFlagsSorting } from '@/features/filters/hooks/useFlagsSorting';
import usePreferencesStore, { type CounterShowOption } from '@/features/preferences/stores/usePreferencesStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { cn } from '@/utils/tailwind';

import IconPlaneAlt from '../icons/IconPlaneAlt';
import { ImageFlagSimple } from '../image-flag/ImageFlagSimple';
import { FlagStackBlend } from './FlagStackBlend';
import { getUniqueFlags } from './utils/getUniqueFlags';

type Props = {
  className?: string;
  flags?: FlagData[];
  counterShouldShow?: CounterShowOption;
  isActive?: boolean;
};

const MAXIMUM_FLAGS_TO_SHOW = 3;

export const FlagStack = ({
  flags = [],
  className = '',
  counterShouldShow,
  isActive = false,
}: PropsWithChildren<Props>) => {
  const totalDaysByCountry = useDataStore((store) => store.totalDaysByCountry);
  const displayMode = usePreferencesStore((store) => store.flags.displayMode);
  const { sortBy } = useFlagsSorting();

  const { sortedFlags, shouldBeMuted } = useMemo(() => {
    const flagsSorted =
      sortBy === 'rarest'
        ? [...flags]
            .toReversed()
            .sort((a, b) => (totalDaysByCountry[b.countryCode] || 0) - (totalDaysByCountry[a.countryCode] || 0))
        : flags.toReversed();

    const flagsUnique = getUniqueFlags(flagsSorted);

    if (counterShouldShow === 'numberOfUnlockedCountries') {
      const lastUnlockedCountries = flagsUnique.filter((flag) => flag.wasUnlocked);
      return {
        sortedFlags: lastUnlockedCountries.length > 0 ? lastUnlockedCountries : flagsUnique,
        shouldBeMuted: lastUnlockedCountries.length === 0 && !isActive,
      };
    }

    return {
      sortedFlags: flagsUnique,
      shouldBeMuted: false,
    };
  }, [counterShouldShow, flags, isActive, sortBy, totalDaysByCountry]);

  if (0 in sortedFlags === false) {
    return null;
  }

  const shouldShowOneFlag = displayMode === 'single' || sortedFlags.length < 2 || shouldBeMuted;

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
      {shouldShowOneFlag && (
        <>
          {shouldBeMuted && (
            <div className={cn('col-start-1 row-start-1')}>
              <IconPlaneAlt className={cn('size-4 text-[#d8da51]')} />
            </div>
          )}
          <div
            className={cn('col-start-1 row-start-1', 'w-8 scale-70 group-hover:scale-80 duration-300 origin-center', {
              'scale-50': shouldBeMuted,
            })}
          >
            <ImageFlagSimple
              key={sortedFlags[0].countryCode}
              countryCode={sortedFlags[0].countryCode}
              className={cn({
                'opacity-0 group-hover:opacity-100 duration-300': shouldBeMuted,
              })}
            />
          </div>
        </>
      )}

      {!shouldShowOneFlag && <FlagStackBlend flags={sortedFlags.slice(0, MAXIMUM_FLAGS_TO_SHOW)} mode={displayMode} />}
    </div>
  );
};
