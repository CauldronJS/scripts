const { Runnable } = require('java/lang');

const scheduler = Bukkit.getScheduler();

const runnable = run => Java.extend(Runnable, { run });

const scheduleNowSync = fn =>
  scheduler.runTask(
    $$cauldron$$,
    runnable(() => {
      if (typeof fn === 'string') {
        return $$cauldron$$.evalScript(fn, __filename);
      } else {
        return fn();
      }
    })
  );

const scheduleNow = fn =>
  new Promise((resolve, reject) => {
    scheduler.runTaskAsynchronously(
      $$cauldron$$,
      runnable(() => {
        let result;
        try {
          if (typeof fn === 'string') {
            result = $$cauldron$$.evalScript(fn);
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
    $$cauldron$$,
    runnable(() => {
      if (typeof fn === 'string') {
        return $$cauldron$$.evalScript(fn, __filename);
      } else {
        return fn();
      }
    }),
    ticks
  );

const scheduleLater = (fn, ticks) =>
  new Promise((resolve, reject) =>
    scheduler.runTaskLaterAsynchronously(
      $$cauldron$$,
      runnable(() => {
        let result;
        try {
          if (typeof fn === 'string') {
            result = $$cauldron$$.evalScript(fn);
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
  scheduler.scheduleSyncRepeatingTask($$cauldron$$, fn, ticks);

const scheduleRepeating = (fn, ticks) =>
  scheduler.scheduleAsyncRepeatingTask($$cauldron$$, fn, ticks);

module.exports = {
  scheduleNow,
  scheduleNowSync,
  scheduleLater,
  scheduleLaterSync,
  scheduleRepeating,
  scheduleRepeatingSync
};
