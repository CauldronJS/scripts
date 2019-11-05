const NATIVE_PROMISE = Symbol('nativePromise');

class CauldronPromise {
  constructor(fn) {
    this[NATIVE_PROMISE] = __cauldron__.getAsyncContext.register(fn);
  }

  static all(iterable) {
    //
  }

  static allSettled(iterable) {
    //
  }

  static race(iterable) {
    //
  }

  static reject(reason) {
    //
  }

  static resolve(value) {
    //
  }

  catch(fn) {
    //
  }

  then(fn) {
    return new CauldronPromise(fn);
  }

  finally(fn) {

  }
}

module.exports = CauldronPromise;