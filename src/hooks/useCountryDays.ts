import { useMemo } from 'react';

import useDataStore from '@/features/settings/stores/useDateStore';
import { EMPTY_MMDD_ARRAY } from '@/utils/empty';

export const useCountryDays = (countryCode: string) => {
  const activeDays = useDataStore((store) => store.daysByCountry[countryCode] || EMPTY_MMDD_ARRAY);

  const daysInYear: 365 | 366 = useMemo(() => {
    if (!activeDays) {
      return 366;
    }

    if (activeDays.length === 366) {
      return 366;
    }

    const hasFeb29 = activeDays.includes('02-29');
    if (hasFeb29) {
      return 366;
    }

    return 365;
  }, [activeDays]);

  return {
    activeDays,
    daysInYear,
  };
};
