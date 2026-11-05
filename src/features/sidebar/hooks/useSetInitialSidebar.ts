import { useEffect } from 'react';

import useDataStore from '@/features/settings/stores/useDateStore';

import { openSidebarFilters, openSidebarSettings } from '../stores/useSidebarStore';

export const useSetInitialSidebar = () => {
  const hasData = useDataStore((store) => !!store.integration.type);

  useEffect(() => {
    if (hasData) {
      openSidebarFilters();
    } else {
      openSidebarSettings();
    }
  }, [hasData]);

  return null;
};
