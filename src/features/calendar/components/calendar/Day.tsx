import { useCallback, useMemo } from 'react';

import { FlagHover } from '@/components/flag-hover/FlagHover';
import type { PanelFrom } from '@/components/flag-hover/FlagHoverPanel';
import { useFlagsSimple } from '@/features/filters/hooks/useFlagsSimple';
import useFiltersStore from '@/features/filters/stores/useFilterStore';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import { closeSidebar, openSidebar, useSidebarStore } from '@/features/sidebar/stores/useSidebarStore';
import type { DateMMDD } from '@/types';
import { EMPTY_ARRAY } from '@/utils/empty';
import { cn } from '@/utils/tailwind';

import { IconTravelForDay } from './IconTravelForDay';

type Props = {
  className?: string;
  dayNumber: number;
  dayKey: DateMMDD;
};

export const Day = ({ className = '', dayNumber, dayKey }: Props) => {
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);

  const isSidebarOpen = useSidebarStore(
    (state) => state?.sidebar?.type === 'day' && state.sidebar.dayKey === dayKey && state.isCollapsed === false,
  );
  const countriesCodes = useFiltersStore((store) => store.filtered.summaryByDay[dayKey]?.countriesCodes || EMPTY_ARRAY);
  const yearsAbroad = useFiltersStore((store) => store.filtered.summaryByDay[dayKey]?.yearsAbroad || EMPTY_ARRAY);

  const countriesCodesByYear = useFiltersStore((store) => store.filtered.summaryByDay[dayKey]?.countriesCodesByYear);

  const { flags, isHighlightAbroadTravelActive } = useFlagsSimple(countriesCodesByYear);

  const total = counterShouldShow === 'yearsAbroad' ? yearsAbroad.length : countriesCodes.length;

  const handleClick = useCallback(() => {
    if (isSidebarOpen) {
      closeSidebar();

      return;
    }

    openSidebar({ type: 'day', dayKey });
  }, [dayKey, isSidebarOpen]);

  const from: PanelFrom = useMemo(() => {
    if (dayNumber % 7 === 1) {
      return 'top-left';
    }

    if (dayNumber % 7 === 0) {
      return 'top-right';
    }

    return 'top-center';
  }, [dayNumber]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center flex-col gap-1',
        'p-1 pt-2',
        'rounded-sm',
        'duration-500',
        'group',
        {
          'text-[#979797] hover:bg-[#fffb000d] hover:text-white': !isSidebarOpen && total > 0,
          'text-[#3d3d3d] hover:bg-[#4545341c] hover:text-[#656565]': !isSidebarOpen && total === 0,
          'text-white bg-[#26393f]': isHighlightAbroadTravelActive,
          'text-white bg-[#fff3]': isSidebarOpen,
        },
        className,
      )}
    >
      <FlagHover flags={flags} className="inline-flex flex-col gap-1" from={from} shouldSkipGroup>
        <IconTravelForDay total={total} counterShouldShow={counterShouldShow} />
        <p className={cn('text-sm tracking-wider duration-500')}>{dayNumber}</p>
      </FlagHover>
    </button>
  );
};
