import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconGear from '@/components/icons/IconGear';
import { openSidebarSettings, useSidebarStore } from '@/features/sidebar/stores/useSidebarStore';

export const ButtonSettings = () => {
  const isSidebarOpen = useSidebarStore((state) => state?.sidebar?.type === 'setting');
  const { t } = useTranslation();

  return (
    <Button onClick={openSidebarSettings} variant={isSidebarOpen ? 'primary' : 'secondary'}>
      <IconGear />
      <span>{t('label.settings')}</span>
    </Button>
  );
};
