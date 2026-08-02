
import IconCaretLeft from '@/components/icons/IconCaretLeft';
import { appFormatDate } from '@/components/text-date/utils/format-date';
import { Period } from '@/features/calendar/components/calendar/Period';
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
  return (
    <Period
      className={cn('w-14 h-20 snap-center relative', className)}
      numberOfDays={numberOfDays}
      countryCode={countryCode}
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
