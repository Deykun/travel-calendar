import { memo, useCallback, useMemo } from 'react';

import { FlagHover } from '@/components/flag-hover/FlagHover';
import type { PanelFrom } from '@/components/flag-hover/FlagHoverPanel';
import { FlagStack } from '@/components/flag-stack/FlagStack';
import { useFlagsSimple } from '@/features/filters/hooks/useFlagsSimple';
import { useIsDifferenceDay } from '@/features/filters/hooks/useIsDifferenceDay';
import { useTimeRange } from '@/features/filters/hooks/useRange';
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

const HAS_ZERO_BUT_PRESENT = 0.001;

export const Day = memo(({ className = '', dayNumber, dayKey }: Props) => {
  const { fromYear, toYear } = useTimeRange({ shouldUseDataFrom: true });
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);
  const shouldShowFlags = usePreferencesStore((store) => store.flags.shouldShowFlags);
  const isSidebarOpen = useSidebarStore(
    (state) => state?.sidebar?.type === 'day' && state.sidebar.dayKey === dayKey && state.isCollapsed === false,
  );
  const countriesCodes = useFiltersStore((store) => store.filtered.summaryByDay[dayKey]?.countriesCodes || EMPTY_ARRAY);
  const yearsAbroad = useFiltersStore((store) => store.filtered.summaryByDay[dayKey]?.yearsAbroad || EMPTY_ARRAY);
  const indexInSortingByUnlocking = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.indexInSortingByUnlocking || 0,
  );
  const totalUnlockedCountries = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.totalUnlockedCountries || 0,
  );
  const countriesUnlockedThisDay = useFiltersStore(
    (store) => store.filtered.summaryByDay[dayKey]?.countriesUnlockedThisDay || EMPTY_ARRAY,
  );
  const yearOfUnlocking = useFiltersStore((store) => store.general.yearOfUnlockingByDateMMDD[dayKey]);

  const countriesCodesByYear = useFiltersStore((store) => store.filtered.summaryByDay[dayKey]?.countriesCodesByYear);

  const { flags, isHighlightAbroadTravelActive, isNewCountryActive } = useFlagsSimple(countriesCodesByYear, {
    countriesUnlockedThisDay,
  });

  const isDifferenceDay = useIsDifferenceDay(dayKey);

  const hasVisibleFlags = shouldShowFlags && flags.length > 0;

  const { total, shouldShowAllNumbers, visualTotal } = useMemo((): {
    total: number;
    shouldShowAllNumbers: boolean;
    visualTotal: string | undefined;
  } => {
    if (counterShouldShow === 'yearsAbroad') {
      return {
        total: yearsAbroad.length,
        shouldShowAllNumbers: false,
        visualTotal: undefined,
      };
    }

    if (counterShouldShow === 'numberOfUnlockedCountries') {
      return {
        total: totalUnlockedCountries || (countriesCodes.length > 0 ? HAS_ZERO_BUT_PRESENT : 0),
        shouldShowAllNumbers: false,
        visualTotal: total === HAS_ZERO_BUT_PRESENT ? ' ' : undefined,
      };
    }

    if (counterShouldShow === 'yearOfUnlocking') {
      // yearOfUnlocking is always available and not filter so we hide it for date by detecting if there is data
      if (yearsAbroad.length === 0) {
        return {
          total: 0,
          shouldShowAllNumbers: false,
          visualTotal: undefined,
        };
      }

      if (toYear) {
        if (yearOfUnlocking) {
          return {
            total: toYear - yearOfUnlocking + 1,
            shouldShowAllNumbers: true,
            // visualTotal: undefined,
            visualTotal: `'${String(yearOfUnlocking).slice(2)}`,
          };
        }
      }

      return {
        total: indexInSortingByUnlocking || 0,
        shouldShowAllNumbers: false,
        visualTotal: undefined,
      };
    }

    if (counterShouldShow === 'lastYearAbroad') {
      if (fromYear && toYear) {
        const lastYearInRange = flags?.at(-1)?.to;
        if (lastYearInRange) {
          return {
            total: lastYearInRange - fromYear + 1,
            shouldShowAllNumbers: true,
            // visualTotal: undefined,
            visualTotal: `'${String(lastYearInRange).slice(2)}`,
          };
        }
      }

      return {
        total: indexInSortingByUnlocking || 0,
        shouldShowAllNumbers: false,
        visualTotal: undefined,
      };
    }

    return {
      total: countriesCodes.length,
      shouldShowAllNumbers: false,
      visualTotal: undefined,
    };
  }, [
    counterShouldShow,
    countriesCodes.length,
    flags,
    fromYear,
    indexInSortingByUnlocking,
    toYear,
    totalUnlockedCountries,
    yearOfUnlocking,
    yearsAbroad.length,
  ]);

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
          'bg-[#261615]': isDifferenceDay,
          'text-[#b3b3a8] hover:bg-[#fffb000d] hover:text-white': !isSidebarOpen && total > 0,
          'text-[#3d3d3d] hover:bg-[#4545341c] hover:text-[#656565]': !isSidebarOpen && total === 0,
          'text-white bg-[#fff3]': isSidebarOpen,
        },
        className,
      )}
    >
      <FlagHover flags={flags} className="inline-flex flex-col gap-1" from={from} shouldSkipGroup>
        <span className="relative h-6">
          {hasVisibleFlags && (
            <FlagStack flags={flags} counterShouldShow={counterShouldShow} isActive={isSidebarOpen} />
          )}
          <IconTravelForDay
            className={cn({ 'absolute -bottom-1 -right-1.5 scale-60': hasVisibleFlags }, 'origin-bottom-right')}
            total={total}
            hasScale
            visualTotal={visualTotal}
            isNewCountryActive={isNewCountryActive}
            isHighlightAbroadTravelActive={isHighlightAbroadTravelActive}
            shouldShowAllNumbers={shouldShowAllNumbers}
          />
        </span>
        <p className={cn('text-sm tracking-wider duration-500')}>{dayNumber}</p>
      </FlagHover>
    </button>
  );
});
