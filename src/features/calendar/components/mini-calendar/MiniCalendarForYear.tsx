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
  const yearDaysByCountries = useDataStore(
    (store) => store.daysByCountriesByYear[year],
  );
  const homeCountriesCodes = useFiltersStore(
    (store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY,
  );

  const activeDays = useMemo(() => {
    if (!yearDaysByCountries) {
      return [];
    }

    return Object.entries(yearDaysByCountries).reduce(
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
  }, [homeCountriesCodes, yearDaysByCountries]);

  if (!yearDaysByCountries) {
    return null;
  }

  return (
    <MiniCalendar activeDays={activeDays}>
      <span className="inline-flex mb-1">{year}</span>
    </MiniCalendar>
  );
}
