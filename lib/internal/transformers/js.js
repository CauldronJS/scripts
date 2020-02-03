module.exports = {
  test(filename) {
    return /\.js$/gi.test(filename);
  },
  process(src, filename, config, options) {
    return src;
  }
};
