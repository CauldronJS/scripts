/* eslint-disable consistent-return, no-use-before-define, no-undef */
const fs = require('fs');
const path = require('path');
const { stripBOM, stripShebang } = require('internal/modules/helpers');
const childProcess = require('child_process');
const jsTransformer = require('internal/transformers/js');
const jsonTransformer = require('internal/transformers/json');
const definitionTransformer = require('internal/transformers/d');
const { get } = require('internal/util');
const { getErrorStack } = require('internal/cauldron/utils');
const scriptRunner = internalBinding('ScriptRunner');

/**
 * The object cache of all modules outside of internal ones
 */
const mainPackageCache = Object.create(null);

const transformers = [jsTransformer, jsonTransformer, definitionTransformer];

function updateChildren(parent, child, scan) {
  const children = parent && parent.children;
  if (children && !(scan && children.includes(child))) {
    children.push(child);
  }
}

/**
 * Checks to see if the require request is relative
 *
 * @param {string} request
 *
 * @returns {boolean}
 */
function isRequestRelative(request) {
  return request[0] === '.' || request[0] === '/' || request[0] === '\\';
}

/**
 * Attemps to read the directory as if it were a package. If it is not, it
 * will return false.
 *
 * @param {string} dir
 *
 * @returns {*}
 */
function tryReadPackage(dir = process.cwd()) {
  if (mainPackageCache[dir]) {
    return mainPackageCache[dir];
  }
  const pkgPath = path.resolve(dir, 'package.json');
  try {
    const contents = fs.readFileSync(pkgPath);
    const json = JSON.parse(contents);
    json.hasRanScript = Object.create(null);
    mainPackageCache[dir] = json;
    return json;
  } catch (err) {
    return false;
  }
}

/**
 * Attemps to resolve where the root directory is for a module.
 *
 * @param {string} request The requested module name
 * @param {string} currentDir The directory to search in
 *
 * @returns {string} The resolved file to require from
 *
 * @throws {Error} when module cannot be located
 */
function resolveRequireRoot(request, currentDir) {
  const isRelative = isRequestRelative(request);
  if (isRelative) {
    return path.resolve(currentDir, request);
  } else {
    let currentAccessAt = currentDir;
    let depth = 0;
    while (
      path.resolve(currentAccessAt) !== path.resolve(currentAccessAt, '..') &&
      depth++ < 8
    ) {
      const pkg = path.resolve(currentAccessAt, 'node_modules', request);
      if (fs.existsSync(pkg)) {
        return pkg;
      }
      currentAccessAt = path.resolve(currentAccessAt, '..');
    }
  }

  const isCoreLib = fs.existsSync(`lib/${request}.js`);
  if (isCoreLib) {
    return `lib/${request}.js`;
  }

  throw new Error(
    `Could not locate module "${request}". Ensure you have ran "npm install".`
  );
}

/**
 * Returns the filename to read from for the requested module
 *
 * @param {string} request The requested import
 * @param {Module} module The module requesting the import
 * @param {boolean} isMain Whether or not the import is within the initial startup script
 */
function resolveFileName(request, module, isMain) {
  const ext =
    isMain && !module.parent
      ? 'js'
      : module.parent.filename.split('.').slice(-1)[0];

  const root = isMain
    ? path.normalize(process.mainModule)
    : resolveRequireRoot(request, path.resolve(module.parent.filename, '..'));
  // now we have the root of the module that was requested.
  // we don't know if it's a file or if it's a directory, so we
  // need to stat to determine what to do with it.
  // "But don't relative requires work differently???"
  // No. This is because all the relative require does is give
  // us the root directory to search. If it's not relative,
  // just search for the closest parent deps/node_modules folder
  // that contains this module.
  const stat = fs.statSync(root);
  switch (stat) {
    case 0: // file
      return root;
    case 1: // directory
      // eslint-disable-next-line no-case-declarations
      const pkg = tryReadPackage(root);
      module.config = pkg;
      module.rootDir = root;
      if (!pkg || !pkg.main) {
        return path.resolve(root, `index.${ext}`);
      } else {
        const main = path.resolve(root, pkg.main);
        if (fs.existsSync(main)) return main;
        else return `${main}.${ext}`;
      }
    case -1: // not found, check extensions
      if (fs.existsSync(`${root}.${ext}`)) {
        return `${root}.${ext}`;
      } else if (fs.existsSync(`${root}.js`)) {
        return `${root}.js`;
      } else {
        if (ext === 'js') {
          // search for a type definition because TypeScript
          if (fs.existsSync(`${root}.d.js`)) {
            return `${root}.d.js`;
          } else {
            throw new Error(`Could not locate module ${request}`);
          }
        }
      }
    default:
      throw new Error(`Could not locate module ${request}`);
  }
}

/**
 * Tries to get the specified loader associated with a file type
 *
 * @param {string} filename
 */
function transform(filename) {
  function readAndStrip(filename) {
    return stripBOM(stripShebang(fs.readFileSync(filename)));
  }

  for (const transformer of transformers) {
    const testResult = transformer.test(filename);
    if (!testResult) continue;
    // TODO: add ability for config and options
    return transformer.process(readAndStrip(filename), filename);
  }
  return jsTransformer.process(readAndStrip(filename), filename);
}

