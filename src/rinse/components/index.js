<<<<<<< HEAD
class Component {
  constructor(props) {
    this.props = props;
    this.name = this.constructor.name;
    this.children = [];
    this.__rinseComponent = true;
  }

  setState(state) {
    this.state = { ...this.state, ...state };
  }
}

=======
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

>>>>>>> 590f0e09a739743728e5fe34f052244cbaf4add8
export default Component;