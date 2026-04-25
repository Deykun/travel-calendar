import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import type { FlagData } from "@/features/filters/hooks/useFlagsForDate";
import { Period } from "@/features/calendar/components-tem/Period";

type Props = {
  flags?: FlagData[];
  title?: string;
  place: "top" | "bottom";
};

export const FlagHoverPanel = ({
  flags = [],
  title,
  place,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  if (flags.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute",
        "bottom-full origin-bottom",
        "-translate-y-7 group-hover:-translate-y-4",
        "left-1/2 -translate-x-1/2",
        "z-10",
        "pointer-events-none",
        "rounded-md",
        "p-2",
        "opacity-0 group-hover:opacity-100",
        "drop-shadow",
        "duration-150",
        "bg-black",
      )}
    >
      {title && <h4 className="text-[9px] font-bold">{t(title)}</h4>}
      <div
        className={cn("flex gap-y-1 gap-x-3 justify-center", {
          "w-48 flex-wrap": flags.length > 3,
        })}
      >
        {flags.map(({ countryCode, from, to }) => {
          return (
            <Period
              className="w-14 h-20"
              key={`${countryCode}-${from}-${to}`}
              from={from}
              to={to}
              countryCode={countryCode}
            />
          );
        })}
      </div>
    </div>
  );
};
