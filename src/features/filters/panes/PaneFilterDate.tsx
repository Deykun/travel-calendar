import { Button } from "@/components/button/Button";
import useDataStore from "@/features/settings/stores/useDateStore";
import { getArrayOfYears } from "@/utils/date";
import { cn } from "@/utils/tailwind";

import useFiltersStore, { setDateFilter } from "../stores/useFilterStore";

const modalStyles = cn("rounded-lg", "p-4", "bg-black border border-[#2b2b27]");

export function PaneFilterDate() {
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const { from, to } = useDataStore((store) => store.date);

  if (!from || !to) {
    return null;
  }

  const years = getArrayOfYears(from, to);

  return (
    <div className={cn(modalStyles, "flex flex-wrap gap-2")}>
      <h2 className="text-xl text-white font-semibold mb-2">Limit</h2>
      <div className="flex flex-wrap gap-1">
        {years.map((year) => {
          const isActive = (activeFrom || "").startsWith(String(year));
          return (
            <Button
              key={year}
              onClick={() =>
                isActive
                  ? setDateFilter(undefined, undefined)
                  : setDateFilter(`${year}-01-01`, `${year}-12-31`)
              }
              variant={isActive ? "primary" : "secondary"}
            >
              <span>{year}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
