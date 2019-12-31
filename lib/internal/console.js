const log = (...args) => args.forEach(arg => globalThis.log(arg, '7', false));
const warn = (...args) => args.forEach(arg => globalThis.log(arg, 'd', false));
const debug = (...args) => args.forEach(arg => globalThis.log(arg, 'a', true));
const error = (...args) => args.forEach(arg => globalThis.log(arg, 'c', false));
const trace = log;

module.exports = {
  log,
  warn,
  debug,
  error,
  trace
};
