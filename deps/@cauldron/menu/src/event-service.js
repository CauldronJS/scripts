import { events } from '@cauldron/core';

const windows = [];
const currentOpenWindows = Object.create(null);

export const createWindow = window => {
  const id = windows.length + 0;
  windows.push(window);
  return id;
};

export const deleteWindow = id => {
  // close all instances then delete
};

export const openWindowFor = (player, window) => {
  const uuid = player.getUniqueId();
  currentOpenWindows[uuid] = window;
  // send data
};

export const closeWindowFor = player => {
  const uuid = player.getUniqueId();
  const window = currentOpenWindows[uuid];
  if (!window) return false;
  delete currentOpenWindows[uuid];
  return true;
};

export const setPage = (player, pageId) => {
  const window = currentOpenWindows;
};

events.inventory.on('click', event => {
  const uuid = event.getPlayer().getUniqueId();
  const id = currentOpenWindows[uuid];
  if (!id) return true;
  const window = windows[id];
});
