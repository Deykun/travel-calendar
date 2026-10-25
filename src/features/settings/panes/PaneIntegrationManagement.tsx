import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import { refreshStore } from '@/features/error-boundary/actions/refresh';
import { Pane } from '@/features/sidebar/components/pane/Pane';
import type { SettingsScrollTarget } from '@/features/sidebar/stores/useSidebarStore';

import { IntegrationLastUpdate } from '../components/IntegrationLastUpdate';
import useDataStore, { type IntegrationType } from '../stores/useDateStore';

const sourceLabelKeyByType: Record<IntegrationType, string> = {
  'nomads.com': 'integration.fromNomads',
  activities: 'integration.fromStrava',
};

const dataPointsLabelKeyByType: Record<IntegrationType, string> = {
  'nomads.com': 'integration.trips',
  activities: 'integration.activities',
};

type Props = {
  id?: SettingsScrollTarget;
  onOpenIntegrations: () => void;
};

export function PaneIntegrationManagement({ id, onOpenIntegrations }: Props) {
  const integration = useDataStore((store) => store.integration);
  const { t } = useTranslation();

  const sourceLabelKey = integration.type ? sourceLabelKeyByType[integration.type] : undefined;
  const dataPointsLabelKey = integration.type ? dataPointsLabelKeyByType[integration.type] : undefined;
  const hasDataPoints = dataPointsLabelKey !== undefined && integration.totalDataPoints !== undefined;

  return (
    <Pane id={id}>
      <Pane.Title>{t('integration.management.title')}</Pane.Title>
      <Pane.Subtitle>{t('integration.management.subtitle')}</Pane.Subtitle>
      <div className="flex flex-wrap justify-end gap-2 mt-2">
        <Button onClick={refreshStore} variant="secondary" size="sm">
          <span>{t('common.clear')}</span>
        </Button>
        <Button onClick={onOpenIntegrations} variant="primary" size="sm">
          <span>{t('common.edit')}</span>
        </Button>
      </div>
      {sourceLabelKey && (
        <p className="text-[#b3b3a8] text-xs mt-2">
          {t('integration.sourcePrefix')} <span className="text-white">{t(sourceLabelKey)}</span>.
        </p>
      )}
      {hasDataPoints && (
        <p className="text-[#b3b3a8] text-xs">
          {t('integration.dataPointsPrefix')}{' '}
          <span className="text-white">{t(dataPointsLabelKey, { count: integration.totalDataPoints })}</span>.
        </p>
      )}
      <IntegrationLastUpdate date={integration.lastUpdate} />
    </Pane>
  );
}
