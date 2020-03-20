const Server = require('internal/net/server');
const Socket = require('internal/net/socket');

module.exports = {
  Server,
  Socket,
  createServer: Server.createServer
};
