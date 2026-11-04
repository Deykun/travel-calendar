import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Radiobox } from '@/components/radiobox/Radiobox';
import usePreferencesStore, {
  sortFlagsBy,
  toggleShouldShowFlags,
} from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import { useFlagsSorting } from '../../hooks/useFlagsSorting';

type Props = {
  subtitleClassName?: string;
};

export function SubPaneFlags({ subtitleClassName }: Props) {
  const shouldShowFlags = usePreferencesStore((store) => store.flags.shouldShowFlags);
  const { sortBy, isDisabled } = useFlagsSorting();
  const { t } = useTranslation();

  return (
    <>
      <Pane.Subtitle className={subtitleClassName}>{t('preferences.calendarFlags')}</Pane.Subtitle>
      <Pane.List>
        <Checkbox isActive={shouldShowFlags} onChange={toggleShouldShowFlags}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.shouldShowFlags')}</div>
        </Checkbox>
      </Pane.List>
      <Pane.Subtitle className="mt-3">{t('preferences.flagsSortBy.title')}</Pane.Subtitle>
      <Pane.List>
        <Radiobox
          isActive={sortBy === 'lastVisited'}
          onChange={() => sortFlagsBy('lastVisited')}
          isDisabled={isDisabled}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.flagsSortBy.lastVisited')}</div>
        </Radiobox>
        <Radiobox isActive={sortBy === 'rarest'} onChange={() => sortFlagsBy('rarest')} isDisabled={isDisabled}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.flagsSortBy.rarest')}</div>
        </Radiobox>
      </Pane.List>
    </>
  );
}
