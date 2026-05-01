import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";
import IconTravel from "../icons/IconTravel";

const fallbackFlags: { [key: string]: string | undefined } = {
  UK: "GB",
  KS: "XK",
};

type Props = {
  countryCode: string;
  shouldShowHomeMarker?: boolean;
};

export const ImageFlag = ({
  countryCode,
  shouldShowHomeMarker = false,
}: PropsWithChildren<Props>) => {
  return (
    <span
      className={cn(
        "inline-flex relative",
        "p-1.5",
        "bg-[#3d3d3d6e]",
        "rounded-[10px]",
      )}
    >
      <img
        className={cn(
          "w-9",
          "aspect-3/2",
          "object-cover",
          "max-w-none",
          "shrink-0",
          "rounded-sm",
          "saturate-75",
          "drop-shadow",
          "bg-transparent text-gray-400",
          "leading-none",
          "tracking-widest",
          "text-xs",
        )}
        alt={countryCode}
        loading="lazy"
        // https://purecatamphetamine.github.io/country-flag-icons/1x1/index.html
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${fallbackFlags[countryCode.toUpperCase()] || countryCode.toUpperCase()}.svg`}
        onError={() => console.error(`Missing flag for "${countryCode}".`)}
      />
      {shouldShowHomeMarker && (
        <IconTravel
          className="absolute -bottom-1 -right-1 z-10"
          classNameSize="size-5"
          total={0}
        />
      )}
    </span>
  );
};
