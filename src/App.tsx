import { SlidableContent } from "./features/over-modal/components/SlidableContent";
import { Calendar } from "./features/calendar/components/Calendar";
import { ButtonFilter } from "./features/filters/components/ButtonFilter";
import useFiltersStore from "./features/filters/stores/use-filter-store";
import { ButtonUpdate } from "./features/integrations/components/button-update";

function App() {
  const homeCountriesCodes = useFiltersStore(
    (store) => store.homeCountriesCodes,
  );

  return (
    <>
      <header className="fixed top-0 left-0 z-100">
        <ButtonUpdate />
        <ButtonFilter />
        {homeCountriesCodes.join(", ")}
      </header>
      <SlidableContent>
        <Calendar />
      </SlidableContent>
    </>
  );
}

export default App;
