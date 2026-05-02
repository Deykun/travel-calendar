import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import useFiltersStore, { setToFilter } from '@/features/filters/stores/useFilterStore';
import { objectDateToString, stringDateToObject } from '@/utils/date';

const FRAME_DURATION_MS = 400;

type Frame = {
  from?: number;
  to?: number;
};

export type PlayStoreState = {
  state: 'playing' | 'stopped';
  targetFrame: Frame;
};

const emptyStore: PlayStoreState = {
  state: 'stopped',
  targetFrame: {},
};

export const usePlayStore = create<PlayStoreState>()(
  devtools(
    () => ({
      ...emptyStore,
    }),
    { name: 'playStore' },
  ),
);

const playNextFrameIfNeeded = () => {
  const playStore = usePlayStore.getState();

  if (playStore.state !== 'playing') {
    return;
  }

  const targetYearTo = playStore.targetFrame.to;

  if (targetYearTo) {
    const currentTo = useFiltersStore.getState().activeFilters.to;

    if (currentTo) {
      const { year, month, day } = stringDateToObject(currentTo);

      if (year < targetYearTo) {
        setToFilter(
          objectDateToString({
            year: year + 1,
            month,
            day,
          }),
        );

        setTimeout(() => {
          playNextFrameIfNeeded();
        }, FRAME_DURATION_MS);

        return;
      }
    }
  }

  usePlayStore.setState({
    state: 'stopped',
  });
};

export const actionPlay = (targetFrame: Partial<Frame>) => {
  const activeFilters = useFiltersStore.getState().activeFilters;

  const { to, from } = activeFilters;
  if (to && from) {
    const fromObject = stringDateToObject(from);
    const toObject = stringDateToObject(to);

    setToFilter(
      objectDateToString({
        year: fromObject.year,
        month: toObject.month,
        day: toObject.day,
      }),
    );

    usePlayStore.setState({
      state: 'playing',
      targetFrame,
    });

    setTimeout(() => {
      playNextFrameIfNeeded();
    }, FRAME_DURATION_MS);
  }
};

export const actionStop = () => {
  usePlayStore.setState({
    state: 'stopped',
  });
};

export default usePlayStore;
