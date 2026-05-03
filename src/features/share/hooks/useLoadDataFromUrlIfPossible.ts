import { useEffect } from 'react';

import { loadDataFromLinkIfPossible } from '../actions/loadDataFromLinkIfPossible';

export const useLoadDataFromUrlIfPossible = () => {
  useEffect(() => {
    if (location.hash) {
      loadDataFromLinkIfPossible(location.hash);
    }
  }, []);
};
