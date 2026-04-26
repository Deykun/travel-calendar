import { Pane } from "@/features/sidebar/components/pane/Pane";
import usePreferencesStore, {
  setCounterShouldShow,
  toggleShouldCounterUseScale,
  toggleShouldHighlightAbroadTravel,
} from "@/features/preferences/stores/usePreferencesStore";
import { Checkbox } from "@/components/checkbox/Checkbox";
import { cn } from "@/utils/tailwind";
import { Radiobox } from "@/components/radiobox/Radiobox";
import useFiltersStore from "../stores/useFilterStore";

export function PaneVisibility() {
  const shouldHighlightAbroadTravel = usePreferencesStore(
    (store) => store.calendar.shouldHighlightAbroadTravel,
  );
  const shouldCounterUseScale = usePreferencesStore(
    (store) => store.calendar.shouldCounterUseScale,
  );
  const counterShouldShow = usePreferencesStore(
    (store) => store.calendar.counterShouldShow,
  );

  const maxTotal = useFiltersStore((store) =>
    counterShouldShow === "numberOfCountries"
      ? store.filtered.summary.maxCountriesInDay
      : store.filtered.summary.maxYearsAbroadInDay,
  );

  return (
    <Pane>
      <Pane.Title>Calendar</Pane.Title>
      <Pane.Subtitle>The day numer shows</Pane.Subtitle>
      <Pane.List>
        <Radiobox
          isActive={counterShouldShow === "numberOfCountries"}
          onChange={() => setCounterShouldShow("numberOfCountries")}
        >
          <div className={cn("flex flex-col gap-1", "text-wrap")}>
            Total countries visited
          </div>
        </Radiobox>
        <Radiobox
          isActive={counterShouldShow === "yearsAbroad"}
          onChange={() => setCounterShouldShow("yearsAbroad")}
        >
          <div className={cn("flex flex-col gap-1", "text-wrap")}>
            Total years abroad
          </div>
        </Radiobox>
      </Pane.List>
      <Pane.Subtitle className="mt-2">Other</Pane.Subtitle>
      <Pane.List>
        <Checkbox
          isActive={shouldCounterUseScale}
          onChange={toggleShouldCounterUseScale}
        >
          <div className={cn("flex flex-col gap-1", "text-wrap")}>
            The scaled day number
            <small className="opacity-75">
              The current maximum value is <strong>{maxTotal}</strong>.
            </small>
          </div>
        </Checkbox>
        <Checkbox
          isActive={shouldHighlightAbroadTravel}
          onChange={toggleShouldHighlightAbroadTravel}
        >
          <div className={cn("flex flex-col gap-1", "text-wrap")}>
            Highlight abroad travel
            <small className="opacity-75">
              Travel between two countries that are not set as home.
            </small>
          </div>
        </Checkbox>
      </Pane.List>
    </Pane>
  );
}
