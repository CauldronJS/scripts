/**
 *
 * @param {Function} fn
 * @param {String?} name
 */
class Alias {
  constructor (fn, name) {
    if ((!fn.name || fn.name === 'anonymous') && !name) {
      throw new Error('Can only alias a command if a name is given');
    }
    this.fn = fn;
    this.name = name;
  }

  static _create (fn, name) {
    if (Alias.doesExist(name)) throw new Error('That alias already exists');
    const alias = new Alias(fn, name);
    global[fn.name || name] = alias;
    return alias;
  }

  static doesExist (name) {
    return !!Alias.registeredAliases[name];
  }
}

Alias.registeredAliases = Object.create(null);

export default Alias;
