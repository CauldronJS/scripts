import Rinse from '@cauldron/rinse';
import pretty from './pretty';
import { playerListener } from './events';

// setup bukkit for accessibility
const bcmField = Bukkit.getServer().getClass().getDeclaredField('commandMap');
bcmField.setAccessible(true);
const commandMap = bcmField.get(Bukkit.getServer());
const BukkitCommand = Java.extend(require('@java/org.bukkit.command.defaults.BukkitCommand'));

let commandState = Object.create(null);
function getSenderId (sender) {
  if (sender instanceof Java.type('org.bukkit.entity.Player')) {
    return sender.getUniqueId().toString();
  } else {
    return 'console';
  }
}

function createCommandExecutor (sender, label, args, execute) {
  try {
    const senderId = getSenderId(sender);
    let state = commandState[senderId];
    const setState = partialState => state = { ...state, ...partialState };
    const clearState = () => delete commandState[senderId];
    const useState = [state, setState, clearState];
    const nextInput = () => new Promise((resolve) => {
      playerListener.once('chat', event => {
        const playerId = getSenderId(event.getPlayer());
        if (playerId === senderId) {
          const message = event.getMessage();
          resolve(message);
        }
      })
    });
    const result = execute({
      sender,
      label,
      args: [...args],
      useState,
      nextInput
    });
    if (result !== undefined) sender.sendMessage(result);
    return !!result;
  } catch (err) {
    sender.sendMessage(`\xA7c${err.toString()}`);
    return true;
  }
}

const Command = props => {
  const {
    name,
    description,
    aliases,
    usage,
    permission,
    execute,
    children,
    __parent
  } = props;
  if (!__parent) {
    const command = new BukkitCommand(name, {
      execute: (sender, label, args) => createCommandExecutor(sender, label, args, execute)
    });
    command.setDecription(description);
    command.setUsage(usage);
    command.setAliases(aliases);
    command.setPermission(permission);
    commandMap.register(name, command);
    children();
    console.log(`Registered command ${name}`);
  }
};

Command.defaultProps = {
  description: 'A Cauldron command',
  usage: '/<command>',
  aliases: []
}

/**
 * Creates a Bukkit command
 *
 * @param {String} name The name of the command
 * @param {{description: String, usage: String, aliases: String[], execute: ({sender, label: String, args: String[], useState: [], nextInput: Promise<String>}) => *, map: Object}} config
 * @returns
 */
export function createCommand (name, {
  description = 'A Cauldron Command',
  usage = '/<command>',
  aliases = [],
  execute,
  permission,
  subcommands = Object.create(null) }) {
  if (commandMap.getCommand(name)) {
    unregisterCommand(commandMap.getCommand(name));
  }

  const command = new BukkitCommand(name, {
    execute: (sender, label, args) =>
      createCommandExecutor(sender, label, args, execute)
  });
  command.setDescription(description);
  command.setUsage(usage);
  command.setAliases(aliases);
  command.setPermission(permission);
  commandMap.register(name, command);
  console.log(`Registered command ${name}`);

  return command;
}

export function unregisterCommand (command) {
  if (!command.unregister) throw new Error('Cannot unregister non-command');
  return command.unregister(commandMap);
}
