import { events } from 'cauldronjs';
import { GoToLocationRules } from './rules';

/**
 *
 * @param {import('./objective').ObjectiveState} objectiveState
 */
export function registerWatch(objectiveState) {
  if (rules instanceof GoToLocationRules) {
    return events.on('playermove', (event) => {
      if (
        objectiveState.checkIsComplete() ||
        !arePlayersTheSame(event.getPlayer(), objectiveState.player)
      ) {
        return;
      }
      const player = event.getPlayer();
      if (player.getLocation().distance(objectiveState.rules.location) < 2) {
        objectiveState.complete();
      }
    });
  }
}

function arePlayersTheSame(player1, player2) {
  return player1.getUniqueId() === player2.getUniqueId();
}
