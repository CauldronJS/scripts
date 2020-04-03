const Server = require('internal/net/server');
const Socket = require('internal/net/socket');

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
  Socket,
  createServer
};
