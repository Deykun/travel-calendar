import { useTranslation } from 'react-i18next';

import styles from './LoadingOverlay.module.css';

import IconLoader from '@/components/icons/IconLoader';
import { cn } from '@/utils/tailwind';

import { useShareStore } from '../stores/useShareStore';

export const LoadingOverlay = () => {
  const isLoading = useShareStore((store) => store.state === 'loading');

  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'fixed top-0 left-0',
        'w-full h-dvh',
        'flex flex-col justify-center items-center',
        'bg-[#111110] text-white z-1000 opacity-100',
        {
          'opacity-0 pointer-events-none': isLoading === false,
        },
        styles['container'],
      )}
    >
      <IconLoader
        className={cn(
          'size-12',
          'starting:scale-150 scale-100',
          'starting:opacity-0 opacity-100',
          'transition-bounce',
          'text-white',
          'mb-4',
          styles['overlay-loader'],
        )}
      />
      <h2>{t('integration.loadingUser')}</h2>
    </div>
  );
};
