import Component from './component';
import Fragment from './fragment';
import { mount, rinse } from './pipe';

export default {
  mount,
  createComponent: rinse,
  activate: rinsed => rinsed.activate,
  Component,
  Fragment
}
