import Component from './component';
import Fragment from './fragment';
import { mount } from './pipe';

/*
  Every time this function is called, the component is new. This function is
  solely in charge of creating the component object.
*/
function Rinse(component, attrs, ...children) {
  const compiledComponent = component({...attrs, children});
  return compiledComponent;
}
Rinse.mount = mount;

Rinse.Component = Component;
Rinse.Fragment = Fragment;

export default Rinse;