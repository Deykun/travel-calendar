import type { DataStoreState } from '@/features/settings/stores/useDateStore';
import type { DateYYYYMMDD } from '@/types';
import { mergeUnique } from '@/utils/array';

import type { FlagData } from '../useFlagsForDate';

type PeriodsIndex = {
  periodsByIds: {
    [periodId: string]: FlagData;
  };
  idByCountryByYear: {
    [year: string]:
      | undefined
      | {
          [country: string]: undefined | string;
        };
  };
  countriesByYear: {
    [year: string]: string[] | undefined;
  };
};

export const getFlagsEntriesGroupedByYear = ({
  dates,
  dataByDay,
}: {
  dates: DateYYYYMMDD[];
  dataByDay: DataStoreState['dataByDay'];
}): PeriodsIndex => {
  return dates.sort().reduce(
    (stack: PeriodsIndex, dateWithYear) => {
      const year = Number(dateWithYear.split('-')[0]);
      const dataForDay = dataByDay[dateWithYear];

      const previousYear = stack.idByCountryByYear[year - 1] || {};
      const currentYear = stack.idByCountryByYear[year] || {};

      /*
            It merges visits to the country from 2019, 2020, and 2021 into a single entry: 2019–2021.
        */
      dataForDay?.countriesCodes.forEach((countryCode) => {
        const periodId = previousYear?.[countryCode];

        if (!stack.countriesByYear[year]) {
          stack.countriesByYear[year] = [countryCode];
        } else {
          stack.countriesByYear[year] = [...stack.countriesByYear[year], countryCode];
        }

        if (periodId) {
          currentYear[countryCode] = periodId;

          if (stack.periodsByIds[periodId]) {
            stack.periodsByIds[periodId].to = year;
            stack.periodsByIds[periodId].tripsKeys = mergeUnique(
              stack.periodsByIds[periodId].tripsKeys,
              dataForDay.tripsKeys,
            );
          } else {
            throw `Missing period ${periodId}`;
          }
        } else {
          const newPeriodId = `${year}-${countryCode}`;

          currentYear[countryCode] = newPeriodId;
          stack.periodsByIds[newPeriodId] = {
            countryCode,
            from: year,
            to: year,
            tripsKeys: dataForDay.tripsKeys,
          };
        }
      });

      stack.idByCountryByYear[year] = currentYear;

      return stack;
    },
    {
      periodsByIds: {},
      idByCountryByYear: {},
      countriesByYear: {},
    },
  );
};

export const getFlagsEntriesGroupedByYearSimple = ({
  countriesCodesByYear = {},
  shouldGroupConsecutiveYears = true,
}: {
  countriesCodesByYear:
    | undefined
    | {
        [year: string | number]: string[];
      };
  shouldGroupConsecutiveYears?: boolean;
}): PeriodsIndex => {
  return Object.entries(countriesCodesByYear)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .reduce(
      (stack: PeriodsIndex, [rawYear, countriesCodes]) => {
        const year = Number(rawYear);

        const previousYear = stack.idByCountryByYear[year - 1] || {};
        const currentYear = stack.idByCountryByYear[year] || {};

        /*
          It merges visits to the country from 2019, 2020, and 2021 into a single entry: 2019–2021.
        */
        countriesCodes.forEach((countryCode) => {
          const periodId = previousYear?.[countryCode];

          if (!stack.countriesByYear[year]) {
            stack.countriesByYear[year] = [countryCode];
          } else {
            stack.countriesByYear[year] = [...stack.countriesByYear[year], countryCode];
          }

          if (periodId && shouldGroupConsecutiveYears) {
            currentYear[countryCode] = periodId;

            if (stack.periodsByIds[periodId]) {
              stack.periodsByIds[periodId].to = year;
            } else {
              throw `Missing period ${periodId}`;
            }
          } else {
            const newPeriodId = `${year}-${countryCode}`;

            currentYear[countryCode] = newPeriodId;
            stack.periodsByIds[newPeriodId] = {
              countryCode,
              from: year,
              to: year,
              // Simple skips tripsKeys
              tripsKeys: [],
            };
          }
        });

        stack.idByCountryByYear[year] = currentYear;

        return stack;
      },
      {
        periodsByIds: {},
        idByCountryByYear: {},
        countriesByYear: {},
      },
    );
};
