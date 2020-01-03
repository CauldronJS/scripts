import { FRAG_SYMBOL } from './fragment';

// I'd like to figure out a way to allow functional components to do
// logic unhooking/destruction. Perhaps a hook?

/**
 *
 * @param {{component: (props) => any, props: any}} rinsed
 */
export const mount = rinsed => {
  if (!rinsed) return null;
  const { component, props } = rinsed;
  if (!component.__canRemount) return null;

  const result = component.apply(rinsed, [props]);

  if (typeof result === 'object') {
    if (Array.isArray(result)) {
      // find the next non-frag parent
      let parent = rinsed;
      while (parent[FRAG_SYMBOL] && parent.props.parent) {
        parent = parent.props.parent;
      }
      // it returned the children to be executed
      result.forEach(child => {
        child.props.parent = parent;
        mount(child);
      });
    } else {
      mount(result);
    }
  } else {
    mount(result);
  }
  return component;
};

export const unmount = component => {};

export function rinse(Component, attrs, ...children) {
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
  component.__canRemount = true;
  const mount = () => mount(component);
  // mount is a shortcut to allow components to manually mount the
  // children, allowing any logic to be ran at the top instead of
  // top down. This can be useful if there is a specific state
  // inaccessible to the current component.
  return { component, props, mount };
}
