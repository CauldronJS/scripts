import useStore from '@cauldronjs/store';
import cauldron from 'cauldronjs';
import { Bukkit } from 'bukkit';

const [history, setHistory] = useStore('players_history');

function createNewEntry(player) {
  const uuid = player.getUniqueId().toString();
  const name = player.getName();
  setHistory({ [uuid]: [name], [name.toLowerCase()]: uuid });
}

function updateHistory(event) {
  const uuid = event.getPlayer().getUniqueId().toString();
  const name = event.getPlayer().getName();
  const nameHistory = history[uuid];
  if (!nameHistory) {
    createNewEntry(event.getPlayer());
  } else if (nameHistory.indexOf(name) === -1) {
    const lastUsedName = nameHistory[nameHistory.length - 1];
    setHistory({
      // add the new name to the history
      [uuid]: [...nameHistory, name],
      // remove the old entry of what the current name is
      [lastUsedName.toLowerCase()]: undefined,
      // add the new entry of what the current name is
      [name.toLowerCase()]: uuid,
    });
  }
}

export const getUuid = (name) => history[name.toLowerCase()];

export const getName = (uuid) => {
  const names = getNameHistory(uuid);
  return names[names.length - 1];
};

export const getNameHistory = (uuid) => history[uuid];

if (!Bukkit.getOnlineMode()) {
  console.error(
    '[Players] This library cannot be used while the server is in offline mode'
  );
} else {
  cauldron.events.on('playerjoin', updateHistory);

  // initialize history if it doesn't exist
  if (Object.keys(history).length === 0) {
    console.log('No history of players, creating cache...');
    const allPlayers = [...Bukkit.getOfflinePlayers()];
    allPlayers.forEach(createNewEntry);
    console.log(`Created profiles for ${allPlayers.length} players`);
  }
}
