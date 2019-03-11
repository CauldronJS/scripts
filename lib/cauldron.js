if (!global.__cauldron__) {
  return;
}

// setup bukkit for accessibility
const bcmField = Bukkit.getServer().getClass().getDeclaredField('commandMap');
bcmField.setAccessible(true);
const commandMap = bcmField.get(Bukkit.getServer());
const BukkitCommand = Java.extend(require('@java/org.bukkit.command.defaults.BukkitCommand'));

function getPlugin(name) {
  return Bukkit.getPluginManager().getPlugin(name || 'Cauldron');
}

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

const replWrapper = [
  '(function (sender, server) { ',
  '\n});'
]
createCommand('js', {
  description: 'Executes a JS snippet',
  usage: '/<command> [snippet]',
  permission: 'cauldron.js',
  execute({ sender, args }) {
    const snippet = replWrapper[0] + args.join('\n') + replWrapper[1];
    let compiledSnippet = __cauldron__.evalScript(snippet, 'repl.js');
    const result = compiledSnippet.call(getPlugin(), sender, Bukkit.getServer());
    sender.sendMessage(`\xA77=> \xA72${result}`);
    return true;
  }
});

module.exports = {
  createCommand,
  getPlugin
}