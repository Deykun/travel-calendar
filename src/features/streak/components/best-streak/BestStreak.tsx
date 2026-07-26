import { useTranslation } from 'react-i18next';

import IconTravel from '@/components/icons/IconTravel';
import { TextDateRange } from '@/components/text-date/TextDateRange';
import { Period } from '@/features/calendar/components/calendar/Period';
import useFiltersStore, { type StreakType } from '@/features/filters/stores/useFilterStore';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import { getDaysBetweenDates } from '@/utils/date';
import { cn } from '@/utils/tailwind';

const MINIMAL_STREAK_LENGTH_TO_SHOW = 1;

type Props = {
  type: StreakType;
  className?: string;
};

export function BestStreak({ type, className }: Props) {
  const shouldCounterUseScale = usePreferencesStore((store) => store.calendar.shouldCounterUseScale);
  const maxTotalDays = useFiltersStore((store) => store.filtered.streaks.maxDays?.[0]?.count || 0);
  const maxTotalCountries = useFiltersStore((store) => store.filtered.streaks.maxCountries?.[0]?.count || 0);
  const streak = useFiltersStore((store) => store.filtered.streaks[type][0]);

  const { t } = useTranslation();

  if (!streak || streak.count < MINIMAL_STREAK_LENGTH_TO_SHOW) {
    return null;
  }

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
      <h2 className={cn('text-2xl text-white', 'font-semibold mb-5')}>{t(`summary.${type}Title`)}</h2>
      <TextDateRange className="absolute top-6 left-5 text-[9px]" from={streak.from} to={undefined} />
      <TextDateRange className="absolute top-6 right-5 text-[9px]" from={undefined} to={streak.to} />
      <div className="grid grid-cols-8 gap-4">
        {streak.from && streak.to && (
          <div className={cn('col-span-2', 'flex flex-col gap-3 items-center pt-5')}>
            <IconTravel
              total={getDaysBetweenDates(streak.from, streak.to)}
              maxTotal={shouldCounterUseScale ? maxTotalDays : undefined}
              classNameSize="size-12 text-2xl"
              shouldShowAllNumbers
            />
            <h3 className="text-xs now-">{t(`summary.maxDaysInTheRow`)}</h3>
            {/* onClick={() => openSidebar({ type: 'streak', streakType: type, index: 0 })}>Show</button> */}
          </div>
        )}
        <div className={cn('col-span-2', 'flex flex-col gap-3 items-center pt-5')}>
          <IconTravel
            total={streak.countriesCodes.length}
            maxTotal={shouldCounterUseScale ? maxTotalCountries : undefined}
            classNameSize="size-12 text-2xl"
            shouldShowAllNumbers
          />
          <h3 className="text-xs">
            {t(`summary.maxCountriesInTheRow`, { postProcess: 'interval', count: streak.countriesCodes.length })}
          </h3>
          {/* onClick={() => openSidebar({ type: 'streak', streakType: type, index: 0 })}>Show</button> */}
        </div>
        <div className={cn('relative', 'col-span-4 w-full', 'max-w-full', 'scroll-content-wrapper--horizontal')}>
          <div
            className={cn(
              'grid grid-flow-col justify-center-safe gap-3',
              'p-4 px-8',
              'overflow-auto',
              'snap-x snap-mandatory touch-pan-x',
            )}
          >
            {streak.countriesCodes.reverse().map((countryCode) => {
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
