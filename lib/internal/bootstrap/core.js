const Module = require('module');
const errors = require('errors');

const SHORTHAND_NAMESPACES = {
  bukkit(request) {
    return `org.${request.replace(/\/|\\/g, '.')}`;
  },
  spigotmc(request) {
    return `org.${request.replace(/\/|\\/g, '.')}`;
  },
  java(request) {
    return request.replace(/\/|\\/g, '.');
  }
};

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
  Module._resolvers.push(request => {
    const module = request.split(/\.|\\|\//g)[0].toLowerCase();
    if (SHORTHAND_NAMESPACES[module]) {
      return Java.type(SHORTHAND_NAMESPACES[module](request));
    }
  });
  // make sure everything is taken care of before this. Once we hit this, init must be done.
  Module.runScript(process.config.scripts, 'start');
  loadDependencies();
  Module.runMain();
}

initializeCore();
