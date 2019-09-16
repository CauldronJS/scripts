const Stream = (module.exports = require('internal/streams2/legacy'));
Stream.Readable = require('internal/streams2/readable');
Stream.Writable = require('internal/streams2/writable');
Stream.Transform = require('internal/streams2/transform');
Stream.Duplex = require('internal/streams2/duplex');
Stream.Passthrough = require('internal/streams2/passthrough');

Stream.Stream = Stream;
