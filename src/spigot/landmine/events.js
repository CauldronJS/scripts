import { getClaimFor, CLAIM_OPTIONS } from './claim';
import { getChunkCoordsForEntity } from './utils';
import cauldron from 'cauldron';
import { EntityType } from 'bukkit/entity';

const MOB_TYPES = [
  EntityType.CAVE_SPIDER,
  EntityType.SPIDER,
  EntityType.CREEPER,
  EntityType.SKELETON,
  EntityType.SKELETON_HORSE,
  EntityType.ZOMBIE,
  EntityType.ZOMBIE_HORSE,
  EntityType.ZOMBIE_VILLAGER,
  EntityType.BLAZE,
  EntityType.ENDERMAN,
  EntityType.GHAST,
  EntityType.VEX,
  EntityType.WITHER,
  EntityType.WITHER_SKELETON,
  EntityType.SLIME,
  EntityType.DROWNED,
  EntityType.MAGMA_CUBE,
  EntityType.PIG_ZOMBIE,
  EntityType.PHANTOM,
  EntityType.SILVERFISH
];

const ANIMAL_TYPS = [
  EntityType.BAT,
  EntityType.BEE,
  EntityType.CAT,
  EntityType.CHICKEN,
  EntityType.COD,
  EntityType.COW,
  EntityType.DOLPHIN,
  EntityType.DONKEY,
  EntityType.FOX,
  EntityType.HORSE,
  EntityType.LLAMA,
  EntityType.MULE,
  EntityType.MUSHROOM_COW,
  EntityType.OCELOT,
  EntityType.PANDA,
  EntityType.PARROT,
  EntityType.PIG,
  EntityType.POLAR_BEAR,
  EntityType.PUFFERFISH,
  EntityType.RABBIT,
  EntityType.SALMON,
  EntityType.SHEEP,
  EntityType.SQUID,
  EntityType.STRAY,
  EntityType.TRADER_LLAMA,
  EntityType.TROPICAL_FISH,
  EntityType.TURTLE,
  EntityType.WOLF
];

export default function registerEvents() {
  cauldron.events.on('creaturespawn', event => {
    console.log('Entity spawned');
    const entity = event.getEntity();
    if (!entity.getLocation) return true;
    const entityType = event.getEntityType();
    const chunkCoords = getChunkCoordsForEntity(entity);
    const claim = getClaimFor(chunkCoords);
    if (!claim) return true;

    if (
      claim.rules[CLAIM_OPTIONS.PVMOB] &&
      MOB_TYPES.indexOf(entityType) > -1
    ) {
      console.log('Cancelling spawn event');
      event.setCancelled(true);
    }
  });
}
