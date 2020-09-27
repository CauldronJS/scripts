// prettifier util

function pretty(content, color = true, depth = 0) {
  if (depth === 2) {
    // cut off at 5
    return `\xA7${content}`;
  }
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
      return `\xA7dfunction${content.name ? ` ${content.name}` : ''} ()...`;
    case 'object':
    case 'symbol':
      if (content === null) {
        return '\xA77null';
      }
      let result;
      if (Array.isArray(content)) {
        result = content.map((item) => pretty(item, color, depth + 1));
      } else {
        if (content[Symbol.iterator]) {
          result = [...content].map((item) => pretty(item, color, depth + 1));
        } else {
          const fieldNames = Object.getOwnPropertyNames(content);
          result = [];
          for (let field of fieldNames) {
            // manually add the field and value to the result
            result.push({
              [field]: pretty(content[field], color, depth + 1),
            });
          }
        }
      }
      return JSON.stringify(result);
    default:
      return '\xA77undefined';
  }
}

module.exports = pretty;
