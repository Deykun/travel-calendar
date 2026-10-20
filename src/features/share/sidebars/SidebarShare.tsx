import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconGithub from '@/components/icons/IconGithub';
import useDataStore from '@/features/settings/stores/useDateStore';

import { PaneThankYou } from '../panes/PaneThankYou';

export function SidebarShare() {
  const version = useDataStore((store) => store.version);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <PaneThankYou />
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
