import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconGithub from '@/components/icons/IconGithub';

import { PaneIntegrationManagement } from '../panes/PaneIntegrationManagement';
import { PaneIntegrationNomads } from '../panes/PaneIntegrationNomads';
import { PaneIntegrationStrava } from '../panes/PaneIntegrationStrava';
import { PaneLanguage } from '../panes/PaneLanguage';
import { PaneSettingsHome } from '../panes/PaneSettingsHome';
import { PaneSettingsTrips } from '../panes/PaneSettingsTrips';
import useDataStore from '../stores/useDateStore';

export function SidebarSettings() {
  const version = useDataStore((store) => store.version);
  const integrationType = useDataStore((store) => store.integration.type);
  // Seeded once on mount: integrations stay collapsed when data is already loaded
  const [areIntegrationsVisible, setAreIntegrationsVisible] = useState(() => integrationType === undefined);
  const { t } = useTranslation();

  // Always show integrations when there is no data (e.g. right after removing it)
  const shouldShowIntegrations = areIntegrationsVisible || integrationType === undefined;

  return (
    <div className="flex flex-col gap-6">
      <PaneLanguage />
      {shouldShowIntegrations ? (
        <>
          <PaneIntegrationStrava />
          <PaneIntegrationNomads />
        </>
      ) : (
        <PaneIntegrationManagement onOpenIntegrations={() => setAreIntegrationsVisible(true)} />
      )}
      <PaneSettingsTrips />
      <PaneSettingsHome />
      <div className="flex justify-between items-center">
        <Button tagName="a" href="https://github.com/Deykun/travel-calendar" target="_blank">
          <IconGithub />
          <span>{t('label.repository')}</span>
        </Button>
        <span className="text-xs opacity-50">Version {version}</span>
      </div>
    </div>
  );
}
