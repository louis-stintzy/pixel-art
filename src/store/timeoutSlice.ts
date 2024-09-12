import { StateCreator } from 'zustand';
import TimeoutStore from './TimeoutStore';

export interface TimeoutSlice {
  stores: { [key: string]: TimeoutStore };
  createStore: (key: string) => TimeoutStore;
  clearStore: (key: string) => void;
}

const createTimeoutSlice: StateCreator<TimeoutSlice> = (set) => ({
  stores: {},
  createStore: (key) => {
    let store: TimeoutStore = {} as TimeoutStore;
    set((state) => {
      if (!state.stores[key]) {
        state.stores[key] = new TimeoutStore();
      }
      store = state.stores[key];
      return { stores: state.stores };
    });
    return store;
  },
  clearStore: (key) => {
    set((state) => {
      if (state.stores[key]) {
        state.stores[key].clearTimeouts();
        delete state.stores[key];
      }
      return { stores: state.stores };
    });
  },
});

export default createTimeoutSlice;
