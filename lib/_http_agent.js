/**
 * HTTP library Agent
 *
 * @file    \lib\_http_agent.js
 * @author  Justin Cox <https://spyce.codes>
 */

const { DEFAULT_AGENT_OPTIONS } = require('_http_common');
const { EventEmitter } = require('events');

class Agent extends EventEmitter {
  constructor(options = DEFAULT_AGENT_OPTIONS) {
    super();
    this.options = { ...options };
    this.keepAlive = options.keepAlive;
    this.keepAliveMsecs = options.keepAliveMsecs;
    this.maxSockets = options.maxSockets;
    this.maxFreeSockets = options.maxFreeSockets;
    this.timeout = options.timeout;

    this.protocol = 'http:';

    this.freeSockets = Object.create(null);
    this.requests = Object.create(null);
    this.sockets = Object.create(null);

    this.on('free', (socket, options) => {
      // TODO
    });
  }

  /**
   *
   * @param {*} req
   * @param {*} options
   * @param {number} port legacy; The port the request is made to
   * @param {string} localAddress legacy; The local address the request is made on
   */
  // eslint-disable-next-line max-params
  addRequest(req, options, port, localAddress) {
    // TODO
    // 'port' and 'localAddress' are apart of the legacy API
    if (typeof options === 'string') {
      // eslint-disable-next-line no-param-reassign
      options = {
        host: options,
        port,
        localAddress
      };
    }

    const opts = { ...this.options, ...options };
    if (opts.socketPath) {
      opts.path = opts.socketPath;
    }

    if (!opts.servername) {
      opts.servername = calculateServerName(opts, req);
    }
  }

  /**
   * Produces a socket/stream to be used for HTTP requests.
   *
   * @param {*} options
   * @param {(err, stream) => void} callback
   */
  createConnection(options, callback = null) {}

  /**
   * Called when socket is detached from a request and could be persisted by the Agent.
   *
   * @param {*} socket
   *
   * @returns {boolean} If falsy, the socket will be destroyed instead of persisting it
   */
  keepSocketAlive(socket) {
    // set the socket to keep alive with timeout
    return true;
  }

  /**
   * Called when socket is attached to request after being persisted because of the keep-alive options.
   *
   * @param {*} socket
   * @param {*} request
   */
  reuseSocket(socket, request) {
    // use the socket for this request
  }

  /**
   * Destroy any sockets that are currently in use by the agent.
   */
  destroy() {
    // destroy the socket
  }

  /**
   * Get a unique name for a set of request options, to determine whether a connection can be reused.
   *
   * @param {{host: string, port: number, localAddress: string, family: number}} options
   */
  getName(options) {}
}

const globalAgent = new Agent();

function calculateServerName(options, req) {
  let servername = options.host;
  const hostHeader = req.getHeader('host');
  if (hostHeader) {
    // abc => abc
    // abc:123 => abc
    // [::1] => ::1
    // [::1]:123 => ::1
    if (hostHeader.startsWith('[')) {
      const index = hostHeader.indexOf(']');
      if (index === -1) {
        // Leading '[', but no ']'. Need to do something...
        servername = hostHeader;
      } else {
        servername = hostHeader.substr(1, index - 1);
      }
    } else {
      servername = hostHeader.split(':', 1)[0];
    }
  }
  return servername;
}

module.exports = {
  Agent,
  globalAgent
};
