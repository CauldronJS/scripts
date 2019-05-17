/* eslint-disable no-use-before-define */

let spliceOne;
class EventEmitter {
  constructor() {
    EventEmitter.init.call(this);
  }
  setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
      const errors = lazyErrors();
      throw new errors.ERR_OUT_OF_RANGE('n', 'a non-negative number', n);
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return $getMaxListeners(this);
  }
  emit(type, ...args) {
    let doError = type === 'error';
    const events = this._events;
    if (events) {
      doError = doError && !events.error;
    } else if (!doError) {
      return false;
    }
    if (doError) {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const errors = lazyErrors();
      const err = new errors.ERR_UNHANDLED_ERROR(er);
      err.context = er;
      throw err;
    }
    const handler = events[type];
    if (!handler) {
      return false;
    }
    if (typeof handler === 'function') {
      Reflect.apply(handler, this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    if (typeof listener !== 'function') {
      const errors = lazyErrors();
      throw new errors.ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
    }
    this.on(type, _onceWrap(this, type, listener));
    return this;
  }
  prependOnceListener(type, listener) {
    if (typeof listener !== 'function') {
      const errors = lazyErrors();
      throw new errors.ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
    }
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  }
  removeListener(type, listener) {
    let position, i, originalListener;
    if (typeof listener !== 'function') {
      const errors = lazyErrors();
      throw new errors.ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
    }
    const events = this._events;
    if (events === undefined) {
      return this;
    }
    const list = events[type];
    if (list === undefined) {
      return this;
    }
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0) {
        this._events = Object.create(null);
      } else {
        delete events[type];
        if (events.removeListener) {
          this.emit('removeListener', type, list.listener || listener);
        }
      }
    } else if (typeof list !== 'function') {
      position = -1;
      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }
      if (position < 0) {
        return this;
      }
      if (position === 0) {
        list.shift();
      } else {
        if (!spliceOne) {
          // eslint-disable-next-line global-require
          spliceOne = require('internal/util').spliceOne;
        }
        spliceOne(list, position);
      }
      if (list.length === 1) {
        events[type] = list[0];
      }
      if (events.removeListener !== undefined) {
        this.emit('removeListener', type, originalListener || listener);
      }
      return this;
    }
  }
  removeAllListeners(type) {
    const events = this._events;
    let i;
    if (!events) {
      return this;
    }
    if (!events.removeListener) {
      if (arguments.length === 0) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      } else if (!events[type]) {
        if (--this._eventsCount === 0) {
          this._events = Object.create(null);
        } else {
          delete events[type];
        }
      }
      return this;
    }
    if (arguments.length === 0) {
      const keys = Object.keys(events);
      let key;
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') {
          continue;
        }
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    const listeners = events[type];
    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners) {
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }
    return this;
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  }
  static init() {
    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }
  }
  static listenerCount(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  }
}

EventEmitter.usingDomains = false;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

let defaultMaxListeners = 10;

let errors;
function lazyErrors() {
  if (errors === undefined) {
    // eslint-disable-next-line global-require
    errors = require('internal/errors').codes;
  }
  return errors;
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get() {
    return defaultMaxListeners;
  },
  set(arg) {
    if (typeof arg !== 'number' || arg < 0 || Number.isNaN(arg)) {
      const errors = lazyErrors();
      throw new errors.ERR_OUT_OF_RANGE(
        'defaultMaxListeners',
        'a non-negative number',
        arg
      );
    }
    defaultMaxListeners = arg;
  }
});

function $getMaxListeners(that) {
  if (!this._maxListeners) {
    return EventEmitter.defaultMaxListeners;
  }
  return that._maxListeners;
}

function _addListener(target, type, listener, prepend) {
  let m, events, existing;
  if (typeof listener !== 'function') {
    const errors = lazyErrors();
    throw new errors.ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
  }

  events = target._events;
  if (!events) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    if (!events.newListener) {
      target.emit(
        'newListener',
        type,
        listener.listener ? listener.listener : listener
      );
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      existing = events[type] = prepend
        ? [listener, existing]
        : [existing, listener];
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      const w = new Error(
        'Possible EventEmitter memory leak detected. ' +
          existing.length +
          ' ' +
          String(type) +
          ' listeners ' +
          'added. Use emitter.setMaxListeners() to increase limit'
      );
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      // process.emitWarning(w);
    }
  }
  return target;
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

function onceWrapper(...args) {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    Reflect.apply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  const state = {
    fired: false,
    wrapFn: undefined,
    target,
    type,
    listener
  };
  const wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

function _listeners(target, type, unwrap) {
  const events = target._events;

  if (!events) {
    return [];
  }
  const evlistener = events[type];
  if (!evlistener) {
    return [];
  }

  if (typeof evlistener === 'function') {
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  }

  return unwrap
    ? unwrapListeners(evlistener)
    : arrayClone(evlistener, evlistener.length);
}

function listenerCount(type) {
  const events = this._events;
  if (events !== undefined) {
    const evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}
EventEmitter.prototype.listenerCount = listenerCount;

function arrayClone(arr, n) {
  const copy = new Array(n);
  for (let i = 0; i < n; ++i) {
    copy[i] = arr[i];
  }
  return copy;
}

function unwrapListeners(arr) {
  const ret = new Array(arr.length);
  for (let i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

// for backwards compat
EventEmitter.EventEmitter = EventEmitter;

module.exports = EventEmitter;
