import { useEffect } from 'react';

import useDataStore from '@/features/settings/stores/useDateStore';

import { refreshStore } from '../actions/refresh';

export const useRefreshIfNeeded = () => {
  const version = useDataStore((store) => store.version);

  useEffect(() => {
    if (version !== version) {
      refreshStore();
    }
  }, [version]);
};
