const Inventory = props => {
  const { height, name, children } = props;
  const window = Bukkit.createInventory(null, height * 9, name);
  children.forEach(child => {
    const item = child.mount();
    if (child.props.x || child.props.y) {
      const { x = 0, y = 0 } = child.props;
      const position = x * y;
      window.setItem(position, item);
    }
  });
  return window;
};

export default Inventory;
