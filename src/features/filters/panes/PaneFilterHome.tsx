import { Button } from "@/components/button/Button";
import { Checkbox } from "@/components/checkbox/Checkbox";
import IconBulb from "@/components/icons/IconBulb";
import IconTravel from "@/components/icons/IconTravel";
import { MiniCalendarForCountry } from "@/features/calendar/components/mini-calendar/MiniCalendarForCountry";
import useFiltersStore, {
  setHomeCountriesCodes,
  toggleHomeCountry,
} from "@/features/filters/stores/useFilterStore";
import useDataStore from "@/features/settings/stores/useDateStore";
import { Pane } from "@/features/sidebar/components/pane/Pane";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
};

export const PaneFilterHome = ({ className = "" }: Props) => {
  const homeCountriesCodes = useFiltersStore(
    (store) => store.activeFilters.homeCountriesCodes,
  );
  const totalDaysByCountry = useDataStore((store) => store.totalDaysByCountry);

  const countriesToList = useMemo(() => {
    return Object.entries(totalDaysByCountry);
  }, [totalDaysByCountry]);

  const { t } = useTranslation();
  return (
    <Pane className={className}>
      <Pane.Title>{t("preferences.homeCountry")}</Pane.Title>
      <p className="mb-2">
        {t("preferences.homeCountry.tip")} <IconTravel total={0} />
      </p>
      <Pane.List>
        {countriesToList.map(([countryCode, total]) =>
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
        {countriesToList.length > 10 && (
          <Pane.Footer>
            <h4 className="flex gap-2 mb-1 text-sm text-[white] font-semibold tracking-wide">
              <IconBulb className="size-5 text-[#d8da51]" /> <span>Idea</span>
            </h4>
            <p className="text-xs mb-1">
              If you select all countries and then unselect the chosen ones, you
              can see how much of the calendar is covered by the unselected
              countries.
            </p>
            <div className="flex gap-10">
              <Checkbox
                isActive={homeCountriesCodes.length === countriesToList.length}
                onChange={() =>
                  homeCountriesCodes.length !== countriesToList.length
                    ? setHomeCountriesCodes(Object.keys(totalDaysByCountry))
                    : setHomeCountriesCodes([])
                }
              >
                All
              </Checkbox>
            </div>
          </Pane.Footer>
        )}
      </Pane.List>
    </Pane>
  );
};
