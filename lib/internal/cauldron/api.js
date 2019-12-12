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

/**
 * Can be either a class or a function. If a class, a constructor
 * MUST be declared. Implementation may vary but the instanced library
 * will exist through the lifecycle of the app. It will be in charge
 * of interaction with the core library once the Java API is more modular
 * and fleshed out to deal with lower level integration (ETA is unknown)
 */
function Cauldron() {}

Object.defineProperties(Cauldron, {
  Command: {
    get: throwNotImplemented('Command')
  },
  events: {
    get: throwNotImplemented('events')
  },
  registerCommand: {
    get: throwNotImplemented('registerCommand')
  },
  unregisterCommand: {
    get: throwNotImplemented('unregisterCommand')
  },
  getPlugin: {
    get: throwNotImplemented('getPlugin')
  }
});

module.exports = Cauldron;
