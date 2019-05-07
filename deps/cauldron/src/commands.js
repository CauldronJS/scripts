import { playerListener } from './events';

// this file makes me suicidal
const CONSOLE_SENDER_ID = 'console';

// setup bukkit for accessibility
const bcmField = Bukkit.getServer()
  .getClass()
  .getDeclaredField('commandMap');
bcmField.setAccessible(true);
const commandMap = bcmField.get(Bukkit.getServer());
const BukkitCommand = Java.extend(
  require('@java/org.bukkit.command.defaults.BukkitCommand')
);

const commandState = Object.create(null);
function getSenderId(sender) {
  if (sender instanceof Java.type('org.bukkit.entity.Player')) {
    return sender.getUniqueId().toString();
  } else {
    return CONSOLE_SENDER_ID;
  }
}

const registeredCommands = Object.create(null);

/**
 * The wrapper class for all commands registered in Cauldron. These
 * act differently from regular commands and can contain subcommands.
 * A brief explanation of this is just a subarg within the command. If
 * we want to create a time command, it'd be structured as such:
 * { name: 'time' }
 * But if we want to be able to specify time of day, we can create a
 * command and add it as a subcommand to the time command.
 *
 * const TimeCommand = () => (
 *   <Command name="time" ...>
 *     <Command name="set" .../>
 *   </Command>
 * );
 *
 * This will create an executor that will first iterate through all
 * subcommands to check if the name of the command matches the passed
 * arg, and then execute that subcommand as opposed to the overarching
 * command.
 *
 * What will execute in the 'set' command: /time set 0800
 * What will execute in the parent command: /time world my_world
 */
class CauldronCommand {
  constructor(name, { description, usage, aliases, permission, execute }) {
    this.name = name;
    this.execute = execute;
    this.executor = (sender, label, args) =>
      this._createCommandExecutor(sender, label, args, execute);
    this.description = description;
    this.usage = usage;
    this.aliases = aliases;
    this.permission = permission;
    this.subcommands = Object.create(null);
    this.depth = 0;
    this.parent = null;
    this.hasBeenRegistered = false;
  }

  /**
   * Registers a command within Spigot
   *
   * @returns SpigotCommand
   */
  register() {
    if (!this.parent) {
      this.$$bukkitCommand = new BukkitCommand(this.name, {
        execute: this.executor
      });
      this.$$bukkitCommand.setDescription(this.description);
      this.$$bukkitCommand.setUsage(this.usage);
      this.$$bukkitCommand.setAliases(this.aliases);
      registeredCommands[this.name] = this;
      commandMap.register(this.name, this.$$bukkitCommand);
      console.log(`Registered command ${this.name}`);
    } else {
      this.parent.subcommands[this.name] = this;
    }
    this.hasBeenRegistered = true;
  }

  /**
   * Unregisters a command within Spigot or the parent
   */
  unregister() {
    if (!this.parent) {
      this.$$bukkitCommand.unregister(commandMap);
      console.log(`Unregistered command ${this.name}`);
    } else {
      delete this.parent.subcommands[this.name];
    }
  }

  /**
   * Adds a subcommand to this object
   *
   * @param {CauldronCommand} cauldronCommand
   */
  addSubcommand(cauldronCommand) {
    cauldronCommand.parent = this;
    cauldronCommand.depth = this.depth + 1;
    return cauldronCommand;
  }

  /**
   * Finds the subcommand that matches the args passed. If none
   * is found, it returns itself
   *
   * @param {String[]} args The command args
   */
  _findSubcommandWithArgs(args) {
    for (const name in this.subcommands) {
      if (!name || !args[this.depth]) {
        return this;
      }
      if (name.toLowerCase() === args[this.depth].toLowerCase()) {
        return this.subcommands[name]._findSubcommandWithArgs(args);
      }
    }
    // if it doesn't go any deeper, return self
    return this;
  }

  /**
   * Builds the permission string for this command,
   * prepending parent permissions if set
   *
   * @returns {String} The resulting permission
   */
  _buildPermission() {
    return this.parent
      ? `${this.parent._buildPermission()}.${this.permission}`
      : this.permission;
  }

  /**
   * Builds a command executor for the Spigot command
   *
   * @param {*} sender
   * @param {String} label
   * @param {String[]} args
   */
  _createCommandExecutor(sender, label, args) {
    try {
      const command = this._findSubcommandWithArgs(args);
      const permission = command._buildPermission();
      const { execute } = command;
      const senderId = getSenderId(sender);

      // check if sender has permission
      if (senderId !== CONSOLE_SENDER_ID && !sender.hasPermission(permission)) {
        sender.sendMessage("\xA7cYou don't have permission to do that!");
        return true;
      }

      // gets the current state of user
      const state = commandState[senderId];
      // sets the current state of the user
      const setState = partialState =>
        (commandState[senderId] = { ...state, ...partialState });
      // clears the current state of the user
      const clearState = () => delete commandState[senderId];
      // you can use `useState` to persist data through commands
      const useState = [state, setState, clearState];

      // this will wait for the players next command input
      // I could use something like packet pausing, but icba
      const nextInput = () =>
        new Promise(resolve => {
          playerListener.once('chat', event => {
            const playerId = getSenderId(event.getPlayer());
            if (playerId === senderId) {
              const message = event.getMessage();
              resolve(message);
            }
          });
        });
      });
      const isServer = senderId === CONSOLE_SENDER_ID;

      const result = execute({
        sender,
        label,
        useState,
        nextInput,
        isServer,
        args: [...args].splice(command.depth)
      });
      if (result !== undefined) {
        sender.sendMessage(result);
      }
      return !!result;
    } catch (err) {
      sender.sendMessage(`\xA7c${err.toString()}`);
      return true;
    }
  }
}

function getCommandByPath(path) {
  const segments = path.split('.');
  let command = registeredCommands[segments[0]];
  for (let i = 1; i < segments.length; ++i) {
    const item = segments[i];
    const sub = command.subcommands[item];
    if (sub) {
      command = sub;
    } else {
      return command;
    }
  }
  return command;
}

export const Command = props => {
  const { name, children, __parent } = props;
  const cauldronCommand = new CauldronCommand(name, props);

  // register a new command
  if (!__parent || !__parent.props.execute) {
    cauldronCommand.register();
  } else {
    //
    let nextParent = __parent;
    let path = '';
    // recursively iterate through until we find the topmost parent
    while (nextParent) {
      path = `${nextParent.props.name}.${path}`;
      nextParent = nextParent.props.__parent;
    }
    const parentCommand = getCommandByPath(path);
    parentCommand.addSubcommand(cauldronCommand).register();
  }
  return children;
};

Command.defaultProps = {
  description: 'A Cauldron command',
  usage: '/<command>',
  aliases: []
};

/**
 * Creates a Bukkit command
 *
 * @param {String} name The name of the command
 * @param {{description: String, usage: String, aliases: String[], execute: ({sender, label: String, args: String[], useState: [], nextInput: Promise<String>}) => any}} config
 * @returns
 */
export function createCommand(name, args) {
  const command = new CauldronCommand(name, args);
  command.register();
  return command;
}

export function unregisterCommand(command) {
  command.unregister();
}
