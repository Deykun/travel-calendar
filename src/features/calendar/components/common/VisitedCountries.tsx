import { useTranslation } from 'react-i18next';

import type { FlagData } from '@/features/filters/hooks/useFlagsForDate';
import { useTimeRange } from '@/features/filters/hooks/useRange';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import { cn } from '@/utils/tailwind';

import type { MonthNumber } from '../../types';
import { VisitedCountriesDifference } from './VisitedCountriesDifference';

export type VisitedCountriesPlace =
  | { place: 'year' | 'streaks' }
  | { place: 'month'; monthNumber: MonthNumber; flags: FlagData[] };

type Props = VisitedCountriesPlace & {
  className?: string;
};

export function VisitedCountries({ className, ...props }: Props) {
  const shouldShowChangesInLastYearRange = usePreferencesStore((store) => store.date.shouldShowChangesInLastYearRange);
  const { toYear } = useTimeRange();

  const { t } = useTranslation();

  const total = useFiltersStore((store) =>
    props.place === 'month'
      ? store.filtered.summaryByMonth[props.monthNumber]?.countriesCodes.length || 0
      : store.filtered.summary.countriesCodes.length,
  );

  return (
    <div
      className={cn(
        'text-left',
        'text-xs text-[#c6c7a7] tracking-wider',
        {
          'text-gray-500': total === 0,
        },
        className,
      )}
    >
      <div>
        {t('summary.countries', {
          postProcess: 'interval',
          count: total,
        })}
      </div>
      {shouldShowChangesInLastYearRange && toYear && (
        <VisitedCountriesDifference key={toYear} year={toYear} {...props} />
      )}
    </div>
  );
}
