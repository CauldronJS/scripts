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

const { getAsyncContext } = __cauldron__;

/**
 * Registers a Promise to run on the async context
 *
 * @param {*} promise
 */
function registerPromise(promise) {
  // TODO
}
