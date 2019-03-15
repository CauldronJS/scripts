function Component(props, context) {
  const component = {
    props,
    context,
    refs: {},
    __rinseComponent: true
  }
  return component;
}

Component.prototype.setState = (partialState) => {
  this.state = {...this.state, ...partialState};
};

export default Component;