const { Bukkit } = require('bukkit');

/**
 * @type {Map<number, Timeout>}
 */
const trackedTimeouts = new Map();

class Immediate {
  constructor(callback, after, args, delay, id) {
    this._callback = callback;
    this._after = after;
    this._args = args;
    this._delay = delay;
    this._id = id;
    this._ref = null;
    trackedTimeouts.set(id, this);
    // TODO: hook callback and after to be called async
  }

  hasRef() {
    return this._ref !== null;
  }

  ref() {
    // this will create an object that binds itself
    // to the current thread as a marker
    this._ref = Object.create(null);
  }

  unref() {
    if (this._ref) {
      Bukkit.getScheduler().cancelTask(this._id);
      delete this._ref;
    }
  }
}

class Timeout extends Immediate {
  refresh() {}

  [Symbol.toPrimitive]() {}
}

/**
 *
 * @param {(...any) => void} callback
 * @param  {...any} args
 *
 * @returns {Immediate}
 */
function setImmediate(callback, ...args) {
  const task = $$cauldron$$.scheduleTask(callback, 0);
  return new Immediate(callback, null, args, 1, task);
}

/**
 *
 * @param {(...any) => void} callback
 * @param {number} delay
 * @param  {...any} args
 *
 * @returns {Timeout}
 */
function setInterval(callback, delay, ...args) {
  const task = $$cauldron$$.scheduleRepeatingTask(callback, delay, delay);
  return new Timeout(callback, null, args, delay, task);
}

/**
 *
 * @param {(...any) => void} callback
 * @param {number} delay
 * @param  {...any} args
 *
 * @returns {Timeout}
 */
function setTimeout(callback, delay, ...args) {
  const task = $$cauldron$$.scheduleTask(callback, delay);
  return new Timeout(callback, null, args, delay, task);
}

/**
 *
 * @param {Immediate} immediate
 */
function clearImmediate(immediate) {
  immediate.unref();
}

/**
 *
 * @param {Timeout} timeout
 */
function clearInterval(timeout) {
  timeout.unref();
}

/**
 *
 * @param {Timeout} timeout
 */
function clearTimeout(timeout) {
  timeout.unref();
}

module.exports = {
  Immediate,
  Timeout,
  setImmediate,
  setInterval,
  setTimeout,
  clearImmediate,
  clearInterval,
  clearTimeout,
};
