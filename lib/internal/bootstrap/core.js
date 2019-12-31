globalThis.Buffer = require('buffer');
const Module = require('module');
const errors = require('errors');
const cauldronApi = require('cauldron');

const inject = name => {
  const plugin = Bukkit.getPluginManager().getPlugin(name);
  if (plugin) {
    console.debug(`Injecting ${name} into Cauldron`);
    Bukkit.getPluginManager().enablePlugin(plugin);
  }
};

const loadDependencies = () =>
  (process.config.variables.java_dependencies || [])
    .filter(dep => !Bukkit.getPluginManager().isPluginEnabled(dep))
    .forEach(inject);

function initializeCore() {
  console.debug('Bootstrapping core library');
  if (!process.mainModule) {
    throw new Error('package.main must set an entry point');
  }
  // make sure everything is taken care of before this. Once we hit this, init must be done.
  Module.runScript(process.config.variables.scripts, 'start');
  loadDependencies();
  cauldronApi();
  Module.runMain();
}

function initializeCauldron() {}

initializeCore();
