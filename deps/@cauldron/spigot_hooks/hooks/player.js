import cauldron from '@cauldron';

const eventHooks = Object.create(null);

function baseHook(event, handlers) {
  for (const handler of handlers) {
    handler(event);
  }
}

function usePlayer(name, handlers = Object.create(null)) {
  for (const eventName in handlers) {
    if (cauldron.events.player.registeredEventClasses[eventName]) {
      if (!eventHooks[eventName]) {
        eventHooks[eventName] = {
          [name]: []
        };
        cauldron.events.player.on(eventName, event => {
          if (event.getPlayer && event.getPlayer().getName() === name) {
            baseHook(event, eventHooks[eventName][name]);
          }
        });
      }
      eventHooks[eventName][name].push(handlers[eventName]);
    }
  }
}

export default usePlayer;
