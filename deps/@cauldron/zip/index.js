import { ZipFile, ZipInputStream } from 'java/util/zip';
import {
  BufferedInputStream,
  FileInputStream,
  FileOutputStream
} from 'java/io';
import { codes as errors } from 'errors';
import path from 'path';

function zip(...filenames) {
  throw new errors.ERR_METHOD_NOT_IMPLEMENTED('zip');
}

function zipSync(...filenames) {}

function unzip(filename, shouldWriteToDisk) {
  // read the file and return an iterator that reads over
  // the entries async
  throw new errors.ERR_METHOD_NOT_IMPLEMENTED('unzip');
}

function unpackEntry(entry, location) {
  // unpack the entry and save it to disk
}

// TODO: determine what we should return as

function unzipSync(filename) {
  const dirname = path.dirname(filename);
  const zipFile = new ZipFile(filename);
  const entries = zipFile.entries();
  const iterable = function*() {
    while (entries.hasMoreElements()) {
      const zipEntry = entries.nextElement();
      yield unpackEntry(dirname, zipEntry, zipFile.getInputStream(zipEntry));
    }
  };
  return {
    [Symbol.iterator]: iterable,
    comment: zipFile.getComment(),
    name: zipFile.getName(),
    size: zipFile.size(),
    close: zipFile.close,
    getFile: zipFile.getEntry
  };
}

export default {
  zip,
  zipSync,
  unzip,
  unzipSync
};
