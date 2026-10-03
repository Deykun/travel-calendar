import { useTranslation } from 'react-i18next';

import usePreferencesStore, { type PreferencesStoreState } from '@/features/preferences/stores/usePreferencesStore';
import { classNamesLayoutGap, classNamesLayoutGrid, classNamesLayoutPx } from '@/layouts/layout-app';
import { cn } from '@/utils/tailwind';

import { DAYS_GROUPED_BY_MONTHS } from '../../utils/get-days';
import { Month } from './Month';

type Props = {
  className?: string;
};

const titleByCountryShouldShow: Record<PreferencesStoreState['calendar']['counterShouldShow'], string> = {
  numberOfCountries: 'summary.totalCountries',
  yearsAbroad: 'summary.totalYearsAbroad',
  numberOfCountriesUnlocked: 'summary.numberOfCountriesUnlocked',
  orderOfUnlocking: 'summary.orderOfUnlocking',
};

export const Calendar = ({ className }: Props) => {
  const { t } = useTranslation();
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);

  return (
    <>
      <h2 className={cn(classNamesLayoutPx, 'mb-3')}>{t(titleByCountryShouldShow[counterShouldShow])}</h2>
      <div className={cn(classNamesLayoutGap, classNamesLayoutPx, classNamesLayoutGrid, className)}>
        {DAYS_GROUPED_BY_MONTHS.map((month) => (
          <Month key={month.monthNumber} month={month} />
        ))}
      </div>
    </>
  );
};
