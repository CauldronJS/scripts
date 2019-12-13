const { ReadStream, createReadStream } = require('internal/fs/read_stream');
const { WriteStream, createWriteStream } = require('internal/fs/write_stream');
const constants = require('internal/fs/constants');
const Stats = require('internal/fs/stats');
const FSWatcher = require('internal/fs/watcher');

module.exports = {
  constants,
  ReadStream,
  WriteStream,
  FSWatcher,
  createReadStream,
  createWriteStream,
  Stats
};
