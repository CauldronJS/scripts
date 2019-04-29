import { identityHashCode } from '@java/java.lang.System';

class RinsedComponent {
  constructor (Component, attrs, children) {
    this.__Component = Component;
    this.__attrs = attrs;
    this.__children = children;
    this.__rinseComponent = true;
  }

  props () {
    return {
      ...this.__Component.defaultProps || {},
      ...this.__attrs,
      children: this.__children,
      __parent: this.__parent
    }
  }

  construct () {
    const props = this.props();
    const component = Function.bind(this.__Component, props);
    this.__children.forEach(child => child.construct());
  }
}

export function mount (component) {
  component.construct();
}

export function rinse (Component, attrs, ...children) {
  if (typeof Component !== 'function') {
    throw new Error('Component must be a function or have an "execute" prop');
  }
  // this function does not create the component. It will create
  // a special object that is used to compile and run on mount.
  const rinsed = new RinsedComponent(Component, attrs, children);
  return rinsed;
}
