import { cn } from "@/utils/tailwind";
import { SidebarContent } from "./SidebarContent";
import { ButtonUpdate } from "@/features/settings/components/ButtonUpdate";
import { ButtonFilter } from "@/features/filters/components/ButtonFilter";

import IconGithub from "@/components/icons/IconGithub";
import { Button } from "@/components/button/Button";

type Props = {
  className?: string;
};

export function Sidebar({ className = "" }: Props) {
  return (
    <aside
      className={cn(
        "sticky top-0",
        "h-dvh",
        "overflow-auto",
        "w-95",
        "p-6",
        "bg-[#111110]",
        "border-r-2 border-r-[#2b2b27]",
        className,
      )}
    >
      <header className={cn("flex flex-wrap gap-3", "bg-[#111110] p-6")}>
        <ButtonUpdate />
        <ButtonFilter />
        <Button
          tagName="a"
          href="https://github.com/Deykun/travel-calendar"
          target="_blank"
        >
          <IconGithub />
          <span>Repository</span>
        </Button>
      </header>
      <SidebarContent />
    </aside>
  );
}
