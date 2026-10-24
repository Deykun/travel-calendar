import { useTranslation } from 'react-i18next';

import { Datetime } from '@/components/datetime/datetime';
import type { DateLike } from '@/types';
import { cn } from '@/utils/tailwind';

type Props = {
  date: DateLike | undefined;
  className?: string;
};

export function IntegrationLastUpdate({ date, className = '' }: Props) {
  const { t } = useTranslation();

  if (!date) {
    return null;
  }

  return (
    <p className={cn('text-[#b3b3a8] text-xs', className)}>
      {t('integration.lastUpdatePrefix')}{' '}
      <span className="text-white">
        <Datetime date={date} />
      </span>
      .
    </p>
  );
}
