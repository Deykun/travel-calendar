import { useEffect } from 'react';

import { loadDataFromLinkIfPossible } from '../actions/loadDataFromLinkIfPossible';
import { setShareState } from '../stores/useShareStore';

export const useLoadDataFromUrlIfPossible = () => {
  useEffect(() => {
    if (location.hash) {
      loadDataFromLinkIfPossible(location.hash);
    } else {
      setShareState('ready');
    }
  }, []);
};
