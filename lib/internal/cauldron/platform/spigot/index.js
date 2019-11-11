const { Module } = require('module');
const vm = require('internal/cauldron/vm');

const Command = vm.requireForPlatform('command');
const events = vm.requireForPlatform('events');
const globals = vm.requireForPlatform('globals');
const { getPlugin, NAMESPACE_KEY } = vm.requireForPlatform('utils');
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
  const globalPolyfills = Object.getOwnPropertyDescriptors(globals);
  Object.defineProperties(global, globalPolyfills);
}

Cauldron.Command = Command;
Cauldron.registerCommand = registerCommand;
Cauldron.unregisterCommand = unregisterCommand;
Cauldron.clearCommands = clearCommands;
Cauldron.getPlugin = getPlugin;
Cauldron.NAMESPACE_KEY = NAMESPACE_KEY;
Cauldron.events = events;

module.exports = Cauldron;
