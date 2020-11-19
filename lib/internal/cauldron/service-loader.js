// this is used to load libraries that use Cauldron without having to boilerplate them.
// to create a library that leverages this functionality, check out the docs
const { Bukkit } = require('bukkit');

class CauldronServiceLoader {
  /**
   *
   * @param {(bukkit: import('bukkit').Server) => boolean} handler
   *
   * @returns {CauldronServiceLoader}
   */
  useSync(handler) {
    try {
      const didLoad = handler(Bukkit);
      if (didLoad || didLoad === undefined) {
        console.debug(`Loaded service ${handler.name}`);
      } else {
        console.debug(`Failed to load service ${handler.name}`);
      }
    } catch (err) {
      console.error(`Failed to load service ${handler.name}`);
      console.trace(err);
    }
    return this;
  }

  /**
   *
   * @param {*} handler
   *
   * @returns {CauldronServiceLoader}
   */
  use(handler) {
    setImmediate(() => {
      try {
        const didLoad = handler(Bukkit);
        if (didLoad || didLoad === undefined) {
          console.debug(`Loaded service ${handler.name}`);
        } else {
          console.debug(`Failed to load service ${handler.name}`);
        }
      } catch (err) {
        console.error(`Failed to load service ${handler.name}`);
        console.trace(err);
      }
    });
    return this;
  }
}

module.exports = CauldronServiceLoader;
