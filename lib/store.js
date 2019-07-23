const fs = require('fs');

/**
 * Creates a stored file that can be used to persist data
 * for the given app.
 *
 * @export
 * @param {*} name
 * @param {*} [defaultStore=null]
 * @returns {[store, setStore: (updatedProps:Object)]} An array of
 * the stored object and a function that updates the store.
 */
function useStore(name, defaultStore = Object.create(null)) {
  let store = defaultStore;
  if (!fs.existsSync('.store')) {
    fs.mkdirSync('.store');
  }

  if (fs.existsSync(`.store/${name}.json`)) {
    const savedStoreJson = fs.readFileSync(`.store/${name}.json`);
    if (savedStoreJson.length > 0) {
      store = JSON.parse(savedStoreJson);
    }
  }

  function setStore(updatedProps) {
    for (let field in updatedProps) {
      store[field] = updatedProps[field];
    }
    fs.writeFileSync(`.store/${name}.json`, JSON.stringify(store));
  }
  return [store, setStore];
}

module.exports = useStore;
