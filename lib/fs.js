const { ReadStream, createReadStream } = require('internal/fs/read_stream');
const { WriteStream, createWriteStream } = require('internal/fs/write_stream');
const constants = require('internal/fs/constants');
const Stats = require('internal/fs/stats');
const FSWatcher = require('internal/fs/watcher');
const promises = require('internal/fs/promises');

module.exports = {
  promises,
  constants,
  ReadStream,
  WriteStream,
  FSWatcher,
  createReadStream,
  createWriteStream,
  Stats
};
