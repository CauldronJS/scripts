const EventEmitter = require('events');
const { methods } = require('internal/http/constants');
const { parseHeadersCollection } = require('internal/net/utils');

const CHUNK_CEILING = 1024;

function parseRequestData(data) {
  const method = data.split(' ', 1)[0].toUpperCase();
  if (!methods[method]) throw new Error(`Invalid method: ${method}`);
}

/**
 * A thin wrapper around data that is to be sent to an HTTP server. By the
 * time this object has been created, it's already been queued in the server's
 *
 */
class ClientRequest extends EventEmitter {
  constructor(data, socket) {
    super();
    this.socket = socket;
    this.aborted = false;
    this.maxHeaderCount = 128;

    const message = parseRequestData(data);
    this.headers = Object.create(null);
  }
}

module.exports = ClientRequest;
