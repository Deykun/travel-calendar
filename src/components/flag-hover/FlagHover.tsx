import type { PropsWithChildren } from "react";
import { FlagHoverPanel } from "./FlagHoverPanel";
import { cn } from "@/utils/tailwind";
import type { FlagData } from "@/features/filters/hooks/useFlagsForDate";

type Props = {
  flags?: FlagData[];
  place?: "top" | "bottom";
  className?: string;
  shouldSkipGroup?: boolean;
};

export const FlagHover = ({
  flags,
  children,
  place = "top",
  className = "",
  shouldSkipGroup = false,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        "relative hover:z-10",
        {
          group: !shouldSkipGroup,
        },
        className,
      )}
    >
      <FlagHoverPanel flags={flags} place={place} />
      {children}
    </div>
  );
};
