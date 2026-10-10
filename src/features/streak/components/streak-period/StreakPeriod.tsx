import { useCallback } from 'react';

import IconCaretLeft from '@/components/icons/IconCaretLeft';
import { appFormatDate } from '@/components/text-date/utils/format-date';
import { Period } from '@/features/calendar/components/calendar/Period';
import { closeSidebar, openSidebar, useSidebarStore } from '@/features/sidebar/stores/useSidebarStore';
import type { DateYYYYMMDD } from '@/types';
import { cn } from '@/utils/tailwind';

type Props = {
  className?: string;
  numberOfDays: number | undefined;
  countryCode: string;
  isEndPoint: boolean | undefined;
  isStartPoint: boolean | undefined;
  to: DateYYYYMMDD | undefined;
  from: DateYYYYMMDD | undefined;
};

export function StreakPeriod({
  className,
  numberOfDays,
  countryCode,
  isEndPoint = false,
  isStartPoint = false,
  to,
  from,
}: Props) {
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

  return (
    <Period
      className={cn('w-14 h-20 snap-center relative', className)}
      numberOfDays={numberOfDays}
      countryCode={countryCode}
      onClick={handleClick}
      isActive={isSidebarOpen}
    >
      <div className={cn('w-full mt-1 flex items-center justify-center', 'text-gray-400 tracking-wider text-[7px]')}>
        {isEndPoint && !isStartPoint && to && appFormatDate(to)}
        {!isOnlyPoint && !isEndPoint && (
          <IconCaretLeft className={cn('inline-flex size-2', 'absolute top-6 -left-3', 'opacity-50')} />
        )}
        {!isOnlyPoint && !isStartPoint && (
          <IconCaretLeft className={cn('inline-flex size-2', 'absolute top-6 -right-3', 'opacity-50')} />
        )}
        {isStartPoint && from && appFormatDate(from)}
      </div>
    </Period>
  );
}
