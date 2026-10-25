import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconMap from '@/components/icons/IconMap';
import IconStrava from '@/components/icons/IconStrava';
import { openSidebarSettings } from '@/features/sidebar/stores/useSidebarStore';
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

const classNamesSubheading = cn('text-xl text-white', 'font-semibold');

const INTRO_POINTS = ['point1', 'point2', 'point3'] as const;

export function AppIntro() {
  const { t } = useTranslation();

  return (
    <header
      className={cn(classNamesLayoutGap, classNamesLayoutPx, 'grid grid-cols-1 @min-[740px]:grid-cols-2', 'mb-8')}
    >
      <div className={classNamesBox}>
        <h2 className={classNamesSubheading}>{t('integration.connectTitle')}</h2>
        <p>{t('integration.hintConnect')}</p>
        <div className={cn('flex flex-wrap justify-center gap-3')}>
          <Button type="button" onClick={() => openSidebarSettings('strava')}>
            <IconStrava />
            <span>{t('integration.connectStrava')}</span>
          </Button>
          <Button type="button" onClick={() => openSidebarSettings('nomads')}>
            <IconMap />
            <span>{t('integration.connectNomads')}</span>
          </Button>
        </div>
      </div>
      <div className={classNamesBox}>
        <h2 className={classNamesSubheading}>{t('integration.demoTitle')}</h2>
        <p>{t('integration.hintDemo')}</p>
        <AppIntroDemoUser />
      </div>

      <div className={cn(classNamesBox, '@min-[740px]:col-span-2', 'items-start gap-2 text-left')}>
        <h1 className={cn('text-3xl text-white', 'font-semibold mb-1')}>{t('integration.intro.title')}</h1>
        <p>{t('integration.intro.text')}</p>
        <h2 className={cn(classNamesSubheading, 'mt-3')}>{t('integration.intro.listTitle')}</h2>
        <ul className={cn('list-disc pl-4', 'flex flex-col gap-1', 'text-sm')}>
          {INTRO_POINTS.map((point) => (
            <li key={point}>{t(`integration.intro.${point}`)}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
