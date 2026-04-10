import type { Flag } from "@/types";

export const useFlagsFromCountries = (
  countriesCodesByYear: {
    [year: string]: string[];
  } = {},
) => {
  return Object.entries(countriesCodesByYear)
    .flatMap(([year, countriesCodes]) =>
      countriesCodes.map((countryCode) => ({
        year,
        countryCode: countryCode.toUpperCase(),
      })),
    )
    .reduce(
      (stack: { abroad: Flag[]; home: Flag[] }, flag) => {
        if (flag.countryCode === "PL") {
          stack.home.push(flag);
        } else {
          stack.abroad.push(flag);
        }

        return stack;
      },
      { abroad: [], home: [] },
    );
};
