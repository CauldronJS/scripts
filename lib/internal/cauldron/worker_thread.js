const WorkerThread = $$isolate$$.WorkerThread;

module.exports = new (class WorkerThreadWrapper {
  constructor(fn, callback) {
    return new WorkerThread($$cauldron$$, fn, false, callback);
  }
})();
