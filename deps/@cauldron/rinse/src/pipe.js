import { identityHashCode } from '@java/java.lang.System';

export const mount = rinsed => {
  if (!rinsed) return;
  const result = rinsed.component(rinsed.props);
  if (typeof result === 'object') {
    if (Array.isArray(result)) {
      // it returned the children to be executed
      result.forEach(child => {
        child.props.__parent = rinsed;
        mount(child);
      });
    } else {
      mount(result);
    }
  } else {
    mount(result);
  }
}

export function rinse(Component, attrs, ..._children) {
  if (!Component) {
    throw new Error('Component cannot be undefined or null');
  }
  if (typeof Component !== 'function') {
    throw new Error('Component must be a function');
  }
  // this function does not create the component. It will create
  // a special object that is used to compile and run on mount.
  const component = Component.bind({});
  component.__rinseComponent = true;
  let children;
  if (
    typeof _children[0] === 'string' ||
    !isNaN(_children[0]) ||
    typeof _children[0] === 'boolean') {
    children = _children[0];
  } else if (typeof _children[0] === 'function') {
    children = _children[0];
  } else {
    if (Array.isArray(_children)) {

      children = [..._children]
    }
  }
  const props = { ...Component.defaultProps, ...attrs, children };
  // const component = boundComponent.apply(props, [props]);
  return { component, props };
}
