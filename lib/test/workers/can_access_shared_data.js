const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

if (isMainThread) {
  module.exports = (data) =>
    new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: data,
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with non-zero exit code: ${code}`));
        }
      });
    });
} else {
  const data = workerData;
  parentPort.postMessage({ foo: 'bar', meaningOfLife: 42, data });
}
