const { Location } = require('bukkit');

const usageRegex = /(?:\<((?:\.\.\.)*[a-z]+(?:\:[a-z]+)*)\>)|(?:\[(?:\.\.\.)*([a-z]+(?:\:[a-z]+)*)\])/gi;

class UsageArgument {
  /**
   *
   * @param {string} name
   * @param {'int'|'location'|'bool'|'double'|'string'} type
   * @param {boolean} isRequired
   * @param {boolean} isRest
   */
  constructor(name, type, isRequired, isRest) {
    this.name = name;
    this.type = type;
    this.isRequired = isRequired;
    this.isRest = isRest;
  }
}

class UsageParser {
  /**
   *
   * @param {UsageArgument[]} args
   */
  constructor(args) {
    this.args = args;
  }
}

// reads the entire input of the command and returns an array of the args
function parseArgsToCollection(input) {
  const result = [];
  let isReadingString = false,
    line = '',
    stringDenotation;
  for (let i = 0; i < input.length; ++i) {
    if (!isReadingString) {
      if ((input[i] === "'" || input[i] === '"') && input[i - 1] !== '\\') {
        isReadingString = true;
        stringDenotation = input[i];
      } else if (input[i] === ' ') {
        result.push(line);
        line = '';
      } else {
        line += input[i];
      }
    } else {
      if (input[i] === stringDenotation && input[i - 1] !== '\\') {
        isReadingString = false;
        result.push(line);
        line = '';
      } else {
        line += input[i];
      }
    }
  }
  return result;
}

exports.parseArgsToCollection = parseArgsToCollection;

/**
 *
 * @param {string} usage
 */
function buildUsageParser(usage) {
  // we expect the usage to be /<command> <required> [optional]
  const commandOrder = [];
  let usageArgs;
  while ((usageArgs = usageRegex.exec(usage)) !== null) {
    const [arg] = usageArgs;
    if (arg === '<command>') continue;
    const description = arg.substr(1, arg.length - 2);
    const isRequired = arg.startsWith('<');
    const isRest = description.startsWith('...');
    const [name, type = 'string'] = description.split(':');
    const usageArgument = new UsageArgument(name, type, isRequired, isRest);
    commandOrder.push(usageArgument);
  }
  return new UsageParser(commandOrder);
}

exports.buildUsageParser = buildUsageParser;

/**
 *
 * @param {string} value
 * @param {'int'|'location'|'bool'|'double'|'string'} type
 */
function argTransformer(value, type) {
  switch (type) {
    case 'int':
      return Math.round(parseInt(value));
    case 'location':
      const values = value.split(',');
      return new Location(
        values[3],
        parseInt(values[0]),
        parseInt(values[1]),
        parseInt(values[2])
      );
    case 'bool':
      return (
        value.toLowerCase() === 'true' ||
        value === '1' ||
        value.toLowerCase() === 'on'
      );
    case 'double':
      return parseFloat(value);
    case 'string':
    default:
      return value;
  }
}
