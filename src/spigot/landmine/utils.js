export const getChunkCoordsForEntity = entity => {
  const playerCoords = entity.getLocation().toVector();
  const x = Math.floor(playerCoords.getX() / 16);
  const z = Math.floor(playerCoords.getZ() / 16);
  const world = entity.getWorld().getName();
  return { x, z, world };
};
