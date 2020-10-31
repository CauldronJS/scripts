import { Material } from 'bukkit';
import { EntityType } from 'bukkit/entity';
import { ItemStack } from 'bukkit/inventory';
import { events } from 'cauldronjs';
import moment from 'moment';

export default function register() {
  return {
    name: 'Halloween',
    minDate: moment({ month: 10, day: 31 }),
    maxDate: moment({ month: 11, day: 1 }),
    setup(server) {
      events.on('entityspawn', (event) => {
        if (event.getEntityType() === EntityType.ZOMBIE) {
          event.getEntity().getEquipment().setHelmet(pumpkinHat);
        }
      });
    },
  };
}
