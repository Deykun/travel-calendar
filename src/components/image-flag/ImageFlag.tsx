import type { Flag } from "@/types";
import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

const fallbackFlags: { [key: string]: string | undefined } = {
  UK: "GB",
  KS: "XK",
};

type Props = {
  flag: Flag;
};

export const ImageFlag = ({ flag }: PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  return (
    <span>
      <img
        className={cn(
          "size-8",
          // "rounded-full",
          // "object",
          "max-w-none",
          "shrink-0",
          // "bg-black",
          "rounded-full drop-shadow",
          // "rounded-full",
          "saturate-60",
          "object-cover",
          // {
          //   "size-4": variant === "small",
          // },
        )}
        loading="lazy"
        key={flag.countryCode}
        // https://purecatamphetamine.github.io/country-flag-icons/1x1/index.html
        src={`https://purecatamphetamine.github.io/country-flag-icons/1x1/${fallbackFlags[flag.countryCode] || flag.countryCode}.svg`}
        onError={() => console.error(`Missing flag for ${flag.countryCode}.`)}
      />
      <span className="text-[11px]">{flag.year}</span>
    </span>
  );
};
