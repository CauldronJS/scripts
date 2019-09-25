import cauldron from '@cauldron';

const eventHooks = Object.create(null);

function baseHook(event, handlers) {
  for (const handler of handlers) {
    handler(event);
  }
}

function usePlayer(name, handlers) {
  for (const eventName in handlers) {
    if (cauldron.events.player.registeredEventClasses[eventName]) {
      if (!eventHooks[name]) {
        eventHooks[name] = [];
        cauldron.events.player.on(eventName, event => {
          if (event.getPlayer && event.getPlayer().getName() === name) {
            baseHook(event, eventHooks[name]);
          }
        });
      }
      eventHooks[name].push(handlers[eventName]);
    }
  }
}

module.exports = usePlayer;
