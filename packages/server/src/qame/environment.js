import { events, useStore } from 'cauldronjs';

function environment() {
  const [store, setStore] = useStore('qame');
}
