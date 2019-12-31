const { Module } = require('module');

const Command = require('internal/cauldron/platform/spigot/command');
const {
  getPlugin,
  NAMESPACE_KEY
} = require('internal/cauldron/platform/spigot/utils');

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
Cauldron.events = require('internal/cauldron/platform/spigot/events');

module.exports = Cauldron;
