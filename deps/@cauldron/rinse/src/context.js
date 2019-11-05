/**
 * This context varies from Graal context. This one still interacts
 * with the Graal context but instead determines if global positioning
 * requires change or not. There is a dynamic amount of contexts per
 * server instance, determined by how many resources are available,
 * with each context containing 3-5 daemons, also dependent on the
 * resources. The difference between the two is that the daemons
 * are all created when the context is created whereas contexts are
 * created as they are needed with thread swapping capabilities
 */

import Daemon from './daemon';

const MAX_DAEMON_COUNT = 5; // TODO: dynamically set this
const registeredContexts = Object.create(null);

/**
 * Switches the context that is currently registered. This may
 * happen during async operations where one context is yielding control
 * to another context.
 *
 * @export
 * @param {number} id
 */
export function switchContext(id) {}

/**
 * Returns the count of created contexts
 *
 * @export
 *
 * @returns {number}
 */
export function getContextCount() {}

/**
 * Creates a new context with pre-initialized daemons
 *
 * @export
 *
 * @returns {number} The ID of the context
 */
export function createContext() {
  const context = new Context();
  for (let i = 0; i < MAX_DAEMON_COUNT; ++i) {
    // initialize each daemon, asynchronously preparing them
    // for mounting
  }
}

class Context {
  /**
   * A collection of all daemons in the context
   *
   * @type {Daemon[]}
   * @memberof Context
   */
  daemons = [];
}
