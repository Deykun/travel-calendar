import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Radiobox } from '@/components/radiobox/Radiobox';
import usePreferencesStore, {
  setCounterShouldShow,
  setStreakTypeToUse,
  toggleShouldCounterUseScale,
  toggleShouldHighlightAbroadTravel,
  toggleShouldHighlightNewCountries,
} from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import { useMaxTotal } from '../hooks/useMaxTotal';
import useFiltersStore, { toggleShouldIncludeFuture } from '../stores/useFilterStore';

export function PaneVisibility() {
  const shouldIncludeFuture = useFiltersStore((store) => store.activeFilters.shouldIncludeFuture);
  const shouldHighlightAbroadTravel = usePreferencesStore((store) => store.calendar.shouldHighlightAbroadTravel);
  const shouldHighlightNewCountries = usePreferencesStore((store) => store.calendar.shouldHighlightNewCountries);

  const shouldCounterUseScale = usePreferencesStore((store) => store.calendar.shouldCounterUseScale);
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);
  const streakTypeToShow = usePreferencesStore((store) => store.streaks.typeToShow);

  const { t } = useTranslation();

  const maxTotal = useMaxTotal();

  return (
    <Pane>
      <Pane.Title>{t('preferences.calendar')}</Pane.Title>
      <Pane.Subtitle>{t('preferences.theDayNumber.title')}</Pane.Subtitle>
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
      <Pane.Subtitle className="-mt-6">{t('preferences.calendarOther')}</Pane.Subtitle>
      <Pane.List>
        <Checkbox
          isActive={shouldCounterUseScale}
          onChange={toggleShouldCounterUseScale}
          isDisabled={maxTotal <= 1 && !shouldCounterUseScale}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>
            {t('preferences.shouldCounterUseScale')}
            <small>
              <span className="opacity-75">{t('preferences.shouldCounterUseScale.tip')}</span>{' '}
              <strong className="text-white">{maxTotal}</strong>.
            </small>
          </div>
        </Checkbox>
        <Checkbox
          isActive={shouldHighlightNewCountries || counterShouldShow === 'numberOfUnlockedCountries'}
          onChange={toggleShouldHighlightNewCountries}
          isDisabled={counterShouldShow === 'numberOfUnlockedCountries'}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>
            {t('preferences.shouldHighlightNewCountries')}
            <small className="opacity-75">{t('preferences.shouldHighlightNewCountries.tip')}</small>
          </div>
        </Checkbox>
        <Checkbox isActive={shouldHighlightAbroadTravel} onChange={toggleShouldHighlightAbroadTravel}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>
            {t('preferences.shouldHighlightAbroadTravel')}
            <small className="opacity-75">{t('preferences.shouldHighlightAbroadTravel.tip')}</small>
          </div>
        </Checkbox>
        <Checkbox isActive={shouldIncludeFuture} onChange={toggleShouldIncludeFuture}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.shouldIncludeFuture')}</div>
        </Checkbox>
      </Pane.List>
      <Pane.Subtitle className="mt-6">{t('preferences.streaks.title')}</Pane.Subtitle>
      <Pane.List>
        <Radiobox isActive={streakTypeToShow === 'streaks'} onChange={() => setStreakTypeToUse('streaks')}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.shouldShowStreaks')}</div>
        </Radiobox>
        <Radiobox isActive={streakTypeToShow === 'weakStreaks'} onChange={() => setStreakTypeToUse('weakStreaks')}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>
            {t('preferences.shouldShowWeakStreaks')}
            <small className="opacity-75">{t('preferences.shouldShowWeakStreaks.tip')}</small>
          </div>
        </Radiobox>
      </Pane.List>
    </Pane>
  );
}
