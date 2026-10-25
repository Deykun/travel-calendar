import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import usePreferencesStore, {
  toggleShouldHighlightNewCountriesInCalendar,
  toggleShouldHighlightNewCountriesInStreaks,
} from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

type Props = {
  subtitleClassName?: string;
};

export function SubPaneHighlightNewCountries({ subtitleClassName }: Props) {
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);
  const shouldHighlightNewCountriesInCalendar = usePreferencesStore(
    (store) => store.calendar.shouldHighlightNewCountries,
  );
  const shouldHighlightNewCountriesInStreaks = usePreferencesStore(
    (store) => store.streaks.shouldHighlightNewCountries,
  );

  const { t } = useTranslation();

  const isForced = counterShouldShow === 'numberOfUnlockedCountries';

  return (
    <>
      <Pane.Subtitle className={subtitleClassName}>{t('preferences.shouldHighlightNewCountries')}</Pane.Subtitle>
      <Pane.List>
        <Checkbox
          isActive={shouldHighlightNewCountriesInStreaks || isForced}
          onChange={toggleShouldHighlightNewCountriesInStreaks}
          isDisabled={isForced}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>
            {t('preferences.shouldHighlightNewCountries.trips')}
          </div>
        </Checkbox>
        <Checkbox
          isActive={shouldHighlightNewCountriesInCalendar || isForced}
          onChange={toggleShouldHighlightNewCountriesInCalendar}
          isDisabled={isForced}
        >
          <div className={cn('flex flex-col gap-1', 'text-wrap')}>
            {t('preferences.shouldHighlightNewCountries.calendar')}
          </div>
        </Checkbox>
      </Pane.List>
    </>
  );
}
