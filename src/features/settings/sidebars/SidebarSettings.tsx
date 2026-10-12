import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconGithub from '@/components/icons/IconGithub';

import { PaneIntegrationNomads } from '../panes/PaneIntegrationNomads';
import { PaneIntegrationStatsHunters } from '../panes/PaneIntegrationStrava';
import { PaneLanguage } from '../panes/PaneLanguage';
import useDataStore from '../stores/useDateStore';

export function SidebarSettings() {
  const version = useDataStore((store) => store.version);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <PaneIntegrationNomads />
      <PaneIntegrationStatsHunters />
      <PaneLanguage />
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
