import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useTimeRange } from '@/features/filters/hooks/useRange';
import usePreferencesStore, { type CounterShowOption } from '@/features/preferences/stores/usePreferencesStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { classNamesLayoutGap, classNamesLayoutGrid, classNamesLayoutPx } from '@/layouts/layout-app';
import { cn } from '@/utils/tailwind';

import { DAYS_GROUPED_BY_MONTHS } from '../../utils/get-days';
import { Month } from './Month';

type Props = {
  className?: string;
};

const titleByCountryShouldShow: Record<CounterShowOption, string> = {
  numberOfCountries: 'summary.totalCountries',
  yearsAbroad: 'summary.totalYearsAbroad',
  numberOfUnlockedCountries: 'summary.numberOfUnlockedCountries',
  yearOfUnlocking: 'summary.yearOfUnlocking',
  lastYearAbroad: 'summary.lastYearAbroad',
};

export const Calendar = ({ className }: Props) => {
  const { t } = useTranslation();
  const { fromYear, toYear } = useTimeRange();

  const dataStatus = useDataStore((store) => store.status);
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);

  const title = useMemo(() => {
    if (counterShouldShow === 'yearsAbroad' && fromYear === toYear) {
      return 'summary.abroad';
    }

    return titleByCountryShouldShow[counterShouldShow];
  }, [counterShouldShow, fromYear, toYear]);

  if (dataStatus !== 'ready') {
    return null;
  }

  return (
    <>
      <h2 className={cn(classNamesLayoutPx, 'text-center', 'text-2xl text-white font-semibold mb-6')}>{t(title)}</h2>
      <div className={cn(classNamesLayoutGap, classNamesLayoutPx, classNamesLayoutGrid, className)}>
        {DAYS_GROUPED_BY_MONTHS.map((month) => (
          <Month key={month.monthNumber} month={month} />
        ))}
      </div>
    </>
  );
};
