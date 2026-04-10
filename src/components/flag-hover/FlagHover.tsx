import type { PropsWithChildren } from "react";
import { FlagHoverPanel } from "./FlagHoverPanel";

type Props = {
  countriesCodesByYear?: {
    [year: string]: string[];
  };
};

export type Flag = {
  countryCode: string;
  year?: string;
};

export const FlagHover = ({
  countriesCodesByYear = {},
  children,
}: PropsWithChildren<Props>) => {
  const flags = Object.entries(countriesCodesByYear).flatMap(
    ([year, countriesCodes]) =>
      countriesCodes.map((countryCode) => ({
        year,
        countryCode: countryCode.toUpperCase(),
      })),
  );

  return (
    <div className="relative size-6 group hover:z-10">
      <FlagHoverPanel flags={flags} place="top" />
      <span>{children}</span>
    </div>
  );
};
