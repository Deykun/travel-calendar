import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type OverModal =
  | {
      type: "day";
      dayKey: string;
    }
  | {
      type: "filters";
    };

type OverModalStore = {
  modal: OverModal | null;
};

const emptyStore: OverModalStore = {
  modal: null,
};

export const useOverModalStore = create<OverModalStore>()(
  devtools(
    () =>
      ({
        ...emptyStore,
      }) satisfies OverModalStore,
    { name: "overModalStore" },
  ),
);

export function openOverModal(modal: OverModal) {
  useOverModalStore.setState({
    modal,
  });
}

export function closeOverModal() {
  useOverModalStore.setState({
    modal: null,
  });
}
