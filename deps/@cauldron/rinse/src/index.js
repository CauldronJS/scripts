import Fragment from './fragment';
import Component from './component';
import { mount, unmount, rinse } from './pipe';

module.exports = {
  mount,
  unmount,
  createComponent: rinse,
  activate: rinsed => rinsed.activate,
  Component,
  Fragment
};
