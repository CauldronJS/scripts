export const getChunkCoordsForEntity = entity => {
  const playerCoords = entity.getLocation().toVector();
  const x = Math.floor(playerCoords.getX() / 16);
  const z = Math.floor(playerCoords.getZ() / 16);
  return { x, z };
};
