// Before anyone gives me shit, I could put this in the core lib,
// but I want that to be usable through any Graal project, not just
// Spigot/Minecraft. Therefore anything that pertains to either of
// those two will be pulled out and put in the @cauldron/core package.

import Command, { registerCommand, unregisterCommand } from './command';
import { getPlugin } from './utils';
import * as events from './events';

function Cauldron() {}

Cauldron.Command = Command;
Cauldron.registerCommand = registerCommand;
Cauldron.unregisterCommand = unregisterCommand;
Cauldron.getPlugin = getPlugin;
Cauldron.events = events;

module.exports = Cauldron;
