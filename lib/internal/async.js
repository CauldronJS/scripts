const Runnable = require('@java/java.lang.Runnable');
const CompletableFuture = require('@java/java.util.concurrent.CompletableFuture');

const runnable = run => ({ run });

function runAsync (fn) {
  return new Promise((resolve, reject) => {
    CompletableFuture.runAsync(runnable(() => {
      console.log('Running async task');
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
    }));
  });
}

module.exports = runAsync;
