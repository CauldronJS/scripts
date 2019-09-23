function utf8Write(str, index, length) {}

function utf8Slice() {}

function patchBufferPrototype(proto) {
  // TODO
  proto.utf8Write = utf8Write;
  proto.utf8Slice = utf8Slice;
}

module.exports = {
  install: patchBufferPrototype
};