class Module {
  constructor(id, parent) {
    this.id = id;
    this.exports = Object.create(null);
    this._finalizedExports = Object.create(null);
    this.parent = parent;
    updateChildren(parent, this, false);
    this.filename = null;
    this.loaded = false;
    this.children = [];
    this.rootDir = '';
    this.config = null;
    this.$$staticRef = Module;
  }

  /*

  So this looks a little confusing, so lets establish the work flow.
  1. we call `require` from inside a file
  2. `require` is directed to Module.prototype.require where the instance is the parent module
  3. we call Module._load. If the file exists natively, return that.
  4. next we resolve the filename of what is being required
  5. If the require is relative, directly load the file.
  5a. If it's not relative, we find the package and load it.
  5b. If we find the main, return that as the file to be loaded
  6. With the child module created, we call childModule.load(filename). This will load and compile
  7. .load will then pass the exports back to _load which will return it to the require statement.

  */

  /**
   * Runs the entry module for this environment/cwd
   */
  static runMain() {
    delete this._cache;
    this._cache = Object.create(null);
    this._load(process.mainModule, null, true);
  }

  static evalInContext(content) {
    const noReturnWith = ['return', 'const', 'let', 'var'];
    const firstToken = content.split(' ')[0];

    const tempModule = new Module('__eval__', null);
    const shouldAddReturnStatement =
      noReturnWith.indexOf(firstToken) === -1 &&
      content.indexOf('\n') === -1 &&
      content.indexOf(';') === -1;
    return tempModule.eval(
      `${shouldAddReturnStatement ? 'return ' : ''}${content}`,
      '__eval__'
    );
  }

  /**
   * Wraps a string in a function block allowing it to scope itself as a module
   *
   * @param {string} content
   */
  static wrap(content) {
    return this.wrapper[0] + content + this.wrapper[1];
  }

  // check for the requested file then return exports
  static _load(request, parent, isMain) {
    if (typeof request !== 'string') {
      throw new Error(
        'Can only require from file location string, got ' + typeof request
      );
    }
    if (request.startsWith('internal/') || request.startsWith('internal\\')) {
      if (!parent.filename.startsWith('lib')) {
        throw new Error('Cannot require internal library from outside');
      } else {
        return NativeModule.require(request);
      }
    }

    if (!isRequestRelative(request)) {
      const nativeResolved = NativeModule.tryResolve(request);
      if (nativeResolved) return nativeResolved;

      if (NativeModule.isInternal(request)) {
        return NativeModule.require(request);
      }
    }

    // if (!parent && !isMain) {
    //   throw new Error(
    //     'The developer fucked up. Or Oracle did. Let him know this happened.'
    //   );
    // }

    const newModule = new Module(request, parent);
    const filename = resolveFileName(request, newModule, isMain);
    const dirname = newModule.rootDir;
    if (!filename) {
      throw new Error(`Module ${request} could not be found`);
    }

    const cachedModule = this._cache[filename];
    if (cachedModule) {
      return cachedModule.exports;
    }
    this._cache[filename] = newModule;
    if (isMain) {
      Module.main = newModule;
    }
    console.debug({ filename, request });
    const result = newModule.load(filename);
    return result;
  }

  static runScript(scripts, scriptName, dir) {
    if (!scripts) {
      return false;
    }
    const script = scripts[scriptName];
    if (!script || script.length === 0) {
      return false;
    }
    try {
      // TODO: implement node_modules/.bin
      const spawned = childProcess.spawnSync(script, [], {
        dir,
      });
      return spawned;
    } catch (err) {
      console.error(`An error occured running ${scriptName}: ${err}`);
      console.error(getErrorStack(err));
      return false;
    }
  }

  // loads and compiles the module. This function expects filename to be completely resolved
  load(filename) {
    if (this.loaded) {
      return this.exports;
    }
    this.filename = filename;
    const loader = transform(filename);
    this.eval(loader, filename);
    return this.exports;
  }

  // Wraps and runs the module content, returning any errors if they exist
  eval(content, filename) {
    const wrapper = Module.wrap(content);
    const compiledWrapper = scriptRunner.runScript(wrapper, filename);
    const dirname = path.dirname(filename);
    const thiz = this;

    function NodeRequire(id) {
      return Module._load(id, thiz, false);
    }

    NodeRequire.main = process.mainModule;
    NodeRequire.resolve = (request, { paths }) => {
      return resolveFileName(request, thiz, false);
    };
    NodeRequire.mainRequire = (id) => Module._load(id, Module.main, false);

    const result = compiledWrapper.call(
      this.exports,
      this.exports,
      NodeRequire,
      this,
      filename,
      dirname
    );
    return result;
  }

  instantiate() {}

  static $$resetContext(includeNative) {
    if (includeNative) {
      NativeModule.$$resetContext();
    }
    for (const filename in this._cache) {
      delete this._cache[filename];
    }
  }
}

Module.wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});',
];

Module._cache = Object.create(null); // modules are stored here by filename

Module.Module = Module;
Module.builtInModules = NativeModule.INTERNAL_LIBS;
Module.transformers = transformers;
Module.main = null;

module.exports = Module;
