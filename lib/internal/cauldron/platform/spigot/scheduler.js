const { Runnable } = require('java/lang');

const scheduler = Bukkit.getScheduler();

const runnable = run => Java.extend(Runnable, { run });

const scheduleNowSync = fn =>
  scheduler.runTask(
    __cauldron__,
    runnable(() => {
      if (typeof fn === 'string') {
        return __cauldron__.evalScript(fn, __filename);
      } else {
        return fn();
      }
    })
  );

const scheduleNow = fn =>
  new Promise((resolve, reject) => {
    scheduler.runTaskAsynchronously(
      __cauldron__,
      runnable(() => {
        let result;
        try {
          if (typeof fn === 'string') {
            result = __cauldron__.evalScript(fn);
          } else {
            result = fn();
          }
          resolve(result);
        } catch (err) {
          reject(err);
        }
      })
    );
  });

const scheduleLaterSync = (fn, ticks) =>
  scheduler.runTaskLater(
    __cauldron__,
    runnable(() => {
      if (typeof fn === 'string') {
        return __cauldron__.evalScript(fn, __filename);
      } else {
        return fn();
      }
    }),
    ticks
  );

const scheduleLater = (fn, ticks) =>
  new Promise((resolve, reject) =>
    scheduler.runTaskLaterAsynchronously(
      __cauldron__,
      runnable(() => {
        let result;
        try {
          if (typeof fn === 'string') {
            result = __cauldron__.evalScript(fn);
          } else {
            result = fn();
          }
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }),
      ticks
    )
  );

const scheduleRepeatingSync = (fn, ticks) =>
  scheduler.scheduleSyncRepeatingTask(__cauldron__, fn, ticks);

const scheduleRepeating = (fn, ticks) =>
  scheduler.scheduleAsyncRepeatingTask(__cauldron__, fn, ticks);

module.exports = {
  scheduleNow,
  scheduleNowSync,
  scheduleLater,
  scheduleLaterSync,
  scheduleRepeating,
  scheduleRepeatingSync
};
