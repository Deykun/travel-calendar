import { useTranslation } from 'react-i18next';

import { Button } from '@/components/button/Buttonn';
import IconFilter from '@/components/icons/IconFilter';
import { openSidebarFilters, useSidebarStore } from '@/features/sidebar/stores/useSidebarStore';

export const ButtonFilter = () => {
  const isSidebarOpen = useSidebarStore((state) => state?.sidebar?.type === 'filters');
  const { t } = useTranslation();

  return (
    <Button onClick={openSidebarFilters} variant={isSidebarOpen ? 'primary' : 'secondary'}>
      <IconFilter />
      <span>{t('label.filters')}</span>
    </Button>
  );
};
