import { useEffect } from 'react';

import { forceRefresh } from '../../actions/refresh';

export const Fallback = () => {
  useEffect(() => {
    forceRefresh();
  }, []);

  return null;
};
