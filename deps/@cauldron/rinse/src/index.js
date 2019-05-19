import Fragment from './fragment';
import { mount, rinse, Component } from './pipe';

export default {
  mount,
  createComponent: rinse,
  activate: rinsed => rinsed.activate,
  Component,
  Fragment
};
