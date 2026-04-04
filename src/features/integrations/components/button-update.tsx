import { getDataFromNomads } from "../actions/get-data-from-nomads";

export const ButtonUpdate = () => {
  return (
    <button
      onClick={() =>
        getDataFromNomads({
          username: "deykun",
        })
      }
    >
      Update
    </button>
  );
};
