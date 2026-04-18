import { Checkbox } from "@/components/checkbox/Checkbox";
import IconX from "@/components/icons/IconX";
import useFiltersStore, {
  toggleHomeCountry,
} from "@/features/filters/stores/use-filter-store";
import useDataStore from "@/features/integrations/stores/use-data-store";
import { closeOverModal } from "@/features/over-modal/stores/use-hover-modal-store";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
};

export const ModalFilters = ({ className = "" }: Props) => {
  const homeCountriesCodes = useFiltersStore(
    (store) => store.homeCountriesCodes,
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
        "bg-white",
        className,
      )}
    >
      <h3>Consider home</h3>
      <button className="absolute top-2 right-2" onClick={closeOverModal}>
        <IconX className="size-6" />
      </button>
      {Object.entries(totalDaysByCountry).map(([country, total]) =>
        total < 14 ? null : (
          <div className="flex gap-2">
            {/* <ImageFlag countryCode={country} /> */}
            <Checkbox
              isActive={homeCountriesCodes.includes(country)}
              onChange={() => toggleHomeCountry(country)}
            />
            <button onClick={() => toggleHomeCountry(country)}>
              {t(`country.name.${country}`)}
            </button>
            <strong className="font-semibold">
              {t("summary.days", { postProcess: "interval", count: total })}
            </strong>
          </div>
        ),
      )}
    </div>
  );
};
