import useDataStore from "@/features/settings/stores/useDateStore";
import { getArrayOfYears } from "@/utils/date";

import styles from "./CalendarHeader.module.css";
import { cn } from "@/utils/tailwind";
import useFiltersStore from "@/features/filters/stores/useFilterStore";
import {
  classNamesLayoutGap,
  classNamesLayoutGrid,
  classNamesLayoutPx,
} from "@/layouts/layout-app";
import IconTravel from "@/components/icons/IconTravel";
import { EMPTY_ARRAY } from "@/utils/empty";
import { ImageFlag } from "@/components/image-flag/ImageFlag";
import { CountrySummary } from "./CountrySummary";

export function CalendarHeader() {
  const homeCountriesCodes = useFiltersStore(
    (store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY,
  );
  const activeFrom = useFiltersStore((store) => store.activeFilters.from);
  const { from, to } = useDataStore((store) => store.date);

  const years = getArrayOfYears(from, to);
  const totalYears = years.length;

  return (
    <header
      className={cn(
        classNamesLayoutGap,
        classNamesLayoutPx,
        classNamesLayoutGrid,
        "mb-8",
      )}
    >
      <div
        className={cn(
          "col-span-2",
          "p-5 pt-3",
          "bg-[#111110]",
          "text-center",
          "rounded-lg",
        )}
      >
        <div
          className={cn(
            "grid text-center text-[150px] leading-none font-semibold",
          )}
        >
          {years.reverse().map((year) => (
            <span
              className={cn(
                "col-start-1 row-start-1 text-white",
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
      </div>
      <div
        className={cn(
          "col-span-2",
          "p-5 pt-3",
          "bg-[#111110]",
          "text-center",
          "rounded-lg",
        )}
      >
        Stats
      </div>
    </header>
  );
}
