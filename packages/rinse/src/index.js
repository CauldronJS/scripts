import Fragment from './fragment';
import { mount, unmount, rinse } from './pipe';
import elements from './elements';
import useState from './hooks/useState';

module.exports = {
  mount,
  unmount,
  createComponent: rinse,
  activate: rinsed => rinsed.activate,
  Fragment,
  useState,
  ...elements
};
