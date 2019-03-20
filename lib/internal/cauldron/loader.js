/* eslint-disable */
const { createCommand, unregisterCommand } = require('internal/cauldron/commands');
const Alias = require('internal/cauldron/alias');
const { getPlugin } = require('internal/cauldron/utils');

const alias = Alias._create;

function initialize() {
  if (!global.__cauldron__) return;
  createCommand('js', {
    description: 'Executes a JS snippet',
    usage: '/<command> [snippet]',
    permission: 'cauldron.js',
    execute({ sender, args }) {
      const patched = args.join('\n');
      let result = __cauldron__.evalScript(patched, 'repl.js');
      sender.sendMessage(`\xA77=> \xA72${result}`);
      return true;
    }
  });

  createCommand('cauldron', {
    description: 'Info about Cauldron',
    usage: '/<command> [info|reload|',
    permission: 'cauldron.info',
    execute({ sender, args }) {
      return true;
    }
  });
}

module.exports = {
  createCommand,
  unregisterCommand,
  getPlugin,
  alias,
  initialize
}