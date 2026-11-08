import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type LazyImageRequest = {
  key: string;
  countriesCodes: string[];
  mode: 'sharp' | 'blend';
};

type LazyFlagsImageStore = {
  images: Partial<{
    [key: string]: Blob;
  }>;
  imageStatus: Partial<{
    [ket: string]: 'requested' | 'loaded';
  }>;
  queue: LazyImageRequest[];
};

const emptyStore: LazyFlagsImageStore = {
  images: {},
  imageStatus: {},
  queue: [],
};

export const useLazyFlagsImageStore = create<LazyFlagsImageStore>()(
  devtools(
    () =>
      ({
        ...emptyStore,
      }) satisfies LazyFlagsImageStore,
    { name: 'lazyFlagsImageStore' },
  ),
);

export function getLazyFlagsImageKeyIfPossible(params: Omit<LazyImageRequest, 'key'>): string {
  if (params.countriesCodes.length === 0) {
    return '';
  }

  return `${params.mode}-${params.countriesCodes.join('.')}`;
}

export async function requestLazyFlagsImage(params: Omit<LazyImageRequest, 'key'>) {
  const key = getLazyFlagsImageKeyIfPossible(params);
  console.log('requestLazyFlagsImage', key);
  if (!key) {
    return;
  }

  const state = useLazyFlagsImageStore.getState();

  const shouldBeAddedToQueue = !state.imageStatus[key];
  if (!shouldBeAddedToQueue) {
    return;
  }

  useLazyFlagsImageStore.setState((state) => ({
    ...state,
    imageStatus: {
      ...state.imageStatus,
    },
    queue: [
      ...state.queue,
      {
        key,
        ...params,
      },
    ],
  }));
}
