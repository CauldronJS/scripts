function Component(props, context) {
  const component = {
    props,
    context,
    refs: {},
    __rinseComponent: true
  }
  return component;
}

export default Component;
