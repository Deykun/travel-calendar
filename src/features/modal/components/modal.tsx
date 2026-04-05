import type { PropsWithChildren } from "react";
import { closeModal } from "../stores/use-modal-store";

type Props = {
  title: string;
};

export const Modal = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <div className="bg-[#91f0766e] p-[6px] rounded-[18px]">
      <button
        onClick={closeModal}
        className="absolute top-0 left-0 size-full"
      />
      <div className="relative z-1 bg-white text-black rounded-[14px] p-[20px]">
        <header>
          {title}
          <button onClick={closeModal}>x</button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
};
