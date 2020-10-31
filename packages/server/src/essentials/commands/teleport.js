import { Command as CauldronCommand } from 'cauldronjs';
import Rinse, { Command } from '@cauldronjs/rinse';
import {
  sendTpRequest,
  teleportToPlayer,
  teleportToLocation,
} from '../services/tp-service';

function handleTp({ sender, args }) {
  switch (args.length) {
    case 1:
      const to = args[0];
      if (typeof to !== 'string') {
        return CauldronCommand.throwIncorrectUsage(
          '/<command> <player|coordinates>'
        );
      }
      return teleportToPlayer(sender, to);
    case 3:
      const [x, y, z] = args;
      return teleportToLocation(sender, x, y, z);
    default:
      return CauldronCommand.throwIncorrectUsage(
        '/<command> <player|coordinates>'
      );
  }
}

function handleTpr({ sender, args }) {
  if (args.length !== 1 || typeof args[0] !== 'string') {
    return CauldronCommand.throwIncorrectUsage('/<command> <player>');
  }

  return sendTpRequest(sender, args[0]);
}

export const TeleportCommand = () => (
  <Command
    name="teleport"
    aliases={['tp']}
    permission="essentials.tp"
    usage="/<command <player|coordinates>"
    execute={handleTp}
  />
);

export const TeleportRequestCommand = () => (
  <Command
    name="teleportrequest"
    aliases={['tpr', 'tprequest']}
    permission="essentials.tprequest"
    usage="/<command <player>"
    execute={handleTpr}
  />
);
