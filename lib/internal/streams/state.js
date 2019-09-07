const { ERR_INVALID_OPT_VALUE } = require('internal/errors').codes;

const highWaterMarkFrom = (options, isDuplex, duplexKey) =>
  // eslint-disable-next-line no-nested-ternary
  options.highWaterMark != null
    ? options.highWaterMark
    : isDuplex
    ? options[duplexKey]
    : null;

const getHighWaterMark = (state, options, duplexKey, isDuplex) => {
  const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
  if (hwm) {
    if (!Number.isInteger(hwm) || hwm < 0) {
      const name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }
    return Math.floor(hwm);
  }

  return state.objectMode ? 16 : 16 * 1024;
};

module.exports = {
  getHighWaterMark
};
