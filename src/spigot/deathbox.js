import { events } from '@cauldron';
import useStore from '@cauldron/store';
import useConfig from '@cauldron/config';

const [deathboxCache, setDeathboxCache] = useStore('deathboxes');
const [deathboxConfig, setDeathboxConfig] = useConfig('deathbox');

events.on('playerdeath', event => {
  if (!deathboxConfig.isActivated) return;
  const player = event.getEntity();
  const drops = event.getDrops();
});
