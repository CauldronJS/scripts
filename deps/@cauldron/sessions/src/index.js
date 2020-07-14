import { events } from 'cauldron';

export default function() {
  events.on('playerjoin', event => {
    const player = event.getPlayer();
  });
}
