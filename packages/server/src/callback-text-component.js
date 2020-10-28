import { Command } from 'cauldronjs';
import { ClickEvent, TextComponent } from 'bungee/api/chat';
import { UUID } from 'java/util';

const registeredCallbacks = Object.create(null);

/**
 *
 * @param {string|TextComponent} text
 * @param {(sender: import('bukkit/entity').Player) => void} callback
 *
 * @returns {TextComponent}
 */
export default function createComponent(text, callback) {
  if (!text.duplicate) {
    text = new TextComponent(text);
  }
  const id = UUID.randomUUID().toString().replace('-', '');
  registeredCallbacks[id] = callback;
  text.setClickEvent(
    new ClickEvent(
      ClickEvent.Action.RUN_COMMAND,
      `/callback-text-component ${id}`
    )
  );
  return text;
}

function execute({ sender, args }) {
  const [id] = args;
  if (!id) {
    throw new Error('No callback ID supplied');
  }
  const handler = registeredCallbacks[id];
  if (!handler) {
    // it's already been called, ignore it and move on
    return;
  }
  const result = handler(sender);
  delete registeredCallbacks[id];
  return result;
}

Command.registerCommand('callback-text-component', { execute });
