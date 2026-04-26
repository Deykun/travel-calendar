import { cn } from "@/utils/tailwind";
import IconCheckboxFrame from "../icons/IconCheckboxFrame";

import { type PropsWithChildren } from "react";
import IconCheck from "../icons/IconCheck";

export type Props = {
  className?: string;
  classNameWrapper?: string;
  isActive?: boolean;
  onChange: (value: boolean) => void;
  frameIcon?: React.ElementType;
};

export const Checkbox = ({
  className = "",
  classNameWrapper = "",
  onChange,
  isActive,
  frameIcon,
  children,
}: PropsWithChildren<Props>) => {
  const Frame = frameIcon ?? IconCheckboxFrame;

  return (
    <button
      className={cn(
        "group",
        "inline-flex gap-2 items-center",
        "self-start rounded-sm",
        "py-1 pl-2 pr-3 -mx-2",
        {
          "hover:bg-[#1d1d0f]": !isActive,
          "bg-[#40403f] text-white": isActive,
        },
        "cursor-pointer",
        "transition-bounce",
        classNameWrapper,
      )}
      onClick={() => onChange(!isActive)}
    >
      <span
        className={cn(
          "relative",
          "rounded-sm",
          "shrink-0",
          "p-1",
          "size-6",
          "text-[#d8da51] hover:text-[#fcff4e]",
          className,
        )}
      >
        <Frame
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "size-6",
            "duration-150",
            {
              "scale-0 opacity-0": isActive,
              "scale-75 opacity-100": !isActive,
            },
          )}
        />
        <IconCheck
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "size-6",
            "duration-150 pointer-events-none",
            {
              "scale-300 opacity-0": !isActive,
              "scale-125 opacity-100": isActive,
            },
          )}
        />
      </span>
      {children && (
        <span className="flex gap-1 items-center text-left text-nowrap">
          {children}
        </span>
      )}
    </button>
  );
};
