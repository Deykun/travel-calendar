import { Checkbox } from "@/components/checkbox/Checkbox";
import { MiniCalendarForCountry } from "@/features/calendar/components/mini-calendar/MiniCalendarForCountry";
import useFiltersStore, {
  toggleHomeCountry,
} from "@/features/filters/stores/useFilterStore";
import useDataStore from "@/features/settings/stores/useDateStore";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
};

const sidebarStyles = cn(
  "rounded-lg",
  "p-4",
  "bg-black border border-[#2b2b27]",
);

export const PaneFilterHome = ({ className = "" }: Props) => {
  const homeCountriesCodes = useFiltersStore(
    (store) => store.activeFilters.homeCountriesCodes,
  );
  const totalDaysByCountry = useDataStore((store) => store.totalDaysByCountry);

  const { t } = useTranslation();
  return (
    <div className={cn(sidebarStyles, "flex flex-wrap flex-col gap-2")}>
      <h2 className="text-xl text-white font-semibold mb-2">Consider home</h2>
      <div className="flex flex-col gap-1">
        {Object.entries(totalDaysByCountry).map(([countryCode, total]) =>
          total < 0 ? null : (
            <Checkbox
              key={countryCode}
              isActive={homeCountriesCodes.includes(countryCode)}
              onChange={() => toggleHomeCountry(countryCode)}
            >
              {t(`country.name.${countryCode}`)}
              <strong className="font-semibold text-white">
                {t("summary.days", { postProcess: "interval", count: total })}
              </strong>
              <MiniCalendarForCountry countryCode={countryCode} />
            </Checkbox>
          ),
        )}
      </div>
    </div>
  );
};
