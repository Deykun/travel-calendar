import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import IconTravel from '@/components/icons/IconTravel';
import { useFlagsSimple } from '@/features/filters/hooks/useFlagsSimple';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '@/utils/empty';
import { cn } from '@/utils/tailwind';

import { Period } from '../components/calendar/Period';
import type { MonthNumber } from '../types';

type Props = {
  className?: string;
  monthNumber: MonthNumber;
};

const sidebarStyles = cn('rounded-lg', 'p-4', 'bg-black border border-[#2b2b27]');

const getFlagKey = ({ year, countryCode }: { year: number; countryCode: string }) => {
  return `${year}-${countryCode}`;
};

export const SidebarMonth = ({ className, monthNumber }: Props) => {
  const homeCountriesCodes = useFiltersStore((store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY);
  const countriesCodes = useFiltersStore(
    (store) => store.filtered.summaryByMonth[monthNumber]?.countriesCodes || EMPTY_ARRAY,
  );
  const countriesCodesByYear = useFiltersStore(
    (store) => store.filtered.summaryByMonth[monthNumber]?.countriesCodesByYear || EMPTY_OBJECT,
  );

  const { t } = useTranslation();

  const { flags } = useFlagsSimple(countriesCodesByYear);

  const totalYears = useMemo(() => {
    if (countriesCodesByYear) {
      return Object.values(countriesCodesByYear).reduce((stack: number, countriesCodes) => {
        if (Array.isArray(countriesCodes) && countriesCodes.length > 0) {
          stack = stack + 1;
        }

        return stack;
      }, 0);
    }

    return 0;
  }, [countriesCodesByYear]);

  if (!monthNumber) {
    return null;
  }

  return (
    <>
      <div className={cn('text-center relative', sidebarStyles, className)} data-sidebar="month">
        <h2 className="text-2xl text-white font-semibold mb-6">{t(`month.name.${monthNumber}`)}</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={countriesCodes.length} shouldShowAllNumbers />
            <span className="text-[#979797] text-sm tracking-wider">{t('summary.totalCountries')}</span>
          </div>
          <div className="inline-flex flex-col gap-2 items-center">
            <IconTravel total={totalYears} shouldShowAllNumbers />
            <span className="text-[#979797] text-sm tracking-wider">{t('summary.totalYearsAbroad')}</span>
          </div>
        </div>
        <div className={cn('flex flex-wrap justify-center gap-3', 'p-2 pb-3')}>
          {flags.map(({ from, to, countryCode }) => (
            <Period
              className="w-14 h-20"
              key={getFlagKey({ year: from, countryCode })}
              from={from}
              to={to}
              countryCode={countryCode}
              shouldShowHomeMarker={homeCountriesCodes.includes(countryCode)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
