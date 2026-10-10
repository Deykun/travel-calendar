import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import IconTravel from '@/components/icons/IconTravel';
import { ImageFlag } from '@/components/image-flag/ImageFlag';
import { TextCounter } from '@/components/text-counter/TextCounter';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { getDayKey } from '@/features/settings/utils/get-day-key';
import { openSidebar } from '@/features/sidebar/stores/useSidebarStore';
import { useCountryDays } from '@/hooks/useCountryDays';
import type { MetadataTrip } from '@/types';
import { EMPTY_ARRAY } from '@/utils/empty';
import { cn } from '@/utils/tailwind';

import { DAYS_GROUPED_BY_MONTHS_BY_DAYS_IN_YEAR } from '../utils/get-days';
import { DayTripDetails } from './day/DayTripDetails';

type Props = {
  className?: string;
  countryCode: string;
};

const sidebarStyles = cn('rounded-lg', 'p-4', 'bg-black border border-[#2b2b27]');

export const SidebarCountry = ({ className, countryCode }: Props) => {
  const tripsByKey = useDataStore((store) => store.tripsByKey);
  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY);

  const { t } = useTranslation();

  const { activeDays, daysInYear } = useCountryDays(countryCode);

  const { trips, totalVisitedPlaces, totalYearsAbroad } = useMemo(() => {
    const trips: MetadataTrip[] = Object.values(tripsByKey)
      .filter((trip): trip is MetadataTrip => trip?.countryCode === countryCode)
      .sort((a, b) => a.from.localeCompare(b.from));

    const totalVisitedPlaces = new Set(trips.map(({ placeKey }) => placeKey)).size;

    const yearsAbroad = new Set<number>();
    trips.forEach(({ from, to }) => {
      const fromYear = Number(from.slice(0, 4));
      const toYear = Number(to.slice(0, 4));
      for (let year = fromYear; year <= toYear; year++) {
        yearsAbroad.add(year);
      }
    });
    const totalYearsAbroad = yearsAbroad.size;

    return { trips, totalVisitedPlaces, totalYearsAbroad };
  }, [tripsByKey, countryCode]);

  if (!countryCode) {
    return null;
  }

  return (
    <>
      <div className={cn('text-center relative', sidebarStyles, className)} data-sidebar="country">
        <div className="flex justify-center mb-3">
          <ImageFlag countryCode={countryCode} shouldShowHomeMarker={homeCountriesCodes.includes(countryCode)} />
        </div>
        <TextCounter className="absolute top-6 left-5" value={activeDays.length} max={daysInYear} variant="percent" />
        <TextCounter className="absolute top-6 right-5" value={activeDays.length} max={daysInYear} variant="slash" />
        <h2 className="text-2xl text-white font-semibold mb-6">{t(`country.name.${countryCode.toLowerCase()}`)}</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={trips.length} shouldShowAllNumbers />
            <span className="text-[#979797] text-sm tracking-wider">{t('summary.tripsTitle')}</span>
          </div>
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={totalVisitedPlaces} shouldShowAllNumbers />
            <span className="text-[#979797] text-sm tracking-wider">{t('summary.placesTitle')}</span>
          </div>
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={totalYearsAbroad} shouldShowAllNumbers />
            <span className="text-[#979797] text-sm tracking-wider">
              {t('summary.totalYears', { count: totalYearsAbroad })}
            </span>
          </div>
        </div>
      </div>
      <div className={cn('grid grid-cols-4 gap-2 mt-6', 'text-center')}>
        {DAYS_GROUPED_BY_MONTHS_BY_DAYS_IN_YEAR[daysInYear].map((month) => (
          <div key={month.monthNumber} className={cn('p-1.5 rounded-sm')}>
            <strong className="block mb-2 text-white text-[8px] tracking-widest font-normal">{t(month.name)}</strong>
            <div className={cn('grid grid-cols-7 gap-x-1 gap-y-1')}>
              {month.days.map((day) => {
                const dayKey = getDayKey({ day, month: month.monthNumber });
                const isActive = activeDays.includes(dayKey);

                if (!isActive) {
                  return <span key={day} className={cn('inline-flex size-1.5 rounded-xs', 'bg-[#272620]')} />;
                }

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => openSidebar({ type: 'day', dayKey })}
                    className={cn('inline-flex size-1.5 rounded-xs', 'bg-[#d8da51]')}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {trips.length > 0 && (
        <div className={cn(sidebarStyles, 'mt-8', 'flex flex-col gap-5')}>
          {trips.map(({ key: tripKey }) => (
            <DayTripDetails key={tripKey} tripKey={tripKey} showOnlyForCountryCode={countryCode} />
          ))}
        </div>
      )}
    </>
  );
};
