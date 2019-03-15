import Component from './component';
import Fragment from './fragment';
import { mount } from './pipe';

function Rinse(component, attrs, ...children) {

}

Rinse.mount = mount;

Rinse.Component = Component;
Rinse.Fragment = Fragment;

export default Rinse;