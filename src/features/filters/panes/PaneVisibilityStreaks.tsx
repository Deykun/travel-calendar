import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Radiobox } from '@/components/radiobox/Radiobox';
import usePreferencesStore, {
  setStreakTypeToUse,
  toggleShouldHighlightNewCountriesInStreaks,
} from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

export function PaneVisibilityStreaks() {
  const streakTypeToShow = usePreferencesStore((store) => store.streaks.typeToShow);
  const shouldHighlightNewCountries = usePreferencesStore((store) => store.streaks.shouldHighlightNewCountries);
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);

  const { t } = useTranslation();

  return (
    <Pane>
      <Pane.Title>{t('preferences.streaks.title')}</Pane.Title>
      <Pane.Subtitle>{t('preferences.streaksAccumulation.title')}</Pane.Subtitle>
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
      <Pane.Subtitle className="mt-6">{t('preferences.calendarOther')}</Pane.Subtitle>
      <Pane.List>
        <Checkbox
          isActive={shouldHighlightNewCountries || counterShouldShow === 'numberOfUnlockedCountries'}
          onChange={toggleShouldHighlightNewCountriesInStreaks}
          isDisabled={counterShouldShow === 'numberOfUnlockedCountries'}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.shouldHighlightNewCountries')}</div>
        </Checkbox>
      </Pane.List>
    </Pane>
  );
}
