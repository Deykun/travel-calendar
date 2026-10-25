import { useTranslation } from 'react-i18next';

import { Pane } from '@/features/sidebar/components/pane/Pane';

import { SubPaneDayNumber } from './SubPaneDayNumber';
import { SubPaneHighlightChanges } from './SubPaneHighlightChanges';
import { SubPaneHighlightNewCountries } from './SubPaneHighlightNewCountries';
import { SubPaneOther } from './SubPaneOther';

export function PaneVisibilityCalendar() {
  const { t } = useTranslation();

  return (
    <Pane>
      <Pane.Title>{t('preferences.calendar')}</Pane.Title>
      <SubPaneDayNumber />
      <SubPaneHighlightChanges subtitleClassName="mt-3" />
      <SubPaneHighlightNewCountries subtitleClassName="mt-3" />
      <SubPaneOther subtitleClassName="mt-3" />
    </Pane>
  );
}
