import { Component } from '@cauldron/rinse';
import { createWindow, deleteWindow } from './event-service';

export default class Window extends Component {
  constructor(props) {
    super(props);
    const { name, height } = props;
    this.$$base = Bukkit.createInventory(null, height * 9, name);
    this.id = -1;
  }

  componentDidMount() {
    this.id = createWindow(this);
  }

  componentWillUnmount() {
    deleteWindow(this.id);
  }

  pages = null;
  currentPageByUser = Object.create(null);

  run() {
    const { children } = this.props.children;
    this.pages = children.map(child => child.mount());
  }
}
