import { codes } from 'events';

/*

The required shape for the core Cauldron platform library
{
	Cauldron: {
		registerCommand: () => Command,
		unregisterCommand: () => Command,
		clearCommands: () => void,
		getPlugin: () => JavaPlugin,
		NAMESPACE_KEY: NamespacedKey,
		events: EventEmitter
	}
}

*/

function Cauldron() {
  throw new codes.ERR_METHOD_NOT_IMPLEMENTED('Cauldron', 'constructor()');
}

export default Cauldron;
