/* eslint-disable */
import { createCommand, unregisterCommand, Command } from './commands';
import Alias from './alias';
import { getPlugin } from './utils';
import { useStore } from './store';
import * as events from './events';
import pretty from './pretty';

function Cauldron() {
  if (!global.__cauldron__) return;
}

Cauldron.createCommand = createCommand;
Cauldron.unregisterCommand = unregisterCommand;
Cauldron.Command = Command;
Cauldron.getPlugin = getPlugin;
Cauldron.useStore = useStore;
Cauldron.events = events;
Cauldron.pretty = pretty;
Cauldron.alias = Alias._create;

module.exports = Cauldron;
