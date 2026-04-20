import { cn } from "@/utils/tailwind";
import IconCheckboxFrame from "../icons/IconCheckboxFrame";

import { Fragment, type PropsWithChildren } from "react";
import IconCheck from "../icons/IconCheck";
import { Button } from "../button/Button";

type Props = {
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
    <Wrapper className={cn("flex gap-2 items-center", classNameWrapper)}>
      <Button
        className={cn(
          "relative",
          "rounded-sm",
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
        <Frame
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "size-5",
            "duration-300",
            {
              "scale-0 opacity-0": isActive,
              "scale-75 opacity-100": !isActive,
            },
          )}
        />
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
      </Button>
      {children && (
        <button
          onClick={() => onChange(!isActive)}
          className="flex gap-1 items-center"
        >
          {children}
        </button>
      )}
    </Wrapper>
  );
};
