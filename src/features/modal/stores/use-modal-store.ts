import { type ReactNode } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ModalStore = {
  modal: ReactNode;
};

const emptyStore: ModalStore = {
  modal: null,
};

export const useModalStore = create<ModalStore>()(
  devtools(
    () =>
      ({
        ...emptyStore,
      }) satisfies ModalStore,
    { name: "modalStore" },
  ),
);

type ParamsOpenModal = {
  modal: ReactNode;
};

export function openModal({ modal }: ParamsOpenModal) {
  useModalStore.setState({
    modal,
  });
}

export function closeModal() {
  useModalStore.setState({
    modal: null,
  });
}
