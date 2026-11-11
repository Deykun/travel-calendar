import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconGear from '@/components/icons/IconGear';
import { openSidebarSettings, useSidebarStore } from '@/features/sidebar/stores/useSidebarStore';

type Props = {
  shouldShowLabel?: boolean;
};

export const ButtonSettings = ({ shouldShowLabel = true }: Props) => {
  const isSidebarOpen = useSidebarStore((state) => state?.sidebar?.type === 'setting');
  const { t } = useTranslation();

  return (
    <Button onClick={() => openSidebarSettings()} variant={isSidebarOpen ? 'primary' : 'secondary'}>
      <IconGear />
      {shouldShowLabel && <span>{t('label.settings')}</span>}
    </Button>
  );
};
