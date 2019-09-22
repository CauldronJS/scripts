global.Buffer = require('buffer');
const Module = require('module');
const errors = require('errors');

const inject = name => {
  const plugin = Bukkit.getPluginManager().getPlugin(name);
  if (plugin) {
    console.debug(`Injecting ${name} into Cauldron`);
    Bukkit.getPluginManager().enablePlugin(plugin);
  }
};

const loadDependencies = () =>
  (process.config.pluginDependencies || [])
    .filter(dep => !Bukkit.getPluginManager().isPluginEnabled(dep))
    .forEach(inject);

function initializeCore() {
  console.debug('Bootstrapping core library');
  if (!process.mainModule) {
    throw new errors.ERR_INVALID_RETURN_VALUE(
      'process.config["main"]',
      process.mainModule,
      'package.main must set an entry point'
    );
  }
  // make sure everything is taken care of before this. Once we hit this, init must be done.
  Module.runScript(process.config.scripts, 'start');
  loadDependencies();
  Module.runMain();
}

initializeCore();
