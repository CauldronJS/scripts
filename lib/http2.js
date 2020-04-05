const Server = require('internal/http/server');

const createServer = (options, connectionListener) => {
  if (typeof options === 'function') {
    connectionListener = options;
    options = { allowHalfOpen: false, pauseOnConnect: false };
  } else if (!options) {
    options = { allowHalfOpen: false, pauseOnConnect: false };
  }
  return new Server(options, connectionListener);
};

module.exports = {
  Server,
  createServer
};
