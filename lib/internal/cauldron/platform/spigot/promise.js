class CauldronPromise {
  constructor(fn) {
    this.__fn__ = fn;
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
    this.__catch__ = fn;
  }

  then(fn) {
    this.__then__ = fn;
  }

  finally(fn) {
    this.__finally__ = fn;
  }
}

module.exports = CauldronPromise;
