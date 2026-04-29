import useDataStore from "@/features/settings/stores/useDateStore";
import { MiniCalendar } from "./MiniCalendar";
import { useMemo } from "react";
import useFiltersStore from "@/features/filters/stores/useFilterStore";
import type { DateMMDD } from "@/types";
import { mergeUnique } from "@/utils/array";

type Props = {
  year: number;
};

const EMPTY_ARRAY: string[] = [];

export function MiniCalendarForYear({ year }: Props) {
  const yearDaysCountriesByMonth = useDataStore(
    (store) => store.daysByCountryByMonthByYear[year],
  );
  const homeCountriesCodes = useFiltersStore(
    (store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY,
  );

  const activeDays = useMemo(() => {
    if (!yearDaysCountriesByMonth) {
      return [];
    }

    return Object.values(yearDaysCountriesByMonth).reduce(
      (stack: DateMMDD[], month) => {
        if (!month) {
          return stack;
        }

        const monthActiveDays = Object.entries(month).reduce(
          (stack: DateMMDD[], [countryCode, activeDays]) => {
            if (homeCountriesCodes.includes(countryCode)) {
              return stack;
            }

            if (activeDays) {
              stack = mergeUnique(stack, activeDays);
            }

            return stack;
          },
          [],
        );

        if (monthActiveDays) {
          stack = mergeUnique(stack, monthActiveDays);
        }

        return stack;
      },
      [],
    );
  }, [homeCountriesCodes, yearDaysCountriesByMonth]);

  if (!yearDaysCountriesByMonth) {
    return null;
  }

  return (
    <MiniCalendar activeDays={activeDays}>
      <span className="inline-flex mb-1">{year}</span>
    </MiniCalendar>
  );
}
