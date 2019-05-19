import Fragment from './fragment';
import { mount, rinse, Component } from './pipe';

module.exports = {
  mount,
  createComponent: rinse,
  activate: rinsed => rinsed.activate,
  Component,
  Fragment
};
