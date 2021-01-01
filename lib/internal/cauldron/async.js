/**
 * This file exists because there's no guarantee on our environment's
 * async capability. This file exists to create a bridge with that by
 * requiring the environment to have a public function that returns
 * an available Polyglot Context. It is completely valid for it to
 * return the current context as this would still run, but instead
 * the async function would become blocking, thus rendering the
 * operation useless.
 *
 * THIS MEANS ALL ASYNC PROCESSING MUST BE IN CAULDRON, NOT JS.
 */

// the service in Java
const asyncService = internalBinding('AsyncService');

// the following is an example and not implemented
const [asyncId, triggerId] = asyncService.wrap(() => {
  // example function, this is ran on the same thread but in between
  // intervals of the VM. Not to be confused with a worker thread, which
  // runs on a separate thread unrelated to the main thread

  // this will cancel the async function
  asyncService.cancel(asyncId);
  // this will call the async function at the next available tick. By default,
  // the function stack is FIFO
  asyncService.call(triggerId);
});

const promisify = (fn, callback, ...args) =>
  new Promise((resolve, reject) => {
    try {
      const result = fn.apply(fn, args);
      resolve(callback(null, result));
    } catch (err) {
      reject(callback(err, null) || err);
    }
  });

/**
 * Runs a function asynchronously within Cauldron, returning a promise that resolves on completion
 *
 * @param {() => *} fn
 *
 * @returns {Promise}
 */
const async = (fn) => $$isolate$$.getAsyncFactory().generateAsyncPromise(fn);

/**
 * Returns a promise that waits for a specified amount of time then resolves
 *
 * @param {Number} ms
 */
const wait = (ms) => $$isolate$$.getAsyncFactory().wait(ms);

// TODO: create wrapper fn that can be fed in as a raw void in Java

module.exports = {
  async,
  promisify,
  wait,
};
