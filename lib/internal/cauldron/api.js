const { codes } = require('errors');

/*

The required shape for the core Cauldron platform library
{
	Cauldron: {
		registerCommand: () => Command,
		unregisterCommand: () => Command,
		getPlugin: () => JavaPlugin,
		events: EventEmitter
	}
}

*/

function throwNotImplemented(name) {
  throw new codes.ERR_METHOD_NOT_IMPLEMENTED('Cauldron', name);
}

function Cauldron() {
  this.registerCommand = () => throwNotImplemented('registerCommand');
  this.unregisterCommand = () => throwNotImplemented('unregisterCommand');
  this.getPlugin = () => throwNotImplemented('getPlugin');
  throwNotImplemented('constructor()');
}

Object.defineProperties(Cauldron, {
  Command: {
    get: throwNotImplemented('Command')
  },
  events: {
    get: throwNotImplemented('events');
  }
});

module.exports = Cauldron;
