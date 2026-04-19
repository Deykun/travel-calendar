import { OverModalContent } from "@/features/over-modal/components/OverModalContent";
import { useOverModalStore } from "@/features/over-modal/stores/use-hover-modal-store";
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
        )}
      >
        <div>{children}</div>
        <aside
          className={cn(
            "fixed right-0 top-0 z-1000",
            "h-full",
            // "ml-8",
            "w-95",
            "translate-x-full",
            {
              "translate-x-0 opacity-100": isModalOpen,
            },
            "origin-top-left",
            "origin-top-left",
            "transition-bounce",
            "py-0 pt-6 px-6",
            "bg-white",
            "border-l border-l-[#e5e5e5]",
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
