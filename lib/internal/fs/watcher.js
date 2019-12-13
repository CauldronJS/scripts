class FSWatcher {
  constructor(watching) {
    this.watching = watching;
  }

  change(eventType, file) {}

  error(error) {}

  close() {}
}

module.exports = FSWatcher;
