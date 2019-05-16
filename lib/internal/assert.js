/* eslint-disable eqeqeq */
function assert(toCheck, message) {
  if (toCheck === false) {
    throw new assert.AssertionError({ message });
  }
}

assert.AssertionError = class AssertionError extends Error {
  constructor({ message, actual, expected, operator, stackStartFn }) {
    super(message);
    this.action = actual;
    this.exepected = expected;
    this.operator = operator;
    this.stackStartFn = stackStartFn;
  }
};

assert.deepStrictEqual = (actual, expected, message) => {};

assert.doesNotReject = async (asyncFn, error, message) => {
  try {
    await asyncFn();
  } catch (err) {
    throw error;
  }
};

assert.doesNotThrow = (fn, error, message) => {
  try {
    fn();
  } catch (err) {
    if (message) {
      error.message = message;
    }
    throw error;
  }
};

assert.equal = (actual, expected, message) => {
  if (actual != expected) {
    this.fail(message);
  }
};

assert.notEqual = (actual, expected, message) => {
  if (actual == expected) {
    this.fail(message);
  }
};

assert.fail = message => {
  throw new this.AssertionError({ message });
};

assert.ifError = value => {
  if (value instanceof Error) {
    throw value;
  }
};

assert.notDeepStrictEqual = (actual, expected, message) => {};

assert.ok = (value, message) => {
  if (!value) {
    this.fail(message);
  }
};

assert.rejects = async (asyncFn, error, message) => {
  try {
    await asyncFn();
    throw createError(error, message);
  } catch (err) {
    // do nothing
  }
};

assert.strictEqual = (actual, expected, message) => {};

assert.notStrictEqual = (actual, expected, message) => {};

assert.throws = (fn, error, message) => {
  try {
    fn();
    throw createError(error, message);
  } catch (err) {
    // do nothing
  }
};

function createError(error, message) {
  if (typeof error === 'function') {
    // it's a class/function
    // eslint-disable-next-line new-cap
    return new error(message);
  }
  if (error instanceof Error) {
    error.message = message;
    return error;
  }
  return new assert.AssertionError({ message });
}

module.exports = assert;
