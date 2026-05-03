import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ShareStore = {
  state: 'idle' | 'loading';
};

const emptyStore: ShareStore = {
  state: 'idle',
};

export const useShareStore = create<ShareStore>()(
  devtools(
    () =>
      ({
        ...emptyStore,
      }) satisfies ShareStore,
    { name: 'shareStore' },
  ),
);

export function setShareState(state: ShareStore['state']) {
  useShareStore.setState({
    state,
  });
}
