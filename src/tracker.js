import { events } from '@cauldron';
import http from 'http';

events.player.on('achievementawarded', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('chat', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('commandsend', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('join', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('kick', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('levelchange', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('localechange', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('login', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('quit', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('respawn', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});

events.player.on('statisticincrement', e => {
  const player = e.getPlayer();
  const uuid = player.getUniqueId();
  const time = Date.now();
});
