const events = require('internal/cauldron/platform/spigot/events');
const { properlyTypeArray } = require('util');

const { Bukkit } = require('bukkit');
const { GenericCommandHelpTopic } = require('bukkit/help');
const { CommandSender } = require('bukkit/command');

// this file makes me suicidal
const CONSOLE_SENDER_ID = 'console';

// setup bukkit for accessibility
const bcmField = Bukkit.getServer().getClass().getDeclaredField('commandMap');
bcmField.setAccessible(true);
const commandMap = bcmField.get(Bukkit.getServer());
const BukkitCommand = Java.extend(
  require('bukkit/command/defaults/BukkitCommand')
);

const commandState = Object.create(null);

function getSenderId(sender) {
  if (sender instanceof Java.type('org.bukkit.entity.Player')) {
    return sender.getUniqueId().toString();
  } else {
    return CONSOLE_SENDER_ID;
  }
}

function createVanillaArgs(sender, label, args) {
  return { sender, label, args };
}

function createHookArgs(useState, nextInput, isServer) {
  return { useState, nextInput, isServer };
}

const registeredCommands = Object.create(null);

const CommandRestriction = {
  NONE: 'none',
  CONSOLE_ONLY: 'console',
  PLAYER_ONLY: 'player',
};

events.on('tabcomplete', (event) => {
  const buffer = event
    .getBuffer()
    .substr(1)
    .split(' ')
    .filter((s) => s.length > 0);
  const commandName = buffer[0];
  let command = registeredCommands[commandName];
  let i = 1;
  if (!command) {
    return;
  }
  while (i < buffer.length) {
    const subcommand = command.subcommands[buffer[i++]];
    if (subcommand) {
      command = subcommand;
    } else {
      break;
    }
  }
  const args = properlyTypeArray(buffer.slice(i - 1));
  if (!command) return;
  try {
    const tabComplete = command.tabComplete(event.getSender(), ...args);
    const completions = tabComplete
      ? tabComplete.map((l) => l.toString())
      : Object.keys(command.subcommands || Object.create(null));
    event.setCompletions(completions);
  } catch (err) {
    event.setCompletions([err.message]);
  }
});

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
  constructor(
    name,
    {
      description,
      usage,
      aliases,
      permission,
      execute,
      restriction,
      tabComplete,
      help,
    }
  ) {
    this.name = name;
    this.execute = execute;
    this.executor = (sender, label, args) =>
      this._createCommandExecutor(sender, label, args, execute);
    this.description = description;
    this.usage = usage || '/<command>';
    this.aliases = aliases || [];
    this.permission = permission;
    this.restriction = restriction || CommandRestriction.NONE;
    this.subcommands = Object.create(null);
    this.depth = 0;
    this.parent = null;
    this.hasBeenRegistered = false;
    if (typeof tabComplete === 'function') {
      this.tabComplete = tabComplete;
    } else {
      this.tabComplete = () => tabComplete;
    }
    if (typeof help === 'function') {
      this.help = help;
    } else {
      this.help = () => help || description;
    }
  }

  /**
   * Registers a command within Spigot
   *
   * @returns SpigotCommand
   */
  register() {
    if (!this.parent && !this.hasBeenRegistered) {
      this.$$bukkitCommand = new BukkitCommand(this.name, {
        execute: this.executor,
      });
      this.$$bukkitCommand.setDescription(this.description);
      this.$$bukkitCommand.setUsage(this.usage);
      this.$$bukkitCommand.setAliases(this.aliases);
      registeredCommands[this.name] = this;
      this.aliases.forEach((alias) => (registeredCommands[alias] = this));
      commandMap.register(this.name, this.$$bukkitCommand);
      const helpTopic = new GenericCommandHelpTopic(this.$$bukkitCommand);
      Bukkit.getHelpMap().addTopic(helpTopic);
      console.debug(`Registered command ${this.name}`);
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
      console.debug(`Unregistered command ${this.name}`);
      for (const label in this.subcommands) {
        this.subcommands[label].unregister();
      }
    } else {
      delete this.parent.subcommands[this.name];
    }
  }

  getTabComplete() {
    // I'd like to use reduce but Graal doesn't support spreading so
    return Object.keys(this.subcommands);
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
      const aliases = this.subcommands[name].aliases;
      if (
        name.toLowerCase() === args[this.depth].toLowerCase() ||
        aliases.indexOf(args[this.depth].toLowerCase()) > -1
      ) {
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

  _buildHelp(helpList = []) {
    helpList.push(`/${this.name}: ${this.description}`);
    Object.values(this.subcommands).forEach((subcommand) =>
      subcommand._buildHelp(helpList)
    );
  }

  /**
   * Builds a command executor for the Spigot command
   *
   * @param {CommandSender} sender
   * @param {String} label
   * @param {String[]} args
   */
  _createCommandExecutor(sender, label, args) {
    try {
      const command = this._findSubcommandWithArgs(args);
      const { permission } = this;
      const { execute } = command;
      const senderId = getSenderId(sender);
      const isServer = senderId === CONSOLE_SENDER_ID;
      if (isServer && this.restriction === CommandRestriction.PLAYER_ONLY) {
        sender.sendMessage('\xA7cThis command can only be ran by a player');
        return true;
      } else if (
        !isServer &&
        this.restriction === CommandRestriction.CONSOLE_ONLY
      ) {
        sender.sendMessage('\xA7cThis command can only be ran by the console');
        return true;
      }

      // check if sender has permission
      if (permission && !sender.hasPermission(permission)) {
        sender.sendMessage("\xA7cYou don't have permission to do that!");
        return true;
      }

      // gets the current state of user
      const state = commandState[senderId];
      // sets the current state of the user
      const setState = (partialState) =>
        (commandState[senderId] = { ...state, ...partialState });
      // clears the current state of the user
      const clearState = () => delete commandState[senderId];
      // you can use `useState` to persist data through commands
      const useState = [state, setState, clearState];

      // this will wait for the players next command input
      // I could use something like packet pausing, but icba
      const nextInput = () =>
        new Promise((resolve) => {
          events.once('playerchat', (event) => {
            const playerId = getSenderId(event.getPlayer());
            if (playerId === senderId) {
              const message = event.getMessage();
              resolve(message);
            }
          });
        });

      const hookArgs = createHookArgs(useState, nextInput, isServer);

      // TODO: have these args mapped to the "usage" property so you can have
      // /<command> <x> <y> <z>
      // with args = { x, y, z } and value validation
      // maybe have /<command> <x:int> <y:int> <z:int>?
      const vanillaArgs = createVanillaArgs(
        sender,
        label,
        properlyTypeArray([...args].slice(command.depth))
      );

      let result;
      if (args[args.length - 1] === '?' || args[args.length - 1] === 'help') {
        result = this.help(this);
      } else if (execute.then) {
        result = execute
          .then({ ...hookArgs, ...vanillaArgs })
          .catch(console.trace);
      } else if (typeof execute === 'function') {
        result = execute({ ...hookArgs, ...vanillaArgs });
      } else {
        result = execute;
      }
      if (result !== undefined) {
        // check if it inherits from BaseComponent
        if (Array.isArray(result)) {
          if (result.length > 0) {
            if (result[0].duplicate && sender.spigot) {
              sender.spigot().sendMessage(...result);
            } else {
              sender.sendMessage(result);
            }
          }
        } else {
          if (result.duplicate) {
            sender.spigot().sendMessage(result);
          } else if (typeof result === 'string') {
            sender.sendMessage(result);
          } else {
            // do nothing
            sender.sendMessage(result.toString());
          }
        }
      }
      return !!result;
    } catch (err) {
      sender.sendMessage(err.toString());
      console.trace(err);
      return true;
    }
  }

  /**
   * Creates a Bukkit command
   *
   * @param {String} name The name of the command
   * @param {{description: String, usage: String, aliases: String[], execute: ({sender, label: String, args: String[], useState: [], nextInput: Promise<String>}) => any}} args
   * @returns {CauldronCommand} The command registered
   */
  static registerCommand(name, args) {
    if (registeredCommands[name]) {
      console.debug(`Prior command ${name} already existed. Overwriting.`);
      delete registeredCommands[name];
    }
    const command = new CauldronCommand(name, args);
    command.register();
    return command;
  }
  /**
   * Unregisters a command from Cauldron
   *
   * @param {CauldronCommand} command
   */
  static unregisterCommand(command) {
    command.unregister();
  }
  /**
   * Clears all registered Cauldron commands
   */
  static clearCommands() {
    for (const label in registeredCommands) {
      const command = registeredCommands[label];
      command.unregister();
      delete registeredCommands[label];
    }
  }

  static fromPath(path) {
    const namespaces = path.split('.');
    let command = registeredCommands[namespaces[0]];
    for (let i = 1; i < namespaces.length; ++i) {
      if (!command) continue;
      const child = command.subcommands[namespaces[i]];
      if (!child) return command;
      command = child;
    }
    return command;
  }

  static throwIncorrectUsage(usage) {
    throw new Error(`Incorrect usage: ${usage}`);
  }
}

CauldronCommand.CommandRestriction = CommandRestriction;

class ArgValidator {
  constructor(fn) {
    this.fn = fn;
  }

  validate(value) {
    return this.fn(value);
  }

  static boolean() {
    return new ArgValidator(
      (value) => value === undefined || value === 'true' || value === 'false'
    );
  }

  static number(from, to) {
    return new ArgValidator((value) => {
      const num = parseInt(value);
      return !isNaN(num) && num >= from && num <= to;
    });
  }

  static any(options) {
    return new ArgValidator((value) => options.indexOf(value) > -1);
  }
}
CauldronCommand.ArgValidator = ArgValidator;

module.exports = CauldronCommand;
