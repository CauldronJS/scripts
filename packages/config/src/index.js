import fs from 'fs';
import path from 'path';

const configDirectory = path.resolve(process.cwd(), 'configs');

/**
 * Creates a configuration hook for the target object.
 *
 * @param {*} value
 * @param {(newValue: *, value: *) => void} handler
 *
 * @returns an array where the first index is the config value and the second is a function
 * that can be called to update config values.
 */
function createConfigHook(value, handler) {
  function setConfigFn(newValue) {
    for (const field in newValue) {
      value[field] = newValue[field];
    }
    handler(newValue, value);
    return newValue;
  }
  return [value, setConfigFn];
}

export default function useConfig(name, defaultConfig = Object.create(null)) {
  const configName = path.resolve(configDirectory, `${name}.json`);
  let config = defaultConfig;
  const stat = fs.statSync(configName);
  switch (stat) {
    case 0: // it's a file
      try {
        const configJson = fs.readFileSync(configName);
        config = JSON.parse(configJson);
      } catch (err) {
        // delete and rewrite
        fs.writeFileSync(JSON.stringify(config));
      }
      break;
    default:
      // it ain't shit
      if (stat === 1) {
        fs.rmdirSync(configName);
      }
      fs.writeFileSync(configName, JSON.stringify(config));
      break;
  }

  const configHook = createConfigHook(config, (newValue, value) => {
    if (JSON.stringify(newValue) !== JSON.stringify(value)) {
      fs.writeFileSync(configName, JSON.stringify(newValue));
    }
  });
  return configHook;
}
