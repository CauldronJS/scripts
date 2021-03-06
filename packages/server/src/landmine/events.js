import { getClaimFor } from './claim';
import { getProfileFor, CLAIM_OPTIONS } from './profile';
import { getChunkCoordsForEntity } from './utils';
import { events } from 'cauldronjs';
import { EntityType } from 'bukkit/entity';
import colors from '@cauldronjs/colors';
import { Bukkit } from 'bukkit';
import { UUID } from 'java/util';

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
  EntityType.WITCH,
  EntityType.SLIME,
  EntityType.DROWNED,
  EntityType.MAGMA_CUBE,
  EntityType.PIG_ZOMBIE,
  EntityType.PHANTOM,
  EntityType.SILVERFISH,
];

const ANIMAL_TYPES = [
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
  EntityType.WOLF,
];

export default function registerEvents() {
  events.on('creaturespawn', (event) => {
    const entity = event.getEntity();
    const entityType = event.getEntityType();
    const chunkCoords = getChunkCoordsForEntity(entity);
    const claim = getClaimFor(chunkCoords);
    if (!claim) return;
    const profile = getProfileFor(claim.owner);
    if (
      !profile.rules[CLAIM_OPTIONS.PVMOB] &&
      MOB_TYPES.indexOf(entityType) > -1
    ) {
      event.setCancelled(true);
    } else if (
      !profile.rules[CLAIM_OPTIONS.PVANIMAL] &&
      ANIMAL_TYPES.indexOf(entityType) > -1
    ) {
      event.setCancelled(true);
    }
  });

  events.on('entityspawn', (event) => {
    const entity = event.getEntity();
    const entityType = event.getEntityType();
    const chunkCoords = getChunkCoordsForEntity(entity);
    const claim = getClaimFor(chunkCoords);
    if (!claim) return;
    const profile = getProfileFor(claim.owner);
    if (
      !profile.rules[CLAIM_OPTIONS.PVMOB] &&
      MOB_TYPES.indexOf(entityType) > -1
    ) {
      event.setCancelled(true);
    }
  });

  events.on('entitycombust', (event) => {
    const entity = event.getEntity();
    const entityType = event.getEntityType();
    const chunkCoords = getChunkCoordsForEntity(entity);
    const claim = getClaimFor(chunkCoords);
    if (!claim) return;
    const profile = getProfileFor(claim.owner);
    if (
      !profile.rules[CLAIM_OPTIONS.PVMOB] &&
      MOB_TYPES.indexOf(entityType) > -1
    ) {
      entity.remove();
    }
  });

  events.on('entitydamagebyentity', (event) => {
    const entity = event.getEntity();
    const entityType = event.getEntityType();
    const damager = event.getDamager && event.getDamager();
    const damagerType = damager && damager.getType();
    if (
      (entityType !== EntityType.PLAYER && damagerType !== EntityType.PLAYER) ||
      !damager
    )
      return;
    const mob = entityType !== EntityType.PLAYER ? entity : damager;
    const chunkCoords = getChunkCoordsForEntity(mob);
    const claim = getClaimFor(chunkCoords);
    if (!claim) return;
    const profile = getProfileFor(claim.owner);
    if (
      !profile.rules[CLAIM_OPTIONS.PVMOB] &&
      MOB_TYPES.indexOf(mob.getType()) > -1
    ) {
      mob.remove();
      event.setCancelled(true);
    }
  });

  events.on('entityexplode', (event) => {
    const entity = event.getEntity();
    if (entity.getType() !== EntityType.CREEPER) return;
    const chunkCoords = getChunkCoordsForEntity(entity);
    const claim = getClaimFor(chunkCoords);
    if (!claim) return;
    const profile = getProfileFor(claim.owner);
    if (!profile.rules[CLAIM_OPTIONS.PVMOB]) {
      entity.remove();
      event.setCancelled(true);
    }
  });

  events.on('entityshootbow', (event) => {
    const entity = event.getEntity();
    if (entity.getType() !== EntityType.SKELETON) return;
    const chunkCoords = getChunkCoordsForEntity(entity);
    const claim = getClaimFor(chunkCoords);
    if (!claim) return;
    const profile = getProfileFor(claim.owner);
    if (!profile.rules[CLAIM_OPTIONS.PVMOB]) {
      entity.remove();
      event.setCancelled(true);
    }
  });

  events.on('blockbreak', (event) => {
    const player = event.getPlayer();
    const chunkCoords = getChunkCoordsForEntity(player);
    const profile = getProfileFor(player.getUniqueId().toString());
    if (profile.claims[chunkCoords]) return;
    const claim = getClaimFor(chunkCoords);
    if (
      !claim ||
      claim.owner === player.getUniqueId().toString() ||
      player.hasPermission('landmine.admin') ||
      player.isOp()
    )
      return;
    const claimProfile = getProfileFor(claim?.owner);

    if (!claimProfile.rules[CLAIM_OPTIONS.BLOCK_BREAK]) {
      player.sendMessage(colors.red("You don't have permission to do that!"));
      event.setCancelled(true);
    }
  });

  events.on('blockplace', (event) => {
    const player = event.getPlayer();
    const chunkCoords = getChunkCoordsForEntity(player);
    const profile = getProfileFor(player.getUniqueId().toString());
    if (profile.claims[chunkCoords]) return;
    const claim = getClaimFor(chunkCoords);
    if (
      !claim ||
      claim.owner === player.getUniqueId().toString() ||
      player.hasPermission('landmine.admin') ||
      player.isOp()
    )
      return;
    const claimProfile = getProfileFor(claim?.owner);

    if (!claimProfile.rules[CLAIM_OPTIONS.BLOCK_PLACE]) {
      player.sendMessage(colors.red("You don't have permission to do that!"));
      event.setCancelled(true);
    }
  });

  const currentlyInLand = Object.create(null);

  events.on('playermove', (event) => {
    const player = event.getPlayer();
    const chunkCoords = getChunkCoordsForEntity(player);
    const claim = getClaimFor(chunkCoords);
    if (!claim) {
      if (!currentlyInLand[player.getUniqueId()]) return;
      delete currentlyInLand[player.getUniqueId()];
      player.sendMessage(
        colors.green(`[LandMine] ${colors.gray('~ Wilderness')}`)
      );
      return;
    }
    if (currentlyInLand[player.getUniqueId()] !== claim.owner) {
      currentlyInLand[player.getUniqueId()] = claim.owner;
      player.sendMessage(
        colors.green(
          `[LandMine] ${colors.gray(
            `You've entered land owned by ${colors.aqua(
              Bukkit.getOfflinePlayer(UUID.fromString(claim.owner)).getName()
            )}`
          )}`
        )
      );
    }
  });
}
