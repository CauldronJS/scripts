function parseCertString(s) {
  const out = Object.create(null);
  for (const part of s.split('\n')) {
    const sepIndex = part.indexOf('=');
    if (sepIndex > 0) {
      const key = part.slice(0, sepIndex);
      const value = part.slice(sepIndex + 1);
      if (key in out) {
        if (!Array.isArray(out[key])) {
          out[key] = [out[key]];
        }
        out[key].push(value);
      } else {
        out[key] = value;
      }
    }
  }
  return out;
}

module.exports = {
  parseCertString,
};
