import { events } from 'cauldronjs';
import { Material } from 'bukkit';

const WOODS = [
  Material.OAK_WOOD,
  Material.BIRCH_WOOD,
  Material.ACACIA_WOOD,
  Material.JUNGLE_WOOD,
  Material.SPRUCE_WOOD,
  Material.DARK_OAK_WOOD,
];

const LEAVES = {
  [Material.OAK_WOOD]: Material.OAK_LEAVES,
  [Material.BIRCH_WOOD]: Material.BIRCH_LEAVES,
  [Material.ACACIA_WOOD]: Material.ACACIA_LEAVES,
  [Material.JUNGLE_WOOD]: Material.JUNGLE_LEAVES,
  [Material.SPRUCE_WOOD]: Material.SPRUCE_LEAVES,
  [Material.DARK_OAK_WOOD]: Material.DARK_OAK_LEAVES,
};

const relatives = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

export default function treefallService() {
  events.on('blockbreak', (event) => {
    const player = event.getPlayer();
    if (!player) return;
    const block = event.getBlock();
    if (WOODS.indexOf(block.getType()) === -1) return;
    let baseBlock = block.getRelative(0, -1, 0);
    while (baseBlock.getType() === block.getType()) {
      baseBlock = baseBlock.getRelative(0, -1, 0);
    }
    if (
      baseBlock.getType() !== Material.DIRT ||
      baseBlock.getType() !== Material.GRASS_BLOCK
    )
      return;

    const woodBlocks = {};
    function getConnectedWoodBlocks(source, woodBlocks) {
      for (let relative of relatives) {
        const relativeBlocks = relative.map((vector) =>
          source.getRelative(vector[0], vector[1], vector[2])
        );
        let didAddAny = false;
        relativeBlocks.forEach((block) => {
          if (!woodBlocks[block.getLocation()]) {
            woodBlocks[block.getLocation()] = block;
            didAddAny = true;
          }
        });
        if (!didAddAny) {
          break;
        }
        relativeBlocks.forEach((block) =>
          getConnectedWoodBlocks(block, woodBlocks)
        );
      }
    }

    getConnectedWoodBlocks(block, woodBlocks);
    Object.values(woodBlocks).forEach((toBreak) => {
      if (!player.getInventory().getItemInMainHand()) return;
      setImmediate(() => {
        toBreak.breakNaturally(player.getInventory().getItemInMainHand());
      });
    });
  });
}
