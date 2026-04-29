import type { PropsWithChildren } from "react";
import { FlagHoverPanel, type PanelFrom } from "./FlagHoverPanel";
import { cn } from "@/utils/tailwind";
import type { FlagData } from "@/features/filters/hooks/useFlagsForDate";

type Props = {
  flags?: FlagData[];
  from?: PanelFrom;
  className?: string;
  shouldSkipGroup?: boolean;
};

export const FlagHover = ({
  flags,
  children,
  from = "top-center",
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
      <FlagHoverPanel flags={flags} from={from} />
      {children}
    </div>
  );
};
