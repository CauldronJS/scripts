import Runnable from '@java/java.lang.Runnable';

const scheduler = Bukkit.getScheduler();

const runnable = run => Java.extend(Runnable, { run });

export const scheduleNow = fn =>
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

export const scheduleNowAsync = fn =>
  new Promise((resolve, reject) => {
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

export const scheduleLater = fn => {};

export const scheduleLaterAsync = fn => new Promise((resolve, reject) => {});
