import { useTranslation } from 'react-i18next';

import { Radiobox } from '@/components/radiobox/Radiobox';
import usePreferencesStore, { setCounterShouldShow } from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

type Props = {
  subtitleClassName?: string;
};

export function SubPaneDayNumber({ subtitleClassName }: Props) {
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);

  const { t } = useTranslation();

  return (
    <>
      <Pane.Subtitle className={subtitleClassName}>{t('preferences.theDayNumber.title')}</Pane.Subtitle>
      <Pane.List>
        <Radiobox
          isActive={counterShouldShow === 'numberOfCountries'}
          onChange={() => setCounterShouldShow('numberOfCountries')}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('summary.totalCountries')}</div>
        </Radiobox>
        <Radiobox isActive={counterShouldShow === 'yearsAbroad'} onChange={() => setCounterShouldShow('yearsAbroad')}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('summary.totalYearsAbroad')}</div>
        </Radiobox>
        <Radiobox
          isActive={counterShouldShow === 'yearOfUnlocking'}
          onChange={() => setCounterShouldShow('yearOfUnlocking')}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('summary.yearOfUnlocking')}</div>
        </Radiobox>
        <Radiobox
          isActive={counterShouldShow === 'numberOfUnlockedCountries'}
          onChange={() => setCounterShouldShow('numberOfUnlockedCountries')}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('summary.numberOfUnlockedCountries')}</div>
        </Radiobox>
      </Pane.List>
    </>
  );
}
