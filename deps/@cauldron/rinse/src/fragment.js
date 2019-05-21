import Component from './component';

export default class Fragment extends Component {
  constructor(props) {
    super(props);
    this.__isFrag = true;
  }

  run() {
    return this.props.children;
  }
}
