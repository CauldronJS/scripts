import cauldron from '@cauldron';

const eventHooks = Object.create(null);

function baseHook(event, handlers) {
  for (const handler of handlers) {
    handler(event);
  }
}

function useWorld(name, handlers = Object.create(null)) {
  for (const eventName in handlers) {
    if (cauldron.events.world.registeredEventClasses[eventName]) {
      if (!eventHooks[name]) {
        eventHooks[name] = [];
        cauldron.events.world.on(eventName, event => {
          if (event.getWorld && event.getWorld().getName() === name) {
            baseHook(event, eventHooks[name]);
          }
        });
      }
      eventHooks[name].push(handlers[eventName]);
    }
  }
}

module.exports = useWorld;
