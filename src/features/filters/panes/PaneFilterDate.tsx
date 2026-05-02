import { useTranslation } from 'react-i18next';

import { Radiobox } from '@/components/radiobox/Radiobox';
import { MiniCalendarForYear } from '@/features/calendar/components/mini-calendar/MiniCalendarForYear';
import useDataStore from '@/features/settings/stores/useDateStore';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import { getArrayOfYears } from '@/utils/date';

import useFiltersStore, { setDateFilter, setFromFilter, setToFilter } from '../stores/useFilterStore';

export function PaneFilterDate() {
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const activeTo = useFiltersStore((store) => store.activeFilters.to);
  const { from, to } = useDataStore((store) => store.date);

  const { t } = useTranslation();

  const activeFromYear = activeFrom ? Number(activeFrom.split('-').at(0)) : undefined;
  const activeToYear = activeTo ? Number(activeTo.split('-').at(0)) : undefined;

  if (!from || !to) {
    return null;
  }

  const years = getArrayOfYears(from, to);

  return (
    <Pane>
      <Pane.Title>{t('preferences.years')}</Pane.Title>
      <Pane.List className="grid grid-cols-2 gap-2 justify-cen">
        <Pane.Subtitle>{t('preferences.from')}</Pane.Subtitle>
        <Pane.Subtitle>{t('preferences.to')}</Pane.Subtitle>
        {years.map((year) => {
          const isFromActive = (activeFrom || '').startsWith(String(year));
          const isToActive = (activeTo || '').startsWith(String(year));

          return (
            <>
              <span>
                <Radiobox
                  key={year}
                  isActive={isFromActive}
                  onChange={() => (isFromActive ? setFromFilter(undefined) : setFromFilter(`${year}-01-01`))}
                  isDisabled={!!activeToYear && activeToYear < year}
                >
                  <span>{year}</span>
                  <MiniCalendarForYear year={year} />
                </Radiobox>
              </span>
              <span>
                <Radiobox
                  key={year}
                  isActive={isToActive}
                  onChange={() => (isToActive ? setToFilter(undefined) : setToFilter(`${year}-12-31`))}
                  isDisabled={!!activeFromYear && activeFromYear > year}
                >
                  <span>{year}</span>
                  <MiniCalendarForYear year={year} />
                </Radiobox>
              </span>
            </>
          );
        })}
      </Pane.List>
    </Pane>
  );
}
