/*

The required shape for the core Cauldron platform library
{
	Cauldron: {
		registerCommand: () => Command,
		unregisterCommand: () => Command,
		getPlugin: () => JavaPlugin,
		events: EventEmitter,
		use: (middleware) => Cauldron
	}
}

*/

/**
 * Can be either a class or a function. If a class, a constructor
 * MUST be declared. Implementation may vary but the instanced library
 * will exist through the lifecycle of the app. It will be in charge
 * of interaction with the core library once the Java API is more modular
 * and fleshed out to deal with lower level integration (ETA is unknown)
 */
function Cauldron() {}

module.exports = Cauldron;
