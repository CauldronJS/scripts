// the reconciler is in charge of the scheduling for Rinse
import assert from 'assert';

const mountedComponents = new Map();

let currentComponent;
export const getCurrentComponent = () => currentComponent;
export const setCurrentComponent = component => (currentComponent = component);

export function useState(initialValue) {
  //
}

export function useEffect(fn, ignored) {
  //
}

export function useContext(context) {
  //
}

export function initialize(app) {
  assert(typeof app === 'function');
}
