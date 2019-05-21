import Rinse, { Component } from '@cauldron/rinse';
import { map } from './utils';
import { Click } from './event-service';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.window = props.__parent;
    this._inventory = [];
  }

  addItem(item, options = null, index = this._inventory.length) {
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
  }

  run() {
    return (
      <>
        {map(this.props.children, (child, i) => (
          <Click index={i}>{child}</Click>
        ))}
      </>
    );
  }
}
