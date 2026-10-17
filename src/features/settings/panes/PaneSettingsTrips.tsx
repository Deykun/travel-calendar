import { isFuture } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Radiobox } from '@/components/radiobox/Radiobox';
import useFiltersStore, { toggleShouldIncludeFuture } from '@/features/filters/stores/useFilterStore';
import usePreferencesStore, { setStreakTypeToUse } from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import useDataStore from '../stores/useDateStore';

export function PaneSettingsTrips() {
  const shouldIncludeFuture = useFiltersStore((store) => store.activeFilters.shouldIncludeFuture);
  const streakTypeToShow = usePreferencesStore((store) => store.streaks.typeToShow);
  const rangeTo = useDataStore((store) => store.date.to);

  const { t } = useTranslation();

  return (
    <Pane>
      <Pane.Title>{t('preferences.streaks.title')}</Pane.Title>
      <Pane.Subtitle>{t('preferences.streaksAccumulation.title')}</Pane.Subtitle>
      <Pane.List>
        <Radiobox isActive={streakTypeToShow === 'streaks'} onChange={() => setStreakTypeToUse('streaks')}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.shouldShowStreaks')}</div>
        </Radiobox>
        <Radiobox isActive={streakTypeToShow === 'kindStreaks'} onChange={() => setStreakTypeToUse('kindStreaks')}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>
            {t('preferences.shouldShowKindStreaks')}
            <small className="opacity-75">{t('preferences.shouldShowKindStreaks.tip')}</small>
          </div>
        </Radiobox>
      </Pane.List>
      {rangeTo && isFuture(rangeTo) && (
        <>
          <Pane.Subtitle className="mt-3">{t('common.other')}</Pane.Subtitle>
          <Pane.List>
            <Checkbox isActive={shouldIncludeFuture} onChange={toggleShouldIncludeFuture}>
              <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.shouldIncludeFuture')}</div>
            </Checkbox>
          </Pane.List>
        </>
      )}
    </Pane>
  );
}
