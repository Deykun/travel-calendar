import { useCallback } from 'react';

import IconCaretLeft from '@/components/icons/IconCaretLeft';
import { appFormatDate } from '@/components/text-date/utils/format-date';
import { Period } from '@/features/calendar/components/calendar/Period';
import usePreferencesStore from '@/features/preferences/stores/usePreferencesStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { closeSidebar, openSidebar, useSidebarStore } from '@/features/sidebar/stores/useSidebarStore';
import type { DateYYYYMMDD } from '@/types';
import { isDateBetween } from '@/utils/date';
import { cn } from '@/utils/tailwind';

type Props = {
  className?: string;
  numberOfDays: number | undefined;
  countryCode: string;
  isEndPoint: boolean | undefined;
  isStartPoint: boolean | undefined;
  to: DateYYYYMMDD | undefined;
  from: DateYYYYMMDD | undefined;
  shouldShowDates?: boolean;
};

export function StreakPeriod({
  className,
  numberOfDays,
  countryCode,
  isEndPoint = false,
  isStartPoint = false,
  to,
  from,
  shouldShowDates = true,
}: Props) {
  const unlockingDate = useDataStore((store) => store.unlockingDateByCountry[countryCode]);
  const shouldHighlightNewCountries = usePreferencesStore((store) => store.streaks.shouldHighlightNewCountries);
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);

  const isOnlyPoint = isEndPoint && isStartPoint;
  const isSidebarOpen = useSidebarStore(
    (state) =>
      state?.sidebar?.type === 'country' && state.sidebar.countryCode === countryCode && state.isCollapsed === false,
  );

  const handleClick = useCallback(() => {
    if (isSidebarOpen) {
      closeSidebar();

      return;
    }
    openSidebar({ type: 'country', countryCode });
  }, [countryCode, isSidebarOpen]);

  const shouldShowWasUnlocked = counterShouldShow === 'numberOfUnlockedCountries' || shouldHighlightNewCountries;

  const wasUnlocked =
    shouldShowWasUnlocked && unlockingDate && from && to && isDateBetween({ from, to, date: unlockingDate });

  return (
    <Period
      className={cn('w-14 h-20 snap-center relative', className)}
      numberOfDays={numberOfDays}
      countryCode={countryCode}
      onClick={handleClick}
      wasUnlocked={wasUnlocked}
      isActive={isSidebarOpen}
    >
      <div className={cn('w-full mt-1 flex items-center justify-center', 'text-gray-400 tracking-wider text-[7px]')}>
        {shouldShowDates && isEndPoint && !isStartPoint && to && appFormatDate(to)}
        {!isOnlyPoint && !isEndPoint && (
          <IconCaretLeft className={cn('inline-flex size-2', 'absolute top-6 -left-3', 'opacity-50')} />
        )}
        {!isOnlyPoint && !isStartPoint && (
          <IconCaretLeft className={cn('inline-flex size-2', 'absolute top-6 -right-3', 'opacity-50')} />
        )}
        {shouldShowDates && isStartPoint && from && appFormatDate(from)}
      </div>
    </Period>
  );
}
