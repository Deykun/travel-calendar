import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import IconTravel from '@/components/icons/IconTravel';
import { TextDateRange } from '@/components/text-date-range/TextDateRange';
import { Period } from '@/features/calendar/components/calendar/Period';
import useFiltersStore, { type StreakType } from '@/features/filters/stores/useFilterStore';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import { openSidebar } from '@/features/sidebar/stores/useSidebarStore';
import useEffectChange from '@/hooks/useEffectChange';
import { getDaysBetweenDates } from '@/utils/date';
import { cn } from '@/utils/tailwind';

const MINIMAL_STREAK_LENGTH_TO_SHOW = 1;

type Props = {
  type: StreakType;
};

export function BestStreak({ type }: Props) {
  const [streakIndex, setStreakIndex] = useState(0);
  const activeFilters = useFiltersStore((store) => store.activeFilters);
  const shouldCounterUseScale = usePreferencesStore((store) => store.calendar.shouldCounterUseScale);
  const maxTotalDays = useFiltersStore((store) => store.filtered.streaks.maxDays?.[0]?.count || 0);
  const maxTotalCountries = useFiltersStore((store) => store.filtered.streaks.maxCountries?.[0]?.count || 0);
  const streak = useFiltersStore((store) => store.filtered.streaks[type][streakIndex]);
  const hasNext = useFiltersStore(
    (store) => (store.filtered.streaks[type][streakIndex + 1]?.count ?? 0) >= MINIMAL_STREAK_LENGTH_TO_SHOW,
  );

  const { t } = useTranslation();

  useEffectChange(() => {
    setStreakIndex(0);
  }, [activeFilters]);

  if (!streak || streak.count < MINIMAL_STREAK_LENGTH_TO_SHOW) {
    return null;
  }

  return (
    <div
      className={cn(
        'col-span-4 @min-[1600px]:col-span-2',
        'flex flex-col justify-center',
        'p-5 pt-10',
        'bg-[#111110]',
        'text-center',
        'rounded-lg',
        'relative',
        'group',
      )}
    >
      <TextDateRange className="absolute top-5 left-5" from={streak.from} to={streak.to} />
      <div
        className={cn(
          'absolute top-5 right-5 z-2',
          'text-xs text-gray-400 tracking-wider',
          'opacity-0 group-hover:opacity-100 duration-150',
        )}
      >
        <strong>Current #{streakIndex + 1}</strong>
        <button onClick={() => setStreakIndex(0)}> # 1</button>
        <button onClick={() => setStreakIndex((previous) => previous + 1)} disabled={!hasNext}>
          {'->'}
        </button>{' '}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {streak.from && streak.to && (
          <div className="flex flex-col gap-3 items-center justify-center">
            <IconTravel
              total={getDaysBetweenDates(streak.from, streak.to)}
              maxTotal={shouldCounterUseScale ? maxTotalDays : undefined}
              classNameSize="size-12 text-2xl"
              shouldShowAllNumbers
            />
            <h3 className="text-xs md:text-sm">{t(`summary.maxDaysInTheRow`)}</h3>
            {/* onClick={() => openSidebar({ type: 'streak', streakType: type, index: 0 })}>Show</button> */}
          </div>
        )}
        <div className="flex flex-col gap-3 items-center justify-center">
          <IconTravel
            total={streak.countriesCodes.length}
            maxTotal={shouldCounterUseScale ? maxTotalCountries : undefined}
            classNameSize="size-12 text-2xl"
            shouldShowAllNumbers
          />
          <h3 className="text-xs md:text-sm">{t(`summary.maxCountriesInTheRow`)}</h3>
          {/* onClick={() => openSidebar({ type: 'streak', streakType: type, index: 0 })}>Show</button> */}
        </div>
        <div className={cn('relative', 'col-span-2 w-full', 'max-w-full', 'scroll-content-wrapper--horizontal')}>
          <div
            className={cn(
              'grid grid-flow-col justify-center-safe gap-3',
              'p-4 px-8',
              'overflow-auto',
              'snap-x snap-mandatory touch-pan-x',
            )}
          >
            {streak.countriesCodes.map((countryCode) => {
              return (
                <Period
                  className="w-14 h-20 snap-center"
                  key={countryCode}
                  numberOfDays={streak.daysByCountry[countryCode]}
                  countryCode={countryCode}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
