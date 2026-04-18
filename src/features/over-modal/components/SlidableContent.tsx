import { OverModalContent } from "@/features/over-modal/components/OverModalContent";
import { useOverModalStore } from "@/features/over-modal/stores/use-hover-modal-store";
import { cn } from "@/utils/tailwind";
import type { PropsWithChildren } from "react";

export function SlidableContent({ children }: PropsWithChildren) {
  const isModalOpen = useOverModalStore((state) => !!state?.modal?.type);

  return (
    <div className="relative py-6 px-12 max-w-dvw overflow-hidden">
      <div
        className={cn(
          "relative",
          "translate-x-0",
          {
            "-translate-x-100": isModalOpen,
          },
          "origin-top-left",
          "transition-bounce",
          "@container",
        )}
      >
        <div>{children}</div>
        <aside
          className={cn(
            "absolute left-full top-0",
            "ml-8",
            "w-95",
            "translate-x-80",
            "opacity-0",
            {
              "-translate-x-0 opacity-100": isModalOpen,
            },
            "origin-top-left",
            "transition-bounce",
          )}
        >
          <OverModalContent />
        </aside>
      </div>
    </div>
  );
}
