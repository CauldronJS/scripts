import { identityHashCode } from '@java/java.lang.System';

export const mount = app => {

};

const validateComponent = (component, parent) => {
  if (!component.render) {
    // either we don't have a render function or it's a functional component
  } else {

  }
}

const getComponentHashcode = component => identityHashCode(component);

function Pipe() {

}

Pipe._cachedComponents = Object.create(null);