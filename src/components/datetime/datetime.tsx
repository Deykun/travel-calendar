import { formatRelative, lightFormat } from 'date-fns';
import { enGB, pl } from 'date-fns/locale';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { DateLike } from '@/types';

type PropsDatetime = {
  className?: string;
  date?: DateLike;
};

export function Datetime({ className = '', date }: PropsDatetime) {
  const { i18n } = useTranslation();

  const locale = useMemo(() => {
    if (i18n.language === 'pl') {
      return pl;
    }

    return enGB;
  }, [i18n.language]);

  if (!date) {
    return null;
  }

  return (
    <time className={className} dateTime={date?.toString()} title={lightFormat(date, 'yyyy-MM-dd HH:mm')}>
      {formatRelative(date, new Date(), { locale })}
    </time>
  );
}
