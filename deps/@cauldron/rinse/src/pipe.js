// I'd like to figure out a way to allow functional components to do
// logic unhooking/destruction. Perhaps a hook?

export class Component {
  constructor(props) {
    this.props = props;
    this.state = Object.create(null);
    this.__rinseComponent = true;
  }

  componentDidMount() {}
  componentWillUpdate() {}
  componentWillUnmount() {}

  setState(newValues) {
    this.state = { ...this.state, ...newValues };
  }

  run() {
    throw new Error('Component must have a `run` method');
  }
}

export const mount = rinsed => {
  if (!rinsed) return null;
  const { component, props } = rinsed;
  if (!component.__canRemount) return null;

  let result;
  if (component.__rinseComponent) {
    component.componentDidMount();
    component.__canRemount = false;
    result = component.run();
  } else {
    result = component.apply({}, [props]);
  }

  if (typeof result === 'object') {
    if (Array.isArray(result)) {
      // it returned the children to be executed
      result.forEach(child => {
        child.props.__parent = rinsed;
        child.__manuallyMount();
      });
    } else {
      mount(result);
    }
  } else {
    mount(result);
  }
  return component;
};

export const unmount = component => {
  if (!component || !component.__rinseComponent) return;
  component.componentWillUnmount();
  const { children } = component.props;
  if (children) {
    children.forEach(unmount);
  }
};

export function rinse(Component, attrs, ..._children) {
  if (!Component) {
    throw new Error('Component cannot be undefined or null');
  }
  if (typeof Component !== 'function') {
    throw new Error('Component must be a function');
  }
  let children;
  if (
    typeof _children[0] === 'string' ||
    !isNaN(_children[0]) ||
    typeof _children[0] === 'boolean'
  ) {
    children = _children[0];
  } else if (typeof _children[0] === 'function') {
    children = _children[0];
  } else if (Array.isArray(_children)) {
    children = [..._children];
  }
  // this function does not create the component. It will create
  // a special object that is used to compile and run on mount.
  const props = { ...Component.defaultProps, ...attrs, children };
  const component =
    Component.prototype && Component.prototype.run
      ? new Component(props)
      : Component.bind(Component);
  component.__canRemount = true;
  const mount = () => mount(component);
  // mount is a shortcut to allow components to manually mount the
  // children, allowing any logic to be ran at the top instead of
  // top down. This can be useful if there is a specific state
  // inaccessible to the current component.
  return { component, props, mount };
}
