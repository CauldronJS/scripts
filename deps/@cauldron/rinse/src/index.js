import Fragment from './fragment';
import { mount, unmount, rinse, Component } from './pipe';

module.exports = {
  mount,
  unmount,
  createComponent: rinse,
  activate: rinsed => rinsed.activate,
  Component,
  Fragment
};
