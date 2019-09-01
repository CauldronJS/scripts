const NMS_PATH = 'net.minecraft.server';
const CRAFT_BUKKIT_PATH = 'org.bukkit.craftbukkit';

export const minecraftVersion = () =>
  Bukkit.getServer()
    .getClass()
    .getPackage()
    .getName()
    .split('\\.')[3];

export const getNmsClass = name =>
  Java.type(`${NMS_PATH}.${minecraftVersion()}.${name}`);

export const getCraftBukkitClass = name =>
  Java.type(`${CRAFT_BUKKIT_PATH}.${minecraftVersion()}.${name}`);
