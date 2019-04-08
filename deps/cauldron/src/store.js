import fs from 'fs';

export function useStore(name, defaultStore = Object.create(null)) {
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
    for (let prop in updatedProps) {
      store[prop] = updatedProps[prop];
    }
    fs.writeFileSync(`.store/${name}.json`, JSON.stringify(store));
  }

  return [store, setStore];
}