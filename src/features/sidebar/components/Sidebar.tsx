import { cn } from "@/utils/tailwind";
import { SidebarContent } from "./SidebarContent";
import { ButtonUpdate } from "@/features/settings/components/ButtonUpdate";
import { ButtonFilter } from "@/features/filters/components/ButtonFilter";
import { Button } from "@/components/button/Button";
import IconGithub from "@/components/icons/IconGithub";

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
        "transition-bounce",
        "p-6",
        "bg-[#111110]",
        "border-l border-l-[#2b2b27]",
        className,
      )}
    >
      <div className={cn("sticky top-6")}>
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
      </div>
    </aside>
  );
}
