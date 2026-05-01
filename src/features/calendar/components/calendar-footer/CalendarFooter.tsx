import { cn } from "@/utils/tailwind";
import useFiltersStore from "@/features/filters/stores/useFilterStore";
import {
  classNamesLayoutGap,
  classNamesLayoutGrid,
  classNamesLayoutPx,
} from "@/layouts/layout-app";
import IconTravel from "@/components/icons/IconTravel";
import { EMPTY_ARRAY } from "@/utils/empty";
import { CountrySummary } from "../calendar-header/CountrySummary";
import { t } from "i18next";

export function CalendarFooter() {
  const homeCountriesCodes = useFiltersStore(
    (store) => store.activeFilters.homeCountriesCodes || EMPTY_ARRAY,
  );

  if (homeCountriesCodes.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        classNamesLayoutGap,
        classNamesLayoutPx,
        classNamesLayoutGrid,
        "mb-8",
      )}
    >
      <div className="mt-8 col-span-4 p-5">
        <div className="flex gap-8 items-center mb-4">
          <span className="inline-flex flex-col items-center gap-2">
            <IconTravel total={0} classNameSize="size-8" />
            <span className="text-white font-semibold whitespace-nowrap">
              {t("preferences.homeCountry")}
            </span>
          </span>
          {homeCountriesCodes.map((countryCode) => (
            <CountrySummary key={countryCode} countryCode={countryCode} />
          ))}
        </div>
        <small>{t("preferences.homeCountry.tip")}</small>
      </div>
    </section>
  );
}
