// prettifier util

function pretty(content, color = true) {
  switch (typeof content) {
    case 'boolean':
      return `\xA7${content ? 'atrue' : 'cfalse'}`;
    case 'string':
      return content.startsWith('"')
        ? content.substr(1, content.length - 2)
        : content;
    case 'bigint':
    case 'number':
      return `\xA79${content}`;
    case 'function':
      return `\xA7dfunction ${content.name} ()...`;
    case 'object':
    case 'symbol':
      if (content === null) {
        return '\xA77null';
      }
      let result;
      if (Array.isArray(content)) {
        result = content.map(item => pretty(item, color));
      } else {
        result = [...content].map(item => pretty(item, color));
      }
      return JSON.stringify(result, ' ', '\t').replace(/\t/g, '  ');
    default:
      return '\xA77undefined';
  }
}

module.exports = pretty;
