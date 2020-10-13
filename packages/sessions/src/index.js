import { events } from 'cauldronjs';
import { UUID } from 'java/util';
import { Bukkit } from 'bukkit';
import { Player } from 'bukkit/entity';
import useStore from '@cauldronjs/store';

/**
 * @type {Map<string, [object, (updatedProps: any) => void]>}
 */
const sessionData = new Map();

function createSessionData(userId) {
  sessionData.set(userId, useStore(userId, {}));
}

function getSessionData(userId) {
  return sessionData.get(userId);
}

function clearSessionData(userId) {
  sessionData.delete(userId);
}

export default function session() {
  events.on('playerjoin', (event) =>
    createSessionData(event.getPlayer().getUniqueId().toString())
  );
  events.on('playerquit', (event) =>
    clearSessionData(event.getPlayer().getUniqueId().toString())
  );
  events.on('playerkick', (event) =>
    clearSessionData(event.getPlayer().getUniqueId().toString())
  );
}

/**
 *
 * @param {string|UUID|Player} user The username, UUID, or player entity
 */
session.for = (user) => {
  /**
   * @type {string}
   */
  let id;
  if (typeof user === 'string') {
    // it's a name or a UUID
    try {
      UUID.fromString(user);
      id = user;
    } catch (err) {
      // it's a name of a player
      id = Bukkit.getPlayer(user).getUniqueId().toString();
    }
  } else if (user.getPlayerTime) {
    // it's a player
    id = user.getUniqueId().toString();
  } else if (user.clockSequence) {
    // it's a UUID
    id = Bukkit.getPlayer(user).getUniqueId().toString();
  } else {
    throw new Error(
      'Invalid session search key: requires name, unique ID, or player object'
    );
  }
  return getSessionData(id);
};
