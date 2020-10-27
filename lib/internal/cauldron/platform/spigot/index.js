const { Module } = require('module');
const Command = require('internal/cauldron/platform/spigot/command');
const {
  getPlugin,
  NAMESPACE_KEY,
} = require('internal/cauldron/platform/spigot/utils');

const { registerCommand, unregisterCommand, clearCommands } = Command;

function reload(sender) {
  sender.sendMessage('Reloading Cauldron...');
  clearCommands();
  Module.$$resetContext(true);
  Module.runMain();
  sender.sendMessage('Reloaded Cauldron');
}

function Cauldron() {
  registerCommand('reloadjs', {
    description: 'Reloads the Cauldron instance',
    aliases: ['rjs', 'jsreload'],
    permission: 'cauldron.js.reload',
    execute({ sender }) {
      reload(sender);
    },
  });
}

Cauldron.Command = Command;
Cauldron.registerCommand = registerCommand;
Cauldron.unregisterCommand = unregisterCommand;
Cauldron.clearCommands = clearCommands;
Cauldron.getPlugin = getPlugin;
Cauldron.NAMESPACE_KEY = NAMESPACE_KEY;
Cauldron.events = require('internal/cauldron/platform/spigot/events');
Cauldron.reload = reload;

module.exports = Cauldron;
