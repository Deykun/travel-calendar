import { Checkbox } from "@/components/checkbox/Checkbox";
import IconX from "@/components/icons/IconX";
import useFiltersStore, {
  toggleHomeCountry,
} from "@/features/filters/stores/useFilterStore";
import useDataStore from "@/features/settings/stores/useDateStore";
import { closeSidebar } from "@/features/sidebar/stores/useSidebarModalStore";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
};

export const PaneFilterHome = ({ className = "" }: Props) => {
  const homeCountriesCodes = useFiltersStore(
    (store) => store.activeFilters.homeCountriesCodes,
  );
  const totalDaysByCountry = useDataStore((store) => store.totalDaysByCountry);

  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "relative",
        "flex flex-col gap-1",
        "p-4",
        "rounded-lg",
        "bg-black",
        className,
      )}
    >
      <h3>Consider home</h3>
      <button className="absolute top-2 right-2" onClick={closeSidebar}>
        <IconX className="size-6" />
      </button>
      {Object.entries(totalDaysByCountry).map(([country, total]) =>
        total < 0 ? null : (
          <Checkbox
            key={country}
            isActive={homeCountriesCodes.includes(country)}
            onChange={() => toggleHomeCountry(country)}
          >
            {t(`country.name.${country}`)}
            <strong className="font-semibold text-white">
              {t("summary.days", { postProcess: "interval", count: total })}
            </strong>
          </Checkbox>
        ),
      )}
    </div>
  );
};
