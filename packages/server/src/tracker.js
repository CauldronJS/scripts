import { events } from 'cauldron';
import http from 'http';

events.on('playerachievementawarded', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playerchat', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playercommandsend', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playerjoin', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playerkick', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playerlevelchange', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playerlocalechange', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playerlogin', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playerquit', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playerrespawn', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.on('playerstatisticincrement', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});
