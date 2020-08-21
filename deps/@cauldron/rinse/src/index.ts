import Fragment from './fragment';
import { mount, createComponent } from './pipe';
import elements from './elements';
import hooks from './hooks';

module.exports = {
  mount,
  createComponent,
  activate: rinsed => rinsed.activate,
  Fragment,
  useState: hooks.useState,
  useEffect: hooks.useEffect,
  ...elements
};
