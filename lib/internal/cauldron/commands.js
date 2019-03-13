const Alias = require('internal/cauldron/alias');
const { getPlugin } = require('internal/cauldron/utils');

// setup bukkit for accessibility
const bcmField = Bukkit.getServer().getClass().getDeclaredField('commandMap');
bcmField.setAccessible(true);
const commandMap = bcmField.get(Bukkit.getServer());
const BukkitCommand = Java.extend(require('@java/org.bukkit.command.defaults.BukkitCommand'));

function createCommand(name, { description = 'A Cauldron Command', usage = '/<command>', aliases = [], execute, permission }) {
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

createCommand('js', {
  description: 'Executes a JS snippet',
  usage: '/<command> [snippet]',
  permission: 'cauldron.js',
  execute({ sender, args }) {
    const patched = Alias.patchWithAlias(sender, args.join('\n'));
    let snippet = __cauldron__.evalScript(patched.compiled, 'repl.js');
    const result = snippet.call(getPlugin(), ...patched.args);
    sender.sendMessage(`\xA77=> \xA72${result}`);
    return true;
  }
});

module.exports = createCommand;