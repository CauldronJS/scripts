const { Module } = require('module');
const { platform } = require('internal/cauldron/vm');

const Command = platform('command');
const { getPlugin, NAMESPACE_KEY } = platform('utils');
const { registerCommand, unregisterCommand, clearCommands } = Command;

function Cauldron() {
  registerCommand('reloadjs', {
    description: 'Reloads the Cauldron instance',
    aliases: ['rjs', 'jsreload'],
    permission: 'cauldron.js.reload',
    execute() {
      clearCommands();
      Module.$$resetContext(true);
      Module.runMain();
    }
  });
}

Cauldron.Command = Command;
Cauldron.registerCommand = registerCommand;
Cauldron.unregisterCommand = unregisterCommand;
Cauldron.clearCommands = clearCommands;
Cauldron.getPlugin = getPlugin;
Cauldron.NAMESPACE_KEY = NAMESPACE_KEY;
Cauldron.events = platform('events');

module.exports = Cauldron;
