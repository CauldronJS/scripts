export default class Component {
  constructor(props) {
    this.props = props;
    this.state = Object.create(null);
    this.__rinseComponent = true;
  }

  componentDidMount() {}
  componentWillUpdate() {
    return true;
  }
  componentWillUnmount() {}
}
