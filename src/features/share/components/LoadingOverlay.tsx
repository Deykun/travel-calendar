import { useTranslation } from 'react-i18next';

import styles from './LoadingOverlay.module.css';

import IconCalendarSmile from '@/components/icons/IconCalendarSmile';
import IconLoader from '@/components/icons/IconLoader';
import { cn } from '@/utils/tailwind';

import { useShareStore } from '../stores/useShareStore';

export const LoadingOverlay = () => {
  const state = useShareStore((store) => store.state);

  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'fixed top-0 left-0',
        'w-full h-dvh',
        'flex flex-col justify-center items-center',
        'bg-[#111110] text-white z-1000 opacity-100',
        'transition-bounce delay-200',
        {
          'opacity-0 pointer-events-none': state === 'ready',
        },
        styles['container'],
      )}
    >
      <div className="flex gap-6 items-center">
        <span
          className={cn('inline-grid place-items-center size-24', 'bg-[#d8da51] text-black', 'rounded-lg')}
          style={{
            // @ts-expect-error Doesn't know css
            cornerShape: 'superellipse(1.5)',
          }}
        >
          <IconCalendarSmile className="size-18" />
        </span>

        <div className="flex flex-col gap-1">
          <span className="leading-none text-white text-2xl font-semibold">Travel calendar</span>

          <div
            className={cn('flex gap-1 items-center justify-start mt-2 max-h-5 overflow-hidden duration-75', {
              'mt-0 max-h-0': state === 'waiting',
            })}
          >
            <IconLoader
              className={cn(
                'size-6',
                'starting:scale-150 scale-100',
                'starting:opacity-0 opacity-100',
                'transition-bounce',
                'text-white',
                styles['overlay-loader'],
              )}
            />
            <p className="leading-none text-xs">{t('integration.loadingUser')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
