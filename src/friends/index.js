import { useStore, events } from 'cauldron';

const [friendsStore, setFriends] = useStore('friends');

export function initialize() {
  events.player.on('join', event => {});
}

export const getFriends = uuid => friendsStore[uuid.toString()];
