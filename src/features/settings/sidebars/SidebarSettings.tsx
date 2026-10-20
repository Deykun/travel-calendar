import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconGithub from '@/components/icons/IconGithub';
import type { SettingsScrollTarget } from '@/features/sidebar/stores/useSidebarStore';

import { PaneIntegrationManagement } from '../panes/PaneIntegrationManagement';
import { PaneIntegrationNomads } from '../panes/PaneIntegrationNomads';
import { PaneIntegrationStrava } from '../panes/PaneIntegrationStrava';
import { PaneLanguage } from '../panes/PaneLanguage';
import { PaneSettingsHome } from '../panes/PaneSettingsHome';
import { PaneSettingsTrips } from '../panes/PaneSettingsTrips';
import useDataStore from '../stores/useDateStore';

type Props = {
  scrollTo?: SettingsScrollTarget;
};

export function SidebarSettings({ scrollTo }: Props) {
  const version = useDataStore((store) => store.version);
  const integrationType = useDataStore((store) => store.integration.type);
  // Seeded once on mount: integrations stay collapsed when data is already loaded
  const [areIntegrationsVisible, setAreIntegrationsVisible] = useState(() => integrationType === undefined);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!scrollTo) {
      return;
    }

    // Target may be absent (e.g. 'data' while integrations are shown) - then do nothing
    wrapperRef.current?.querySelector(`#${scrollTo}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [scrollTo]);

  // Always show integrations when there is no data (e.g. right after removing it)
  const shouldShowIntegrations = areIntegrationsVisible || integrationType === undefined;

  return (
    <div ref={wrapperRef} className="flex flex-col gap-6">
      <PaneLanguage />
      {shouldShowIntegrations ? (
        <>
          <PaneIntegrationStrava />
          <PaneIntegrationNomads />
        </>
      ) : (
        <PaneIntegrationManagement id="data" onOpenIntegrations={() => setAreIntegrationsVisible(true)} />
      )}
      <PaneSettingsTrips id="trips" />
      <PaneSettingsHome id="home" />
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
