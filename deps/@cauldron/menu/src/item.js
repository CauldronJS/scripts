import Rinse from '@caulron/rinse';
import { ItemStack } from '@cauldron/thread';
import { Click } from './event-service';

const noop = () => false;

const Item = props => {
  const { index, onLeftClick, onRightClick } = props;
  return (
    <Click index={index} onLeftClick={onLeftClick} onRightClick={onRightClick}>
      <ItemStack {...props} />
    </Click>
  );
};

Item.defaultProps = {
  lore: [],
  onLeftClick: noop,
  onRightClick: noop
};

export default Item;
