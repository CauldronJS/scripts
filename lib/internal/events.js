// everything up until Bukkit only event emitters is copied from https://github.com/nodejs/node/blob/master/lib/events.js

var spliceOne;

function EventEmitter() {
  EventEmitter.init.call(this);
}

EventEmitter.usingDomains = false;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

var defaultMaxListeners = 10;

var errors;
function lazyErrors() {
  if (errors === undefined) errors = require('internal/errors').codes;
  return errors;
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || Number.isNaN(arg)) {
      var errors = lazyErrors();
      throw new errors.ERR_OUT_OF_RANGE(
        'defaultMaxListeners',
        'a non-negative number',
        arg
      );
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {
  if (
    this._events === undefined ||
    this._events === Object.getPrototypeOf(this)._events
  ) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};

EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || Number.isNaN(n)) {
    var errors = lazyErrors();
    throw new errors.ERR_OUT_OF_RANGE('n', 'a non-negative number', n);
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (this._maxListeners === undefined) {
    return EventEmitter.defaultMaxListeners;
  }
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = Array.prototype.slice.call(null, arguments).slice(1);
  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) {
    doError = doError && events.error === undefined;
  } else if (!doError) {
    return false;
  }
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      throw er;
    }

    var errors = lazyErrors();
    var err = new errors.ERR_UNHANDLED_ERROR(er);
    err.context = er;
    throw err;
  }

  var handler = events[type];

  if (!handler) return false;
  if (typeof handler === 'function') {
    Reflect.apply(handler, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m, events, existing;
  if (typeof listener !== 'function') {
    var errors = lazyErrors();
    throw new errors.ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    if (events.newListener !== undefined) {
      target.emit(
        'newListener',
        type,
        listener.listener ? listener.listener : listener
      );
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
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
      var w = new Error(
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

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(
  type,
  listener
) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  var args = Array.prototype.slice.call(this, arguments);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    Reflect.apply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function(type, listener) {
  if (typeof listener !== 'function') {
    var errors = lazyErrors();
    throw new errors.ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(
  type,
  listener
) {
  if (typeof listener !== 'function') {
    var errors = lazyErrors();
    throw new errors.ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
  }
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  var list, events, position, i, originalListener;
  if (typeof listener !== 'function') {
    var errors = lazyErrors();
    throw new errors.ERR_INVALID_ARG_TYPE('listener', 'Function', listener);
  }

  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);
    else {
      delete events[type];
      if (events.removeListener)
        this.emit('removeListener', type, list.listener || listener);
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

    if (position < 0) return this;

    if (position === 0) list.shift();
    else {
      if (spliceOne === undefined)
        spliceone = require('internal/utils').spliceOne;
      spliceOne(list, position);
    }

    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) {
      this.emit('removeListener', type, originalListener || listener);
    }
    return this;
  }
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this;
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] === undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);
      else delete events[type];
    }
    return this;
  }

  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];

  if (typeof evlistener === 'function') {
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  }

  return unwrap
    ? unwrapListeners(evlistener)
    : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events !== undefined) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) {
    copy[i] = arr[i];
  }
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

// for backwards compat
EventEmitter.EventEmitter = EventEmitter;

module.exports = EventEmitter;
