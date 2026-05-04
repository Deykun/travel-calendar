import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ShareStore = {
  state: 'waiting' | 'ready' | 'loading';
};

const emptyStore: ShareStore = {
  state: 'waiting',
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
