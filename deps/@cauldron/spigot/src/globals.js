import { Runnable } from 'java/lang';

const runnable = run => Java.extend(Runnable, { run });

function setTimeout(fn, ms) {
  Bukkit.getScheduler().scheduleSyncDelayedTask(
    __cauldron__,
    runnable(fn),
    ms / 50
  );
}

function setInterval(fn, ms) {
  //
}

function cancelInterval(id) {
  //
}

export default {
  setTimeout,
  setInterval,
  cancelInterval
};
