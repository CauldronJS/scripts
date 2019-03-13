class Component {
  constructor(props) {
    this.props = props;
    this.name = this.constructor.name;
    this.children = [];
  }

  setState(state) {
    this.state = {...this.state, ...state};
  }
}

export default Component;