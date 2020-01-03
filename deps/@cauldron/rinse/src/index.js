import Fragment from './fragment';
import { mount, unmount, rinse } from './pipe';
import elements from './elements';

module.exports = {
  mount,
  unmount,
  createComponent: rinse,
  activate: rinsed => rinsed.activate,
  Fragment,
  ...elements
};
