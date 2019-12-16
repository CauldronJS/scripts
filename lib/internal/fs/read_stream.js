const constants = require('internal/fs/constants');

class ReadStream {
  constructor(path, options) {
    this.path = path;
    this.bytesRead = 0;
    this.position = 0;
    this.end = -1;
    this.options = options;
    if (this.options.start) {
      this.position = this.options.start;
    }
    if (this.options.end && this.options.end > this.position) {
      this.end = this.options.end;
    }
  }

  close() {}

  open(descriptor) {}
}

const DEFAULT_READ_STREAM_OPTIONS = {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: constants.F_OK,
  autoClose: true
};

const createReadStream = (path, options) => {
  return new ReadStream(path, {
    ...DEFAULT_READ_STREAM_OPTIONS,
    ...options
  });
};

module.exports = {
  ReadStream,
  createReadStream
};
