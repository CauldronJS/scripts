// resolves all jarDependencies in the main package.json, loading them if not already loaded
const fs = require('fs');
const path = require('path');
const { ZipFile } = require('java/util/zip');
const { YamlConfiguration } = require('bukkit/configuration/file');
const { getStringFromBuffer } = require('util');

const dependencies = process.config.variables.java_dependencies;
const jars = fs.readdirSync('..');
const pluginMap = {};

// this is utterly fucking useless but I'm gonna keep it for the future
const buildPluginMap = () => {
  jars.forEach(jar => {
    try {
      const jarPath = path.resolve(process.cwd(), '..', jar);
      const jarFile = new ZipFile(jarPath);
      const pluginYaml = jarFile.getEntry('plugin.yml');
      if (pluginYaml) {
        const yamlData = getStringFromBuffer(
          jarFile.getInputStream(pluginYaml)
        );
        const yamlConfig = new YamlConfiguration();
        yamlConfig.loadFromString(yamlData);
        const pluginName = yamlConfig.get('name');
        // TODO: versions?
        pluginMap[pluginName] = jar;
      }
    } catch (err) {
      // fail silently
      console.debug(`An error occured when resolving ${jar}: ${err}`);
    }
  });
};

const inject = name => {
  const plugin = Bukkit.getPluginManager().getPlugin(name);
  if (plugin) {
    console.debug(`Injecting ${name} into Cauldron`);
    Bukkit.getPluginManager().enablePlugin(plugin);
  }
};

const loadDependencies = () => {
  // buildPluginMap();
  dependencies
    .filter(dep => !Bukkit.getPluginManager().isPluginEnabled(dep))
    .forEach(inject);
};

module.exports = {
  buildPluginMap,
  inject,
  loadDependencies
};
