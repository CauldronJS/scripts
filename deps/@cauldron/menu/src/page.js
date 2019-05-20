import { Component, mount } from '@cauldron/rinse';

const noop = () => false;

export default class Page extends Component {
  constructor(props) {
    super(props);
    const { __parent } = props;
    this.window = __parent;
    this._inventory = [];
    this._boundActions = [];
  }

  // eslint-disable-next-line max-params
  addItem(
    item,
    options = null,
    leftClick = noop,
    rightClick = noop,
    index = this._inventory.length
  ) {
    if (options) {
      const oldMeta = item.itemMeta;
      oldMeta.displayName = options.name;
      if (options.lore) {
        oldMeta.setLore(
          Array.isArray(options.lore) ? options.lore : [options.lore]
        );
      }
      item.itemMeta = oldMeta;
    }

    this._inventory[index] = item;
    this._boundActions[index] = {
      leftClick,
      rightClick
    };
    this.emit('itemadded', item, index);
  }

  remove(index) {
    delete this._boundActions[index];
    delete this._inventory[index];
    this.emit('itemremoved', index);
  }

  getItems() {
    return this._inventory;
  }

  getItem(index) {
    return { ...this._inventory[index], ...this._boundActions[index] };
  }

  run() {
    const items = this.props.children(mount);
  }
}
