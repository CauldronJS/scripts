const isIP = ip => false;
const isIPv4 = ip => false;
const isIPv6 = ip => false;

/**
 *
 * @param {String} headers
 */
const parseHeadersCollection = headers => {
  const collection = Object.create(null);
  const headerLines = headers.split(/(\r)?\n/g);
  for (const line of headerLines) {
    const [name, value] = line.split(':', 2);
    collection[name] = value;
  }

  return collection;
};

module.exports = {
  isIP,
  isIPv4,
  isIPv6,
  parseHeadersCollection
};
