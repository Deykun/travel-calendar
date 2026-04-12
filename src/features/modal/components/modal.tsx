import type { PropsWithChildren } from "react";
import { closeModal } from "../stores/use-modal-store";
import { cn } from "@/utils/tailwind";

type Props = {
  title: string;
};

export const Modal = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <div>
      <button
        onClick={closeModal}
        className="absolute top-0 left-0 size-full"
      />
      <div
        className={cn(
          "relative z-1",
          "rounded-[20px]",
          "p-2",
          "bg-[#fff6]",
          "backdrop-blur-[7px]",
          "drop-shadow",
          "duration-150",
          "border-t border-b border-[#e3e3e3]",
          "border-b-4",
        )}
      >
        <header>
          {title}
          <button onClick={closeModal}>x</button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
};
