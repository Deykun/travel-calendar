import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type LazyImageRequest = {
  key: string;
  countriesCodes: string[];
  mode: 'sharp' | 'blend';
};

type LazyFlagsImageStore = {
  /** Ready-to-render image URL (object/data URL) per request key. */
  images: Partial<{
    [key: string]: string;
  }>;
  imageStatus: Partial<{
    [key: string]: 'requested' | 'loaded';
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
      [key]: 'requested',
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

export function setLazyLoadedImageBlobUrl(key: string, blobUrl: string) {
  if (!key) {
    return;
  }
  const state = useLazyFlagsImageStore.getState();

  const isAlreadyLoaded = state.imageStatus[key] === 'loaded';
  if (isAlreadyLoaded) {
    return;
  }

  useLazyFlagsImageStore.setState((state) => ({
    ...state,
    images: {
      ...state.images,
      [key]: blobUrl,
    },
    imageStatus: {
      ...state.imageStatus,
      [key]: 'loaded',
    },
    queue: withoutRequest(state.queue, key),
  }));
}

/** Drops a failed request so the queue doesn't stall. Status stays `requested` (no retry), consumers keep per-flag fallback. */
export function dropLazyFlagsImageRequest(key: string) {
  useLazyFlagsImageStore.setState((state) => ({
    ...state,
    queue: withoutRequest(state.queue, key),
  }));
}

const withoutRequest = (queue: LazyImageRequest[], key: string) => queue.filter((request) => request.key !== key);
