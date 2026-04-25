import { type PropsWithChildren } from "react";
import { Checkbox, type Props } from "../checkbox/Checkbox";
import IconCircle from "../icons/IconCircle";
import { cn } from "@/utils/tailwind";

export const Radiobox = (props: PropsWithChildren<Props>) => {
  return (
    <Checkbox
      {...props}
      className={cn(props.className, "rounded-full!")}
      frameIcon={IconCircle}
    />
  );
};
