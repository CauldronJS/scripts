const EventEmitter = require('events');
const Queue = require('internal/queue');

const run = internalBinding('Runnable').create;
const ByteArray = Java.type('byte[]');

const TICK_LENGTH = 20;

/**
 * Reads and writes from a stream type asynchronously, returning whatever
 * bytes were read within the frame. It does not store prior read or written
 * data. It only writes in byte arrays.
 */
class AsyncStream extends EventEmitter {
  constructor(stream, maxBytes = 1024) {
    super();
    this._stream = stream;
    this.maxBytes = maxBytes;
    this.isReadable = !!stream.read;
    this.isWritable = !!stream.write;
    this._watcherId = -1;
    this._writeQueue = new Queue();
    this._bytesRead = 0;
    this._bytesWritten = 0;
  }

  start(skipCheck = () => false) {
    if (this._watcherId !== -1) {
      throw new Error(
        'Cannot start an async stream that is already running. Use "stop" to reset'
      );
    }

    this._watcherId = $$cauldron$$.scheduleRepeatingTask(
      run(() => {
        try {
          if (skipCheck(this._stream)) {
            return;
          }
          if (this.canRead()) {
            // TODO: apparently I suck at reading so switch to BufferedReader for this
            const bytesToProcess =
              this._stream.available() > this.maxBytes
                ? this.maxBytes
                : this._stream.available();
            const data = new ByteArray(bytesToProcess);
            this._bytesRead += this._stream.read(
              data,
              this._bytesRead,
              bytesToProcess
            );
            this.emit('data', Uint8Array.from(data));
          }
          if (this.canWrite()) {
            // only pop from the queue once
            if (this._writeQueue.size() === 0) return;
            const next = this._writeQueue.pop();
            this._stream.write(next);
            this.emit('write', this._bytesWritten);
          }
        } catch (err) {
          console.error(err);
        }
      }),
      TICK_LENGTH,
      TICK_LENGTH
    );
    this.emit('start');
  }

  stop(shouldClose) {
    if (this._watcherId === -1) return;
    $$cauldron$$.cancelTask(this._watcherId);
    this._writeQueue.clear();
    this._bytesWritten = 0;
    this._bytesRead = 0;
    this._watcherId = -1;
    if (shouldClose && this._stream.close) {
      this._stream.close();
    }
    delete this._stream;
    this.emit('stop');
  }

  canRead() {
    return (
      this.isReadable && this._stream.available && this._stream.available() > 0
    );
  }

  canWrite() {
    return this.isWritable;
  }

  write(data) {
    const limit = Math.ceil(data.length / this.maxBytes);
    for (let i = 0; i < limit; ++i) {
      const end = i === limit - 1 ? data.length - this.maxBytes : this.maxBytes;
      const subdata = data.slice(i * this.maxBytes, end);
      this._writeQueue.push(subdata);
      this._bytesWritten += subdata.length;
    }
  }
}

module.exports = AsyncStream;
