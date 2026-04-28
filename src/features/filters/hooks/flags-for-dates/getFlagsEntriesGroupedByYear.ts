import type { DateYYYYMMDD } from "@/types";
import type { FlagData } from "../useFlagsForDate";
import { mergeUnique } from "@/utils/array";
import type { DataStoreState } from "@/features/settings/stores/useDateStore";

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

type Params = {
  dates: DateYYYYMMDD[];
  dataByDay: DataStoreState["dataByDay"];
};

export const getFlagsEntriesGroupedByYear = ({
  dates,
  dataByDay,
}: Params): PeriodsIndex => {
  return dates.sort().reduce(
    (stack: PeriodsIndex, dateWithYear) => {
      const year = Number(dateWithYear.split("-")[0]);
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
          stack.periodsByIds[periodId].to = year;
          stack.periodsByIds[periodId].tripsKeys = mergeUnique(
            stack.periodsByIds[periodId].tripsKeys,
            dataForDay.tripsKeys,
          );
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
