import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { cn } from '@/utils/tailwind';

import { StreakPeriod } from '../streak-period/StreakPeriod';

type Props = {
  className?: string;
};

export function StreakList({ className }: Props) {
  const maxDaysStreaks = useFiltersStore((store) => store.filtered.streaks.maxDays);

  const { t } = useTranslation();

  const streaks = useMemo(() => {
    return maxDaysStreaks.toSorted((a, b) => b.from?.localeCompare(a.from || '') || 0);
  }, [maxDaysStreaks]);

  if (streaks.length === 0) {
    return null;
  }

  console.log(streaks[0]?.countriesCodes);

  return (
    <div
      className={cn(
        'flex flex-col',
        'p-5 pt-3',
        'bg-[#111110]',
        'text-center',
        'rounded-lg',
        'relative',
        'group',
        className,
      )}
    >
      <h2 className={cn('text-2xl text-white', 'font-semibold mb-5')}>{t(`summary.tripsTitle`)}</h2>
      <span
        className={cn('absolute top-5 left-5', 'text-xs text-gray-400 tracking-wider', {
          'text-gray-500': streaks.length === 0,
        })}
      >
        {t('summary.trips', {
          postProcess: 'interval',
          count: streaks.length,
        })}
      </span>
      <div className={cn('relative', 'col-span-2 w-full', 'max-w-full', 'scroll-content-wrapper--horizontal')}>
        <div
          // Resets scroll
          key={`${streaks.at(0)?.from}-${streaks.at(-1)?.to}`}
          className={cn(
            'grid grid-flow-col justify-center-safe gap-3',
            'p-4 px-8',
            'overflow-auto',
            'snap-x snap-mandatory touch-pan-x',
          )}
        >
          {streaks.map((streak, streakIndex) => {
            return (
              <Fragment key={streak.from}>
                {streak.countriesCodes.toReversed().map((countryCode, countryIndex) => {
                  const isEndPoint = countryIndex === 0;
                  const isStartPoint = countryIndex === streak.countriesCodes.length - 1;

                  return (
                    <StreakPeriod
                      className="w-14 h-20 snap-center relative"
                      key={`${streakIndex}-${countryCode}`}
                      numberOfDays={streak.daysByCountry[countryCode]}
                      countryCode={countryCode}
                      isEndPoint={isEndPoint}
                      isStartPoint={isStartPoint}
                      from={streak.from}
                      to={streak.to}
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
