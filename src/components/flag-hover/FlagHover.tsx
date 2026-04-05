import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";

type Props = {
  countries: string[];
};

const fallbackFlags: { [key: string]: string | undefined } = {
  UK: "GB",
};

export const FlagHover = ({
  countries,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className="relative size-6 group">
      <span
        className={cn(
          "absolute top-1/2 left-1/2 -translate-1/2",
          "size-7",
          "opacity-0 group-hover:opacity-100",
          "duration-300",
        )}
      >
        {countries.map((country, index) => {
          return (
            <img
              className={cn(
                "inline-flex size-full rounded-full",
                "absolute top-1/2 left-1/2 -translate-1/2",
                "p-0.5 bg-white",
                "scale-0 group-hover:scale-100",
                "rotate-180 group-hover:rotate-0",
                "opacity-0 group-hover:opacity-100",
                "duration-200",
                "pointer-events-none"
              )}
              style={{
                transform: `rotate(${(360 * index) / countries.length}deg) translateY(32px) rotate(-${(360 * index) / countries.length}deg)`,
              }}
              key={country}
              // https://purecatamphetamine.github.io/country-flag-icons/1x1/index.html
              src={`https://purecatamphetamine.github.io/country-flag-icons/1x1/${fallbackFlags[country.toUpperCase()] || country.toUpperCase()}.svg`}
            />
          );
        })}
      </span>

      <span>{children}</span>
    </div>
  );
};
