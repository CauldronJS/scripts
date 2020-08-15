import { FRAG_SYMBOL } from './fragment';
import { VirtualTree, getCurrentVtreeInstance, Rinsed } from './vtree';
import Rinsable, { RinseProps } from './rinsable';

/**
 * Mounts an app to the virtual tree
 *
 * @param {Rinsed} rinsed
 * @param {string} namespace
 */
export const mount = (rinsed: Rinsed, namespace: string): VirtualTree => {
  if (!rinsed) return null;
  const tree = new VirtualTree(namespace);
  tree.mount(rinsed);
  tree.startWatch();
  return tree;
};

export function createComponent(
  Component: Rinsable,
  attrs: any,
  ...children: Rinsable[]
): Rinsed {
  if (!Component) {
    throw new Error('Component cannot be undefined or null');
  }
  if (typeof Component !== 'function') {
    throw new Error('Component must be a function');
  }

  // this function does not create the component. It will create
  // a special object that is used to compile and run on mount.
  const props = {
    ...Component.defaultProps,
    ...attrs,
    children: Array.isArray(children) ? children : children[0]
  };
  const component = Component.bind(Component);
  Object.defineProperties(
    component,
    Object.getOwnPropertyDescriptors(Component)
  );
  return { component, props };
}
