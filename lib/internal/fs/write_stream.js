const constants = require('internal/fs/constants');

class WriteStream {
  constructor(path, options) {
    this.path = path;
    this.options = options;
  }

  close() {}

  open(descriptor) {}
}

const DEFAULT_WRITE_STREAM_OPTIONS = {
  flags: 'w',
  encoding: 'utf8',
  fd: null,
  mode: constants.F_OK,
  autoClose: true
};

const createWriteStream = (path, options) => {
  return new WriteStream(path, {
    ...DEFAULT_WRITE_STREAM_OPTIONS,
    ...options
  });
};

module.exports = {
  WriteStream,
  createWriteStream
};
