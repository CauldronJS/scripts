// adds support for TypeScript generated definition files
module.exports = {
  test(filename) {
    return /\.d\.js$/.test(filename);
  },
  process(src, filename, config, options) {
    return src;
  },
};
