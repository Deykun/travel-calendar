import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import usePreferencesStore, {
  toggleShouldCounterUseScale,
  toggleShouldHighlightAbroadTravel,
  toggleShouldShowFlags,
} from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import { useMaxTotal } from '../../hooks/useMaxTotal';

type Props = {
  subtitleClassName?: string;
};

export function SubPaneOther({ subtitleClassName }: Props) {
  const shouldCounterUseScale = usePreferencesStore((store) => store.calendar.shouldCounterUseScale);
  const shouldHighlightAbroadTravel = usePreferencesStore((store) => store.calendar.shouldHighlightAbroadTravel);
  const shouldShowFlags = usePreferencesStore((store) => store.flags.shouldShowFlags);

  const { t } = useTranslation();

  const maxTotal = useMaxTotal();

  return (
    <>
      <Pane.Subtitle className={subtitleClassName}>{t('preferences.calendarOther')}</Pane.Subtitle>
      <Pane.List>
        <Checkbox isActive={shouldShowFlags} onChange={toggleShouldShowFlags}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>{t('preferences.shouldShowFlags')}</div>
        </Checkbox>
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
        <Checkbox isActive={shouldHighlightAbroadTravel} onChange={toggleShouldHighlightAbroadTravel}>
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>
            {t('preferences.shouldHighlightAbroadTravel')}
            <small className="opacity-75">{t('preferences.shouldHighlightAbroadTravel.tip')}</small>
          </div>
        </Checkbox>
      </Pane.List>
    </>
  );
}
