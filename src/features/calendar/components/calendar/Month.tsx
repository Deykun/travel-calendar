import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FlagHover } from '@/components/flag-hover/FlagHover';
import { VisitedCountries } from '@/features/calendar/components/common/VisitedCountries';
import { VisitedDays } from '@/features/calendar/components/common/VisitedDays';
import { useFlagsSimple } from '@/features/filters/hooks/useFlagsSimple';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import { getDayKey } from '@/features/settings/utils/get-day-key';
import { closeSidebar, openSidebar, useSidebarStore } from '@/features/sidebar/stores/useSidebarStore';
import { cn } from '@/utils/tailwind';

import type { MonthMetadata } from '../../types';
import { getDaysInMonth } from '../../utils/get-days';
import { Day } from './Day';
import { DifferenceMonthFlagHover } from './DifferenceMonthFlagHover';

type Props = {
  className?: string;
  month: MonthMetadata;
};

export const Month = ({ className = '', month }: Props) => {
  const shouldShowChangesInLastYearRange = usePreferencesStore((store) => store.date.shouldShowChangesInLastYearRange);
  const { t } = useTranslation();

  const isSidebarOpen = useSidebarStore(
    (state) =>
      state?.sidebar?.type === 'month' &&
      state.sidebar.monthNumber === month.monthNumber &&
      state.isCollapsed === false,
  );

  const countriesCodesByYear = useFiltersStore(
    (store) => store.filtered.summaryByMonth[month.monthNumber]?.countriesCodesByYear,
  );

  const { flags } = useFlagsSimple(countriesCodesByYear);

  const flagsToShow = useMemo(() => {
    // Doesn't make sense for month
    return flags.map((flag) => ({ ...flag, hasAbroadTravel: false }));
  }, [flags]);

  const daysInMonth = getDaysInMonth(month.monthNumber);

  const handleClick = useCallback(() => {
    if (isSidebarOpen) {
      closeSidebar();

      return;
    }

    openSidebar({ type: 'month', monthNumber: month.monthNumber });
  }, [isSidebarOpen, month.monthNumber]);

  return (
    <article className={cn('p-5 pt-3', 'bg-[#111110]', 'text-center', 'rounded-lg', 'relative hover:z-10', className)}>
      <button
        className={cn(
          'absolute top-4 left-5 z-5',
          'translate-y-0 has-data-[type=difference]:-translate-y-1',
          'duration-300',
        )}
        onClick={handleClick}
      >
        {shouldShowChangesInLastYearRange ? (
          <DifferenceMonthFlagHover flags={flagsToShow} from="bottom-left" monthNumber={month.monthNumber}>
            <VisitedCountries
              className={cn('duration-500', { 'text-white': isSidebarOpen })}
              place="month"
              monthNumber={month.monthNumber}
              flags={flagsToShow}
            />
          </DifferenceMonthFlagHover>
        ) : (
          <FlagHover flags={flagsToShow} from="bottom-left">
            <VisitedCountries
              className={cn('duration-500', { 'text-white': isSidebarOpen })}
              place="month"
              monthNumber={month.monthNumber}
              flags={flagsToShow}
            />
          </FlagHover>
        )}
      </button>
      <h2 className={cn('text-2xl text-white', 'font-semibold mb-4')}>{t(month.name)} </h2>
      <VisitedDays
        className={cn(
          'absolute top-4 right-5',
          'translate-y-0 has-data-[type=difference]:-translate-y-1',
          'duration-300',
        )}
        place="month"
        monthNumber={month.monthNumber}
        max={daysInMonth}
      />
      <div className={cn('grid grid-cols-7 gap-x-1.5 gap-y-1')}>
        {month.days.map((day) => (
          <Day key={day} dayKey={getDayKey({ day, month: month.monthNumber })} dayNumber={day} />
        ))}
      </div>
    </article>
  );
};
