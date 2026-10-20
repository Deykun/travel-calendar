import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type StravaIntegrationsStoreState = {
  status: {
    state: 'idle' | 'loading' | 'ready';
    processed: number;
    rejected: number;
    total: number;
    startedAt: number;
  };
};

const emptyStore: StravaIntegrationsStoreState = {
  status: {
    state: 'idle',
    processed: 0,
    rejected: 0,
    total: 0,
    startedAt: 0,
  },
};

export const useStravaIntegrationsStore = create<StravaIntegrationsStoreState>()(
  devtools(
    () => ({
      ...emptyStore,
    }),
    { name: 'stravaIntegrationsStore' },
  ),
);

export const resetStravaIntegrationsStore = () => {
  useStravaIntegrationsStore.setState({
    ...emptyStore,
  });
};

export const stravaStartLoading = (params: { total: number }) => {
  useStravaIntegrationsStore.setState(() => ({
    status: {
      ...emptyStore.status,
      state: 'loading',
      total: params.total,
      startedAt: Date.now(),
    },
  }));
};

export const stravaEndLoading = () => {
  useStravaIntegrationsStore.setState((state) => ({
    status: {
      ...state.status,
      state: 'ready',
      rejected: state.status.total - state.status.processed,
    },
  }));
};

export const stravaAddFile = (type: 'processed' | 'rejected') => {
  useStravaIntegrationsStore.setState((state) => ({
    status: {
      ...state.status,
      [type]: state.status[type] + 1,
    },
  }));
};

export default useStravaIntegrationsStore;
