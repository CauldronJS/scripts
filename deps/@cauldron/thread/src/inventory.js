import Rinse, { Component } from '@cauldron/rinse';

const map = (collection, handler) => {
  const result = [];
  for (let i = 0; i < collection.length; ++i) {
    const item = collection[i];
    result.push(handler(item, i));
  }

  return result;
};

const Click = props => {
  const { index, children, __parent } = props;
  if (__parent) {
  }
  return children;
};

export default class Inventory extends Component {
  inventory = [];

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
