import { ImageFlag } from "./components/image-flag/ImageFlag";
import { Calendar } from "./features/calendar/components/Calendar";
import { ButtonFilter } from "./features/filters/components/ButtonFilter";
import useFiltersStore, {
  refreshFiltered,
  toggleHomeCountry,
} from "./features/filters/stores/use-filter-store";
import { ButtonUpdate } from "./features/integrations/components/button-update";

function App() {
  const homeCountriesCodes = useFiltersStore(
    (store) => store.homeCountriesCodes,
  );

  return (
    <>
      <div>
        <ButtonUpdate />
        <ButtonFilter />
        {homeCountriesCodes.join(", ")}
      </div>
      <div>
        <h1 className="text-center text-3xl font-semibold">Travel calendar</h1>
      </div>
      <Calendar />
    </>
  );
}

export default App;
