import useDataStore from "@/features/settings/stores/useDateStore";
import { getArrayOfYears } from "@/utils/date";
import { cn } from "@/utils/tailwind";

import useFiltersStore, { setDateFilter } from "../stores/useFilterStore";
import { Radiobox } from "@/components/radiobox/Radiobox";
import { MiniCalendar } from "@/features/calendar/components/mini-calendar/MiniCalendar";
import { MiniCalendarForYear } from "@/features/calendar/components/mini-calendar/MiniCalendarForYear";

const sidebarStyles = cn(
  "rounded-lg",
  "p-4",
  "bg-black border border-[#2b2b27]",
);

export function PaneFilterDate() {
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const { from, to } = useDataStore((store) => store.date);

  if (!from || !to) {
    return null;
  }

  const years = getArrayOfYears(from, to);

  return (
    <div className={cn(sidebarStyles, "flex flex-wrap flex-col gap-2")}>
      <h2 className="text-xl text-white font-semibold mb-2">Date</h2>
      <div className="flex flex-col gap-1">
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
      </div>
    </div>
  );
}
