/**
 * HTTP library Agent
 *
 * @file    \lib\internal\http\agent.js
 * @author  Justin Cox <https://conji.me>
 */

const { DEFAULT_AGENT_OPTIONS } = require('internal/http/constants');

class Agent {
  constructor(options = DEFAULT_AGENT_OPTIONS) {
    this.keepAlive = options.keepAlive;
    this.keepAliveMsecs = options.keepAliveMsecs;
    this.maxSockets = options.maxSockets;
    this.maxFreeSockets = options.maxFreeSockets;
    this.timeout = options.timeout;

    this.freeSockets = Object.create(null);
    this.requests = Object.create(null);
    this.sockets = Object.create(null);
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

module.exports = Agent;
