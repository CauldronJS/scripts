const useStore = require('store');
const childProcess = require('child_process');
const util = require('internal/util');
const path = require('path');

// This library is strictly to be used by Cauldron
// but it needs to be injested by the core module
// loader, hence why it's not a @cauldron library.

const [cache, setCache] = useStore('recompile');

/**
 *
 * @param {Module} targetModule
 */
function recompile(targetModule) {
  // okay so don't hate me BUT
  // if we zip the entire directory EXCEPT any node_modules dirs,
  // we can grab an MD5 of the zipfile in memory

  // don't compile in a node_modules package
  if (targetModule.rootDir.indexOf('node_modules') > -1) return;

  const compileScript = util.get(targetModule, 'config.scripts.compile');

  if (!compileScript) return;
  const requiresRecompile = true;
  if (!requiresRecompile) {
    console.debug(
      `${targetModule.id} has not changed, skipping compile step...`
    );
    return;
  }

  console.debug(`Compiling ${targetModule.id}...`);
  try {
    // TODO: add path variables for this spawn
    const proc = childProcess.spawnSync(compileScript, {
      dir: path.resolve(process.cwd(), targetModule.rootDir)
    });
    const result = proc.output
      .filter(line => line.trim().length > 0)
      .join('\n');
    console.debug(result);
  } catch (err) {
    console.error(`Failed to compile ${targetModule.id}: ${err}`);
    err.isModuleError = true;
    throw err;
  }

  // set cache
}

recompile.watch = moduleCache => {
  // sets a watch for all directories in the cache and
  // automatically unloads, recompiles, and reloads
  // a module into the cache
  for (let main in moduleCache) {
    // get the module and watch the directory for changes
    const mod = moduleCache[main];
  }
};

module.exports = recompile;
