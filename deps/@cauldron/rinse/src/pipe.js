export class Component {
  constructor(props) {
    this.props = props;
    this.state = Object.create(null);
    this.__rinseComponent = true;
  }

  componentDidMount() {}
  componentWillUpdate() {}
  componentWillUnmount() {}

  run() {
    throw new Error('Component must have a `run` method');
  }
}

export const mount = rinsed => {
  if (!rinsed) {
    return;
  }
  const { component, props } = rinsed;
  let result;
  if (component.__rinseComponent) {
    component.componentDidMount();
    result = component.run();
  } else {
    result = component.apply({}, [props]);
  }
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
      : Component.bind({});
  // const component = boundComponent.apply(props, [props]);
  return { component, props };
}
