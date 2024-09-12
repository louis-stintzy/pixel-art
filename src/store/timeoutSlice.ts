import { StateCreator } from 'zustand';
import TimeoutStore from './TimeoutStore';

export interface TimeoutSlice {
  // timeoutStores: { [key: string]: ReturnType<typeof setTimeout>[] };
  // createStore: (key: string) => void;
  useDADTimeouts: ReturnType<typeof setTimeout>[];
  gridTimeouts: ReturnType<typeof setTimeout>[];
  CPCTimeouts: ReturnType<typeof setTimeout>[];
  addUseDADTimeout: (timeout: ReturnType<typeof setTimeout>) => void;
  addGridTimeout: (timeout: ReturnType<typeof setTimeout>) => void;
  addCPCTimeout: (timeout: ReturnType<typeof setTimeout>) => void;
  removeUseDADTimeout: (timeout: ReturnType<typeof setTimeout>) => void;
  removeGridTimeout: (timeout: ReturnType<typeof setTimeout>) => void;
  removeCPCTimeout: (timeout: ReturnType<typeof setTimeout>) => void;
  clearUseDADTimeouts: () => void;
  clearGridTimeouts: () => void;
  clearCPCTimeouts: () => void;
  // addTimeout: (key: string, timeout: ReturnType<typeof setTimeout>) => void;
  // removeTimeout: (key: string, timeout: ReturnType<typeof setTimeout>) => void;
  // deleteStore: (key: string) => void;
  // stores: { [key: string]: TimeoutStore };
  // createStore: (key: string) => TimeoutStore;
  // clearStore: (key: string) => void;
}

const createTimeoutSlice: StateCreator<TimeoutSlice> = (set) => ({
  // timeoutStores: {},
  // createStore: (key) =>
  //   set((state) => {
  //     if (!state.timeoutStores[key]) {
  //       console.log(key, ': createStore');
  //       state.timeoutStores[key] = [];
  //     } else {
  //       throw new Error('Timeout store already exists');
  //     }
  //     return { timeoutStores: state.timeoutStores };
  //   }),
  useDADTimeouts: [],
  gridTimeouts: [],
  CPCTimeouts: [],
  addUseDADTimeout: (timeout) =>
    set((state) => {
      console.log('addUseDADTimeout : ', timeout);
      state.useDADTimeouts.push(timeout);
      return { useDADTimeouts: state.useDADTimeouts };
    }),
  addGridTimeout: (timeout) =>
    set((state) => {
      console.log('addGridTimeout : ', timeout);
      state.gridTimeouts.push(timeout);
      return { gridTimeouts: state.gridTimeouts };
    }),
  addCPCTimeout: (timeout) =>
    set((state) => {
      console.log('addCPCTimeout : ', timeout);
      state.CPCTimeouts.push(timeout);
      return { CPCTimeouts: state.CPCTimeouts };
    }),
  removeUseDADTimeout: (timeout) =>
    set((state) => {
      console.log('removeUseDADTimeout : ', timeout);
      state.useDADTimeouts = state.useDADTimeouts.filter((t) => t !== timeout);
      return { useDADTimeouts: state.useDADTimeouts };
    }),
  removeGridTimeout: (timeout) =>
    set((state) => {
      console.log('removeGridTimeout : ', timeout);
      state.gridTimeouts = state.gridTimeouts.filter((t) => t !== timeout);
      return { gridTimeouts: state.gridTimeouts };
    }),
  removeCPCTimeout: (timeout) =>
    set((state) => {
      console.log('removeCPCTimeout : ', timeout);
      state.CPCTimeouts = state.CPCTimeouts.filter((t) => t !== timeout);
      return { CPCTimeouts: state.CPCTimeouts };
    }),
  clearUseDADTimeouts: () =>
    set((state) => {
      console.log('clearUseDADTimeouts : ', state.useDADTimeouts);
      state.useDADTimeouts.forEach((timeout) => clearTimeout(timeout));
      return { useDADTimeouts: [] };
    }),
  clearGridTimeouts: () =>
    set((state) => {
      console.log('clearGridTimeouts : ', state.gridTimeouts);
      state.gridTimeouts.forEach((timeout) => clearTimeout(timeout));
      return { gridTimeouts: [] };
    }),
  clearCPCTimeouts: () =>
    set((state) => {
      console.log('clearCPCTimeouts : ', state.CPCTimeouts);
      state.CPCTimeouts.forEach((timeout) => clearTimeout(timeout));
      return { CPCTimeouts: [] };
    }),
  // addTimeout: (key, timeout) =>
  //   set((state) => {
  //     if (state.timeoutStores[key]) {
  //       console.log('###', key, ': addTimeout : ', timeout);
  //       console.log('store : ', state.timeoutStores[key]);
  //       state.timeoutStores[key].push(timeout);
  //     } else {
  //       throw new Error('Timeout store does not exist');
  //     }
  //     return { timeoutStores: state.timeoutStores };
  //   }),
  // removeTimeout: (key, timeout) =>
  //   set((state) => {
  //     if (state.timeoutStores[key]) {
  //       console.log('###', key, ': removeTimeout : ', timeout);
  //       console.log('store : ', state.timeoutStores[key]);
  //       state.timeoutStores[key] = state.timeoutStores[key].filter(
  //         (t) => t !== timeout
  //       );
  //     } else {
  //       throw new Error('Timeout store does not exist');
  //     }
  //     return { timeoutStores: state.timeoutStores };
  //   }),
  // deleteStore: (key) =>
  //   set((state) => {
  //     const timeouts = state.timeoutStores[key];
  //     if (timeouts && timeouts.length > 0) {
  //       console.log(key, ': deleteStore - store : ', timeouts);
  //       timeouts.forEach((timeout) => {
  //         console.log('----->', key, ': clearTimeout : ', timeout);
  //         clearTimeout(timeout);
  //       });
  //       delete state.timeoutStores[key];
  //     } else {
  //       console.log(`${key} : no timeouts to clear or store is empty`);
  //       throw new Error('Timeout store does not exist');
  //     }
  //     return { timeoutStores: state.timeoutStores };
  //   }),

  // stores: {},
  // createStore: (key) => {
  //   let store: TimeoutStore = {} as TimeoutStore;
  //   set((state) => {
  //     if (!state.stores[key]) {
  //       state.stores[key] = new TimeoutStore();
  //     }
  //     store = state.stores[key];
  //     return { stores: state.stores };
  //   });
  //   return store;
  // },
  // clearStore: (key) => {
  //   set((state) => {
  //     if (state.stores[key]) {
  //       state.stores[key].clearTimeouts();
  //       delete state.stores[key];
  //     }
  //     return { stores: state.stores };
  //   });
  // },
});

export default createTimeoutSlice;
