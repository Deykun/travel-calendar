import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";
import type { Flag } from "./FlagHover";
import { useTranslation } from "react-i18next";

const fallbackFlags: { [key: string]: string | undefined } = {
  UK: "GB",
  KS: "XK",
};

type Props = {
  flags: Flag[];
  title?: string;
  place: "top" | "bottom";
  variant?: "default" | "small";
};

export const FlagHoverPanel = ({
  flags,
  title,
  place,
  variant = "default",
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  if (flags.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute",
        {
          "bottom-full origin-bottom": place === "top",
          "-translate-y-5 group-hover:-translate-y-2": place === "top",
          "top-full origin-top": place === "bottom",
          "translate-y-12 group-hover:translate-y-7": place === "bottom",
        },
        "left-1/2 -translate-x-1/2",
        "z-10",

        "rounded-[20px]",
        "p-2",
        "bg-[#e7eff46e]",
        "bg-[linear-gradient(45deg,transparent,white,white)]",
        "opacity-0 group-hover:opacity-100",
        "backdrop-blur-3xl",
        // "scale-50 group-hover:scale-100",

        "drop-shadow",
        "pointer-events-none",
        "duration-150",
      )}
    >
      {title && <h4 className="text-[9px] font-bold">{t(title)}</h4>}
      <div
        className={cn("flex gap-3 justify-center", {
          "w-42 flex-wrap": flags.length > 5,
          "w-30 flex-wrap": flags.length > 5 && variant === "small",
        })}
      >
        {flags.map(({ countryCode, year }) => {
          return (
            <div className={cn("relative", "flex flex-col")}>
              <span
                className={cn(
                  "p-1.5",
                //   "bg-[#e5e5e5]",
                  "bg-transparent",
                  "rounded-xl",
                  "drop-shadow",
                  "border-t border-b border-[#e3e3e3]"
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
                    {
                      "size-4": variant === "small",
                    },
                  )}
                  loading="lazy"
                  key={countryCode}
                  // https://purecatamphetamine.github.io/country-flag-icons/1x1/index.html
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${fallbackFlags[countryCode] || countryCode}.svg`}
                  onError={() =>
                    console.error(`Missing flag for ${countryCode}.`)
                  }
                />
              </span>
              <div className="mt-1 text-[12px] text-nowrap text-gray-600 tracking-widest">
                {/* {countryCode} | '{year?.slice(-2)} */}
                {year}
              </div>
              <span
                className={cn(
                  // "absolute -top-1 -right-1 p-0.5 px-0.5 rounded-sm",
                  // "text-[9px] text-white",
                  "text-[9px]",
                  "font-bold",
                  // "bg-green-800 bg-[linear-gradient(45deg,transparent,#108a49,#108a49)]",
                )}
              >
                {/* '{year?.slice(-2)} */}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
