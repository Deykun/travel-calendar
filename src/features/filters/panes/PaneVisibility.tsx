import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Radiobox } from '@/components/radiobox/Radiobox';
import usePreferencesStore, {
  setCounterShouldShow,
  toggleShouldCounterUseScale,
  toggleShouldHighlightAbroadTravel,
} from '@/features/preferences/stores/usePreferencesStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { cn } from '@/utils/tailwind';

import useFiltersStore from '../stores/useFilterStore';

export function PaneVisibility() {
  const shouldHighlightAbroadTravel = usePreferencesStore((store) => store.calendar.shouldHighlightAbroadTravel);
  const shouldCounterUseScale = usePreferencesStore((store) => store.calendar.shouldCounterUseScale);
  const counterShouldShow = usePreferencesStore((store) => store.calendar.counterShouldShow);

  const { t } = useTranslation();

  const maxTotal = useFiltersStore((store) =>
    counterShouldShow === 'numberOfCountries'
      ? store.filtered.summary.maxCountriesInDay
      : store.filtered.summary.maxYearsAbroadInDay,
  );

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
      </Pane.List>
      <Pane.Subtitle className="mt-2">{t('preferences.calendarOther')}</Pane.Subtitle>
      <Pane.List>
        <Checkbox isActive={shouldCounterUseScale} onChange={toggleShouldCounterUseScale} isDisabled={maxTotal <= 1}>
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
    </Pane>
  );
}
