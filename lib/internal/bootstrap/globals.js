const Buffer = require('internal/buffer').Buffer;
const _process = require('internal/process/core');

const debugMessages = _process.config.debugMessages;

const log = (msg, style = 'r', verbose = false) => {
  if (verbose && debugMessages) return;
  let toLog = `\xA7${style}[Cauldron] `;
  if (msg === undefined) {
    toLog += 'undefined';
  } else if (msg === null) {
    toLog += 'null';
  } else if (typeof msg === 'object') {
    toLog += `[\n${JSON.stringify(msg, ' ', '\t').replace(/\t/g, '  ')}]`;
  } else {
    toLog += msg.toString();
  }
  Bukkit.getConsoleSender().sendMessage(toLog);
};

const console = {
  log(input, ...args) {
    log(input);
  },
  warn(input, ...args) {
    log(input, 'd');
  },
  error(input, ...args) {
    log(input, 'c');
  },
  debug(input, ...args) {
    log(input, 'a', true);
  },
  trace(input, ...args) {
    log(input);
  }
};

module.exports = {
  Buffer,
  process: _process,
  debugMessages,
  console
};
