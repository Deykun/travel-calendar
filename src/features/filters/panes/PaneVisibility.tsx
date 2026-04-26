import { Pane } from "@/features/sidebar/components/pane/Pane";
import usePreferencesStore, {
  setCounterShouldShow,
  toggleShouldHighlightAbroadTravel,
} from "@/features/preferences/stores/usePreferencesStore";
import { Checkbox } from "@/components/checkbox/Checkbox";
import { cn } from "@/utils/tailwind";
import { Radiobox } from "@/components/radiobox/Radiobox";

export function PaneVisibility() {
  const shouldHighlightAbroadTravel = usePreferencesStore(
    (store) => store.calendar.shouldHighlightAbroadTravel,
  );
  const counterShouldShow = usePreferencesStore(
    (store) => store.calendar.counterShouldShow,
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
