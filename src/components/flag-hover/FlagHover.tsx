import type { PropsWithChildren } from "react";
import { FlagHoverPanel } from "./FlagHoverPanel";
import { cn } from "@/utils/tailwind";

type Props = {
  flags?: Flag[];
  countriesCodesByYear?: {
    [year: string]: string[];
  };
  place?: "top" | "bottom";
  className?: string;
  shouldSkipGroup?: boolean;
};

export type Flag = {
  countryCode: string;
  year?: string;
};

export const FlagHover = ({
  flags: propFlags,
  countriesCodesByYear = {},
  children,
  place = "top",
  className = "",
  shouldSkipGroup = false,
}: PropsWithChildren<Props>) => {
  const flags =
    propFlags ??
    Object.entries(countriesCodesByYear).flatMap(([year, countriesCodes]) =>
      countriesCodes.map((countryCode) => ({
        year,
        countryCode: countryCode.toUpperCase(),
      })),
    );

  return (
    <div
      className={cn(
        "relative hover:z-10",
        {
          group: !shouldSkipGroup,
        },
        className,
      )}
    >
      <FlagHoverPanel flags={flags} place={place} />
      {children}
    </div>
  );
};
