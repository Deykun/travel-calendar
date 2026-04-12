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
      className={cn(
        "inline-flex",
        "p-1.5",
        "bg-white",
        "rounded-xl",
        "drop-shadow",
        "border-t border-b border-[#e3e3e3]",
        "border-b-4",
      )}
    >
      <img
        className={cn(
          "w-8",
          "aspect-[3_/_2]",
          "object-cover",
          "max-w-none",
          "shrink-0",
          "rounded-md",
          "saturate-60",
          "drop-shadow",
          "bg-[#d6d6d6] text-gray-400",
          "leading-none",
          "text-xs",
        )}
        alt={countryCode}
        loading="lazy"
        // https://purecatamphetamine.github.io/country-flag-icons/1x1/index.html
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${fallbackFlags[countryCode.toUpperCase()] || countryCode.toUpperCase()}.svg`}
        onError={() => console.error(`Missing flag for ${countryCode}.`)}
      />
    </span>
  );
};
