class TimeoutStore {
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  get activeTimeouts() {
    return this.timeouts;
  }

  addTimeout(timeout: ReturnType<typeof setTimeout>) {
    this.timeouts.push(timeout);
    console.log('timeouts : ', this.timeouts);
  }

  removeTimeout(timeout: ReturnType<typeof setTimeout>) {
    this.timeouts = this.timeouts.filter((t) => t !== timeout);
  }

  clearTimeouts() {
    console.log('timeouts to clear : ', this.timeouts);
    this.timeouts.forEach((timeout) => {
      console.log('timeout to clear : ', timeout);
      clearTimeout(timeout);
    });
    this.timeouts = [];
  }
}

export default TimeoutStore;
