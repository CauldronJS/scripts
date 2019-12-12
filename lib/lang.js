globalThis.arrayClone = function(arr, length) {
  if (length) {
    return arr.slice(0, length);
  } else {
    return arra.slice(0);
  }
};

globalThis._s = function(str) {
  return '' + new String(str);
};

globalThis.arrayToString = function(array) {
  var s = '';
  for (var i = 0; i < array.length; i++) {
    s += array[i] + ',';
  }
  return s.replace(/\,$/, '');
};

globalThis.arrayToDictionary = function(array, keySelector) {
  var dictionary = {};
  var keyFn = keySelector;
  if (typeof keySelector == 'string') {
    keyFn = function(item) {
      return item[keySelector];
    };
  }
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    dictionary[keyFn(item)] = item;
  }
  return dictionary;
};

globalThis.arrayContains = function(array, element) {
  for (var i in array) {
    if (array[i] == element) {
      return true;
    }
  }
  return false;
};

globalThis.enumContains = function(enu, name) {
  for (var i in enu) {
    if (i == name) return true;
  }
  return false;
};

globalThis._a = function(ja) {
  var newarray = [];
  if (ja instanceof java.lang.Iterable) {
    var iter = ja.iterator();
    while (iter.hasNext()) {
      newarray.push(iter.next());
    }
    return newarray;
  } else if (_a instanceof java.util.Map) {
    ja = ja.values().toArray();
  }

  for (var i = 0; i < ja.length; ++i) {
    newarray.push(ja[i]);
  }

  return newarray;
};

globalThis.stringArray = function(array) {
  var _new = [];
  for (var i in array) {
    _new[i] = _s(array[i]);
  }
  return _new;
};

globalThis.numArr = function(start, end) {
  var res = [];
  for (var i = start; i <= end; ++i) {
    res.push(i);
  }
  return res;
};

globalThis.sleep = function(milliseconds) {
  milliseconds = milliseconds || 0;
  java.lang.Thread.sleep(milliseconds);
};

globalThis.listMembers = function(obj) {
  var results = [];
  for (var i in obj) {
    results.push(i);
  }
  return results;
};

globalThis.parseNum = function(num) {
  return 0 + num;
};

var scheduler = Bukkit.getScheduler();
var cauldronPlugin = Bukkit.getPluginManager().getPlugin('Cauldron');

globalThis.runnable = function(fn) {
  const { Runnable } = require('java/lang');
  return new Runnable({
    run: fn
  });
};

globalThis.setInterval = function(fn, time) {
  var task = scheduler.scheduleSyncRepeatingTask(
    cauldronPlugin,
    runnable(fn),
    1,
    time / 50
  );
  if (task == -1) throw 'Could not schedule interval';
  return task;
};

globalThis.setTimeout = function(fn, time) {
  var task = scheduler.scheduleSyncDelayedTask(
    cauldronPlugin,
    runnable(fn),
    time / 50
  );
  if (task == -1) throw 'Could not schedule timeout';
  return task;
};

globalThis.cancelInterval = function(id) {
  scheduler.cancelTask(id);
};

globalThis.cancelAllIntervals = function() {
  scheduler.cancelTasks(cauldronPlugin);
};

globalThis.evalInContext = function(code, context) {
  with (context) {
    evalScript(_s(code));
  }
};

globalThis.numToEnum = function(enumObject, value) {
  return enumObject.values()[value];
};

String.isNullOrEmpty = function(input) {
  return input == undefined || input == null || input == '';
};

globalThis.constructObject = function(constructor, args) {
  function F() {
    return constructor.apply(this, args);
  }
  F.prototype = constructor.prototype;
  return new F();
};

globalThis.unwrapObject = function(target) {
  var value = {};
  for (var field in target) {
    value[field] = target[field];
  }
  return value;
};

globalThis.extend = function(javaObject, options) {
  var result = Java.extend(javaObject);
  for (var property in result) {
    result[property] = options[property] || Java.super(result)[property];
  }
  return result;
};

Boolean.prototype.toUpperCase = function() {
  if (this === true) {
    return 'TRUE';
  } else {
    return 'FALSE';
  }
};
