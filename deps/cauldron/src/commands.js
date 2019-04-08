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

/**
 * Creates a Bukkit command
 *
 * @param {String} name The name of the command
 * @param {{description: String, usage: String, aliases: String[], execute: ({sender, label: String, args: String[], useState: [], nextInput: Promise<String>}) => *}} config
 * @returns
 */
export function createCommand (name, {
  description = 'A Cauldron Command',
  usage = '/<command>',
  aliases = [],
  execute,
  permission }) {
  if (commandMap.getCommand(name)) {
    unregisterCommand(commandMap.getCommand(name));
  }
  const command = new BukkitCommand(name, {
    description,
    usage,
    aliases,
    execute: (sender, label, args) => {
      try {
        if (permission) {
          if (sender.hasPermission && !sender.hasPermission(permission) &&
              !sender.isOp()) {
            throw new Error(`You don't have permission to use that`);
          }
        }
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
        const result = execute({ sender, label, args: [...args], useState, nextInput });
        if (result !== undefined) sender.sendMessage(pretty(result));
        return !!result;
      } catch (err) {
        sender.sendMessage(`\xA7c${err.toString()}`);
        return true;
      }
    }
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
