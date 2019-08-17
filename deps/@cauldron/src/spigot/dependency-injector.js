// resolves all jarDependencies in the main package.json, loading them if not already loaded
import fs from 'fs';
import path from 'path';
import { File } from '@java/java.io';
import { ZipFile } from '@java/java.util.zip';
import YamlConfiguration from '@java/org.bukkit.configuration.file.YamlConfiguration';
import { getStringFromBuffer } from 'util';

const dependencies = process.config.javaDependencies;
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

export default loadDependencies;
