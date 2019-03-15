import { identityHashCode } from '@java/java.lang.System';

function Pipe() {
  
}

Pipe._mountedApp = null;
Pipe._cachedComponents = Object.create(null);

Pipe._unmountComponent = component => {
  if (!component) return;
  const hash = identityHashCode(component);
  const {children} = component.props;
  if (children) {
    children.forEach(Pipe._unmountComponent);
  }
  delete Pipe._cachedComponents[hash];
}

Pipe._mountComponent = component => {
  if (!component) return;
  if (typeof component === 'function') {
    if (component.render) {
      // class component
      
    }
  }
}

export const mount = App => {
  if (Pipe._mountedApp) {
    Pipe._mountedApp.componentWillUnmount();
    for (let key in Pipe._cachedComponents) {
      const child = Pipe._cachedComponents[key];
      if (child && child.componentWillUnmount) {
        child.componentWillUnmount();
        delete Pipe._cachedComponents[key];
      }
    }
  }
  Pipe._mountedApp = new App();
};

export const push = component => {

}