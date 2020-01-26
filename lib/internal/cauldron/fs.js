// handles creation of Java objects for reading and writing to the filesystem. This
// file is also in charge of security and safety regarding the filesystem.
const {
  BufferedWriter,
  OutputStreamWriter,
  FileOutputStream
} = require('java/io');

function doesContextHaveAccessTo(filename) {
  try {
    throw new Error();
  } catch (error) {
    // read the current stack trace of the error and see what's calling it
  }
}

const getFileReadBuffer = filename => {
  //
};

const getFileWriteBuffer = filename => {
  //
};

const writeStringToFile = (fd, string, position, encoding) => {
  const file = $$cauldron$$.getFile(fd);
  file.createNewFile();
  const fout = new BufferedWriter(
    new OutputStreamWriter(new FileOutputStream(file), encoding || 'UTF8')
  );

  fout.write(string);
  fout.flush();
  fout.close();
};

const writeBufferToFile = (fd, buffer, position, encoding) => {
  // TODO
};

module.exports = {
  getFileReadBuffer,
  getFileWriteBuffer,
  writeStringToFile,
  writeBufferToFile
};
