import { cn } from "@/utils/tailwind";

import type { PropsWithChildren } from "react";

import styles from "./Panee.module.css";

type Props = {
  className?: string;
};

export function Pane({ children, className = "" }: PropsWithChildren<Props>) {
  if (!children) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-lg",
        "p-4",
        "bg-black border border-[#2b2b27]",
        "flex flex-wrap flex-col gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

Pane.Title = ({ children, className = "" }: PropsWithChildren<Props>) => {
  return (
    <h2
      className={cn(
        styles["title"],
        "sticky -top-8 z-1",
        "-mt-4 pt-4 pb-0 mb-2",
        "pl-2 -ml-2",
        "rounded-xs",
        "bg-black",
        "text-xl text-white leading-none font-semibold",
        className,
      )}
    >
      {children}
    </h2>
  );
};

Pane.Subtitle = ({ children, className = "" }: PropsWithChildren<Props>) => {
  return (
    <h2 className={cn("text-white tracking-wider text-xs", className)}>
      {children}
    </h2>
  );
};

Pane.List = ({ children, className = "" }: PropsWithChildren<Props>) => {
  return <div className={cn("flex flex-col gap-1", className)}>{children}</div>;
};

Pane.Footer = ({
  children,
  className = "",
  isSticky = false,
}: PropsWithChildren<
  Props & {
    isSticky?: boolean;
  }
>) => {
  return (
    <div
      className={cn(
        "mt-4",
        {
          [styles["footer"]]: isSticky,
          "sticky -bottom-8 z-1": isSticky,
          "-mb-4 pb-4": isSticky,
          "mt-8": isSticky,
          "pl-2 -ml-2": isSticky,
        },
        "rounded-xs",
        "bg-black",
        className,
      )}
    >
      {children}
    </div>
  );
};
