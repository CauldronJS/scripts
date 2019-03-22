import Component from './component';
import Fragment from './fragment';
import Pipe from './pipe';

/*
  Every time this function is called, the component is new. This function is
  solely in charge of creating the component object.
*/
function Rinse (component, attrs, ..._children) {
  if (typeof component !== 'function') {
    throw new Error('Component must be a function or have "render"');
  }
  let children;
  if (typeof _children[0] === 'string' || !isNaN(_children[0]) || typeof _children[0] === 'boolean') {
    children = _children[0];
  } else if (typeof _children[0] === 'function') {
    children = _children[0];
  } else {
    if (Array.isArray(_children)) {
      children = [].concat(children);
    }
  }
  component({ ...attrs, children });
}

Rinse.mount = Pipe.mount;

Rinse.Component = Component;
Rinse.Fragment = Fragment;

export default Rinse;
