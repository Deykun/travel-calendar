import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";

type Props = {
  countries: string[];
};

const fallbackFlags: { [key: string]: string | undefined } = {
  UK: "GB",
  KS: "XK",
};

export const FlagHover = ({
  countries,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className="relative size-6 group hover:z-10">
      {countries.length > 0 && (
        <span
          className={cn(
            "absolute",
            "bottom-full translate-y-0 group-hover:-translate-y-2",
            "left-1/2 -translate-x-1/2",
            "z-10",
            "flex gap-2 justify-center",
            "rounded-[20px]",
            "p-2",
            "bg-[#e7eff4]",
            "bg-[linear-gradient(45deg,transparent,white,white)]",
            "opacity-0 group-hover:opacity-100",
            "drop-shadow",
            "pointer-events-none",
            "duration-150",
            {
              "w-35 flex-wrap": countries.length > 5,
            },
          )}
        >
          {countries.map((country) => {
            return (
              <span className="flex flex-col gap-0.5 text-xs text-gray-600 tracking-wider">
                <img
                  className={cn(
                    "size-6",
                    "max-w-none",
                    "shrink-0",
                    "rounded-full drop-shadow",
                    "saturate-80",
                  )}
                  loading="lazy"
                  key={country}
                  // https://purecatamphetamine.github.io/country-flag-icons/1x1/index.html
                  src={`https://purecatamphetamine.github.io/country-flag-icons/1x1/${fallbackFlags[country.toUpperCase()] || country.toUpperCase()}.svg`}
                  onError={() => console.error(`Missing flag for ${country}.`)}
                />
                {country.toUpperCase()}
              </span>
            );
          })}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};
