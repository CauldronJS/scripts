const parseHTTPHeaders = content => {
  if (typeof content === 'string') {
    content = content.split('\n');
  }
  const headerMap = {};
  headerMap.method = content[0].split('/')[0].trim();
  // starting at 1 because 0 should be the method type
  for (let i = 1; i < content.length; ++i) {
    const line = content[i];
    const name = line.split(': ')[0];
    const value = line.substr(name.length + 2);
    headerMap[name] = value;
  }

  return headerMap;
};

module.exports = {
  parseHTTPHeaders
};
