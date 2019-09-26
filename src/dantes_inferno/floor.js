import { Bukkit, World } from 'bukkit';

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

function floor(world, config) {}

export default floor;
