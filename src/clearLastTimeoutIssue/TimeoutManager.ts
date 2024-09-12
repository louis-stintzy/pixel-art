import TimeoutStore from './TimeoutStore';

class TimeoutManager {
  private store: { [key: string]: TimeoutStore } = {};

  createStore(key: string) {
    if (!this.store[key]) {
      this.store[key] = new TimeoutStore();
    }
    return this.store[key];
  }

  getStore(key: string) {
    return this.store[key];
  }

  clearStore(key: string) {
    if (this.store[key]) {
      this.store[key].clearTimeouts();
      delete this.store[key];
    }
  }
}

const timeoutManager = new TimeoutManager();
export default timeoutManager;
