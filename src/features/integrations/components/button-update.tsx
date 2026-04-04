import { getDataFromNomads } from "../actions/get-data-from-nomads";
import useDataStore from "../stores/use-data-store";

export const ButtonUpdate = () => {
  const lastUpdate = useDataStore((store) => store.integration.lastUpdate);

  return (
    <button
      className="btn btn-strong btn-sm btn-ic-l"
      onClick={() =>
        getDataFromNomads({
          username: "deykun",
        })
      }
    >
      Update {lastUpdate}
    </button>
  );
};
