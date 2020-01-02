import Fragment from './fragment';
import { mount, unmount, rinse } from './pipe';

module.exports = {
  mount,
  unmount,
  createComponent: rinse,
  activate: rinsed => rinsed.activate,
  Fragment
};
