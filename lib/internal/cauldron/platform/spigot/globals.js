const { Runnable } = require('java/lang');
const Promise = require('internal/cauldron/platform/spigot/promise');

const runnable = run => Java.extend(Runnable, { run });

function setTimeout(fn, ms) {
  Bukkit.getScheduler().scheduleSyncDelayedTask(
    $$cauldron$$,
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

const Bukkit = Java.type('org.bukkit.Bukkit');

module.exports = {
  setTimeout,
  setInterval,
  cancelInterval,
  Bukkit
  // Promise
};
