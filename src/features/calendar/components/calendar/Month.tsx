import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { FlagHover } from '@/components/flag-hover/FlagHover';
import { TextCounter } from '@/components/text-counter/TextCounter';
import { useFlagsSimple } from '@/features/filters/hooks/useFlagsSimple';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import { getDayKey } from '@/features/settings/utils/get-day-key';
import { closeSidebar, openSidebar, useSidebarStore } from '@/features/sidebar/stores/useSidebarStore';
import { cn } from '@/utils/tailwind';

import type { MonthMetadata } from '../../types';
import { getDaysInMonth } from '../../utils/get-days';
import { Day } from './Day';

type Props = {
  className?: string;
  month: MonthMetadata;
};

export const Month = ({ className = '', month }: Props) => {
  const { t } = useTranslation();

  const isSidebarOpen = useSidebarStore(
    (state) =>
      state?.sidebar?.type === 'month' &&
      state.sidebar.monthNumber === month.monthNumber &&
      state.isCollapsed === false,
  );

  const activeDays = useFiltersStore(
    (store) => store.filtered.summaryByMonth[month.monthNumber]?.activeDays.length || 0,
  );
  const visitedCountries = useFiltersStore(
    (store) => store.filtered.summaryByMonth[month.monthNumber]?.countriesCodes.length || 0,
  );

  const countriesCodesByYear = useFiltersStore(
    (store) => store.filtered.summaryByMonth[month.monthNumber]?.countriesCodesByYear,
  );

  const { flags } = useFlagsSimple(countriesCodesByYear);

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
        className={cn('absolute top-5 left-5', 'text-xs text-gray-400 tracking-wider', 'duration-500', {
          'text-gray-500': visitedCountries === 0,
          'text-white': isSidebarOpen,
        })}
        onClick={handleClick}
      >
        <FlagHover flags={flags} from="bottom-left">
          {t('summary.countries', {
            postProcess: 'interval',
            count: visitedCountries,
          })}
        </FlagHover>
      </button>
      <h2 className={cn('text-2xl text-white', 'font-semibold mb-4')}>{t(month.name)} </h2>
      <TextCounter className="absolute top-5 right-5" value={activeDays || 0} max={daysInMonth} />
      <div className={cn('grid grid-cols-7 gap-x-1.5 gap-y-1')}>
        {month.days.map((day) => (
          <Day key={day} dayKey={getDayKey({ day, month: month.monthNumber })} dayNumber={day} />
        ))}
      </div>
    </article>
  );
};
