module.exports = {
  test(filename) {
    return /\.json$/i.test(filename);
  },
  process(src, filename, config, options) {
    return `module.exports = ${src}`;
  }
};
