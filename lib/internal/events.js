var registeredListeners = {};

function CancelToken(listener, eventName) {
  this.$baseToken = new java.lang.Object();
  this.listener = listener;
  this.eventName = eventName;
}

CancelToken.prototype.equals = function(compare) {
  return compare.$baseToken == this.$baseToken;
};

CancelToken.prototype.unregister = function() {
  var callbacks = this.listener.callbacks[this.eventName];
  for (var i = 0; i < callbacks.length; ++i) {
    var callback = callbacks[i];
    if (this.equals(callback.cancelToken)) {
      callbacks.splice(i, 1);
      return;
    }
  }
};

class EventListener {
  constructor(name) {
    this.registeredEventClasses = {};
    this.callbacks = {};
    registeredListeners[name] = this;
  }

  registerEvent(name, event) {
    this.registeredEventClasses[name] = eventClass;
    this.$baseListener.registerEvent(eventClass, event => {
      this.invoke(name, event);
    });
    return this;
  }

  registerHandler(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    var cancelToken = new CancelToken(this, event);
    callback.cancelToken = cancelToken;
    this.callbacks[event].push(callback);
    return callback.cancelToken;
  }

  invoke(event, args) {
    var callbacks = this.callbacks[event];
    if (!callbacks) return;
    for (var i = 0; i < callbacks.length; ++i) {
      callbacks[i](args);
    }
  }
}
