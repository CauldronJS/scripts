// handles creation of Java objects for reading and writing to the filesystem. This
// file is also in charge of security and safety regarding the filesystem.
const FileReader = Java.type('me.conji.cauldron.utils.FileReader');

const getFile = location => FileReader.getFile($$cauldron$$, location);

const writeStringToFile = (fd, content, position, encoding = 'UTF8') =>
  FileReader.write($$cauldron$$, fd, content, position, encoding);

// TODO: implement location reading
const read = location => FileReader.read($$cauldron$$, location);

module.exports = {
  getFile,
  writeStringToFile,
  read
};
