import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import IconTravel from '@/components/icons/IconTravel';
import { TextCounter } from '@/components/text-counter/TextCounter';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { StreaksSummary } from '@/features/streak/components/StreaksSummary';
import { classNamesLayoutGap, classNamesLayoutGrid, classNamesLayoutPx } from '@/layouts/layout-app';
import { getArrayOfYears } from '@/utils/date';
import { roundWithPrecision } from '@/utils/math';
import { cn } from '@/utils/tailwind';

import { SummaryFlags } from './summary-flags/SummaryFlags';

export function CalendarHeader() {
  const lastUpdate = useDataStore((store) => store.integration.lastUpdate);

  const [shouldShowFlags, setShouldShowFlags] = useState(false);

  const totalTrips = useFiltersStore((store) => store.filtered.streaks.maxDays.length || 0);
  const totalDays = useFiltersStore((store) => store.filtered.summary.totalDays);
  const totalDaysAbroad = useFiltersStore((store) => store.filtered.summary.totalDaysAbroad);
  const maxCountriesInDay = useFiltersStore((store) => store.filtered.summary.maxCountriesInDay);
  const maxYearsAbroadInDay = useFiltersStore((store) => store.filtered.summary.maxYearsAbroadInDay);
  const visitedCountriesTotal = useFiltersStore((store) => store.filtered.summary.countriesCodes.length);
  const activeDaysTotal = useFiltersStore((store) => store.filtered.summary.activeDays.length);
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const activeTo = useFiltersStore((store) => store.activeFilters.to);
  const { from, to } = useDataStore((store) => store.date);

  const { t } = useTranslation();

  const years = getArrayOfYears(activeFrom ?? from, activeTo ?? to);
  const totalYears = years.length;

  if (!lastUpdate) {
    return (
      <header className={cn(classNamesLayoutGap, classNamesLayoutPx, classNamesLayoutGrid, 'mb-8')}>
        <div className={cn('col-span-4 relative', 'p-5', 'bg-[#111110]', 'text-center', 'rounded-lg')}>
          {t('integration.hintDemo')}
        </div>
      </header>
    );
  }

  return (
    <header className={cn(classNamesLayoutGap, classNamesLayoutPx, classNamesLayoutGrid, 'mb-8')}>
      <div
        className={cn(
          'col-span-4 @min-[1600px]:col-span-2 relative',
          'p-5 pt-10 sm:pt-5',
          'bg-[#111110]',
          'text-center',
          'rounded-lg',
        )}
      >
        <button
          className={cn('absolute top-5 left-5', 'text-xs text-gray-400 tracking-wider', {
            'text-gray-500': visitedCountriesTotal === 0,
          })}
          onClick={() => setShouldShowFlags(!shouldShowFlags)}
        >
          {t('summary.countries', {
            postProcess: 'interval',
            count: visitedCountriesTotal,
          })}
        </button>
        <div
          className={cn(
            'grid pointer-events-none',
            'text-center text-[100px] lg:text-[150px] leading-none font-semibold',
          )}
        >
          {years.map((year) => (
            <span
              key={year}
              className={cn('col-start-1 row-start-1 text-white', 'transition-bounce', 'tabular-nums')}
              style={{
                opacity: totalYears === 1 ? 1 : Math.min(0.7, 2.25 / totalYears).toFixed(2),
              }}
            >
              {year}
            </span>
          ))}
        </div>
        <TextCounter className="absolute top-5 right-5" value={activeDaysTotal} max={366} />
      </div>
      <div
        className={cn(
          'col-span-4 @min-[1600px]:col-span-2',
          'flex flex-col justify-center',
          'p-5 pt-8',
          'bg-[#111110]',
          'text-center',
          'rounded-lg',
        )}
      >
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col gap-3 items-center">
            <IconTravel total={totalTrips} classNameSize="size-12 text-2xl" shouldShowAllNumbers />
            <h3 className="text-xs md:text-sm">{t('summary.totalTrips')}</h3>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <IconTravel
              total={roundWithPrecision((100 * totalDaysAbroad) / totalDays, 1)}
              suffixAfter="%"
              classNameSize="size-12 text-2xl"
              shouldShowAllNumbers
            />
            <h3 className="text-xs md:text-sm" title={`${totalDaysAbroad} / ${totalDays}`}>
              {t('summary.percentageAbroad')}
            </h3>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <IconTravel total={maxCountriesInDay} classNameSize="size-12 text-2xl" shouldShowAllNumbers />
            <h3 className="text-xs md:text-sm">{t('summary.maxCountriesInDay')}</h3>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <IconTravel total={maxYearsAbroadInDay} classNameSize="size-12 text-2xl" shouldShowAllNumbers />
            <h3 className="text-xs md:text-sm">{t('summary.maxYearsAbroadInDay')}</h3>
          </div>
        </div>
      </div>
      <StreaksSummary />
      {shouldShowFlags && <SummaryFlags onClose={() => setShouldShowFlags(false)} />}
    </header>
  );
}
