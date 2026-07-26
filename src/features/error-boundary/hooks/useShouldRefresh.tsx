import { useEffect } from 'react';

import useDataStore, { APP_VERSION } from '@/features/settings/stores/useDateStore';

import { refreshStore } from '../actions/refresh';

export const useRefreshIfNeeded = () => {
  const version = useDataStore((store) => store.version);

  useEffect(() => {
    if (version !== APP_VERSION) {
      refreshStore();
    }
  }, [version]);
};
