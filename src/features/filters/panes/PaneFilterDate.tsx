import { useTranslation } from 'react-i18next';
import { Fragment } from 'react/jsx-runtime';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Radiobox } from '@/components/radiobox/Radiobox';
import { MiniCalendarForYear } from '@/features/calendar/components/mini-calendar/MiniCalendarForYear';
import { PlayControls } from '@/features/play/components/PlayControls';
import usePreferencesStore, { toggleShouldFilterToSingleYear } from '@/features/preferences/stores/usePreferencesStore';
import useDataStore from '@/features/settings/stores/useDateStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import type { DateYYYYMMDD } from '@/types';
import { getArrayOfYears } from '@/utils/date';

import useFiltersStore, { setDateFilter, setFromFilter, setToFilter } from '../stores/useFilterStore';

type DateBound = 'from' | 'to';

export function PaneFilterDate() {
  const shouldFilterToSingleYear = usePreferencesStore((store) => store.date.shouldFilterToSingleYear);
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const activeTo = useFiltersStore((store) => store.activeFilters.to);
  const { from, to } = useDataStore((store) => store.date);

  const { t } = useTranslation();

  const activeFromYear = activeFrom ? Number(activeFrom.split('-').at(0)) : undefined;
  const activeToYear = activeTo ? Number(activeTo.split('-').at(0)) : undefined;

  const handleYearChange = (bound: DateBound, year: number) => {
    const activeYear = bound === 'from' ? activeFromYear : activeToYear;
    const shouldClear = activeYear === year;
    const nextFrom: DateYYYYMMDD | undefined = shouldClear ? undefined : `${year}-01-01`;
    const nextTo: DateYYYYMMDD | undefined = shouldClear ? undefined : `${year}-12-31`;

    const otherYear = bound === 'from' ? activeToYear : activeFromYear;
    const wouldInvertRange = otherYear !== undefined && (bound === 'from' ? otherYear < year : otherYear > year);

    if (shouldFilterToSingleYear || (!shouldClear && wouldInvertRange)) {
      setDateFilter(nextFrom, nextTo);

      return;
    }

    if (bound === 'from') {
      setFromFilter(nextFrom);

      return;
    }

    setToFilter(nextTo);
  };

  if (!from || !to) {
    return null;
  }

  const years = getArrayOfYears(from, to);

  return (
    <Pane>
      <Pane.Title>{t('preferences.years')}</Pane.Title>
      <Pane.Subtitle>{t('label.settings')}</Pane.Subtitle>
      <Pane.List>
        <Checkbox isActive={shouldFilterToSingleYear} onChange={toggleShouldFilterToSingleYear}>
          {t('preferences.shouldFilterToSingleYear')}
        </Checkbox>
      </Pane.List>
      <Pane.List className="mt-3 grid grid-cols-2 gap-2 justify-center">
        <Pane.Subtitle>{t('preferences.from')}</Pane.Subtitle>
        <Pane.Subtitle>{t('preferences.to')}</Pane.Subtitle>
        {years.map((year) => {
          const isFromActive = (activeFrom || '').startsWith(String(year));
          const isToActive = (activeTo || '').startsWith(String(year));

          return (
            <Fragment key={year}>
              <span>
                <Radiobox key={year} isActive={isFromActive} onChange={() => handleYearChange('from', year)}>
                  <span>{year}</span>
                  <MiniCalendarForYear year={year} />
                </Radiobox>
              </span>
              <span>
                <Radiobox key={year} isActive={isToActive} onChange={() => handleYearChange('to', year)}>
                  <span>{year}</span>
                  <MiniCalendarForYear year={year} />
                </Radiobox>
              </span>
            </Fragment>
          );
        })}
      </Pane.List>
      <PlayControls fromYear={activeFromYear} toYear={activeToYear} />
    </Pane>
  );
}
