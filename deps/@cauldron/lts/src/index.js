import fs from 'fs';
import path from 'path';
import { lookupText, getLang } from './service';

export const loadTranslations = dir => {};

// Rinse component
export const Lts = ({ id, params, player }) => {
  // fetch ID
  return lts(player || console, id, params);
};

export const lts = (...args) => {
  let target, id, params;
  if (typeof args[0] === 'string') {
    // we're sending to console
    target = console;
    [id, params] = args;
  } else {
    // sending to a player
    [target, id, params] = args;
  }

  const lang = getLang(target);
  return lookupText(id, lang, params);
};
