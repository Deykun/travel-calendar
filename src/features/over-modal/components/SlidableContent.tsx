import { OverModalContent } from "@/features/over-modal/components/OverModalContent";
import { useOverModalStore } from "@/features/over-modal/stores/useHoverModalStore";
import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";

export function SlidableContent({ children }: PropsWithChildren) {
  const isModalOpen = useOverModalStore((state) => !!state?.modal?.type);

  return (
    <div className="relative py-6 px-12 max-w-dvw">
      <div
        className={cn(
          "relative",
          "transition-bounce",
          "@container",
          "pr-[370px]",
        )}
      >
        <div>{children}</div>
        <aside
          className={cn(
            "fixed right-0 top-0 z-1000",
            "h-dvh",
            "max-h-dvh",
            "w-95",
            "translate-x-full",
            {
              "translate-x-0 opacity-100": isModalOpen,
            },
            "overflow-auto",
            "transition-bounce",
            "p-6",
            "bg-[#111110]",
            "border-l border-l-[#2b2b27]",
          )}
        >
          <div className={cn("sticky top-6")}>
            <OverModalContent />
          </div>
        </aside>
      </div>
    </div>
  );
}
