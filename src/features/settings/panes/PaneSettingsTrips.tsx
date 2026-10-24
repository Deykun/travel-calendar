import { isFuture } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Radiobox } from '@/components/radiobox/Radiobox';
import useFiltersStore, { toggleShouldIncludeFuture } from '@/features/filters/stores/useFilterStore';
import usePreferencesStore, { setStreakTypeToUse } from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import type { SettingsScrollTarget } from '@/features/sidebar/stores/useSidebarStore';
import { cn } from '@/utils/tailwind';

import useDataStore from '../stores/useDateStore';

type Props = {
  id?: SettingsScrollTarget;
};

export function PaneSettingsTrips({ id }: Props) {
  const shouldIncludeFuture = useFiltersStore((store) => store.activeFilters.shouldIncludeFuture);
  const streakTypeToShow = usePreferencesStore((store) => store.streaks.typeToShow);
  const rangeTo = useDataStore((store) => store.date.to);
  const streaksCount = useFiltersStore((store) => store.filtered.streaks.regular.maxDays.length);
  const kindStreaksCount = useFiltersStore((store) => store.filtered.streaks.kind.maxDays.length);
  const veryKindStreaksCount = useFiltersStore((store) => store.filtered.streaks.veryKind.maxDays.length);

  const { t } = useTranslation();

  return (
    <Pane id={id}>
      <Pane.Title>{t('preferences.streaks.title')}</Pane.Title>
      <Pane.Subtitle>{t('preferences.streaksAccumulation.title')}</Pane.Subtitle>
      <Pane.List>
        <Radiobox
          classNameChildren="overflow-hidden"
          isActive={streakTypeToShow === 'regular'}
          onChange={() => setStreakTypeToUse('regular')}
          isDisabled={streaksCount === 0}
        >
          <span className="whitespace-nowrap text-ellipsis overflow-hidden">{t('preferences.shouldShowStreaks')}</span>
          <strong className="shrink-0 font-semibold text-white text-xs">
            {t('summary.trips', { postProcess: 'interval', count: streaksCount })}
          </strong>
        </Radiobox>
        <Radiobox
          classNameChildren={cn('flex-col items-start', 'text-wrap', 'overflow-hidden')}
          isActive={streakTypeToShow === 'kind'}
          onChange={() => setStreakTypeToUse('kind')}
          isDisabled={streaksCount === 0}
        >
          <span className={cn('flex gap-1 items-center', 'max-w-full')}>
            <span className="whitespace-nowrap text-ellipsis overflow-hidden">
              {t('preferences.shouldShowKindStreaks')}
            </span>
            <strong className="shrink-0 font-semibold text-white text-xs">
              {t('summary.trips', { postProcess: 'interval', count: kindStreaksCount })}
            </strong>
          </span>
          <small className="opacity-75">{t('preferences.shouldShowKindStreaks.tip')}</small>
        </Radiobox>
        <Radiobox
          classNameChildren={cn('flex-col items-start', 'text-wrap', 'overflow-hidden')}
          isActive={streakTypeToShow === 'veryKind'}
          onChange={() => setStreakTypeToUse('veryKind')}
          isDisabled={streaksCount === 0}
        >
          <span className={cn('flex gap-1 items-center', 'max-w-full')}>
            <span className="whitespace-nowrap text-ellipsis overflow-hidden">
              {t('preferences.shouldShowVeryKindStreaks')}
            </span>
            <strong className="shrink-0 font-semibold text-white text-xs">
              {t('summary.trips', { postProcess: 'interval', count: veryKindStreaksCount })}
            </strong>
          </span>
          <small className="opacity-75">{t('preferences.shouldShowVeryKindStreaks.tip')}</small>
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
