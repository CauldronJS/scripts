/**
 *
 * @param {Function} fn
 * @param {String?} name
 */
class Alias {
  constructor(fn, name) {
    if ((!fn.name || fn.name === 'anonymous') && !name) {
      throw new Error('Can only alias a command if a name is given');
    }
    this.fn = fn;
    this.name = name;
  }

  static _create(fn, name) {
    if (Alias.doesExist(name)) throw new Error('That alias already exists');
    const alias = new Alias(fn, name);
    Alias.registeredAliases[fn.name || name] = alias;
    return alias;
  }

  static doesExist(name) {
    return !!Alias.registeredAliases[name];
  }

  static patchWithAlias(sender, snippet) {
    // determine the alias and then return the modified snippet
    const toImport = { ...Alias.registeredAliases };
    toImport.sender = sender;
    toImport.server = Bukkit.getServer();
    // determine any command aliases and add toImport
    const functionSig = `(function (${Object.keys(toImport).join(', ')}) {`;
    const functionClose = '\n});';
    const compiled = functionSig + snippet + functionClose;
    const args = Object.keys(toImport).map(key => toImport[key].fn);
    return { compiled, args }
  }
}

Alias.registeredAliases = Object.create(null);

module.exports = Alias;