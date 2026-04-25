import { cn } from "@/utils/tailwind";
import IconCheckboxFrame from "../icons/IconCheckboxFrame";

import { Fragment, type PropsWithChildren } from "react";
import IconCheck from "../icons/IconCheck";
import { Button } from "../button/Button";

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
  const Wrapper = children ? "div" : Fragment;
  const Frame = frameIcon ?? IconCheckboxFrame;

  return (
    <Wrapper
      className={cn(
        "inline-flex gap-2 items-center",
        "self-start",
        "py-2 px-2 -mx-2",
        {
          "hover:bg-[#1d1d0f]": !isActive,
          "bg-[#40403f] text-white rounded-sm": isActive,
        },
        "transition-bounce",
        classNameWrapper,
      )}
    >
      <Button
        className={cn(
          "relative",
          "rounded-sm",
          "shrink-0",
          "p-1",
          "size-6",
          {
            "border-transparent hover:bg-[#fffb000d] hover:border-transparent":
              !isActive,
          },
          className,
        )}
        onClick={() => onChange(!isActive)}
        variant={isActive ? "primary" : "secondary"}
      >
        <span>
          <IconCheck
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "size-5",
              "duration-300",
              {
                "scale-0 opacity-0": !isActive,
                "scale-100 opacity-100": isActive,
              },
            )}
          />
          <Frame
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "size-5",
              "duration-300",
              {
                "scale-100 opacity-0": isActive,
                "scale-80 opacity-100": !isActive,
              },
            )}
          />
        </span>
      </Button>
      {children && (
        <button
          onClick={() => onChange(!isActive)}
          className="flex gap-1 items-center text-left text-nowrap"
        >
          {children}
        </button>
      )}
    </Wrapper>
  );
};
