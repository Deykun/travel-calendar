import { cn } from "@/utils/tailwind";
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
  const flags = Object.entries(countriesCodesByYear)
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

  return (
    <div className="relative size-6 group hover:z-10">
      <FlagHoverPanel flags={flags.abroad} place="top" />
      {/* <FlagHoverPanel
        title="hoverDay.home"
        flags={flags.home}
        place="bottom"
        variant="small"
      /> */}
      <span>{children}</span>
    </div>
  );
};
