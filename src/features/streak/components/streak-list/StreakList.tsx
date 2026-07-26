import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import IconTravel from '@/components/icons/IconTravel';
import { TextDateRange } from '@/components/text-date-range/TextDateRange';
import { Period } from '@/features/calendar/components/calendar/Period';
import useFiltersStore, { type StreakType } from '@/features/filters/stores/useFilterStore';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import { getDaysBetweenDates } from '@/utils/date';
import { cn } from '@/utils/tailwind';

type Props = {
  className?: string;
};

export function StreakList({ className }: Props) {
  const maxDaysStreaks = useFiltersStore((store) => store.filtered.streaks.maxDays);

  const { t } = useTranslation();

  const streaks = useMemo(() => {
    return maxDaysStreaks.toSorted((a, b) => b.from?.localeCompare(a.from || '') || 0);
  }, [maxDaysStreaks]);

  console.log('streaks', streaks);

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
      <div className={cn('relative', 'col-span-2 w-full', 'max-w-full', 'scroll-content-wrapper--horizontal')}>
        <div
          className={cn(
            'grid grid-flow-col justify-center-safe gap-3',
            'p-4 px-8',
            'overflow-auto',
            'snap-x snap-mandatory touch-pan-x',
          )}
        >
          {streaks.map((streak) => {
            return (
              <Fragment key={streak.from}>
                {streak.countriesCodes.reverse().map((countryCode) => (
                  <Period
                    className="w-14 h-20 snap-center"
                    key={countryCode}
                    numberOfDays={streak.daysByCountry[countryCode]}
                    countryCode={countryCode}
                  />
                ))}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
