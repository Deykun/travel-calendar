import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";
import type { Flag } from "./FlagHover";
import { useTranslation } from "react-i18next";
import { ImageFlag } from "../image-flag/ImageFlag";

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
          "-translate-y-7 group-hover:-translate-y-4": place === "top",
          "top-full origin-top": place === "bottom",
          "translate-y-12 group-hover:translate-y-7": place === "bottom",
        },
        "left-1/2 -translate-x-1/2",
        "z-10",
        "pointer-events-none",
        "rounded-md",
        "p-2",
        // "bg-white",
        "opacity-0 group-hover:opacity-100",
        "drop-shadow",
        "duration-150",
        "bg-black",
      )}
    >
      {title && <h4 className="text-[9px] font-bold">{t(title)}</h4>}
      <div
        className={cn("flex gap-3 justify-center", {
          "w-42 flex-wrap": flags.length > 3,
          "w-30 flex-wrap": flags.length > 3 && variant === "small",
        })}
      >
        {flags.map(({ countryCode, year }) => {
          return (
            <div className={cn("relative", "flex flex-col")}>
              <ImageFlag countryCode={countryCode} />
              <div className="mt-1 text-[12px] text-nowrap text-white tracking-widest font-semibold">
                {year}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
