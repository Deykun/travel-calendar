import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Button';
import IconFilter from '@/components/icons/IconFilter';
import { openSidebarFilters, useSidebarStore } from '@/features/sidebar/stores/useSidebarStore';

type Props = {
  shouldShowLabel?: boolean;
};

export const ButtonFilter = ({ shouldShowLabel = true }: Props) => {
  const isSidebarOpen = useSidebarStore((state) => state?.sidebar?.type === 'filters');
  const { t } = useTranslation();

  return (
    <Button onClick={() => openSidebarFilters()} variant={isSidebarOpen ? 'primary' : 'secondary'}>
      <IconFilter />
      {shouldShowLabel && <span>{t('label.filters')}</span>}
    </Button>
  );
};
