import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DatetimeDay } from '@/components/datetime/datetime-day';
import IconTravel from '@/components/icons/IconTravel';
import { useFlagsForDay } from '@/features/filters/hooks/useFlagsForDate';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { ToggleShowHome } from '@/features/preferences/components/ToggleShowHome';
import type { DateMMDD } from '@/types';
import { EMPTY_ARRAY } from '@/utils/empty';
import { cn } from '@/utils/tailwind';

import { Period } from '../components/calendar/Period';
import { DayTripDetails } from './day/DayTripDetails';

type Props = {
  className?: string;
  dayKey: DateMMDD;
};

const sidebarStyles = cn('rounded-lg', 'p-4', 'bg-black border border-[#2b2b27]');

const getFlagKey = ({ year, countryCode }: { year: number; countryCode: string }) => {
  return `${year}-${countryCode}`;
};

export const SidebarDay = ({ className, dayKey }: Props) => {
  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY);
  const [details, setDetails] = useState<{
    flagKey: string;
    tripsKeys: string[];
    countryCode: string;
  }>({
    flagKey: '',
    tripsKeys: [],
    countryCode: '',
  });

  const yearsAbroad = useFiltersStore((store) => store.filtered.summaryByDay[dayKey]?.yearsAbroad || EMPTY_ARRAY);
  const countriesCodes = useFiltersStore((store) => store.filtered.summaryByDay[dayKey]?.countriesCodes || EMPTY_ARRAY);

  const { t } = useTranslation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDetails({
      flagKey: '',
      tripsKeys: [],
      countryCode: '',
    });
  }, [dayKey]);

  const { flags } = useFlagsForDay(dayKey);

  if (!dayKey) {
    return null;
  }

  return (
    <>
      <div className={cn('text-center relative', sidebarStyles, className)} data-sidebar="day">
        <h2 className="text-2xl text-white font-semibold mb-6">
          <DatetimeDay date={`2000-${dayKey}`} />
        </h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={countriesCodes.length} shouldShowAllNumbers />
            <span className="text-[#979797] text-sm tracking-wider">{t('summary.totalCountries')}</span>
          </div>
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={yearsAbroad.length} shouldShowAllNumbers />
            <span className="text-[#979797] text-sm tracking-wider">{t('summary.totalYearsAbroad')}</span>
          </div>
        </div>
        <div className={cn('flex flex-wrap justify-center gap-3', 'p-2 pb-3')}>
          {flags.map(({ from, to, countryCode, tripsKeys }) => (
            <Period
              className="w-14 h-20"
              key={getFlagKey({ year: from, countryCode })}
              from={from}
              to={to}
              countryCode={countryCode}
              onClick={() =>
                setDetails({
                  flagKey: getFlagKey({ year: from, countryCode }),
                  countryCode,
                  tripsKeys,
                })
              }
              isActive={details.flagKey === getFlagKey({ year: from, countryCode })}
              shouldShowHomeMarker={homeCountriesCodes.includes(countryCode)}
            />
          ))}
        </div>
        <ToggleShowHome className="mt-4" />
      </div>
      {details.tripsKeys.length > 0 && (
        <div className={cn(sidebarStyles, 'mt-8', 'flex flex-col gap-5')}>
          {details.tripsKeys.map((tripKey) => (
            <DayTripDetails key={tripKey} tripKey={tripKey} showOnlyForCountryCode={details.countryCode || undefined} />
          ))}
        </div>
      )}
    </>
  );
};
