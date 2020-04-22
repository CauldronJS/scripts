import { getCurrentComponent } from '../reconciler';

/**
 *
 * @param {*} defaultValue
 *
 * @returns {[any, (newState) => void]}
 */
export default function useState(defaultValue) {
  const instance = getCurrentComponent().instanceWrapper;
  instance.__state = defaultValue;
  const setState = newValue => (instance.__state = newValue);
  return [instance.__state, setState];
}
