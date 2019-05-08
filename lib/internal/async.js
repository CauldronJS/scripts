// this is Spigot specific. I'd like to find a way to do it without Spigot so we can use it
// across any JVM application. So basically don't use this if not in Spigot.

const Runnable = require('@java/java.lang.Runnable');

const scheduler = Bukkit.getScheduler();

const runnable = run => Java.extend(Runnable, { run });

function runAsync(fn) {
  return new Promise((resolve, reject) => {
    scheduler.runTaskAsynchronously(
      __cauldron__,
      runnable(() => {
        let result, error;
        try {
          if (typeof fn === 'string') {
            result = __cauldron__.evalScript(fn);
          } else {
            result = fn();
          }
          resolve(result);
        } catch (err) {
          error = err;
          reject(error);
        }
      })
    );
  });
}

module.exports = runAsync;
