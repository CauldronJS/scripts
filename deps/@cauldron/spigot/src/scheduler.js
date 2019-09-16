import { Runnable } from 'java/lang';

const scheduler = Bukkit.getScheduler();

const runnable = run => Java.extend(Runnable, { run });

export const scheduleNowSync = fn =>
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

export const scheduleNow = fn =>
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

export const scheduleLaterSync = (fn, ticks) =>
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

export const scheduleLater = (fn, ticks) =>
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

export const scheduleIntervalSync = (fn, ticks) =>
  scheduler.scheduleInterval(__cauldron__, fn, ticks);
