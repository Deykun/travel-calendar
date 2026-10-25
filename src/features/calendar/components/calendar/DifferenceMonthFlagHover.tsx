import { type PropsWithChildren, useMemo } from 'react';

import { FlagHover, type Props as PropsFlagHover } from '@/components/flag-hover/FlagHover';
import { useTimeRange } from '@/features/filters/hooks/useRange';
import useDataStore from '@/features/settings/stores/useDateStore';

import type { MonthNumber } from '../../types';
import { getCountriesUnlockedInYearForMonth } from '../../utils/get-countries-unlocked-in-year-for-month';

type Props = PropsFlagHover & {
  monthNumber: MonthNumber;
};

export const DifferenceMonthFlagHover = ({ children, flags = [], monthNumber, ...props }: PropsWithChildren<Props>) => {
  const { toYear: year } = useTimeRange();
  const daysByCountryByMonthByYear = useDataStore((store) => store.daysByCountryByMonthByYear);

  const flagsToUse = useMemo(() => {
    if (!year) {
      return flags;
    }

    const countriesUnlockedInYear = getCountriesUnlockedInYearForMonth({
      year,
      monthNumber,
      flags,
      daysByCountryByMonthByYear,
    });

    return flags.map((flag) =>
      countriesUnlockedInYear.includes(flag.countryCode) && flag.from <= year && year <= flag.to
        ? {
            ...flag,
            isDifference: true,
          }
        : flag,
    );
  }, [daysByCountryByMonthByYear, flags, monthNumber, year]);

  return (
    <FlagHover {...props} flags={flagsToUse}>
      {children}
    </FlagHover>
  );
};
