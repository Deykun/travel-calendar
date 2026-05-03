import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconGithub from '@/components/icons/IconGithub';

import { PaneIntegration } from '../panes/PaneIntegration';
import { PaneLanguage } from '../panes/PaneLanguage';

export function SidebarSettings() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <PaneIntegration />
      <PaneLanguage />
      <div>
        <Button tagName="a" href="https://github.com/Deykun/travel-calendar" target="_blank">
          <IconGithub />
          <span>{t('label.repository')}</span>
        </Button>
      </div>
    </div>
  );
}
