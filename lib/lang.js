global.arrayClone = function(arr, length) {
  if (length) {
    return arr.slice(0, length);
  } else {
    return arra.slice(0);
  }
};

global._s = function(str) {
  return '' + new String(str);
};

global.arrayToString = function(array) {
  var s = '';
  for (var i = 0; i < array.length; i++) {
    s += array[i] + ',';
  }
  return s.replace(/\,$/, '');
};

global.arrayToDictionary = function(array, keySelector) {
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

global.arrayContains = function(array, element) {
  for (var i in array) {
    if (array[i] == element) {
      return true;
    }
  }
  return false;
};

global.enumContains = function(enu, name) {
  for (var i in enu) {
    if (i == name) return true;
  }
  return false;
};

global._a = function(ja) {
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

global.stringArray = function(array) {
  var _new = [];
  for (var i in array) {
    _new[i] = _s(array[i]);
  }
  return _new;
};

global.numArr = function(start, end) {
  var res = [];
  for (var i = start; i <= end; ++i) {
    res.push(i);
  }
  return res;
};

global.sleep = function(milliseconds) {
  milliseconds = milliseconds || 0;
  java.lang.Thread.sleep(milliseconds);
};

global.listMembers = function(obj) {
  var results = [];
  for (var i in obj) {
    results.push(i);
  }
  return results;
};

global.parseNum = function(num) {
  return 0 + num;
};

var scheduler = Bukkit.getScheduler();
var thiqPlugin = Bukkit.getPluginManager().getPlugin('Thiq');

global.runnable = function(fn) {
  var Runnable = require('@java/java.lang.Runnable');
  return new Runnable({
    run: fn
  });
};

global.setInterval = function(fn, time) {
  var task = scheduler.scheduleSyncRepeatingTask(
    thiqPlugin,
    runnable(fn),
    1,
    time / 50
  );
  if (task == -1) throw 'Could not schedule interval';
  return task;
};

global.setTimeout = function(fn, time) {
  var task = scheduler.scheduleSyncDelayedTask(
    thiqPlugin,
    runnable(fn),
    time / 50
  );
  if (task == -1) throw 'Could not schedule timeout';
  return task;
};

global.cancelInterval = function(id) {
  scheduler.cancelTask(id);
};

global.cancelAllIntervals = function() {
  scheduler.cancelTasks(thiqPlugin);
};

global.evalInContext = function(code, context) {
  with (context) {
    evalScript(_s(code));
  }
};

global.numToEnum = function(enumObject, value) {
  return enumObject.values()[value];
};

String.isNullOrEmpty = function(input) {
  return input == undefined || input == null || input == '';
};

global.constructObject = function(constructor, args) {
  function F() {
    return constructor.apply(this, args);
  }
  F.prototype = constructor.prototype;
  return new F();
};

global.unwrapObject = function(target) {
  var value = {};
  for (var field in target) {
    value[field] = target[field];
  }
  return value;
};

global.extend = function(javaObject, options) {
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
