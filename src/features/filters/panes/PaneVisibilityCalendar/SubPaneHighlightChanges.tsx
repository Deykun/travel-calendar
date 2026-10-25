import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import usePreferencesStore, {
  toggleShouldHighlightDays,
  toggleShouldHighlightFlags,
  toggleShouldShowDifferencesCounters,
} from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

type Props = {
  subtitleClassName?: string;
};

export function SubPaneHighlightChanges({ subtitleClassName }: Props) {
  const shouldShowDifferencesCounters = usePreferencesStore((store) => store.differences.shouldShowDifferencesCounters);
  const shouldHighlightDays = usePreferencesStore((store) => store.differences.shouldHighlightDays);
  const shouldHighlightFlags = usePreferencesStore((store) => store.differences.shouldHighlightFlags);

  const { t } = useTranslation();

  return (
    <>
      <Pane.Subtitle className={subtitleClassName}>{t('preferences.highlightChanges')}</Pane.Subtitle>
      <Pane.List>
        <Checkbox isActive={shouldShowDifferencesCounters} onChange={toggleShouldShowDifferencesCounters}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>
            {t('preferences.shouldShowDifferencesCounters')}
            <small className="opacity-75">{t('preferences.shouldShowDifferencesCounters.tip')}</small>
          </div>
        </Checkbox>
        <Checkbox
          isActive={shouldHighlightDays}
          onChange={toggleShouldHighlightDays}
          isDisabled={!shouldShowDifferencesCounters}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.shouldHighlightDays')}</div>
        </Checkbox>
        <Checkbox
          isActive={shouldHighlightFlags}
          onChange={toggleShouldHighlightFlags}
          isDisabled={!shouldShowDifferencesCounters}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.shouldHighlightFlags')}</div>
        </Checkbox>
      </Pane.List>
    </>
  );
}
