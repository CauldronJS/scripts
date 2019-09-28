import cauldron from '@cauldron';

const eventHooks = Object.create(null);

function baseHook(event, handlers) {
  for (const handler of handlers) {
    handler(event);
  }
}

function useWorld(name, handlers = Object.create(null)) {
  for (const eventName in handlers) {
    if (cauldron.events.registeredEventClasses[eventName]) {
      if (!eventHooks[eventName]) {
        eventHooks[eventName] = {
          [name]: []
        };
        cauldron.events.on(eventName, event => {
          if (event.getWorld && event.getWorld().getName() === name) {
            baseHook(event, eventHooks[eventName][name]);
          }
        });
      }
      eventHooks[eventName][name].push(handlers[eventName]);
    }
  }
}

export default useWorld;
