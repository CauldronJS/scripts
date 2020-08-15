import Fragment from './fragment';
import { mount, createComponent } from './pipe';
import elements from './elements';
import useState from './hooks/useState';

module.exports = {
  mount,
  createComponent,
  activate: rinsed => rinsed.activate,
  Fragment,
  useState,
  ...elements
};
