import { INVENTORY_ACTION, CLICK_TYPE } from './click-type';
import { events } from '@cauldron/core';
import Rinse, { Component } from '@cauldron/rinse';

let activeWindows = Object.create(null);

export default class Window {
  constructor(title) {
    this.id = Object.keys(activeWindows).length;
    this._inventory = [];
    this._boundActions = [];
    this._watchers = [];
    this._title = title || 'Menu';
  }
}
