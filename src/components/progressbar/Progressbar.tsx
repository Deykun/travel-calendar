import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/tailwind';

type Props = {
  value: number;
  total: number;
  className?: string;
  startedAt?: number;
};

const getRemainingSeconds = (value: number, total: number, startedAt: number) => {
  const elapsedMs = Math.max(0, Date.now() - startedAt);

  return Math.ceil((elapsedMs * (total - value)) / value / 1000);
};

export const Progressbar = ({ value, total, className = '', startedAt }: Props) => {
  const { t } = useTranslation();
  const [, setTick] = useState(0);

  const percent = total > 0 ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;
  const isEstimating = startedAt !== undefined && value > 0 && value < total;

  useEffect(() => {
    if (!isEstimating) {
      return;
    }

    const intervalId = setInterval(() => setTick((tick) => tick + 1), 1000);

    return () => clearInterval(intervalId);
  }, [isEstimating]);

  const remainingSeconds = isEstimating ? getRemainingSeconds(value, total, startedAt) : undefined;

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      <div
        className={cn('relative w-full h-3 overflow-hidden rounded-sm', 'bg-[#2b2b27]')}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={value}
      >
        <div
          className={cn('absolute inset-y-0 left-0', 'rounded-sm', 'bg-[#d8da51]', 'transition-bounce')}
          style={{ width: `${percent}%` }}
        />
      </div>
      {remainingSeconds !== undefined && (
        <span className={cn('self-end', 'text-xs text-[#979797] tracking-wider')}>
          {t('progress.remaining', { count: remainingSeconds })}
        </span>
      )}
    </div>
  );
};
