const { EventEmitter } = require('events');
const PlayerEvents = require('@java/org.bukkit.events.player');

class SpigotEventEmitter extends EventEmitter {
  constructor (typeMap = {}) {
    super();
    this._typeMap = typeMap;
    for (let eventName in typeMap) {
      const eventClass = typeMap[eventName].class;
      // listen to eventClass and emit on handle
    }
  }
}

const playerListener = new SpigotEventEmitter({
  blockbreak: PlayerEvents.PlayerBlockBreakEvent
});
const serverListener = new SpigotEventEmitter();
const vehicleListener = new SpigotEventEmitter();
const paintingListener = new SpigotEventEmitter();
// TODO: add the rest lmao

module.exports = {
  playerListener,
  serverListener,
  vehicleListener,
  paintingListener
};
