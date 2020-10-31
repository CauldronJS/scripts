import colors from '@cauldronjs/colors';
import { getPlayerFromName } from './user-service';
import { TextComponent } from 'bungee/api/chat';
import createCallbackTextComponent from '../../callback-text-component';

/**
 *
 * @param {import('bukkit/entity').Player} from
 * @param {string} to
 */
export function sendTpRequest(from, to) {
  if (!to) {
    throw new Error('No target specified');
  }
  const targetPlayer = getPlayerFromName(to);
  if (!targetPlayer) {
    throw new Error('No player found');
  }
  if (targetPlayer.getLocation().getWorld() !== from.getLocation().getWorld()) {
    throw new Error('You must be in the same world');
  }
  const notification = new TextComponent(
    `You just received a tp request from ${colors.green(
      from.getDisplayName()
    )}. Would you like to accept?\n`
  );
  const yesButton = createCallbackTextComponent(
    colors.green('Yes'),
    (sender) => {
      sender.sendMessage('The tp request was accepted.');
      from.teleport(targetPlayer);
    }
  );
  const buttonDivider = new TextComponent(' | ');
  const noButton = createCallbackTextComponent(colors.red('No'), (sender) => {
    sender.sendMessage('The tp request was denied.');
  });
  targetPlayer
    .spigot()
    .sendMessage(notification, yesButton, buttonDivider, noButton);
}

/**
 *
 * @param {import('bukkit/entity').Player} from
 * @param {string} to
 */
export function teleportToPlayer(from, to) {
  if (!to) {
    throw new Error('No target specified');
  }
  const targetPlayer = getPlayerFromName(to);
  if (!targetPlayer) {
    throw new Error('No player found');
  }
  if (targetPlayer.getLocation().getWorld() !== from.getLocation().getWorld()) {
    throw new Error('You must be in the same world');
  }
  from.sendMessage(`Teleported to ${targetPlayer.getDisplayName()}'s location`);
  from.teleport(targetPlayer);
}

export function teleportToLocation(from, x, y, z) {
  if (!x || !y || !z) {
    throw new Error('Invalid coordinates, use X Y Z');
  }
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
    throw new Error('Invalid coordinates, use numbers only');
  }
  from.sendMessage(`Teleported to ${x} ${y} ${z}`);
  from.teleport(x, y, z);
}
