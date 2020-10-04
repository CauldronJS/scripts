import * as fs from 'fs';

function useStore(
  name: string,
  defaultStore: any = Object.create(null)
): [any, (updatedProps: any) => void] {
  let store = defaultStore;
  if (!fs.existsSync('.store')) {
    fs.mkdirSync('.store');
  }

  if (fs.existsSync(`.store/${name}.json`)) {
    const savedStoreJson = fs.readFileSync(`.store/${name}.json`);
    if (savedStoreJson.length > 0) {
      store = JSON.parse(savedStoreJson.toString());
    }
  }

  function setStore(updatedProps: any) {
    for (const field in updatedProps) {
      if (updatedProps[field] === undefined) {
        delete store[field];
      }
      store[field] = updatedProps[field];
    }
    fs.writeFileSync(`.store/${name}.json`, JSON.stringify(store));
  }
  return [store, setStore];
}

export default useStore;
