import { useTranslation } from 'react-i18next';

import { classNamesLayoutGap, classNamesLayoutPx } from '@/layouts/layout-app';
import { cn } from '@/utils/tailwind';

import { AppIntroDemoUser } from './AppIntroDemoUser';

const classNamesBox = cn(
  'relative',
  'flex flex-col items-center justify-center gap-4',
  'p-5',
  'bg-[#111110]',
  'text-center',
  'rounded-lg',
);

export function AppIntro() {
  const { t } = useTranslation();

  return (
    <header
      className={cn(classNamesLayoutGap, classNamesLayoutPx, 'grid grid-cols-1 @min-[740px]:grid-cols-2', 'mb-8')}
    >
      <div className={classNamesBox}>
        <p>{t('integration.hintConnect')}</p>
      </div>
      <div className={classNamesBox}>
        <p>{t('integration.hintDemo')}</p>
        <AppIntroDemoUser />
      </div>
    </header>
  );
}
