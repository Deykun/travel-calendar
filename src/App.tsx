import { ImageFlag } from "./components/image-flag/ImageFlag";
import { Calendar } from "./features/calendar/components/Calendar";
import useFiltersStore, {
  refreshFiltered,
  toggleHomeCountry,
} from "./features/filters/stores/use-filter-store";
import { ButtonUpdate } from "./features/integrations/components/button-update";
import useDataStore from "./features/integrations/stores/use-data-store";

function App() {
  const homeCountriesCodes = useFiltersStore(
    (store) => store.homeCountriesCodes,
  );
  const totalDaysByCountry = useDataStore((store) => store.totalDaysByCountry);

  return (
    <>
      <div>
        <ButtonUpdate />
        {Object.entries(totalDaysByCountry).map(([country, total]) => (
          <>
            {" "}
            <button onClick={() => toggleHomeCountry(country)}>
              <ImageFlag countryCode={country} />
              {country} {homeCountriesCodes.includes(country) ? "(h)" : ""}
              <strong>{total}</strong>
            </button>
          </>
        ))}
      </div>
      <div>{homeCountriesCodes.join(", ")}</div>
      <div>
        <button onClick={() => refreshFiltered()}>Refresh</button>
      </div>
      <Calendar key={homeCountriesCodes.join(", ")} />
    </>
  );
}

export default App;
