import Component from './component';
import Fragment from './fragment';
import Pipe from './pipe';

/*
  Every time this function is called, the component is new. This function is
  solely in charge of creating the component object.
*/
function Rinse (component, attrs, ...children) {
  if (typeof component !== 'function') {
    throw new Error('Component must be a function or have an "execute" prop');
  }
  children.forEach(child => {
    if (child.__rinseComponent) {
      child.__parent = component;
    }
  });
  return new RinsedComponent(component, attrs, children);
}

class RinsedComponent {
  constructor (component, attrs, children) {
    this.__component = component;
    this.__attrs = attrs;
    this.__children = () => children.forEach(child => child.activate());
    this.__rinseComponent = true;
  }

  props () {
    return {
      ...this.__component.defaultProps || {},
      ...this.__attrs,
      children: this.__children,
      __parent: this.__parent
    }
  }

  activate () {
    return this.__component(this.props());
  }
}

Rinse.mount = Pipe.mount;
Rinse.activate = rinsed => rinsed.activate();

Rinse.Component = Component;
Rinse.Fragment = Fragment;

export default Rinse;
