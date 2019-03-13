const fs = require('fs');
const path = require('path');
const {
  stripBOM,
  stripShebang
} = require('internal/modules/cjs/helpers');

const mainPackageCache = Object.create(null);

function updateChildren(parent, child, scan) {
  const children = parent && parent.children;
  if (children && !(scan && children.includes(child))) children.push(child);
}

function isRequestRelative(request) {
  return request[0] === '.' || request[0] === '/' || request[0] === '\\';
}

function tryReadPackage(dir) {
  dir = dir || process.cwd();
  if (mainPackageCache[dir]) return mainPackageCache[dir];
  const pkgPath = path.resolve(dir, 'package.json');
  try {
    const contents = __cauldron__.readFile(pkgPath);
    const json = JSON.parse(contents);
    mainPackageCache[dir] = json;
    return json;
  } catch (err) {
    return false;
  }
}

// judges the request and gets the file the request is pointing to
function resolveFileName(request, parent, isMain) {
  const isRelative = isRequestRelative(request);
  let filename;
  if (!isMain) {
    if (isRelative) {
      const dirname = path.dirname(parent.filename);
      filename = path.resolve(dirname, request);
      const stat = fs.statSync(filename);
      if (stat === 1) {
        // directory
        const pkg = tryReadPackage(filename);
        if (pkg) {
          filename = pkg.main || pkg._main;
        } else {
          filename = path.resolve(filename, 'index');
        }
      }
    } else {
      const directory = path.resolve('node_modules', request);
      const pkg = tryReadPackage(directory);
      if (pkg) {
        filename = pkg.main || pkg._main;
      }
    }
    if (filename && !fs.exists(filename)) {
      for (let ext in Module._extensions) {
        const fileWithExt = `${filename}${ext}`;
        if (fs.existsSync(fileWithExt)) {
          filename = fileWithExt;
          break;
        }
      }
    }
  } else {
    filename = request;
    if (filename && !fs.exists(filename)) {
      for (let ext in Module._extensions) {
        const fileWithExt = `${filename}${ext}`;
        if (fs.existsSync(fileWithExt)) {
          filename = fileWithExt;
          break;
        }
      }
    }
  }
  if (filename) return filename;
  else return false;
}

function resolveLoader(filename) {
  for (let ext in Module._extensions) {
    if (filename.endsWith(ext)) return Module._extensions[ext];
  }
  return Module._extensions['.js'];
}

class Module {
  constructor(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
    updateChildren(parent, this, false);
    this.filename = null;
    this.loaded = false;
    this.children = [];
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

  static runMain() {
    this._load(process.mainModule, null, true);
  }

  static wrap(script) {
    return this.wrapper[0] + script + this.wrapper[1];
  }

  // check for the requested file then return exports
  static _load(request, parent, isMain) {
    // TODO: check internal load from non-internal package
    if (NativeModule.nonInternalExists(request)) return NativeModule.require(request);
    const filename = resolveFileName(request, parent, isMain);
    if (!filename) {
      throw new Error(`Module ${request} could not be found`);
    }
    if (this._cache[filename]) return this._cache[filename].exports;
    const newModule = new Module(request, parent);
    const result = newModule.load(filename);
    this._cache[filename] = newModule;
    return result;
  }

  // Loads a module with the specified ID, returning the exports
  require(id) {
    return Module._load(id, this, false);
  }

  // loads and compiles the module. This function expects filename to be completely resolved
  load(filename) {
    if (this.loaded) return this.exports;
    this.filename = filename;
    const loader = resolveLoader(filename);
    const err = loader(this, filename);
    if (err) {
      throw err;
    }
    this.loaded = true;
    return this.exports;
  }

  // Wraps and runs the module content, returning any errors if they exist
  eval(content, filename) {
    content = stripShebang(content);
    let wrapper = Module.wrap(content);
    let compiledWrapper = __cauldron__.evalScript(wrapper, filename);
    const dirname = path.dirname(filename);
    const result = compiledWrapper.call(this.exports, this.exports, this.require, this, filename, dirname);
    return result;
  }
}

Module.wrapper = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n});'
];

Module._extensions = {
  '.js': (m, filename) => {
    var content = fs.readFileSync(filename);
    m.eval(stripBOM(content), filename);
  },
  '.json': (m, filename) => {
    var content = fs.readFileSync(filename);
    try {
      m.exports = JSON.parse(stripBOM(content));
    } catch (err) {
      err.message = filename + ': ' + err.message;
      throw err;
    }
  }
}

Module._cache = Object.create(null); // modules are stored here by filename

module.exports = Module;