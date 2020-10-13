import { useStore, events } from 'cauldronjs';

const [friendsStore, setFriends] = useStore('friends');

export function initialize() {
  events.on('playerjoin', (event) => {});
}

export const getFriends = (uuid) => friendsStore[uuid.toString()];
