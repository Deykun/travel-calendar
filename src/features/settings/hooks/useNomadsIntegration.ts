import { useState } from 'react';

import { getDataFromNomads } from '../actions/get-data-from-nomads';

export const useNomadsIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const clearError = () => {
    setErrorMessage('');
  };

  const fetchNomads = async (username: string) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const response = await getDataFromNomads({ username });

    if (response.isSuccess) {
      // Stay in loading state - caller UI is replaced after success
      return;
    }

    setErrorMessage(response.reason);
    setIsLoading(false);
  };

  return { isLoading, errorMessage, clearError, fetchNomads };
};
