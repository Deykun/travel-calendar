import { TextCounter } from '@/components/text-counter/TextCounter';
import { useTimeRange } from '@/features/filters/hooks/useRange';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import { cn } from '@/utils/tailwind';

import type { MonthNumber } from '../../types';
import { VisitedDaysDifference } from './VisitedDaysDifference';

export type VisitedDaysPlace = { place: 'year' | 'streaks' } | { place: 'month'; monthNumber: MonthNumber };

type Props = VisitedDaysPlace & {
  className?: string;
  max: number;
};

export function VisitedDays({ className, max, ...placeProps }: Props) {
  const shouldShowChangesInLastYearRange = usePreferencesStore((store) => store.date.shouldShowChangesInLastYearRange);
  const { toYear } = useTimeRange();

  const total = useFiltersStore((store) =>
    placeProps.place === 'month'
      ? store.filtered.summaryByMonth[placeProps.monthNumber]?.activeDays.length || 0
      : store.filtered.summary.activeDays.length,
  );

  return (
    <div className={cn('text-right', 'text-xs text-gray-400 tracking-wider', className)}>
      <TextCounter value={total} max={max} />
      {shouldShowChangesInLastYearRange && toYear && <VisitedDaysDifference year={toYear} {...placeProps} />}
    </div>
  );
}
