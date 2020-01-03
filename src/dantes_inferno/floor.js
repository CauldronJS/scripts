import { EventEmitter } from 'events';
import { Bukkit, World } from 'bukkit';
import { events } from '@cauldron';
import useConfig from '@cauldron/config';

const DEFAULT_CONFIG = new FloorState();
const CONFIG_SYMBOL = Symbol('floorConfig');

const [floorConfig, updateFloorConfig] = useConfig('floors');

class FloorState {
  constructor(
    config = {
      difficulty: 1,
      willTimeUpdate: true,
      timeSet: 0,
      allowedMobs: [],
      deniedMobs: [],
      allowAnimals: true
    }
  ) {
    this.difficulty = config.difficulty;
    this.willTimeUpdate = config.willTimeUpdate;
    this.timeSet = config.timeSet;
    this.allowedMobs = config.allowedMobs;
    this.deniedMobs = config.deniedMobs;
    this.allowAnimals = config.allowAnimals;
  }
}

class Floor extends EventEmitter {
  constructor(world, config = DEFAULT_CONFIG) {
    super();
    if (typeof world === 'string') {
      world = Bukkit.getWorld(world);
    }
    if (!(world instanceof World)) {
      throw new Error(
        'Invalid argument for world: must be a world name or world object'
      );
    }
    this.world = world;
    this[CONFIG_SYMBOL] = floorConfig[this.name] || config;
    this.saveConfig();
  }

  get name() {
    return this.world.getName();
  }

  get config() {
    return this[CONFIG_SYMBOL];
  }

  saveConfig() {
    updateFloorConfig({ ...floorConfig, [this.name]: this.config });
  }
}

Floor.FloorState = FloorState;

export default Floor;
