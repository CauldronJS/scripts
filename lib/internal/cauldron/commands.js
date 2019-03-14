// setup bukkit for accessibility
const bcmField = Bukkit.getServer().getClass().getDeclaredField('commandMap');
bcmField.setAccessible(true);
const commandMap = bcmField.get(Bukkit.getServer());
const BukkitCommand = Java.extend(require('@java/org.bukkit.command.defaults.BukkitCommand'));

function createCommand(name, { description = 'A Cauldron Command', usage = '/<command>', aliases = [], execute, permission }) {
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
          if (sender.hasPermission && !sender.hasPermission(permission) && !sender.isOp()) {
            throw new Error(`You don't have permission to use that`);
          }
        }
        const result = execute({ sender, label, args: [...args] });
        return result === false ? false : true;
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

function unregisterCommand(command) {
  if (!command.unregister) throw new Error('Cannot unregister non-command');
  return command.unregister(commandMap);
}

module.exports = {
  createCommand,
  unregisterCommand
}