import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";

const fallbackFlags: { [key: string]: string | undefined } = {
  UK: "GB",
  KS: "XK",
};

type Props = {
  countryCode: string;
};

export const ImageFlag = ({ countryCode }: PropsWithChildren<Props>) => {
  return (
    <span
      className={cn("inline-flex", "p-1.5", "bg-[#3d3d3d6e]", "rounded-[10px]")}
    >
      <img
        className={cn(
          "w-9",
          "aspect-[3_/_2]",
          "object-cover",
          "max-w-none",
          "shrink-0",
          "rounded-sm",
          "saturate-75",
          "drop-shadow",
          "bg-[#282824] bg-transparent text-gray-400",
          "leading-none",
          "text-xs",
        )}
        alt={countryCode}
        loading="lazy"
        // https://purecatamphetamine.github.io/country-flag-icons/1x1/index.html
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${fallbackFlags[countryCode.toUpperCase()] || countryCode.toUpperCase()}.svg`}
        onError={() => console.error(`Missing flag for "${countryCode}".`)}
      />
    </span>
  );
};
