import useDataStore from "@/features/settings/stores/useDateStore";
import { getArrayOfYears } from "@/utils/date";

import useFiltersStore, { setDateFilter } from "../stores/useFilterStore";
import { Radiobox } from "@/components/radiobox/Radiobox";
import { MiniCalendarForYear } from "@/features/calendar/components/mini-calendar/MiniCalendarForYear";
import { Pane } from "@/features/sidebar/components/pane/Pane";

export function PaneFilterDate() {
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const { from, to } = useDataStore((store) => store.date);

  if (!from || !to) {
    return null;
  }

  const years = getArrayOfYears(from, to);

  return (
    <Pane>
      <Pane.Title>Date</Pane.Title>
      <Pane.List>
        {years.map((year) => {
          const isActive = (activeFrom || "").startsWith(String(year));

          return (
            <Radiobox
              key={year}
              isActive={isActive}
              onChange={() =>
                isActive
                  ? setDateFilter(undefined, undefined)
                  : setDateFilter(`${year}-01-01`, `${year}-12-31`)
              }
            >
              <span>{year}</span>
              <MiniCalendarForYear year={year} />
            </Radiobox>
          );
        })}
      </Pane.List>
    </Pane>
  );
}
