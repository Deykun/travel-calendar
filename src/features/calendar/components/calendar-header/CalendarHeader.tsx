import useDataStore from "@/features/settings/stores/useDateStore";
import { getArrayOfYears } from "@/utils/date";

import styles from "./CalendarHeader.module.css";
import { cn } from "@/utils/tailwind";
import useFiltersStore from "@/features/filters/stores/useFilterStore";

export function CalendarHeader() {
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const { from, to } = useDataStore((store) => store.date);

  const years = getArrayOfYears(from, to);
  const totalYears = years.length;

  return (
    <header className="mb-8">
      <div className={cn("grid text-center text-[180px] font-semibold")}>
        {years.reverse().map((year) => (
          <span
            className={cn(
              "col-start-1 row-start-1 text-black",
              "transition-bounce",
              styles["year"],
              {
                [styles["year--active"]]: (activeFrom || "").startsWith(
                  String(year),
                ),
              },
            )}
            style={{
              opacity: Math.min(0.7, 2.25 / totalYears).toFixed(2),
            }}
          >
            {year}
          </span>
        ))}
      </div>
    </header>
  );
}
