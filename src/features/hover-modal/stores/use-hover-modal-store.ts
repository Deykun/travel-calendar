import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type HoverModal = {
  type: "day";
  dayKey: string;
};

type HoverModalStore = {
  modal: HoverModal | null;
};

const emptyStore: HoverModalStore = {
  modal: null,
};

export const useHoverModalStore = create<HoverModalStore>()(
  devtools(
    () =>
      ({
        ...emptyStore,
      }) satisfies HoverModalStore,
    { name: "hoverModalStore" },
  ),
);

export function openHoverModal(modal: HoverModal) {
  useHoverModalStore.setState({
    modal,
  });
}

export function closeHoverModal() {
  useHoverModalStore.setState({
    modal: null,
  });
}
