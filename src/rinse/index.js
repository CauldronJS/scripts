import Component from './component';
import {hook} from './pipe';

function Rinse(component, attrs, ...children) {

}

Rinse.hook = hook;

class Fragment extends Component {
  constructor() {
    super(null);
  }
}

Rinse.Component = Component;
Rinse.Fragment = Fragment;

export default Rinse;