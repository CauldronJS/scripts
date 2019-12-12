// handles creation of Java objects for reading and writing to the filesystem. This
// file is also in charge of security and safety regarding the filesystem.

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

module.exports = {
  getFileReadBuffer,
  getFileWriteBuffer
};
