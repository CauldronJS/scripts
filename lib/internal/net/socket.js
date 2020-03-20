const EventEmitter = require('events');
const { BufferedReader, InputStreamReader } = require('java/io');

const DEFAULT_CONFIG = {
  fd: null,
  allowHalfOpen: false,
  readable: false,
  writable: false
};

class Socket extends EventEmitter {
  constructor(options = DEFAULT_CONFIG) {
    super();
    this._options = options;
    this._jsocket = options.socket;
  }

  address() {
    //
  }

  connect(...args) {
    //
  }

  destroy(exception) {
    //
  }

  end(data, encoding, callback) {
    this._jsocket.shutdownOutput();
  }

  pause() {
    //
  }

  ref() {
    //
  }

  resume() {
    //
  }

  setEncoding(encoding) {
    //
  }

  setKeepAlive(enable, initialDelay) {
    //
  }

  setNoDelay(noDelay) {
    //
  }

  setTimeout(timeout, callback) {
    //
  }

  unref() {
    //
  }

  write(data, encoding, callback) {
    if (!this._jsocket) return;
    const stream = this._jsocket.getOutputStream();
    switch (typeof data) {
      case 'string':
        stream.write(Uint8Array.from(data));
        break;
      case 'boolean':
        stream.write(data ? 1 : 0);
        break;
      case 'number':
      case 'bigint':
        stream.write(data);
        break;
      case 'object':
        // eslint-disable-next-line no-case-declarations
        let typedArray;
        if ((typedArray = Uint8Array.from(data))) {
          stream.write(typedArray);
        } else if ((typedArray = Uint16Array.from(data))) {
          stream.write(typedArray);
        } else if ((typedArray = Uint32Array.from(data))) {
          stream.write(typedArray);
        } else {
          throw new Error('Invalid data: ' + data);
        }
        break;
      default:
        throw new Error('Invalid data: ' + data);
    }
    stream.flush();
    if (callback) {
      callback();
    }
  }
}

module.exports = Socket;
