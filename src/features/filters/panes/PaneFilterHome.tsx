import { Checkbox } from "@/components/checkbox/Checkbox";
import IconTravel from "@/components/icons/IconTravel";
import { MiniCalendarForCountry } from "@/features/calendar/components/mini-calendar/MiniCalendarForCountry";
import useFiltersStore, {
  toggleHomeCountry,
} from "@/features/filters/stores/useFilterStore";
import useDataStore from "@/features/settings/stores/useDateStore";
import { Pane } from "@/features/sidebar/components/pane/Pane";
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
    <Pane className={className}>
      <Pane.Title>{t("preferences.homeCountry")}</Pane.Title>
      <p className="mb-2">{t("preferences.homeCountry.tip")} <IconTravel total={0} /></p>
      <Pane.List>
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
      </Pane.List>
    </Pane>
  );
};
