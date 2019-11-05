const cauldronAsync = require('internal/cauldron/async');

class CauldronPromise {
  constructor(executor) {
    this.executor = executor;
    cauldronAsync.registerPromise(this);
  }

  static all(iterable) {
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

  then(fn) {}

  finally(fn) {
    //
  }
}

module.exports = CauldronPromise;
