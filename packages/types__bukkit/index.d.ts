declare module 'bukkit' {
  import {
    ItemStack,
    Inventory,
    InventoryType,
    InventoryHolder,
  } from 'bukkit/inventory';
  import {
    CommandSender,
    ConsoleCommandSender,
    PluginCommand,
  } from 'bukkit/command';
  import {
    KeyedBossBar,
    BossBar,
    BarColor,
    BarStyle,
    BarFlag,
  } from 'bukkit/boss';
  import { BukkitScheduler } from 'bukkit/scheduler';
  import { UUID } from 'java/util';
  import { Entity, Player } from 'bukkit/entity';
  import { Plugin, PluginManager } from 'bukkit/plugin';
  import { Block } from 'bukkit/block';
  import { BlockData } from 'bukkit/block/data';
  import { RayTraceResult, Vector } from 'bukkit/util';
  import { Advancement } from 'bukkit/advancement';
  import { HelpMap } from 'bukkit/help';

  export const Bukkit: Server;

  export interface Server {
    addRecipe(recipe: Recipe): boolean;
    banIP(address: string): void;
    broadcast(message: string, permission: string): number;
    broadcastMessage(message: string): number;
    clearRecipes(): void;
    createBlockData(data: string): BlockData;
    createBlockData(material: Material, data: string): BlockData;
    createBossBar(
      title: string,
      color: BarColor,
      style: BarStyle,
      ...flags: BarFlag[]
    ): BossBar;
    createChunkData(world: World): void;
    createExplorerMap(
      world: World,
      location: Location,
      structureType: StructureType,
      radius?: number,
      findUnexplored?: boolean
    ): ItemStack;
    createInventory(
      owner: InventoryHolder,
      size: number,
      title?: string
    ): Inventory;
    createInventory(
      owner: InventoryHolder,
      type: InventoryType,
      title?: string
    ): Inventory;
    createMap(world: World): MapView;
    createMerchant(title: string): Merchant;
    createWorld(creator: WorldCreator): World;
    dispatchCommand(sender: CommandSender, commandLine: string): boolean;
    getAdvancement(key: NamespacedKey): Advancement;
    getAllowEnd(): boolean;
    getAllowFlight(): boolean;
    getAllowNether(): boolean;
    getAmbientSpawnLimit(): number;
    getAnimalSpawnLimit(): number;
    getBanList(type: BanList.Type): BanList;
    getBannedPlayers(): OfflinePlayer[];
    getBossBar(key: NamespacedKey): KeyedBossBar;
    getBossBars(): Iterator<KeyedBossBar>;
    getBukkitVersion(): string;
    getCommandAliases(): Map<string, string[]>;
    getConnectionThrottle(): number;
    getConsoleSender(): ConsoleCommandSender;
    getDefaultGameMode(): GameMode;
    getEntity(uuid: UUID): Entity;
    getGenerateStructures(): boolean;
    getHelpMap(): HelpMap;
    getIdleTimeout(): number;
    getIp(): string;
    getIPBans(): string[];
    getItemFactory(): ItemFactory;
    getLogger(): Logger;
    getLootTable(key: NamespacedKey): LootTable;
    getMap(id: number): MapView;
    getMaxPlayers(): number;
    getMessenger(): Messenger;
    getMonsterSpawnLimit(): number;
    getMotd(): string;
    getName(): string;
    getOfflinePlayer(name: string): OfflinePlayer;
    getOfflinePlayer(id: UUID): OfflinePlayer;
    getOnlineMode(): boolean;
    getOperators(): string[];
    getPlayer(name: string): Player;
    getPlayer(id: UUID): Player;
    getPlayerExact(name: string): Player;
    getPluginCommand(name: string): PluginCommand;
    getPluginManager(): PluginManager;
    getPort(): number;
    getRecipesFor(result: ItemStack): Recipe[];
    getScheduler(): BukkitScheduler;
    getScoreboardManager(): ScoreboardManager;
    getServer(): Server;
    getServerIcon(): CachedServerIcon;
    getServicesManager(): ServicesManager;
    getShutdownMessage(): string;
    getSpawnRadius(): number;
    getTag<T extends Key>(
      registry: string,
      tag: NamespacedKey,
      clazz: Class<T>
    ): Tag<T>;
    getTags<T extends Key>(registry: string, clazz: Class<T>): Tag<T>;
    getTicksPerAmbientSpawns(): number;
    getTicksPerAnimalSpawns(): number;
    getTicksPerMonsterSpawns(): number;
    getTicksPerWaterAmbientSpawns(): number;
    getTicksPerWaterSpawns(): number;
    getUpdateFolder(): File;
    getVersion(): string;
    getViewDistance(): number;
    getWarningState(): any;
    getWaterAmbientSpawnLimit(): number;
    getWaterAnimalSpawnLimit(): number;
    getWhiteListedPlayers(): number;
    getWorld(name: string): World;
    getWorld(uid: UUID): World;
    getWorldContainer(): File;
    getWorlds(): World[];
    getWorldType(): string;
    hasWhitelist(): boolean;
    isHardcore(): boolean;
    isPrimaryThread(): boolean;
    loadServerIcon(image: any): CachedServerIcon;
    loadServerIcon(file: File): CachedServerIcon;
    matchPlayer(name: string): Player[];
    recipeItterator(): Iterator<Recipe>;
    reload(): void;
    reloadData(): void;
    reloadWhitelist(): void;
    removeBossBar(key: NamespacedKey): boolean;
    removeRecipe(key: NamespacedKey): boolean;
    resetRecipes(): void;
    savePlayers(): void;
    selectEntities(sender: CommandSender, selector: string): Entity[];
    setDefaultGameMode(mode: GameMode): void;
    setIdleTimeout(threshold: number): void;
    setSpawnRadius(value: number): void;
    setWhitelist(value: boolean): void;
    shutdown(): void;
    unloadWorld(name: string, save: boolean): boolean;
    unloadWorld(world: World, save: boolean): boolean;
  }

  export class Color {}

  export class FireworkEffect {}

  export class GameRule {}

  export class Location {
    constructor(world: World, x: number, y: number, z: number);
    constructor(
      world: World,
      x: number,
      y: number,
      z: number,
      pitch: number,
      yaw: number
    );
    add(x: number, y: number, z: number): Location;
    add(loc: Location): Location;
    add(vec: Vector): Location;
    static deserialize(args: Map<string, object>): Location;
    getBlock(): Block;
    getBlockX(): number;
    getBlockY(): number;
    getBlockZ(): number;
    getChunk(): Chunk;
    getDirection(): Vector;
    getPitch(): number;
    getYaw(): number;
    getWorld(): World;
    getX(): number;
    getY(): number;
    getZ(): number;
    serialize(): Map<string, object>;
  }

  export class NamespacedKey {
    static BUKKIT: string;
    static MINECRAFT: string;

    constructor(plugin: Plugin, key: string);
    getKey(): string;
    getNamespace(): string;
    static minecraft(key: string): NamespacedKey;
    /**
     * @deprecated Should never be used by plugins, for internal use only
     */
    static randomKey(): NamespacedKey;
  }

  export class Note {}

  export class StructureType {}

  export interface BanEntry {}

  export interface BanList {}

  export namespace BanList {
    export enum Type {}
  }

  export interface BlockChangeDelegate {}

  export interface Chunk {}

  export interface ChunkSnapshot {}

  export interface Keyed {}

  export interface Nameable {
    getCustomName(): string;
    setCustomName(name: string): void;
  }

  export interface OfflinePlayer {
    decrementStatistic(statistic: Statistic): void;
    decrementStatistic(statistic: Statistic, amount: number): void;
    getBedSpawnLocation(): Location;
    getFirstPlayed(): number;
    getLastPlayed(): number;
    getName(): string;
    getPlayer(): Player;
    getStatistic(statistic: Statistic): number;
    getUniqueId(): UUID;
    hasPlayedBefore(): boolean;
    isBanned(): boolean;
    isOnline(): boolean;
    isWhitelisted(): boolean;
  }

  export interface Raid {}

  export interface Register {}

  export interface Server {}

  export interface Tag {}

  export interface UnsafeValues {}

  export interface World {}

  export interface WorldBorder {}

  export enum Achievement {}

  export enum Art {}

  export enum Axis {}

  export enum ChatColor {}

  export enum CoalType {}

  export enum CropState {}

  export enum Difficulty {
    EASY,
    HARD,
    NORMAL,
    PEACEFUL,
  }

  export enum DyeColor {}

  export enum Effect {}

  export module Effect {
    export enum Type {}
  }

  export enum EntityEffect {}

  export module FireworkEffect {
    export enum Type {}
  }

  export enum FluidCollisionMode {}

  export enum GameMode {
    ADVENTURE,
    CREATIVE,
    SPECTATOR,
    SURVIVAL,
  }

  export enum GrassSpecies {}

  export enum Instrument {}

  export class Material {
    private constructor();
    createBlockData(): BlockData;
    createBlockData(data: string): BlockData;
    getBlastResistance(): number;
    getCraftingRemainingTime(): Material;
    getHardness(): number;
    getKey(): NamespacedKey;
    getMaxDurability(): number;
    getMaxStackSize(): number;
    hasGravity(): boolean;
    isAir(): boolean;
    isBlock(): boolean;
    isBurnable(): boolean;
    isEdible(): boolean;
    isFlammable(): boolean;
    isFuel(): boolean;
    isInteractable(): boolean;
    isItem(): boolean;
    isLegacy(): boolean;
    isOccluding(): boolean;
    isRecord(): boolean;
    isSolid(): boolean;
    isTransparent(): boolean;
    static matchMaterial(name: string): Material;
    static matchMaterial(name: string, legacy: boolean): Material;

    static AIR: Material;
    static STONE: Material;
    static GRANITE: Material;
    static POLISHED_GRANITE: Material;
    static DIORITE: Material;
    static POLISHED_DIORITE: Material;
    static ANDESITE: Material;
    static POLISHED_ANDESITE: Material;
    static GRASS_BLOCK: Material;
    static DIRT: Material;
    static COARSE_DIRT: Material;
    static PODZOL: Material;
    static CRIMSON_NYLIUM: Material;
    static WARPED_NYLIUM: Material;
    static COBBLESTONE: Material;
    static OAK_PLANKS: Material;
    static SPRUCE_PLANKS: Material;
    static BIRCH_PLANKS: Material;
    static JUNGLE_PLANKS: Material;
    static ACACIA_PLANKS: Material;
    static DARK_OAK_PLANKS: Material;
    static CRIMSON_PLANKS: Material;
    static WARPED_PLANKS: Material;
    static OAK_SAPLING: Material;
    static SPRUCE_SAPLING: Material;
    static BIRCH_SAPLING: Material;
    static JUNGLE_SAPLING: Material;
    static ACACIA_SAPLING: Material;
    static DARK_OAK_SAPLING: Material;
    static BEDROCK: Material;
    static SAND: Material;
    static RED_SAND: Material;
    static GRAVEL: Material;
    static GOLD_ORE: Material;
    static IRON_ORE: Material;
    static COAL_ORE: Material;
    static NETHER_GOLD_ORE: Material;
    static OAK_LOG: Material;
    static SPRUCE_LOG: Material;
    static BIRCH_LOG: Material;
    static JUNGLE_LOG: Material;
    static ACACIA_LOG: Material;
    static DARK_OAK_LOG: Material;
    static CRIMSON_STEM: Material;
    static WARPED_STEM: Material;
    static STRIPPED_OAK_LOG: Material;
    static STRIPPED_SPRUCE_LOG: Material;
    static STRIPPED_BIRCH_LOG: Material;
    static STRIPPED_JUNGLE_LOG: Material;
    static STRIPPED_ACACIA_LOG: Material;
    static STRIPPED_DARK_OAK_LOG: Material;
    static STRIPPED_CRIMSON_STEM: Material;
    static STRIPPED_WARPED_STEM: Material;
    static STRIPPED_OAK_WOOD: Material;
    static STRIPPED_SPRUCE_WOOD: Material;
    static STRIPPED_BIRCH_WOOD: Material;
    static STRIPPED_JUNGLE_WOOD: Material;
    static STRIPPED_ACACIA_WOOD: Material;
    static STRIPPED_DARK_OAK_WOOD: Material;
    static STRIPPED_CRIMSON_HYPHAE: Material;
    static STRIPPED_WARPED_HYPHAE: Material;
    static OAK_WOOD: Material;
    static SPRUCE_WOOD: Material;
    static BIRCH_WOOD: Material;
    static JUNGLE_WOOD: Material;
    static ACACIA_WOOD: Material;
    static DARK_OAK_WOOD: Material;
    static CRIMSON_HYPHAE: Material;
    static WARPED_HYPHAE: Material;
    static OAK_LEAVES: Material;
    static SPRUCE_LEAVES: Material;
    static BIRCH_LEAVES: Material;
    static JUNGLE_LEAVES: Material;
    static ACACIA_LEAVES: Material;
    static DARK_OAK_LEAVES: Material;
    static SPONGE: Material;
    static WET_SPONGE: Material;
    static GLASS: Material;
    static LAPIS_ORE: Material;
    static LAPIS_BLOCK: Material;
    static DISPENSER: Material;
    static SANDSTONE: Material;
    static CHISELED_SANDSTONE: Material;
    static CUT_SANDSTONE: Material;
    static NOTE_BLOCK: Material;
    static POWERED_RAIL: Material;
    static DETECTOR_RAIL: Material;
    static STICKY_PISTON: Material;
    static COBWEB: Material;
    static GRASS: Material;
    static FERN: Material;
    static DEAD_BUSH: Material;
    static SEAGRASS: Material;
    static SEA_PICKLE: Material;
    static PISTON: Material;
    static WHITE_WOOL: Material;
    static ORANGE_WOOL: Material;
    static MAGENTA_WOOL: Material;
    static LIGHT_BLUE_WOOL: Material;
    static YELLOW_WOOL: Material;
    static LIME_WOOL: Material;
    static PINK_WOOL: Material;
    static GRAY_WOOL: Material;
    static LIGHT_GRAY_WOOL: Material;
    static CYAN_WOOL: Material;
    static PURPLE_WOOL: Material;
    static BLUE_WOOL: Material;
    static BROWN_WOOL: Material;
    static GREEN_WOOL: Material;
    static RED_WOOL: Material;
    static BLACK_WOOL: Material;
    static DANDELION: Material;
    static POPPY: Material;
    static BLUE_ORCHID: Material;
    static ALLIUM: Material;
    static AZURE_BLUET: Material;
    static RED_TULIP: Material;
    static ORANGE_TULIP: Material;
    static WHITE_TULIP: Material;
    static PINK_TULIP: Material;
    static OXEYE_DAISY: Material;
    static CORNFLOWER: Material;
    static LILY_OF_THE_VALLEY: Material;
    static WITHER_ROSE: Material;
    static BROWN_MUSHROOM: Material;
    static RED_MUSHROOM: Material;
    static CRIMSON_FUNGUS: Material;
    static WARPED_FUNGUS: Material;
    static CRIMSON_ROOTS: Material;
    static WARPED_ROOTS: Material;
    static NETHER_SPROUTS: Material;
    static WEEPING_VINES: Material;
    static TWISTING_VINES: Material;
    static SUGAR_CANE: Material;
    static KELP: Material;
    static BAMBOO: Material;
    static GOLD_BLOCK: Material;
    static IRON_BLOCK: Material;
    static OAK_SLAB: Material;
    static SPRUCE_SLAB: Material;
    static BIRCH_SLAB: Material;
    static JUNGLE_SLAB: Material;
    static ACACIA_SLAB: Material;
    static DARK_OAK_SLAB: Material;
    static CRIMSON_SLAB: Material;
    static WARPED_SLAB: Material;
    static STONE_SLAB: Material;
    static SMOOTH_STONE_SLAB: Material;
    static SANDSTONE_SLAB: Material;
    static CUT_SANDSTONE_SLAB: Material;
    static PETRIFIED_OAK_SLAB: Material;
    static COBBLESTONE_SLAB: Material;
    static BRICK_SLAB: Material;
    static STONE_BRICK_SLAB: Material;
    static NETHER_BRICK_SLAB: Material;
    static QUARTZ_SLAB: Material;
    static RED_SANDSTONE_SLAB: Material;
    static CUT_RED_SANDSTONE_SLAB: Material;
    static PURPUR_SLAB: Material;
    static PRISMARINE_SLAB: Material;
    static PRISMARINE_BRICK_SLAB: Material;
    static DARK_PRISMARINE_SLAB: Material;
    static SMOOTH_QUARTZ: Material;
    static SMOOTH_RED_SANDSTONE: Material;
    static SMOOTH_SANDSTONE: Material;
    static SMOOTH_STONE: Material;
    static BRICKS: Material;
    static TNT: Material;
    static BOOKSHELF: Material;
    static MOSSY_COBBLESTONE: Material;
    static OBSIDIAN: Material;
    static TORCH: Material;
    static END_ROD: Material;
    static CHORUS_PLANT: Material;
    static CHORUS_FLOWER: Material;
    static PURPUR_BLOCK: Material;
    static PURPUR_PILLAR: Material;
    static PURPUR_STAIRS: Material;
    static SPAWNER: Material;
    static OAK_STAIRS: Material;
    static CHEST: Material;
    static DIAMOND_ORE: Material;
    static DIAMOND_BLOCK: Material;
    static CRAFTING_TABLE: Material;
    static FARMLAND: Material;
    static FURNACE: Material;
    static LADDER: Material;
    static RAIL: Material;
    static COBBLESTONE_STAIRS: Material;
    static LEVER: Material;
    static STONE_PRESSURE_PLATE: Material;
    static OAK_PRESSURE_PLATE: Material;
    static SPRUCE_PRESSURE_PLATE: Material;
    static BIRCH_PRESSURE_PLATE: Material;
    static JUNGLE_PRESSURE_PLATE: Material;
    static ACACIA_PRESSURE_PLATE: Material;
    static DARK_OAK_PRESSURE_PLATE: Material;
    static CRIMSON_PRESSURE_PLATE: Material;
    static WARPED_PRESSURE_PLATE: Material;
    static POLISHED_BLACKSTONE_PRESSURE_PLATE: Material;
    static REDSTONE_ORE: Material;
    static REDSTONE_TORCH: Material;
    static SNOW: Material;
    static ICE: Material;
    static SNOW_BLOCK: Material;
    static CACTUS: Material;
    static CLAY: Material;
    static JUKEBOX: Material;
    static OAK_FENCE: Material;
    static SPRUCE_FENCE: Material;
    static BIRCH_FENCE: Material;
    static JUNGLE_FENCE: Material;
    static ACACIA_FENCE: Material;
    static DARK_OAK_FENCE: Material;
    static CRIMSON_FENCE: Material;
    static WARPED_FENCE: Material;
    static PUMPKIN: Material;
    static CARVED_PUMPKIN: Material;
    static NETHERRACK: Material;
    static SOUL_SAND: Material;
    static SOUL_SOIL: Material;
    static BASALT: Material;
    static POLISHED_BASALT: Material;
    static SOUL_TORCH: Material;
    static GLOWSTONE: Material;
    static JACK_O_LANTERN: Material;
    static OAK_TRAPDOOR: Material;
    static SPRUCE_TRAPDOOR: Material;
    static BIRCH_TRAPDOOR: Material;
    static JUNGLE_TRAPDOOR: Material;
    static ACACIA_TRAPDOOR: Material;
    static DARK_OAK_TRAPDOOR: Material;
    static CRIMSON_TRAPDOOR: Material;
    static WARPED_TRAPDOOR: Material;
    static INFESTED_STONE: Material;
    static INFESTED_COBBLESTONE: Material;
    static INFESTED_STONE_BRICKS: Material;
    static INFESTED_MOSSY_STONE_BRICKS: Material;
    static INFESTED_CRACKED_STONE_BRICKS: Material;
    static INFESTED_CHISELED_STONE_BRICKS: Material;
    static STONE_BRICKS: Material;
    static MOSSY_STONE_BRICKS: Material;
    static CRACKED_STONE_BRICKS: Material;
    static CHISELED_STONE_BRICKS: Material;
    static BROWN_MUSHROOM_BLOCK: Material;
    static RED_MUSHROOM_BLOCK: Material;
    static MUSHROOM_STEM: Material;
    static IRON_BARS: Material;
    static CHAIN: Material;
    static GLASS_PANE: Material;
    static MELON: Material;
    static VINE: Material;
    static OAK_FENCE_GATE: Material;
    static SPRUCE_FENCE_GATE: Material;
    static BIRCH_FENCE_GATE: Material;
    static JUNGLE_FENCE_GATE: Material;
    static ACACIA_FENCE_GATE: Material;
    static DARK_OAK_FENCE_GATE: Material;
    static CRIMSON_FENCE_GATE: Material;
    static WARPED_FENCE_GATE: Material;
    static BRICK_STAIRS: Material;
    static STONE_BRICK_STAIRS: Material;
    static MYCELIUM: Material;
    static LILY_PAD: Material;
    static NETHER_BRICKS: Material;
    static CRACKED_NETHER_BRICKS: Material;
    static CHISELED_NETHER_BRICKS: Material;
    static NETHER_BRICK_FENCE: Material;
    static NETHER_BRICK_STAIRS: Material;
    static ENCHANTING_TABLE: Material;
    static END_PORTAL_FRAME: Material;
    static END_STONE: Material;
    static END_STONE_BRICKS: Material;
    static DRAGON_EGG: Material;
    static REDSTONE_LAMP: Material;
    static SANDSTONE_STAIRS: Material;
    static EMERALD_ORE: Material;
    static ENDER_CHEST: Material;
    static TRIPWIRE_HOOK: Material;
    static EMERALD_BLOCK: Material;
    static SPRUCE_STAIRS: Material;
    static BIRCH_STAIRS: Material;
    static JUNGLE_STAIRS: Material;
    static CRIMSON_STAIRS: Material;
    static WARPED_STAIRS: Material;
    static COMMAND_BLOCK: Material;
    static BEACON: Material;
    static COBBLESTONE_WALL: Material;
    static MOSSY_COBBLESTONE_WALL: Material;
    static BRICK_WALL: Material;
    static PRISMARINE_WALL: Material;
    static RED_SANDSTONE_WALL: Material;
    static MOSSY_STONE_BRICK_WALL: Material;
    static GRANITE_WALL: Material;
    static STONE_BRICK_WALL: Material;
    static NETHER_BRICK_WALL: Material;
    static ANDESITE_WALL: Material;
    static RED_NETHER_BRICK_WALL: Material;
    static SANDSTONE_WALL: Material;
    static END_STONE_BRICK_WALL: Material;
    static DIORITE_WALL: Material;
    static BLACKSTONE_WALL: Material;
    static POLISHED_BLACKSTONE_WALL: Material;
    static POLISHED_BLACKSTONE_BRICK_WALL: Material;
    static STONE_BUTTON: Material;
    static OAK_BUTTON: Material;
    static SPRUCE_BUTTON: Material;
    static BIRCH_BUTTON: Material;
    static JUNGLE_BUTTON: Material;
    static ACACIA_BUTTON: Material;
    static DARK_OAK_BUTTON: Material;
    static CRIMSON_BUTTON: Material;
    static WARPED_BUTTON: Material;
    static POLISHED_BLACKSTONE_BUTTON: Material;
    static ANVIL: Material;
    static CHIPPED_ANVIL: Material;
    static DAMAGED_ANVIL: Material;
    static TRAPPED_CHEST: Material;
    static LIGHT_WEIGHTED_PRESSURE_PLATE: Material;
    static HEAVY_WEIGHTED_PRESSURE_PLATE: Material;
    static DAYLIGHT_DETECTOR: Material;
    static REDSTONE_BLOCK: Material;
    static NETHER_QUARTZ_ORE: Material;
    static HOPPER: Material;
    static CHISELED_QUARTZ_BLOCK: Material;
    static QUARTZ_BLOCK: Material;
    static QUARTZ_BRICKS: Material;
    static QUARTZ_PILLAR: Material;
    static QUARTZ_STAIRS: Material;
    static ACTIVATOR_RAIL: Material;
    static DROPPER: Material;
    static WHITE_TERRACOTTA: Material;
    static ORANGE_TERRACOTTA: Material;
    static MAGENTA_TERRACOTTA: Material;
    static LIGHT_BLUE_TERRACOTTA: Material;
    static YELLOW_TERRACOTTA: Material;
    static LIME_TERRACOTTA: Material;
    static PINK_TERRACOTTA: Material;
    static GRAY_TERRACOTTA: Material;
    static LIGHT_GRAY_TERRACOTTA: Material;
    static CYAN_TERRACOTTA: Material;
    static PURPLE_TERRACOTTA: Material;
    static BLUE_TERRACOTTA: Material;
    static BROWN_TERRACOTTA: Material;
    static GREEN_TERRACOTTA: Material;
    static RED_TERRACOTTA: Material;
    static BLACK_TERRACOTTA: Material;
    static BARRIER: Material;
    static IRON_TRAPDOOR: Material;
    static HAY_BLOCK: Material;
    static WHITE_CARPET: Material;
    static ORANGE_CARPET: Material;
    static MAGENTA_CARPET: Material;
    static LIGHT_BLUE_CARPET: Material;
    static YELLOW_CARPET: Material;
    static LIME_CARPET: Material;
    static PINK_CARPET: Material;
    static GRAY_CARPET: Material;
    static LIGHT_GRAY_CARPET: Material;
    static CYAN_CARPET: Material;
    static PURPLE_CARPET: Material;
    static BLUE_CARPET: Material;
    static BROWN_CARPET: Material;
    static GREEN_CARPET: Material;
    static RED_CARPET: Material;
    static BLACK_CARPET: Material;
    static TERRACOTTA: Material;
    static COAL_BLOCK: Material;
    static PACKED_ICE: Material;
    static ACACIA_STAIRS: Material;
    static DARK_OAK_STAIRS: Material;
    static SLIME_BLOCK: Material;
    static GRASS_PATH: Material;
    static SUNFLOWER: Material;
    static LILAC: Material;
    static ROSE_BUSH: Material;
    static PEONY: Material;
    static TALL_GRASS: Material;
    static LARGE_FERN: Material;
    static WHITE_STAINED_GLASS: Material;
    static ORANGE_STAINED_GLASS: Material;
    static MAGENTA_STAINED_GLASS: Material;
    static LIGHT_BLUE_STAINED_GLASS: Material;
    static YELLOW_STAINED_GLASS: Material;
    static LIME_STAINED_GLASS: Material;
    static PINK_STAINED_GLASS: Material;
    static GRAY_STAINED_GLASS: Material;
    static LIGHT_GRAY_STAINED_GLASS: Material;
    static CYAN_STAINED_GLASS: Material;
    static PURPLE_STAINED_GLASS: Material;
    static BLUE_STAINED_GLASS: Material;
    static BROWN_STAINED_GLASS: Material;
    static GREEN_STAINED_GLASS: Material;
    static RED_STAINED_GLASS: Material;
    static BLACK_STAINED_GLASS: Material;
    static WHITE_STAINED_GLASS_PANE: Material;
    static ORANGE_STAINED_GLASS_PANE: Material;
    static MAGENTA_STAINED_GLASS_PANE: Material;
    static LIGHT_BLUE_STAINED_GLASS_PANE: Material;
    static YELLOW_STAINED_GLASS_PANE: Material;
    static LIME_STAINED_GLASS_PANE: Material;
    static PINK_STAINED_GLASS_PANE: Material;
    static GRAY_STAINED_GLASS_PANE: Material;
    static LIGHT_GRAY_STAINED_GLASS_PANE: Material;
    static CYAN_STAINED_GLASS_PANE: Material;
    static PURPLE_STAINED_GLASS_PANE: Material;
    static BLUE_STAINED_GLASS_PANE: Material;
    static BROWN_STAINED_GLASS_PANE: Material;
    static GREEN_STAINED_GLASS_PANE: Material;
    static RED_STAINED_GLASS_PANE: Material;
    static BLACK_STAINED_GLASS_PANE: Material;
    static PRISMARINE: Material;
    static PRISMARINE_BRICKS: Material;
    static DARK_PRISMARINE: Material;
    static PRISMARINE_STAIRS: Material;
    static PRISMARINE_BRICK_STAIRS: Material;
    static DARK_PRISMARINE_STAIRS: Material;
    static SEA_LANTERN: Material;
    static RED_SANDSTONE: Material;
    static CHISELED_RED_SANDSTONE: Material;
    static CUT_RED_SANDSTONE: Material;
    static RED_SANDSTONE_STAIRS: Material;
    static REPEATING_COMMAND_BLOCK: Material;
    static CHAIN_COMMAND_BLOCK: Material;
    static MAGMA_BLOCK: Material;
    static NETHER_WART_BLOCK: Material;
    static WARPED_WART_BLOCK: Material;
    static RED_NETHER_BRICKS: Material;
    static BONE_BLOCK: Material;
    static STRUCTURE_VOID: Material;
    static OBSERVER: Material;
    static SHULKER_BOX: Material;
    static WHITE_SHULKER_BOX: Material;
    static ORANGE_SHULKER_BOX: Material;
    static MAGENTA_SHULKER_BOX: Material;
    static LIGHT_BLUE_SHULKER_BOX: Material;
    static YELLOW_SHULKER_BOX: Material;
    static LIME_SHULKER_BOX: Material;
    static PINK_SHULKER_BOX: Material;
    static GRAY_SHULKER_BOX: Material;
    static LIGHT_GRAY_SHULKER_BOX: Material;
    static CYAN_SHULKER_BOX: Material;
    static PURPLE_SHULKER_BOX: Material;
    static BLUE_SHULKER_BOX: Material;
    static BROWN_SHULKER_BOX: Material;
    static GREEN_SHULKER_BOX: Material;
    static RED_SHULKER_BOX: Material;
    static BLACK_SHULKER_BOX: Material;
    static WHITE_GLAZED_TERRACOTTA: Material;
    static ORANGE_GLAZED_TERRACOTTA: Material;
    static MAGENTA_GLAZED_TERRACOTTA: Material;
    static LIGHT_BLUE_GLAZED_TERRACOTTA: Material;
    static YELLOW_GLAZED_TERRACOTTA: Material;
    static LIME_GLAZED_TERRACOTTA: Material;
    static PINK_GLAZED_TERRACOTTA: Material;
    static GRAY_GLAZED_TERRACOTTA: Material;
    static LIGHT_GRAY_GLAZED_TERRACOTTA: Material;
    static CYAN_GLAZED_TERRACOTTA: Material;
    static PURPLE_GLAZED_TERRACOTTA: Material;
    static BLUE_GLAZED_TERRACOTTA: Material;
    static BROWN_GLAZED_TERRACOTTA: Material;
    static GREEN_GLAZED_TERRACOTTA: Material;
    static RED_GLAZED_TERRACOTTA: Material;
    static BLACK_GLAZED_TERRACOTTA: Material;
    static WHITE_CONCRETE: Material;
    static ORANGE_CONCRETE: Material;
    static MAGENTA_CONCRETE: Material;
    static LIGHT_BLUE_CONCRETE: Material;
    static YELLOW_CONCRETE: Material;
    static LIME_CONCRETE: Material;
    static PINK_CONCRETE: Material;
    static GRAY_CONCRETE: Material;
    static LIGHT_GRAY_CONCRETE: Material;
    static CYAN_CONCRETE: Material;
    static PURPLE_CONCRETE: Material;
    static BLUE_CONCRETE: Material;
    static BROWN_CONCRETE: Material;
    static GREEN_CONCRETE: Material;
    static RED_CONCRETE: Material;
    static BLACK_CONCRETE: Material;
    static WHITE_CONCRETE_POWDER: Material;
    static ORANGE_CONCRETE_POWDER: Material;
    static MAGENTA_CONCRETE_POWDER: Material;
    static LIGHT_BLUE_CONCRETE_POWDER: Material;
    static YELLOW_CONCRETE_POWDER: Material;
    static LIME_CONCRETE_POWDER: Material;
    static PINK_CONCRETE_POWDER: Material;
    static GRAY_CONCRETE_POWDER: Material;
    static LIGHT_GRAY_CONCRETE_POWDER: Material;
    static CYAN_CONCRETE_POWDER: Material;
    static PURPLE_CONCRETE_POWDER: Material;
    static BLUE_CONCRETE_POWDER: Material;
    static BROWN_CONCRETE_POWDER: Material;
    static GREEN_CONCRETE_POWDER: Material;
    static RED_CONCRETE_POWDER: Material;
    static BLACK_CONCRETE_POWDER: Material;
    static TURTLE_EGG: Material;
    static DEAD_TUBE_CORAL_BLOCK: Material;
    static DEAD_BRAIN_CORAL_BLOCK: Material;
    static DEAD_BUBBLE_CORAL_BLOCK: Material;
    static DEAD_FIRE_CORAL_BLOCK: Material;
    static DEAD_HORN_CORAL_BLOCK: Material;
    static TUBE_CORAL_BLOCK: Material;
    static BRAIN_CORAL_BLOCK: Material;
    static BUBBLE_CORAL_BLOCK: Material;
    static FIRE_CORAL_BLOCK: Material;
    static HORN_CORAL_BLOCK: Material;
    static TUBE_CORAL: Material;
    static BRAIN_CORAL: Material;
    static BUBBLE_CORAL: Material;
    static FIRE_CORAL: Material;
    static HORN_CORAL: Material;
    static DEAD_BRAIN_CORAL: Material;
    static DEAD_BUBBLE_CORAL: Material;
    static DEAD_FIRE_CORAL: Material;
    static DEAD_HORN_CORAL: Material;
    static DEAD_TUBE_CORAL: Material;
    static TUBE_CORAL_FAN: Material;
    static BRAIN_CORAL_FAN: Material;
    static BUBBLE_CORAL_FAN: Material;
    static FIRE_CORAL_FAN: Material;
    static HORN_CORAL_FAN: Material;
    static DEAD_TUBE_CORAL_FAN: Material;
    static DEAD_BRAIN_CORAL_FAN: Material;
    static DEAD_BUBBLE_CORAL_FAN: Material;
    static DEAD_FIRE_CORAL_FAN: Material;
    static DEAD_HORN_CORAL_FAN: Material;
    static BLUE_ICE: Material;
    static CONDUIT: Material;
    static POLISHED_GRANITE_STAIRS: Material;
    static SMOOTH_RED_SANDSTONE_STAIRS: Material;
    static MOSSY_STONE_BRICK_STAIRS: Material;
    static POLISHED_DIORITE_STAIRS: Material;
    static MOSSY_COBBLESTONE_STAIRS: Material;
    static END_STONE_BRICK_STAIRS: Material;
    static STONE_STAIRS: Material;
    static SMOOTH_SANDSTONE_STAIRS: Material;
    static SMOOTH_QUARTZ_STAIRS: Material;
    static GRANITE_STAIRS: Material;
    static ANDESITE_STAIRS: Material;
    static RED_NETHER_BRICK_STAIRS: Material;
    static POLISHED_ANDESITE_STAIRS: Material;
    static DIORITE_STAIRS: Material;
    static POLISHED_GRANITE_SLAB: Material;
    static SMOOTH_RED_SANDSTONE_SLAB: Material;
    static MOSSY_STONE_BRICK_SLAB: Material;
    static POLISHED_DIORITE_SLAB: Material;
    static MOSSY_COBBLESTONE_SLAB: Material;
    static END_STONE_BRICK_SLAB: Material;
    static SMOOTH_SANDSTONE_SLAB: Material;
    static SMOOTH_QUARTZ_SLAB: Material;
    static GRANITE_SLAB: Material;
    static ANDESITE_SLAB: Material;
    static RED_NETHER_BRICK_SLAB: Material;
    static POLISHED_ANDESITE_SLAB: Material;
    static DIORITE_SLAB: Material;
    static SCAFFOLDING: Material;
    static IRON_DOOR: Material;
    static OAK_DOOR: Material;
    static SPRUCE_DOOR: Material;
    static BIRCH_DOOR: Material;
    static JUNGLE_DOOR: Material;
    static ACACIA_DOOR: Material;
    static DARK_OAK_DOOR: Material;
    static CRIMSON_DOOR: Material;
    static WARPED_DOOR: Material;
    static REPEATER: Material;
    static COMPARATOR: Material;
    static STRUCTURE_BLOCK: Material;
    static JIGSAW: Material;
    static TURTLE_HELMET: Material;
    static SCUTE: Material;
    static FLINT_AND_STEEL: Material;
    static APPLE: Material;
    static BOW: Material;
    static ARROW: Material;
    static COAL: Material;
    static CHARCOAL: Material;
    static DIAMOND: Material;
    static IRON_INGOT: Material;
    static GOLD_INGOT: Material;
    static NETHERITE_INGOT: Material;
    static NETHERITE_SCRAP: Material;
    static WOODEN_SWORD: Material;
    static WOODEN_SHOVEL: Material;
    static WOODEN_PICKAXE: Material;
    static WOODEN_AXE: Material;
    static WOODEN_HOE: Material;
    static STONE_SWORD: Material;
    static STONE_SHOVEL: Material;
    static STONE_PICKAXE: Material;
    static STONE_AXE: Material;
    static STONE_HOE: Material;
    static GOLDEN_SWORD: Material;
    static GOLDEN_SHOVEL: Material;
    static GOLDEN_PICKAXE: Material;
    static GOLDEN_AXE: Material;
    static GOLDEN_HOE: Material;
    static IRON_SWORD: Material;
    static IRON_SHOVEL: Material;
    static IRON_PICKAXE: Material;
    static IRON_AXE: Material;
    static IRON_HOE: Material;
    static DIAMOND_SWORD: Material;
    static DIAMOND_SHOVEL: Material;
    static DIAMOND_PICKAXE: Material;
    static DIAMOND_AXE: Material;
    static DIAMOND_HOE: Material;
    static NETHERITE_SWORD: Material;
    static NETHERITE_SHOVEL: Material;
    static NETHERITE_PICKAXE: Material;
    static NETHERITE_AXE: Material;
    static NETHERITE_HOE: Material;
    static STICK: Material;
    static BOWL: Material;
    static MUSHROOM_STEW: Material;
    static STRING: Material;
    static FEATHER: Material;
    static GUNPOWDER: Material;
    static WHEAT_SEEDS: Material;
    static WHEAT: Material;
    static BREAD: Material;
    static LEATHER_HELMET: Material;
    static LEATHER_CHESTPLATE: Material;
    static LEATHER_LEGGINGS: Material;
    static LEATHER_BOOTS: Material;
    static CHAINMAIL_HELMET: Material;
    static CHAINMAIL_CHESTPLATE: Material;
    static CHAINMAIL_LEGGINGS: Material;
    static CHAINMAIL_BOOTS: Material;
    static IRON_HELMET: Material;
    static IRON_CHESTPLATE: Material;
    static IRON_LEGGINGS: Material;
    static IRON_BOOTS: Material;
    static DIAMOND_HELMET: Material;
    static DIAMOND_CHESTPLATE: Material;
    static DIAMOND_LEGGINGS: Material;
    static DIAMOND_BOOTS: Material;
    static GOLDEN_HELMET: Material;
    static GOLDEN_CHESTPLATE: Material;
    static GOLDEN_LEGGINGS: Material;
    static GOLDEN_BOOTS: Material;
    static NETHERITE_HELMET: Material;
    static NETHERITE_CHESTPLATE: Material;
    static NETHERITE_LEGGINGS: Material;
    static NETHERITE_BOOTS: Material;
    static FLINT: Material;
    static PORKCHOP: Material;
    static COOKED_PORKCHOP: Material;
    static PAINTING: Material;
    static GOLDEN_APPLE: Material;
    static ENCHANTED_GOLDEN_APPLE: Material;
    static OAK_SIGN: Material;
    static SPRUCE_SIGN: Material;
    static BIRCH_SIGN: Material;
    static JUNGLE_SIGN: Material;
    static ACACIA_SIGN: Material;
    static DARK_OAK_SIGN: Material;
    static CRIMSON_SIGN: Material;
    static WARPED_SIGN: Material;
    static BUCKET: Material;
    static WATER_BUCKET: Material;
    static LAVA_BUCKET: Material;
    static MINECART: Material;
    static SADDLE: Material;
    static REDSTONE: Material;
    static SNOWBALL: Material;
    static OAK_BOAT: Material;
    static LEATHER: Material;
    static MILK_BUCKET: Material;
    static PUFFERFISH_BUCKET: Material;
    static SALMON_BUCKET: Material;
    static COD_BUCKET: Material;
    static TROPICAL_FISH_BUCKET: Material;
    static BRICK: Material;
    static CLAY_BALL: Material;
    static DRIED_KELP_BLOCK: Material;
    static PAPER: Material;
    static BOOK: Material;
    static SLIME_BALL: Material;
    static CHEST_MINECART: Material;
    static FURNACE_MINECART: Material;
    static EGG: Material;
    static COMPASS: Material;
    static FISHING_ROD: Material;
    static CLOCK: Material;
    static GLOWSTONE_DUST: Material;
    static COD: Material;
    static SALMON: Material;
    static TROPICAL_FISH: Material;
    static PUFFERFISH: Material;
    static COOKED_COD: Material;
    static COOKED_SALMON: Material;
    static INK_SAC: Material;
    static COCOA_BEANS: Material;
    static LAPIS_LAZULI: Material;
    static WHITE_DYE: Material;
    static ORANGE_DYE: Material;
    static MAGENTA_DYE: Material;
    static LIGHT_BLUE_DYE: Material;
    static YELLOW_DYE: Material;
    static LIME_DYE: Material;
    static PINK_DYE: Material;
    static GRAY_DYE: Material;
    static LIGHT_GRAY_DYE: Material;
    static CYAN_DYE: Material;
    static PURPLE_DYE: Material;
    static BLUE_DYE: Material;
    static BROWN_DYE: Material;
    static GREEN_DYE: Material;
    static RED_DYE: Material;
    static BLACK_DYE: Material;
    static BONE_MEAL: Material;
    static BONE: Material;
    static SUGAR: Material;
    static CAKE: Material;
    static WHITE_BED: Material;
    static ORANGE_BED: Material;
    static MAGENTA_BED: Material;
    static LIGHT_BLUE_BED: Material;
    static YELLOW_BED: Material;
    static LIME_BED: Material;
    static PINK_BED: Material;
    static GRAY_BED: Material;
    static LIGHT_GRAY_BED: Material;
    static CYAN_BED: Material;
    static PURPLE_BED: Material;
    static BLUE_BED: Material;
    static BROWN_BED: Material;
    static GREEN_BED: Material;
    static RED_BED: Material;
    static BLACK_BED: Material;
    static COOKIE: Material;
    static FILLED_MAP: Material;
    static SHEARS: Material;
    static MELON_SLICE: Material;
    static DRIED_KELP: Material;
    static PUMPKIN_SEEDS: Material;
    static MELON_SEEDS: Material;
    static BEEF: Material;
    static COOKED_BEEF: Material;
    static CHICKEN: Material;
    static COOKED_CHICKEN: Material;
    static ROTTEN_FLESH: Material;
    static ENDER_PEARL: Material;
    static BLAZE_ROD: Material;
    static GHAST_TEAR: Material;
    static GOLD_NUGGET: Material;
    static NETHER_WART: Material;
    static POTION: Material;
    static GLASS_BOTTLE: Material;
    static SPIDER_EYE: Material;
    static FERMENTED_SPIDER_EYE: Material;
    static BLAZE_POWDER: Material;
    static MAGMA_CREAM: Material;
    static BREWING_STAND: Material;
    static CAULDRON: Material;
    static ENDER_EYE: Material;
    static GLISTERING_MELON_SLICE: Material;
    static BAT_SPAWN_EGG: Material;
    static BEE_SPAWN_EGG: Material;
    static BLAZE_SPAWN_EGG: Material;
    static CAT_SPAWN_EGG: Material;
    static CAVE_SPIDER_SPAWN_EGG: Material;
    static CHICKEN_SPAWN_EGG: Material;
    static COD_SPAWN_EGG: Material;
    static COW_SPAWN_EGG: Material;
    static CREEPER_SPAWN_EGG: Material;
    static DOLPHIN_SPAWN_EGG: Material;
    static DONKEY_SPAWN_EGG: Material;
    static DROWNED_SPAWN_EGG: Material;
    static ELDER_GUARDIAN_SPAWN_EGG: Material;
    static ENDERMAN_SPAWN_EGG: Material;
    static ENDERMITE_SPAWN_EGG: Material;
    static EVOKER_SPAWN_EGG: Material;
    static FOX_SPAWN_EGG: Material;
    static GHAST_SPAWN_EGG: Material;
    static GUARDIAN_SPAWN_EGG: Material;
    static HOGLIN_SPAWN_EGG: Material;
    static HORSE_SPAWN_EGG: Material;
    static HUSK_SPAWN_EGG: Material;
    static LLAMA_SPAWN_EGG: Material;
    static MAGMA_CUBE_SPAWN_EGG: Material;
    static MOOSHROOM_SPAWN_EGG: Material;
    static MULE_SPAWN_EGG: Material;
    static OCELOT_SPAWN_EGG: Material;
    static PANDA_SPAWN_EGG: Material;
    static PARROT_SPAWN_EGG: Material;
    static PHANTOM_SPAWN_EGG: Material;
    static PIG_SPAWN_EGG: Material;
    static PIGLIN_SPAWN_EGG: Material;
    static PIGLIN_BRUTE_SPAWN_EGG: Material;
    static PILLAGER_SPAWN_EGG: Material;
    static POLAR_BEAR_SPAWN_EGG: Material;
    static PUFFERFISH_SPAWN_EGG: Material;
    static RABBIT_SPAWN_EGG: Material;
    static RAVAGER_SPAWN_EGG: Material;
    static SALMON_SPAWN_EGG: Material;
    static SHEEP_SPAWN_EGG: Material;
    static SHULKER_SPAWN_EGG: Material;
    static SILVERFISH_SPAWN_EGG: Material;
    static SKELETON_SPAWN_EGG: Material;
    static SKELETON_HORSE_SPAWN_EGG: Material;
    static SLIME_SPAWN_EGG: Material;
    static SPIDER_SPAWN_EGG: Material;
    static SQUID_SPAWN_EGG: Material;
    static STRAY_SPAWN_EGG: Material;
    static STRIDER_SPAWN_EGG: Material;
    static TRADER_LLAMA_SPAWN_EGG: Material;
    static TROPICAL_FISH_SPAWN_EGG: Material;
    static TURTLE_SPAWN_EGG: Material;
    static VEX_SPAWN_EGG: Material;
    static VILLAGER_SPAWN_EGG: Material;
    static VINDICATOR_SPAWN_EGG: Material;
    static WANDERING_TRADER_SPAWN_EGG: Material;
    static WITCH_SPAWN_EGG: Material;
    static WITHER_SKELETON_SPAWN_EGG: Material;
    static WOLF_SPAWN_EGG: Material;
    static ZOGLIN_SPAWN_EGG: Material;
    static ZOMBIE_SPAWN_EGG: Material;
    static ZOMBIE_HORSE_SPAWN_EGG: Material;
    static ZOMBIE_VILLAGER_SPAWN_EGG: Material;
    static ZOMBIFIED_PIGLIN_SPAWN_EGG: Material;
    static EXPERIENCE_BOTTLE: Material;
    static FIRE_CHARGE: Material;
    static WRITABLE_BOOK: Material;
    static WRITTEN_BOOK: Material;
    static EMERALD: Material;
    static ITEM_FRAME: Material;
    static FLOWER_POT: Material;
    static CARROT: Material;
    static POTATO: Material;
    static BAKED_POTATO: Material;
    static POISONOUS_POTATO: Material;
    static MAP: Material;
    static GOLDEN_CARROT: Material;
    static SKELETON_SKULL: Material;
    static WITHER_SKELETON_SKULL: Material;
    static PLAYER_HEAD: Material;
    static ZOMBIE_HEAD: Material;
    static CREEPER_HEAD: Material;
    static DRAGON_HEAD: Material;
    static CARROT_ON_A_STICK: Material;
    static WARPED_FUNGUS_ON_A_STICK: Material;
    static NETHER_STAR: Material;
    static PUMPKIN_PIE: Material;
    static FIREWORK_ROCKET: Material;
    static FIREWORK_STAR: Material;
    static ENCHANTED_BOOK: Material;
    static NETHER_BRICK: Material;
    static QUARTZ: Material;
    static TNT_MINECART: Material;
    static HOPPER_MINECART: Material;
    static PRISMARINE_SHARD: Material;
    static PRISMARINE_CRYSTALS: Material;
    static RABBIT: Material;
    static COOKED_RABBIT: Material;
    static RABBIT_STEW: Material;
    static RABBIT_FOOT: Material;
    static RABBIT_HIDE: Material;
    static ARMOR_STAND: Material;
    static IRON_HORSE_ARMOR: Material;
    static GOLDEN_HORSE_ARMOR: Material;
    static DIAMOND_HORSE_ARMOR: Material;
    static LEATHER_HORSE_ARMOR: Material;
    static LEAD: Material;
    static NAME_TAG: Material;
    static COMMAND_BLOCK_MINECART: Material;
    static MUTTON: Material;
    static COOKED_MUTTON: Material;
    static WHITE_BANNER: Material;
    static ORANGE_BANNER: Material;
    static MAGENTA_BANNER: Material;
    static LIGHT_BLUE_BANNER: Material;
    static YELLOW_BANNER: Material;
    static LIME_BANNER: Material;
    static PINK_BANNER: Material;
    static GRAY_BANNER: Material;
    static LIGHT_GRAY_BANNER: Material;
    static CYAN_BANNER: Material;
    static PURPLE_BANNER: Material;
    static BLUE_BANNER: Material;
    static BROWN_BANNER: Material;
    static GREEN_BANNER: Material;
    static RED_BANNER: Material;
    static BLACK_BANNER: Material;
    static END_CRYSTAL: Material;
    static CHORUS_FRUIT: Material;
    static POPPED_CHORUS_FRUIT: Material;
    static BEETROOT: Material;
    static BEETROOT_SEEDS: Material;
    static BEETROOT_SOUP: Material;
    static DRAGON_BREATH: Material;
    static SPLASH_POTION: Material;
    static SPECTRAL_ARROW: Material;
    static TIPPED_ARROW: Material;
    static LINGERING_POTION: Material;
    static SHIELD: Material;
    static ELYTRA: Material;
    static SPRUCE_BOAT: Material;
    static BIRCH_BOAT: Material;
    static JUNGLE_BOAT: Material;
    static ACACIA_BOAT: Material;
    static DARK_OAK_BOAT: Material;
    static TOTEM_OF_UNDYING: Material;
    static SHULKER_SHELL: Material;
    static IRON_NUGGET: Material;
    static KNOWLEDGE_BOOK: Material;
    static DEBUG_STICK: Material;
    static MUSIC_DISC_13: Material;
    static MUSIC_DISC_CAT: Material;
    static MUSIC_DISC_BLOCKS: Material;
    static MUSIC_DISC_CHIRP: Material;
    static MUSIC_DISC_FAR: Material;
    static MUSIC_DISC_MALL: Material;
    static MUSIC_DISC_MELLOHI: Material;
    static MUSIC_DISC_STAL: Material;
    static MUSIC_DISC_STRAD: Material;
    static MUSIC_DISC_WARD: Material;
    static MUSIC_DISC_11: Material;
    static MUSIC_DISC_WAIT: Material;
    static MUSIC_DISC_PIGSTEP: Material;
    static TRIDENT: Material;
    static PHANTOM_MEMBRANE: Material;
    static NAUTILUS_SHELL: Material;
    static HEART_OF_THE_SEA: Material;
    static CROSSBOW: Material;
    static SUSPICIOUS_STEW: Material;
    static LOOM: Material;
    static FLOWER_BANNER_PATTERN: Material;
    static CREEPER_BANNER_PATTERN: Material;
    static SKULL_BANNER_PATTERN: Material;
    static MOJANG_BANNER_PATTERN: Material;
    static GLOBE_BANNER_PATTERN: Material;
    static PIGLIN_BANNER_PATTERN: Material;
    static COMPOSTER: Material;
    static BARREL: Material;
    static SMOKER: Material;
    static BLAST_FURNACE: Material;
    static CARTOGRAPHY_TABLE: Material;
    static FLETCHING_TABLE: Material;
    static GRINDSTONE: Material;
    static LECTERN: Material;
    static SMITHING_TABLE: Material;
    static STONECUTTER: Material;
    static BELL: Material;
    static LANTERN: Material;
    static SOUL_LANTERN: Material;
    static SWEET_BERRIES: Material;
    static CAMPFIRE: Material;
    static SOUL_CAMPFIRE: Material;
    static SHROOMLIGHT: Material;
    static HONEYCOMB: Material;
    static BEE_NEST: Material;
    static BEEHIVE: Material;
    static HONEY_BOTTLE: Material;
    static HONEY_BLOCK: Material;
    static HONEYCOMB_BLOCK: Material;
    static LODESTONE: Material;
    static NETHERITE_BLOCK: Material;
    static ANCIENT_DEBRIS: Material;
    static TARGET: Material;
    static CRYING_OBSIDIAN: Material;
    static BLACKSTONE: Material;
    static BLACKSTONE_SLAB: Material;
    static BLACKSTONE_STAIRS: Material;
    static GILDED_BLACKSTONE: Material;
    static POLISHED_BLACKSTONE: Material;
    static POLISHED_BLACKSTONE_SLAB: Material;
    static POLISHED_BLACKSTONE_STAIRS: Material;
    static CHISELED_POLISHED_BLACKSTONE: Material;
    static POLISHED_BLACKSTONE_BRICKS: Material;
    static POLISHED_BLACKSTONE_BRICK_SLAB: Material;
    static POLISHED_BLACKSTONE_BRICK_STAIRS: Material;
    static CRACKED_POLISHED_BLACKSTONE_BRICKS: Material;
    static RESPAWN_ANCHOR: Material;
    static WATER: Material;
    static LAVA: Material;
    static TALL_SEAGRASS: Material;
    static PISTON_HEAD: Material;
    static MOVING_PISTON: Material;
    static WALL_TORCH: Material;
    static FIRE: Material;
    static SOUL_FIRE: Material;
    static REDSTONE_WIRE: Material;
    static OAK_WALL_SIGN: Material;
    static SPRUCE_WALL_SIGN: Material;
    static BIRCH_WALL_SIGN: Material;
    static ACACIA_WALL_SIGN: Material;
    static JUNGLE_WALL_SIGN: Material;
    static DARK_OAK_WALL_SIGN: Material;
    static REDSTONE_WALL_TORCH: Material;
    static SOUL_WALL_TORCH: Material;
    static NETHER_PORTAL: Material;
    static ATTACHED_PUMPKIN_STEM: Material;
    static ATTACHED_MELON_STEM: Material;
    static PUMPKIN_STEM: Material;
    static MELON_STEM: Material;
    static END_PORTAL: Material;
    static COCOA: Material;
    static TRIPWIRE: Material;
    static POTTED_OAK_SAPLING: Material;
    static POTTED_SPRUCE_SAPLING: Material;
    static POTTED_BIRCH_SAPLING: Material;
    static POTTED_JUNGLE_SAPLING: Material;
    static POTTED_ACACIA_SAPLING: Material;
    static POTTED_DARK_OAK_SAPLING: Material;
    static POTTED_FERN: Material;
    static POTTED_DANDELION: Material;
    static POTTED_POPPY: Material;
    static POTTED_BLUE_ORCHID: Material;
    static POTTED_ALLIUM: Material;
    static POTTED_AZURE_BLUET: Material;
    static POTTED_RED_TULIP: Material;
    static POTTED_ORANGE_TULIP: Material;
    static POTTED_WHITE_TULIP: Material;
    static POTTED_PINK_TULIP: Material;
    static POTTED_OXEYE_DAISY: Material;
    static POTTED_CORNFLOWER: Material;
    static POTTED_LILY_OF_THE_VALLEY: Material;
    static POTTED_WITHER_ROSE: Material;
    static POTTED_RED_MUSHROOM: Material;
    static POTTED_BROWN_MUSHROOM: Material;
    static POTTED_DEAD_BUSH: Material;
    static POTTED_CACTUS: Material;
    static CARROTS: Material;
    static POTATOES: Material;
    static SKELETON_WALL_SKULL: Material;
    static WITHER_SKELETON_WALL_SKULL: Material;
    static ZOMBIE_WALL_HEAD: Material;
    static PLAYER_WALL_HEAD: Material;
    static CREEPER_WALL_HEAD: Material;
    static DRAGON_WALL_HEAD: Material;
    static WHITE_WALL_BANNER: Material;
    static ORANGE_WALL_BANNER: Material;
    static MAGENTA_WALL_BANNER: Material;
    static LIGHT_BLUE_WALL_BANNER: Material;
    static YELLOW_WALL_BANNER: Material;
    static LIME_WALL_BANNER: Material;
    static PINK_WALL_BANNER: Material;
    static GRAY_WALL_BANNER: Material;
    static LIGHT_GRAY_WALL_BANNER: Material;
    static CYAN_WALL_BANNER: Material;
    static PURPLE_WALL_BANNER: Material;
    static BLUE_WALL_BANNER: Material;
    static BROWN_WALL_BANNER: Material;
    static GREEN_WALL_BANNER: Material;
    static RED_WALL_BANNER: Material;
    static BLACK_WALL_BANNER: Material;
    static BEETROOTS: Material;
    static END_GATEWAY: Material;
    static FROSTED_ICE: Material;
    static KELP_PLANT: Material;
    static DEAD_TUBE_CORAL_WALL_FAN: Material;
    static DEAD_BRAIN_CORAL_WALL_FAN: Material;
    static DEAD_BUBBLE_CORAL_WALL_FAN: Material;
    static DEAD_FIRE_CORAL_WALL_FAN: Material;
    static DEAD_HORN_CORAL_WALL_FAN: Material;
    static TUBE_CORAL_WALL_FAN: Material;
    static BRAIN_CORAL_WALL_FAN: Material;
    static BUBBLE_CORAL_WALL_FAN: Material;
    static FIRE_CORAL_WALL_FAN: Material;
    static HORN_CORAL_WALL_FAN: Material;
    static BAMBOO_SAPLING: Material;
    static POTTED_BAMBOO: Material;
    static VOID_AIR: Material;
    static CAVE_AIR: Material;
    static BUBBLE_COLUMN: Material;
    static SWEET_BERRY_BUSH: Material;
    static WEEPING_VINES_PLANT: Material;
    static TWISTING_VINES_PLANT: Material;
    static CRIMSON_WALL_SIGN: Material;
    static WARPED_WALL_SIGN: Material;
    static POTTED_CRIMSON_FUNGUS: Material;
    static POTTED_WARPED_FUNGUS: Material;
    static POTTED_CRIMSON_ROOTS: Material;
    static POTTED_WARPED_ROOTS: Material;
    static LEGACY_AIR: Material;
    static LEGACY_STONE: Material;
    static LEGACY_GRASS: Material;
    static LEGACY_DIRT: Material;
    static LEGACY_COBBLESTONE: Material;
    static LEGACY_WOOD: Material;
    static LEGACY_SAPLING: Material;
    static LEGACY_BEDROCK: Material;
    static LEGACY_WATER: Material;
    static LEGACY_STATIONARY_WATER: Material;
    static LEGACY_LAVA: Material;
    static LEGACY_STATIONARY_LAVA: Material;
    static LEGACY_SAND: Material;
    static LEGACY_GRAVEL: Material;
    static LEGACY_GOLD_ORE: Material;
    static LEGACY_IRON_ORE: Material;
    static LEGACY_COAL_ORE: Material;
    static LEGACY_LOG: Material;
    static LEGACY_LEAVES: Material;
    static LEGACY_SPONGE: Material;
    static LEGACY_GLASS: Material;
    static LEGACY_LAPIS_ORE: Material;
    static LEGACY_LAPIS_BLOCK: Material;
    static LEGACY_DISPENSER: Material;
    static LEGACY_SANDSTONE: Material;
    static LEGACY_NOTE_BLOCK: Material;
    static LEGACY_BED_BLOCK: Material;
    static LEGACY_POWERED_RAIL: Material;
    static LEGACY_DETECTOR_RAIL: Material;
    static LEGACY_PISTON_STICKY_BASE: Material;
    static LEGACY_WEB: Material;
    static LEGACY_LONG_GRASS: Material;
    static LEGACY_DEAD_BUSH: Material;
    static LEGACY_PISTON_BASE: Material;
    static LEGACY_PISTON_EXTENSION: Material;
    static LEGACY_WOOL: Material;
    static LEGACY_PISTON_MOVING_PIECE: Material;
    static LEGACY_YELLOW_FLOWER: Material;
    static LEGACY_RED_ROSE: Material;
    static LEGACY_BROWN_MUSHROOM: Material;
    static LEGACY_RED_MUSHROOM: Material;
    static LEGACY_GOLD_BLOCK: Material;
    static LEGACY_IRON_BLOCK: Material;
    static LEGACY_DOUBLE_STEP: Material;
    static LEGACY_STEP: Material;
    static LEGACY_BRICK: Material;
    static LEGACY_TNT: Material;
    static LEGACY_BOOKSHELF: Material;
    static LEGACY_MOSSY_COBBLESTONE: Material;
    static LEGACY_OBSIDIAN: Material;
    static LEGACY_TORCH: Material;
    static LEGACY_FIRE: Material;
    static LEGACY_MOB_SPAWNER: Material;
    static LEGACY_WOOD_STAIRS: Material;
    static LEGACY_CHEST: Material;
    static LEGACY_REDSTONE_WIRE: Material;
    static LEGACY_DIAMOND_ORE: Material;
    static LEGACY_DIAMOND_BLOCK: Material;
    static LEGACY_WORKBENCH: Material;
    static LEGACY_CROPS: Material;
    static LEGACY_SOIL: Material;
    static LEGACY_FURNACE: Material;
    static LEGACY_BURNING_FURNACE: Material;
    static LEGACY_SIGN_POST: Material;
    static LEGACY_WOODEN_DOOR: Material;
    static LEGACY_LADDER: Material;
    static LEGACY_RAILS: Material;
    static LEGACY_COBBLESTONE_STAIRS: Material;
    static LEGACY_WALL_SIGN: Material;
    static LEGACY_LEVER: Material;
    static LEGACY_STONE_PLATE: Material;
    static LEGACY_IRON_DOOR_BLOCK: Material;
    static LEGACY_WOOD_PLATE: Material;
    static LEGACY_REDSTONE_ORE: Material;
    static LEGACY_GLOWING_REDSTONE_ORE: Material;
    static LEGACY_REDSTONE_TORCH_OFF: Material;
    static LEGACY_REDSTONE_TORCH_ON: Material;
    static LEGACY_STONE_BUTTON: Material;
    static LEGACY_SNOW: Material;
    static LEGACY_ICE: Material;
    static LEGACY_SNOW_BLOCK: Material;
    static LEGACY_CACTUS: Material;
    static LEGACY_CLAY: Material;
    static LEGACY_SUGAR_CANE_BLOCK: Material;
    static LEGACY_JUKEBOX: Material;
    static LEGACY_FENCE: Material;
    static LEGACY_PUMPKIN: Material;
    static LEGACY_NETHERRACK: Material;
    static LEGACY_SOUL_SAND: Material;
    static LEGACY_GLOWSTONE: Material;
    static LEGACY_PORTAL: Material;
    static LEGACY_JACK_O_LANTERN: Material;
    static LEGACY_CAKE_BLOCK: Material;
    static LEGACY_DIODE_BLOCK_OFF: Material;
    static LEGACY_DIODE_BLOCK_ON: Material;
    static LEGACY_STAINED_GLASS: Material;
    static LEGACY_TRAP_DOOR: Material;
    static LEGACY_MONSTER_EGGS: Material;
    static LEGACY_SMOOTH_BRICK: Material;
    static LEGACY_HUGE_MUSHROOM_1: Material;
    static LEGACY_HUGE_MUSHROOM_2: Material;
    static LEGACY_IRON_FENCE: Material;
    static LEGACY_THIN_GLASS: Material;
    static LEGACY_MELON_BLOCK: Material;
    static LEGACY_PUMPKIN_STEM: Material;
    static LEGACY_MELON_STEM: Material;
    static LEGACY_VINE: Material;
    static LEGACY_FENCE_GATE: Material;
    static LEGACY_BRICK_STAIRS: Material;
    static LEGACY_SMOOTH_STAIRS: Material;
    static LEGACY_MYCEL: Material;
    static LEGACY_WATER_LILY: Material;
    static LEGACY_NETHER_BRICK: Material;
    static LEGACY_NETHER_FENCE: Material;
    static LEGACY_NETHER_BRICK_STAIRS: Material;
    static LEGACY_NETHER_WARTS: Material;
    static LEGACY_ENCHANTMENT_TABLE: Material;
    static LEGACY_BREWING_STAND: Material;
    static LEGACY_CAULDRON: Material;
    static LEGACY_ENDER_PORTAL: Material;
    static LEGACY_ENDER_PORTAL_FRAME: Material;
    static LEGACY_ENDER_STONE: Material;
    static LEGACY_DRAGON_EGG: Material;
    static LEGACY_REDSTONE_LAMP_OFF: Material;
    static LEGACY_REDSTONE_LAMP_ON: Material;
    static LEGACY_WOOD_DOUBLE_STEP: Material;
    static LEGACY_WOOD_STEP: Material;
    static LEGACY_COCOA: Material;
    static LEGACY_SANDSTONE_STAIRS: Material;
    static LEGACY_EMERALD_ORE: Material;
    static LEGACY_ENDER_CHEST: Material;
    static LEGACY_TRIPWIRE_HOOK: Material;
    static LEGACY_TRIPWIRE: Material;
    static LEGACY_EMERALD_BLOCK: Material;
    static LEGACY_SPRUCE_WOOD_STAIRS: Material;
    static LEGACY_BIRCH_WOOD_STAIRS: Material;
    static LEGACY_JUNGLE_WOOD_STAIRS: Material;
    static LEGACY_COMMAND: Material;
    static LEGACY_BEACON: Material;
    static LEGACY_COBBLE_WALL: Material;
    static LEGACY_FLOWER_POT: Material;
    static LEGACY_CARROT: Material;
    static LEGACY_POTATO: Material;
    static LEGACY_WOOD_BUTTON: Material;
    static LEGACY_SKULL: Material;
    static LEGACY_ANVIL: Material;
    static LEGACY_TRAPPED_CHEST: Material;
    static LEGACY_GOLD_PLATE: Material;
    static LEGACY_IRON_PLATE: Material;
    static LEGACY_REDSTONE_COMPARATOR_OFF: Material;
    static LEGACY_REDSTONE_COMPARATOR_ON: Material;
    static LEGACY_DAYLIGHT_DETECTOR: Material;
    static LEGACY_REDSTONE_BLOCK: Material;
    static LEGACY_QUARTZ_ORE: Material;
    static LEGACY_HOPPER: Material;
    static LEGACY_QUARTZ_BLOCK: Material;
    static LEGACY_QUARTZ_STAIRS: Material;
    static LEGACY_ACTIVATOR_RAIL: Material;
    static LEGACY_DROPPER: Material;
    static LEGACY_STAINED_CLAY: Material;
    static LEGACY_STAINED_GLASS_PANE: Material;
    static LEGACY_LEAVES_2: Material;
    static LEGACY_LOG_2: Material;
    static LEGACY_ACACIA_STAIRS: Material;
    static LEGACY_DARK_OAK_STAIRS: Material;
    static LEGACY_SLIME_BLOCK: Material;
    static LEGACY_BARRIER: Material;
    static LEGACY_IRON_TRAPDOOR: Material;
    static LEGACY_PRISMARINE: Material;
    static LEGACY_SEA_LANTERN: Material;
    static LEGACY_HAY_BLOCK: Material;
    static LEGACY_CARPET: Material;
    static LEGACY_HARD_CLAY: Material;
    static LEGACY_COAL_BLOCK: Material;
    static LEGACY_PACKED_ICE: Material;
    static LEGACY_DOUBLE_PLANT: Material;
    static LEGACY_STANDING_BANNER: Material;
    static LEGACY_WALL_BANNER: Material;
    static LEGACY_DAYLIGHT_DETECTOR_INVERTED: Material;
    static LEGACY_RED_SANDSTONE: Material;
    static LEGACY_RED_SANDSTONE_STAIRS: Material;
    static LEGACY_DOUBLE_STONE_SLAB2: Material;
    static LEGACY_STONE_SLAB2: Material;
    static LEGACY_SPRUCE_FENCE_GATE: Material;
    static LEGACY_BIRCH_FENCE_GATE: Material;
    static LEGACY_JUNGLE_FENCE_GATE: Material;
    static LEGACY_DARK_OAK_FENCE_GATE: Material;
    static LEGACY_ACACIA_FENCE_GATE: Material;
    static LEGACY_SPRUCE_FENCE: Material;
    static LEGACY_BIRCH_FENCE: Material;
    static LEGACY_JUNGLE_FENCE: Material;
    static LEGACY_DARK_OAK_FENCE: Material;
    static LEGACY_ACACIA_FENCE: Material;
    static LEGACY_SPRUCE_DOOR: Material;
    static LEGACY_BIRCH_DOOR: Material;
    static LEGACY_JUNGLE_DOOR: Material;
    static LEGACY_ACACIA_DOOR: Material;
    static LEGACY_DARK_OAK_DOOR: Material;
    static LEGACY_END_ROD: Material;
    static LEGACY_CHORUS_PLANT: Material;
    static LEGACY_CHORUS_FLOWER: Material;
    static LEGACY_PURPUR_BLOCK: Material;
    static LEGACY_PURPUR_PILLAR: Material;
    static LEGACY_PURPUR_STAIRS: Material;
    static LEGACY_PURPUR_DOUBLE_SLAB: Material;
    static LEGACY_PURPUR_SLAB: Material;
    static LEGACY_END_BRICKS: Material;
    static LEGACY_BEETROOT_BLOCK: Material;
    static LEGACY_GRASS_PATH: Material;
    static LEGACY_END_GATEWAY: Material;
    static LEGACY_COMMAND_REPEATING: Material;
    static LEGACY_COMMAND_CHAIN: Material;
    static LEGACY_FROSTED_ICE: Material;
    static LEGACY_MAGMA: Material;
    static LEGACY_NETHER_WART_BLOCK: Material;
    static LEGACY_RED_NETHER_BRICK: Material;
    static LEGACY_BONE_BLOCK: Material;
    static LEGACY_STRUCTURE_VOID: Material;
    static LEGACY_OBSERVER: Material;
    static LEGACY_WHITE_SHULKER_BOX: Material;
    static LEGACY_ORANGE_SHULKER_BOX: Material;
    static LEGACY_MAGENTA_SHULKER_BOX: Material;
    static LEGACY_LIGHT_BLUE_SHULKER_BOX: Material;
    static LEGACY_YELLOW_SHULKER_BOX: Material;
    static LEGACY_LIME_SHULKER_BOX: Material;
    static LEGACY_PINK_SHULKER_BOX: Material;
    static LEGACY_GRAY_SHULKER_BOX: Material;
    static LEGACY_SILVER_SHULKER_BOX: Material;
    static LEGACY_CYAN_SHULKER_BOX: Material;
    static LEGACY_PURPLE_SHULKER_BOX: Material;
    static LEGACY_BLUE_SHULKER_BOX: Material;
    static LEGACY_BROWN_SHULKER_BOX: Material;
    static LEGACY_GREEN_SHULKER_BOX: Material;
    static LEGACY_RED_SHULKER_BOX: Material;
    static LEGACY_BLACK_SHULKER_BOX: Material;
    static LEGACY_WHITE_GLAZED_TERRACOTTA: Material;
    static LEGACY_ORANGE_GLAZED_TERRACOTTA: Material;
    static LEGACY_MAGENTA_GLAZED_TERRACOTTA: Material;
    static LEGACY_LIGHT_BLUE_GLAZED_TERRACOTTA: Material;
    static LEGACY_YELLOW_GLAZED_TERRACOTTA: Material;
    static LEGACY_LIME_GLAZED_TERRACOTTA: Material;
    static LEGACY_PINK_GLAZED_TERRACOTTA: Material;
    static LEGACY_GRAY_GLAZED_TERRACOTTA: Material;
    static LEGACY_SILVER_GLAZED_TERRACOTTA: Material;
    static LEGACY_CYAN_GLAZED_TERRACOTTA: Material;
    static LEGACY_PURPLE_GLAZED_TERRACOTTA: Material;
    static LEGACY_BLUE_GLAZED_TERRACOTTA: Material;
    static LEGACY_BROWN_GLAZED_TERRACOTTA: Material;
    static LEGACY_GREEN_GLAZED_TERRACOTTA: Material;
    static LEGACY_RED_GLAZED_TERRACOTTA: Material;
    static LEGACY_BLACK_GLAZED_TERRACOTTA: Material;
    static LEGACY_CONCRETE: Material;
    static LEGACY_CONCRETE_POWDER: Material;
    static LEGACY_STRUCTURE_BLOCK: Material;
    static LEGACY_IRON_SPADE: Material;
    static LEGACY_IRON_PICKAXE: Material;
    static LEGACY_IRON_AXE: Material;
    static LEGACY_FLINT_AND_STEEL: Material;
    static LEGACY_APPLE: Material;
    static LEGACY_BOW: Material;
    static LEGACY_ARROW: Material;
    static LEGACY_COAL: Material;
    static LEGACY_DIAMOND: Material;
    static LEGACY_IRON_INGOT: Material;
    static LEGACY_GOLD_INGOT: Material;
    static LEGACY_IRON_SWORD: Material;
    static LEGACY_WOOD_SWORD: Material;
    static LEGACY_WOOD_SPADE: Material;
    static LEGACY_WOOD_PICKAXE: Material;
    static LEGACY_WOOD_AXE: Material;
    static LEGACY_STONE_SWORD: Material;
    static LEGACY_STONE_SPADE: Material;
    static LEGACY_STONE_PICKAXE: Material;
    static LEGACY_STONE_AXE: Material;
    static LEGACY_DIAMOND_SWORD: Material;
    static LEGACY_DIAMOND_SPADE: Material;
    static LEGACY_DIAMOND_PICKAXE: Material;
    static LEGACY_DIAMOND_AXE: Material;
    static LEGACY_STICK: Material;
    static LEGACY_BOWL: Material;
    static LEGACY_MUSHROOM_SOUP: Material;
    static LEGACY_GOLD_SWORD: Material;
    static LEGACY_GOLD_SPADE: Material;
    static LEGACY_GOLD_PICKAXE: Material;
    static LEGACY_GOLD_AXE: Material;
    static LEGACY_STRING: Material;
    static LEGACY_FEATHER: Material;
    static LEGACY_SULPHUR: Material;
    static LEGACY_WOOD_HOE: Material;
    static LEGACY_STONE_HOE: Material;
    static LEGACY_IRON_HOE: Material;
    static LEGACY_DIAMOND_HOE: Material;
    static LEGACY_GOLD_HOE: Material;
    static LEGACY_SEEDS: Material;
    static LEGACY_WHEAT: Material;
    static LEGACY_BREAD: Material;
    static LEGACY_LEATHER_HELMET: Material;
    static LEGACY_LEATHER_CHESTPLATE: Material;
    static LEGACY_LEATHER_LEGGINGS: Material;
    static LEGACY_LEATHER_BOOTS: Material;
    static LEGACY_CHAINMAIL_HELMET: Material;
    static LEGACY_CHAINMAIL_CHESTPLATE: Material;
    static LEGACY_CHAINMAIL_LEGGINGS: Material;
    static LEGACY_CHAINMAIL_BOOTS: Material;
    static LEGACY_IRON_HELMET: Material;
    static LEGACY_IRON_CHESTPLATE: Material;
    static LEGACY_IRON_LEGGINGS: Material;
    static LEGACY_IRON_BOOTS: Material;
    static LEGACY_DIAMOND_HELMET: Material;
    static LEGACY_DIAMOND_CHESTPLATE: Material;
    static LEGACY_DIAMOND_LEGGINGS: Material;
    static LEGACY_DIAMOND_BOOTS: Material;
    static LEGACY_GOLD_HELMET: Material;
    static LEGACY_GOLD_CHESTPLATE: Material;
    static LEGACY_GOLD_LEGGINGS: Material;
    static LEGACY_GOLD_BOOTS: Material;
    static LEGACY_FLINT: Material;
    static LEGACY_PORK: Material;
    static LEGACY_GRILLED_PORK: Material;
    static LEGACY_PAINTING: Material;
    static LEGACY_GOLDEN_APPLE: Material;
    static LEGACY_SIGN: Material;
    static LEGACY_WOOD_DOOR: Material;
    static LEGACY_BUCKET: Material;
    static LEGACY_WATER_BUCKET: Material;
    static LEGACY_LAVA_BUCKET: Material;
    static LEGACY_MINECART: Material;
    static LEGACY_SADDLE: Material;
    static LEGACY_IRON_DOOR: Material;
    static LEGACY_REDSTONE: Material;
    static LEGACY_SNOW_BALL: Material;
    static LEGACY_BOAT: Material;
    static LEGACY_LEATHER: Material;
    static LEGACY_MILK_BUCKET: Material;
    static LEGACY_CLAY_BRICK: Material;
    static LEGACY_CLAY_BALL: Material;
    static LEGACY_SUGAR_CANE: Material;
    static LEGACY_PAPER: Material;
    static LEGACY_BOOK: Material;
    static LEGACY_SLIME_BALL: Material;
    static LEGACY_STORAGE_MINECART: Material;
    static LEGACY_POWERED_MINECART: Material;
    static LEGACY_EGG: Material;
    static LEGACY_COMPASS: Material;
    static LEGACY_FISHING_ROD: Material;
    static LEGACY_WATCH: Material;
    static LEGACY_GLOWSTONE_DUST: Material;
    static LEGACY_RAW_FISH: Material;
    static LEGACY_COOKED_FISH: Material;
    static LEGACY_INK_SACK: Material;
    static LEGACY_BONE: Material;
    static LEGACY_SUGAR: Material;
    static LEGACY_CAKE: Material;
    static LEGACY_BED: Material;
    static LEGACY_DIODE: Material;
    static LEGACY_COOKIE: Material;
    static LEGACY_MAP: Material;
    static LEGACY_SHEARS: Material;
    static LEGACY_MELON: Material;
    static LEGACY_PUMPKIN_SEEDS: Material;
    static LEGACY_MELON_SEEDS: Material;
    static LEGACY_RAW_BEEF: Material;
    static LEGACY_COOKED_BEEF: Material;
    static LEGACY_RAW_CHICKEN: Material;
    static LEGACY_COOKED_CHICKEN: Material;
    static LEGACY_ROTTEN_FLESH: Material;
    static LEGACY_ENDER_PEARL: Material;
    static LEGACY_BLAZE_ROD: Material;
    static LEGACY_GHAST_TEAR: Material;
    static LEGACY_GOLD_NUGGET: Material;
    static LEGACY_NETHER_STALK: Material;
    static LEGACY_POTION: Material;
    static LEGACY_GLASS_BOTTLE: Material;
    static LEGACY_SPIDER_EYE: Material;
    static LEGACY_FERMENTED_SPIDER_EYE: Material;
    static LEGACY_BLAZE_POWDER: Material;
    static LEGACY_MAGMA_CREAM: Material;
    static LEGACY_BREWING_STAND_ITEM: Material;
    static LEGACY_CAULDRON_ITEM: Material;
    static LEGACY_EYE_OF_ENDER: Material;
    static LEGACY_SPECKLED_MELON: Material;
    static LEGACY_MONSTER_EGG: Material;
    static LEGACY_EXP_BOTTLE: Material;
    static LEGACY_FIREBALL: Material;
    static LEGACY_BOOK_AND_QUILL: Material;
    static LEGACY_WRITTEN_BOOK: Material;
    static LEGACY_EMERALD: Material;
    static LEGACY_ITEM_FRAME: Material;
    static LEGACY_FLOWER_POT_ITEM: Material;
    static LEGACY_CARROT_ITEM: Material;
    static LEGACY_POTATO_ITEM: Material;
    static LEGACY_BAKED_POTATO: Material;
    static LEGACY_POISONOUS_POTATO: Material;
    static LEGACY_EMPTY_MAP: Material;
    static LEGACY_GOLDEN_CARROT: Material;
    static LEGACY_SKULL_ITEM: Material;
    static LEGACY_CARROT_STICK: Material;
    static LEGACY_NETHER_STAR: Material;
    static LEGACY_PUMPKIN_PIE: Material;
    static LEGACY_FIREWORK: Material;
    static LEGACY_FIREWORK_CHARGE: Material;
    static LEGACY_ENCHANTED_BOOK: Material;
    static LEGACY_REDSTONE_COMPARATOR: Material;
    static LEGACY_NETHER_BRICK_ITEM: Material;
    static LEGACY_QUARTZ: Material;
    static LEGACY_EXPLOSIVE_MINECART: Material;
    static LEGACY_HOPPER_MINECART: Material;
    static LEGACY_PRISMARINE_SHARD: Material;
    static LEGACY_PRISMARINE_CRYSTALS: Material;
    static LEGACY_RABBIT: Material;
    static LEGACY_COOKED_RABBIT: Material;
    static LEGACY_RABBIT_STEW: Material;
    static LEGACY_RABBIT_FOOT: Material;
    static LEGACY_RABBIT_HIDE: Material;
    static LEGACY_ARMOR_STAND: Material;
    static LEGACY_IRON_BARDING: Material;
    static LEGACY_GOLD_BARDING: Material;
    static LEGACY_DIAMOND_BARDING: Material;
    static LEGACY_LEASH: Material;
    static LEGACY_NAME_TAG: Material;
    static LEGACY_COMMAND_MINECART: Material;
    static LEGACY_MUTTON: Material;
    static LEGACY_COOKED_MUTTON: Material;
    static LEGACY_BANNER: Material;
    static LEGACY_END_CRYSTAL: Material;
    static LEGACY_SPRUCE_DOOR_ITEM: Material;
    static LEGACY_BIRCH_DOOR_ITEM: Material;
    static LEGACY_JUNGLE_DOOR_ITEM: Material;
    static LEGACY_ACACIA_DOOR_ITEM: Material;
    static LEGACY_DARK_OAK_DOOR_ITEM: Material;
    static LEGACY_CHORUS_FRUIT: Material;
    static LEGACY_CHORUS_FRUIT_POPPED: Material;
    static LEGACY_BEETROOT: Material;
    static LEGACY_BEETROOT_SEEDS: Material;
    static LEGACY_BEETROOT_SOUP: Material;
    static LEGACY_DRAGONS_BREATH: Material;
    static LEGACY_SPLASH_POTION: Material;
    static LEGACY_SPECTRAL_ARROW: Material;
    static LEGACY_TIPPED_ARROW: Material;
    static LEGACY_LINGERING_POTION: Material;
    static LEGACY_SHIELD: Material;
    static LEGACY_ELYTRA: Material;
    static LEGACY_BOAT_SPRUCE: Material;
    static LEGACY_BOAT_BIRCH: Material;
    static LEGACY_BOAT_JUNGLE: Material;
    static LEGACY_BOAT_ACACIA: Material;
    static LEGACY_BOAT_DARK_OAK: Material;
    static LEGACY_TOTEM: Material;
    static LEGACY_SHULKER_SHELL: Material;
    static LEGACY_IRON_NUGGET: Material;
    static LEGACY_KNOWLEDGE_BOOK: Material;
    static LEGACY_GOLD_RECORD: Material;
    static LEGACY_GREEN_RECORD: Material;
    static LEGACY_RECORD_3: Material;
    static LEGACY_RECORD_4: Material;
    static LEGACY_RECORD_5: Material;
    static LEGACY_RECORD_6: Material;
    static LEGACY_RECORD_7: Material;
    static LEGACY_RECORD_8: Material;
    static LEGACY_RECORD_9: Material;
    static LEGACY_RECORD_10: Material;
    static LEGACY_RECORD_11: Material;
    static LEGACY_RECORD_12: Material;
    static LEGACY_PREFIX: Material;
  }

  export enum NetherWartsState {}

  export module Note {
    export enum Tone {}
  }

  export enum Particle {}

  export enum PortalType {}

  export module Raid {
    export enum RaidStatus {}
  }

  export enum Rotation {}

  export enum SandstoneType {}

  export enum SkullType {}

  export enum Sound {}

  export enum SoundCategory {}

  export enum Statistic {
    ANIMALS_BRED,
    ARMOR_CLEANED,
    AVIATE_ONE_CM,
    BANNER_CLEANED,
    BEACON_INTERACTION,
    BELL_RING,
    BOAT_ONE_CM,
    BREAK_ITEM,
    BREWINGSTAND_INTERACTION,
    CAKE_SLICES_EATEN,
    CAULDRON_FILLED,
    CAULDRON_USED,
    CHEST_OPENED,
    CLEAN_SHULKER_BOX,
    CLIMB_ONE_CM,
    CRAFT_ITEM,
    CRAFTING_TABLE_INTERACTION,
    CROUCH_ONE_CM,
    DAMAGE_ABSORBED,
    DAMAGE_BLOCK_BY_SHEILD,
    DAMAGE_DEALT,
    DAMAGE_DEALT_ABSORBED,
    DAMAGE_DEALT_RESISTED,
    DAMAGE_RESISTED,
    DAMAGE_TAKEN,
    DEATHS,
    DISPENSER_INSPECTED,
    DROP,
    DROP_COUNT,
    DROPPER_INSPECTED,
    ENDERCHEST_OPENED,
    ENTITY_KILLED_BY,
    FALL_ONE_CM,
    FISH_CAUGHT,
    FLOWER_POTTED,
    FLY_ONE_CM,
    FURNACE_INTERACTION,
    HOPPER_INSPECTED,
    HORSE_ONE_CM,
    INTERACT_WITH_ANVIL,
    INTERACT_WITH_BLAST_FURNACE,
    INTERACE_WITH_CAMPFIRE,
    INTERACT_WITH_CARTOGRAPHY_TABLE,
    INTERACT_WITH_GRINDSTONE,
    INTERACT_WITH_LECTERN,
    INTERACT_WITH_LOOM,
    INTERACT_WITH_SMITHING_TABLE,
    INTERACT_WITH_SMOKER,
    INTERACT_WITH_STONECUTTER,
    ITEM_ENCHANTED,
    JUMP,
    KILL_ENTITY,
    LEAVE_GAME,
    MINE_BLOCK,
    MINECART_ONE_CM,
    MOB_KILLS,
    NOTEBLOCK_PLAYED,
    NOTEBLOCK_TUNED,
    OPEN_BARREL,
    PICKUP,
    PIG_ONE_CM,
    PLAY_ONE_MINUTE,
    PLAYER_KILLS,
    RAID_TRIGGER,
    RAID_WIN,
    RECORD_PLAYED,
    SHULKER_BOX_OPENED,
    SLEEP_IN_BED,
    SNEAK_TIME,
    SPRINT_ONE_CM,
    STRIKER_ONE_CM,
    TALKED_TO_VILLAGER,
    TARGET_HIT,
    TIME_SINCE_DEATH,
    TIME_SINCE_REST,
    TRADED_WITH_VILLAGER,
    TRAPPED_CHEST_TRIGGERED,
    USE_ITEM,
    WALK_ON_WATER_ONE_CM,
    WALK_ONE_CM,
    WALK_UNDER_WATER_ONE_CM,
  }

  export module Statistic {
    export enum Type {}
  }

  export enum TreeSpecies {}

  export enum TreeType {}

  export module Warning {
    export enum WarningState {}
  }

  export enum WeatherType {}

  export module World {
    export enum Environment {}
  }

  export enum WorldType {}
}

declare module 'bukkit/advancement' {
  export interface Advancement {}
  export interface AdvancementProgress {}
}

declare module 'bukkit/attribute' {
  export interface Attributable {}
  export interface AttributeInstance {}

  export interface AttributeModifier {}
  export enum Attribute {
    GENERIC_ARMOR,
    GENERIC_ARMOR_TOUGHNESS,
    GENERIC_ATTACK_DAMAGE,
    GENERIC_ATTACK_KNOCKBACK,
    GENERIC_ATTACK_SPEED,
    GENERIC_FLYING_SPEED,
    GENERIC_FOLLOW_RANGE,
    GENERIC_KNOCKBACK_RESISTANCE,
    GENERIC_LUCK,
    GENERIC_MAX_HEALTH,
    GENERIC_MOVEMENT_SPEED,
    HORSE_JUMP_STRENGTH,
    ZOMBIE_SPAWN_REINFORCEMENTS,
  }
  export module AttributeModifier {
    export enum Operation {
      ADD_NUMBER,
      ADD_SCALAR,
      MULTIPLY_SCALAR_1,
    }
  }
}

declare module 'bukkit/block' {
  import { Location, World, Chunk, Material, FluidCollisionMode } from 'bukkit';
  import {
    InventoryHolder,
    BlockInventoryHolder,
    Inventory,
    DoubleChestInventory,
    ItemStack,
  } from 'bukkit/inventory';
  import { Entity } from 'bukkit/entity';
  import { BlockData } from 'bukkit/block/data';
  import { Vector, RayTraceResult } from 'bukkit/util';
  import { Metadatable } from 'bukkit/metadata';

  export interface Banner {}

  export interface Barrel {}

  export interface Beacon {}

  export interface Bed {}

  export interface Beehive {}

  export interface Bell {}

  export interface BlastFurnace {}

  export interface Block extends Metadatable {
    applyBoneMeal(face: BlockFace): boolean;
    breakNaturally(): boolean;
    breakNaturally(tool: ItemStack): boolean;
    getBiome(): Biome;
    getBlockData(): BlockData;
    getBlockPower(): number;
    getBlockPower(face: BlockFace): number;
    getBoundingBox(): BoundingBox;
    getChunk(): Chunk;
    getDrops(): ItemStack[];
    getDrops(tool: ItemStack): ItemStack[];
    getDrops(tool: ItemStack, entity: Entity): ItemStack[];
    getFace(block: Block): BlockFace;
    getHumidity(): number;
    getLightFromBlocks(): number;
    getLightFromSky(): number;
    getLightLevel(): number;
    getLocation(): Location;
    getLocation(loc: Location): Location;
    getPistonMoveReaction(): PistonMoveReaction;
    getRelative(modX: number, modY: number, myZ: number): Block;
    getRelative(face: BlockFace): Block;
    getRelative(face: BlockFace, distance: number): Block;
    getState(): BlockState;
    getTemperature(): number;
    getType(): Material;
    getWorld(): World;
    getX(): number;
    getY(): number;
    getZ(): number;
    isBlockFaceIndirectlyPowered(face: BlockFace): boolean;
    isBlockFacePowered(face: BlockFace): boolean;
    isBlockPowered(): boolean;
    isEmpty(): boolean;
    isLiquid(): boolean;
    isPassable(): boolean;
    rayTrace(
      start: Location,
      direction: Vector,
      maxDistance: number,
      fluidCollisionMode: FluidCollisionMode
    ): RayTraceResult;
    setBiome(bio: Biome): void;
    setBlockData(data: BlockData): void;
    setBlockData(data: BlockData, applyPhysics: boolean): void;
    setType(type: Material): void;
    setType(type: Material, applyPhysics: boolean): void;
  }

  export interface BlockState extends Metadatable {
    getBlock(): Block;
    getBlockData(): BlockData;
    getChunk(): Chunk;
    getLightLevel(): number;
    getLocation(): Location;
    getLocation(loc: Location): Location;
    getType(): Material;
    getWorld(): World;
    getX(): number;
    getY(): number;
    getZ(): number;
    isPlaced(): boolean;
    setBlockData(data: BlockData): void;
    setType(type: Material): void;
    update(): boolean;
    update(force: boolean): boolean;
    update(force: boolean, applyPhysics: boolean): boolean;
  }

  export interface BrewingStand {}

  export interface Campfire {}

  export interface Chest extends BlockInventoryHolder {}

  export interface CommandBlock {}

  export interface Comparator {}

  export interface Conduit {}

  export interface Container {}

  export interface CreatureSpawner {}

  export interface DaylightDetector {}

  export interface Dispenser {}

  export interface Dropper {}

  export interface EnchantingTable {}

  export interface EnderChest {}

  export interface EndGateway {}

  export interface EntityBlockStorage<T extends Entity> {}

  export interface Furnace {}

  export interface Hopper {}

  export interface Jigsaw {}

  export interface Jukebox {}

  export interface Lectern {}

  export interface Lockable {}

  export interface ShulkerBox {}

  export interface Sign {}

  export interface Skull {}

  export interface Smoker {}

  export interface Structure {}

  export interface TileState {}

  export class DoubleChest {
    constructor(chest: DoubleChestInventory);

    getInventory(): Inventory;
    getLeftSide(): InventoryHolder;
    getLocation(): Location;
    getRightSide(): InventoryHolder;
    getWorld(): World;
    getX(): number;
    getY(): number;
    getZ(): number;
  }

  export enum Biome {
    BADLANDS,
    BADLANDS_PLATEAU,
    BAMBOO_JUNGLE,
    BAMBOO_JUNGLE_HILLS,
    BASALT_DELTAS,
    BEACH,
    BIRCH_FOREST,
    BIRCH_FOREST_HILLS,
    COLD_OCEAN,
    CRIMSON_FOREST,
    DARK_FOREST,
    DARK_FOREST_HILLS,
    DEEP_COLD_OCEAN,
    DEEP_FROZEN_OCEAN,
    DEEP_LUKEWARM_OCEAN,
    DEEP_OCEAN,
    DEEP_WARM_OCEAN,
    DESERT,
    DESERT_HILLS,
    END_BARRENS,
    END_HIGHLANDS,
    END_MIDLANDS,
    ERODED_BADLANDS,
    FLOWER_FOREST,
    FOREST,
    FROZEN_OCEAN,
    FROZEN_RIVER,
    GIANT_SPURCE_TAIGA,
    GIANT_SPRUCE_TAIGA_HILLS,
    GIANT_TREE_TAIGA,
    GIANT_TREE_TAIGA_HILLS,
    GRAVELLY_MOUNTAINS,
    ICE_SPIKES,
    JUNGLE,
    JUNGLE_EDGE,
    JUNGLE_HILLS,
    LUKEWARM_OCEAN,
    MODIFIED_BADLANDS_PLATEAU,
    MODIFIED_GRAVELLY_MOUNTAINS,
    MODIFIED_JUNGLE,
    MODIFIED_JUNGLE_EDGE,
    MODIFIED_WOODED_BADLANDS_PLATEAU,
    MOUNTAIN_EDGE,
    MOUNTAINS,
    MUSHROOM_FIELD_SHORE,
    MUSHROOM_FIELDS,
    NETHER_WASTES,
    OCEAN,
    PLAINS,
    RIVER,
    SAVANNA,
    SAVANNA_PLATEAU,
    SMALL_END_ISLANDS,
    SNOWY_BEACH,
    SNOWY_MOUNTAINS,
    SNOWY_TAIGA,
    SNOWY_TAIGA_HILLS,
    SNOWY_TAIGA_MOUNTAINS,
    SNOWY_TUNDRA,
    SOUL_SAND_VALLEY,
    STONE_SHORE,
    SUNFLOWER_PLAINS,
    SWAMP,
    SWAMP_HILLS,
    TAIGA,
    TAIGA_HILLS,
    TAIGA_MOUNTAINS,
    TALL_BIRCH_FOREST,
    TALL_BIRCH_HILLS,
    THE_END,
    THE_VOID,
    WARM_OCEAN,
    WARPED_FOREST,
    WOODED_BADLANDS_PLATEAU,
    WOODED_HILLS,
    WOODED_MOUNTAINS,
  }

  export enum BlockFace {
    DOWN,
    EAST,
    EAST_NORTH_EAST,
    EAST_SOUTH_EAST,
    NORTH,
    NORTH_EAST,
    NORTH_NORTH_EAST,
    NORTH_NORTH_WEST,
    NORTH_WEST,
    SELF,
    SOUTH,
    SOUTH_EAST,
    SOUTH_SOUTH_EAST,
    SOUTH_WEST,
    UP,
    WEST,
    WEST_NORTH_WEST,
    WEST_SOUTH_WEST,
  }

  export enum PistonMoveReaction {
    BLOCK,
    BREAK,
    IGNORE,
    MOVE,
    PUSH_ONLY,
  }
}

declare module 'bukkit/block/banner' {
  import { DyeColor } from 'bukkit';

  export class Pattern {
    constructor(map: Map<string, object>);
    constructor(color: DyeColor, pattern: PatternType);

    getColor(): DyeColor;
    getPattern(): PatternType;
    serialize(): Map<string, object>;
  }

  export enum PatternType {
    BASE,
    BORDER,
    BRICKS,
    CIRCLE_MIDDLE,
    CREEPER,
    CROSS,
    CURLY_BORDER,
    DIAGONAL_LEFT,
    DIAGONAL_LEFT_MIRROR,
    DIAGONAL_RIGHT,
    DIAGONAL_RIGHT_MIRROR,
    FLOWER,
    GLOBE,
    GRADIENT,
    GRADIENT_UP,
    HALF_HORIZONTAL,
    HALF_HORIZONTAL_MIRROR,
    HALF_VERTICAL,
    HALF_VERTICAL_MIRROR,
    MOJANG,
    PIGLIN,
    RHOMBUS_MIDDLE,
    SKULL,
    SQUARE_BOTTOM_LEFT,
    SQUARE_BOTTOM_RIGHT,
    SQUARE_TOP_LEFT,
    SQUARE_TOP_RIGHT,
    STRAIGHT_CROSS,
    STRIPE_BOTTOM,
    STRIPE_CENTER,
    STRIPE_DOWNLEFT,
    STRIPE_DOWNRIGHT,
    STRIPE_LEFT,
    STRIPE_MIDDLE,
    STRIPE_RIGHT,
    STRIPE_SMALL,
    STRIPE_TOP,
    TRIANGLE_BOTTOM,
    TRIANGLE_TOP,
    TRIANGLES_BOTTOM,
    TRIANGLES_TOP,
  }
}

declare module 'bukkit/block/data' {
  import { Material } from 'bukkit';

  export interface BlockData {
    clone(): BlockData;
    getAsString(hideUnspecified?: boolean): string;
    getMaterial(): Material;
    matches(data: BlockData): boolean;
    merge(data: BlockData): BlockData;
  }

  export interface Ageable {}

  export interface AnaloguePowerable {}

  export interface Attachable {}

  export interface Bisected {}

  export interface BlockData {}

  export interface Directional {}

  export interface FaceAttachable {}

  export interface Levelled {}

  export interface Lightable {}

  export interface MultipleFacing {}

  export interface Openable {}

  export interface Orientable {}

  export interface Powerable {}

  export interface Rail {}

  export interface Rotatable {}

  export interface Snowable {}

  export interface Waterlogged {}

  export module Bisected {
    export enum Half {
      BOTTOM,
      TOP,
    }
  }

  export module FaceAttachable {
    export enum AttachedFace {
      CEILING,
      FLOOR,
      WALL,
    }
  }

  export module Rail {
    export enum Shape {
      ASCENDING_EAST,
      ASCENDING_NORTH,
      ASCENDING_SOUTH,
      ASCENDING_WEST,
      EAST_WEST,
      NORTH_EAST,
      NORTH_SOUTH,
      NORTH_WEST,
      SOUTH_EAST,
      SOUTH_WEST,
    }
  }
}

declare module 'bukkit/block/data/type' {
  import { Enum } from 'java/lang';
  export interface Bamboo {}

  export module Bamboo {
    export enum Leaves {
      LARGE,
      NONE,
      SMALL,
    }
  }

  export interface Bed {}

  export module Bed {
    export enum Part {
      FOOT,
      HEAD,
    }
  }

  export interface Beehive {}

  export interface Bell {}

  export module Bell {
    export enum Attachment {
      CEILING,
      DOUBLE_WALL,
      FLOOR,
      SINGLE_WALL,
    }
  }

  export interface BrewingStand {}

  export interface BubbleColumn {}

  export interface Cake {}

  export interface Campfire {}

  export interface Chest {}

  export module Chest {
    export enum Type {
      LEFT,
      RIGHT,
      SINGLE,
    }
  }

  export interface Cocoa {}

  export interface CommandBlock {}

  export interface Comparator {}

  export module Comparator {
    export enum Mode {
      COMPARE,
      SUBTRACT,
    }
  }

  export interface CoralWallFan {}

  export interface DaylightDetector {}

  export interface Dispenser {}

  export interface Door {}

  export module Door {
    export enum Hinge {
      LEFT,
      RIGHT,
    }
  }

  export interface EnderChest {}

  export interface EndPortalFrame {}

  export interface Farmland {}

  export interface Fence {}

  export interface Fire {}

  export interface Furnace {}

  export interface Gate {}

  export interface GlassPane {}

  export interface Grindstone {}

  export interface Hopper {}

  export interface Jigsaw {}

  export module Jigsaw {
    export enum Orientation {
      DOWN_EAST,
      DOWN_NORTH,
      DOWN_SOUTH,
      DOWN_WEST,
      EAST_UP,
      NORTH_UP,
      SOUTH_UP,
      UP_EAST,
      UP_NORTH,
      UP_SOUTH,
      UP_WEST,
      WEST_UP,
    }
  }

  export interface Jukebox {}

  export interface Ladder {}

  export interface Lantern {}

  export interface Leaves {}

  export interface Lectern {}

  export interface NoteBlock {}

  export interface Observer {}

  export interface Piston {}

  export interface PistonHead {}

  export interface RedstoneRail {}

  export interface RedstoneWallTorch {}

  export interface RedstoneWire {}

  export module RedstoneWire {
    export enum Connection {
      NONE,
      SIDE,
      UP,
    }
  }

  export interface Repeater {}

  export interface RespawnAnchor {}

  export interface Sapling {}

  export interface Scaffolding {}

  export interface SeaPickle {}

  export interface Sign {}

  export interface Slab {}

  export module Slab {
    export enum Type {
      BOTTOM,
      DOUBLE,
      TOP,
    }
  }

  export interface Snow {}

  export interface Stairs {}

  export module Stairs {
    export enum Shape {
      INNER_LEFT,
      INNER_RIGHT,
      OUTER_LEFT,
      OUTER_RIGHT,
      STRAIGHT,
    }
  }

  export interface StructureBlock {}

  export module StructureBlock {
    export enum Mode {}
  }

  export interface Switch {}

  export module Switch {
    /**
     * @deprecated
     * @see {FaceAttachable.AttachedFace}
     */
    export enum Face {
      CEILING,
      FLOOR,
      WALL,
    }
  }

  export interface TechnicalPiston {}

  export module TechnicalPiston {
    export enum Type {
      NORMAL,
      STICKY,
    }
  }

  export interface TNT {}

  export interface TrapDoor {}

  export interface Tripwire {}

  export interface TripwireHook {}

  export interface TurtleEgg {}

  export interface Wall {}

  export interface WallSign {}
}

declare module 'bukkit/block/structure' {
  import { Enum } from 'java/lang';

  export enum Mirror {
    FRONT_BACK,
    LEFT_RIGHT,
    NONE,
  }

  export enum StructureRotation {
    CLOCKWISE_180,
    CLOCKWISE_90,
    COUNTERCLOCKWISE_90,
    NONE,
  }

  export enum UsageMode {
    CORNER,
    DATA,
    LOAD,
    SAVE,
  }
}

declare module 'bukkit/boss' {
  import { Enum } from 'java/lang';
  import { Keyed } from 'bukkit';
  import { Player } from 'bukkit/entity';

  export interface BossBar {
    addFlag(flag: BarFlag): void;
    addPlayer(player: Player): void;
    getColor(): BarColor;
    getPlayers(): Player[];
    getProgress(): number;
    getStyle(): BarStyle;
    getTitle(): string;
    hasFlag(flag: BarFlag): boolean;
    hide(): void;
    isVisible(): boolean;
    removeAll(): void;
    removeFlag(flag: BarFlag): void;
    removePlayer(player: Player): void;
    setColor(color: BarColor): void;
    setProgress(progress: number): void;
    setStyle(style: BarStyle): void;
    setTitle(title: string): void;
    setVisible(visible: boolean): void;
    show(): void;
  }

  export interface DragonBattle {}

  export interface KeyedBossBar extends BossBar, Keyed {}

  export enum BarColor {
    BLUE,
    GREEN,
    PINK,
    PURPLE,
    RED,
    WHITE,
    YELLOW,
  }

  export enum BarFlag {
    CREATE_FOG,
    DARKEN_SKY,
    PLAY_BOSS_MUSIC,
  }

  export enum BarStyle {
    SEGMENTED_10,
    SEGMENTED_12,
    SEGMENTED_20,
    SEGMENTED_6,
    SOLID,
  }
}

declare module 'bukkit/command' {
  import { BaseComponent } from 'bungee/api/chat';

  export interface BlockCommandSender {}

  export interface CommandExecutor {}

  export interface CommandMap {}

  export interface CommandSender {
    spigot(): CommandSender.Spigot;
  }

  export module CommandSender {
    export interface Spigot {
      sendMessage(...components: BaseComponent[]): void;
    }
  }

  export interface ConsoleCommandSender {}

  export interface PluginIdentifiableCommand {}

  export interface ProxiedCommandSender {}

  export interface RemoteConsoleCommandSender {}

  export interface TabCompleter {}

  export interface TabExecutor {}

  export class CommandException extends Error {}

  export class Command extends PluginCommand {}

  export module CommandSender {
    export class Spigot {}
  }

  export class FormattedCommandAlias {}

  export class MultipleCommandAlias {}

  export class PluginCommand {}

  export class PluginCommandYamlParser {}

  export class SimpleCommandMap implements CommandMap {}
}

declare module 'bukkit/command/defaults' {
  import { Command, CommandSender } from 'bukkit/command';

  export class BukkitCommand extends Command {
    protected constructor(
      name: string,
      description: string,
      usageMessage: string,
      aliases: string[]
    );
  }

  export class HelpCommand extends BukkitCommand {}

  export class PluginsCommand extends BukkitCommand {}

  export class ReloadCommand extends BukkitCommand {}

  export class TimingsCommand extends BukkitCommand {}

  export class VersionCommand extends BukkitCommand {}
}

declare module 'bukkit/configuration' {
  export interface Configuration {}

  export interface ConfigurationSection {}

  export class ConfigurationOptions {}

  export class MemoryConfiguration {}

  export class MemoryConfigurationOptions {}

  export class MemorySection {}

  export class InvalidConfigurationException extends Error {}
}

declare module 'bukkit/configuration/file' {
  import { Configuration, ConfigurationOptions } from 'bukkit/configuration';
  export class FileConfiguration implements Configuration {}

  export class FileConfigurationOptions extends ConfigurationOptions {}

  export class YamlConfiguration implements Configuration {}

  export class YamlConfigurationOptions extends ConfigurationOptions {}

  export class YamlConstructor {}

  export class YamlRepresenter {}
}

declare module 'bukkit/configuration/serialization' {
  export interface ConfigurationSerializable {}

  export class ConfigurationSerialization {}
}

declare module 'bukkit/conversations' {
  import { Enum } from 'java/lang';
  export interface Conversable {}

  export interface ConversationAbandondedListener {}

  export interface ConversationCanceller {}

  export interface ConversationPrefix {}

  export interface Prompt {}

  export class BooleanPrompt implements Prompt {}

  export class Conversation {}

  export class ConversationAbandonedEvent {}

  export class ConversationContext {}

  export class ConversationFactory {}

  export class ExactMatchConversationCanceller {}

  export class FixedSetPrompt implements Prompt {}

  export class InactivityConversationCanceller {}

  export class ManuallyAbandonedConversationCanceller {}

  export class MessagePrompt implements Prompt {}

  export class NullConversationPrefix {}

  export class NumericPrompt implements Prompt {}

  export class PlayerNamePrompt implements Prompt {}

  export class PluginNameConversationPrefix {}

  export class RegexPrompt implements Prompt {}

  export class StringPrompt implements Prompt {}

  export class ValidatingPrompt implements Prompt {}

  export module Conversation {
    export enum ConversationState {}
  }
}

declare module 'bukkit/enchantments' {
  export class Enchantment {}
  export class EnchantmentOffer {}
  export class EnchantmentWrapper {}

  export enum EnchantmentTarget {
    ALL,
    ARMOR,
    ARMOR_FEET,
    ARMOR_HEAD,
    ARMOR_LEGS,
    ARMOR_TORSO,
    BOW,
    BREAKABLE,
    CROSSBOW,
    FISHING_ROD,
    TOOL,
    TRIDENT,
    VANISHABLE,
    WEAPON,
    WEARABLE,
  }
}

declare module 'bukkit/entity' {
  import { UUID } from 'java/util';
  import { AdvancementProgress, Advancement } from 'bukkit/advancement';
  import { Attributable } from 'bukkit/attribute';
  import { BlockFace, PistonMoveReaction, Block } from 'bukkit/block';
  import { BlockData } from 'bukkit/block/data';
  import { Attachable } from 'bukkit/material';
  import {
    InventoryHolder,
    InventoryView,
    Inventory,
    ItemStack,
    PlayerInventory,
  } from 'bukkit/inventory';
  import { Metadatable } from 'bukkit/metadata';
  import { PersistentDataHolder } from 'bukkit/persistence';
  import { PotionEffect, PotionEffectType } from 'bukkit/potion';
  import { RayTraceResult, Vector } from 'bukkit/util';
  import { CommandSender } from 'bukkit/command';
  import { Plugin } from 'bukkit/plugin';
  import { EntityDamageEvent } from 'bukkit/event/entity';
  import * as Bukkit from 'bukkit';

  export interface Entity
    extends Metadatable,
      CommandSender,
      Bukkit.Nameable,
      PersistentDataHolder {
    addPassenger(passenger: Entity): boolean;
    addScoreboardTag(tag: string): boolean;
    eject(): boolean;
    getBoundingBox(): BoundingBox;
    getEntityId(): number;
    getFacing(): BlockFace;
    getFallDistance(): number;
    getFireTicks(): number;
    getHeight(): number;
    getLastDamageCause(): EntityDamageEvent;
    getLocation(): Bukkit.Location;
    getMaxFireTicks(): number;
    getNearbyEntities(x: number, y: number, z: number): Entity[];
    getPassenger(): Entity;
    getPassengers(): Entity[];
    getPistonMoveReaction(): PistonMoveReaction;
    getPortalCooldown(): number;
    getPose(): Pose;
    getScoreboardTags(): string[];
    getServer(): Bukkit.Server;
    getTicksLived(): number;
    getType(): EntityType;
    getUniqueId(): UUID;
    getVehicle(): Entity;
    getVelocity(): Vector;
    getWidth(): number;
    getWorld(): Bukkit.World;
    hasGravity(): boolean;
    isCustomNameVisible(): boolean;
    isDead(): boolean;
    isEmpty(): boolean;
    isGlowing(): boolean;
    isInsideVehicle(): boolean;
    isInvulnerable(): boolean;
    isOnGround(): boolean;
    /**
     * @deprecated Draft API
     */
    isPersistent(): boolean;
    isSilent(): boolean;
    isValid(): boolean;
    leaveVehicle(): boolean;
    playEffect(type: Bukkit.EntityEffect): void;
    remove(): void;
    removePassenger(passenger: Entity): boolean;
    removeScoreboardTag(tag: string): boolean;
    setCustomNameVisible(flag: boolean): void;
    setFallDistance(distance: number): void;
    setFireTicks(ticks: number): void;
    setGlowing(flag: boolean): void;
    setGravity(flag: boolean): void;
    setInvulnerable(flag: boolean): void;
  }

  export enum EntityType {
    AREA_EFFECT_CLOUD,
    ARMOR_STAND,
    ARROW,
    BAT,
    BEE,
    BLAZE,
    BOAT,
    CAT,
    CAVE_SPIDER,
    CHICKEN,
    COD,
    COW,
    CREEPER,
    DOLPHIN,
    DONKEY,
    DRAGON_FIREBALL,
    DROPPED_ITEM,
    DROWNED,
    EGG,
    ELDER_GUARDIAN,
    ENDER_CRYSTAL,
    ENDER_DRAGON,
    ENDER_PEARL,
    ENDER_SIGNAL,
    ENDERMAN,
    ENDERMITE,
    EVOKER,
    EVOKER_FANGS,
    EXPERIENCE_ORB,
    FALLING_BLOCK,
    FIREBALL,
    FIREWORK,
    FISHING_HOOK,
    FOX,
    GHAST,
    GIANT,
    GUARDIAN,
    HORSE,
    HUSK,
    ILLUSIONER,
    IRON_GOLEM,
    ITEM_FRAME,
    LEASH_HITCH,
    LIGHTNING,
    LLAMA,
    LLAMA_SPIT,
    MAGMA_CUBE,
    MINECART,
    MINECART_CHEST,
    MINECART_COMMAND,
    MINECART_FURNACE,
    MINECART_HOPPER,
    MINECART_MOB_SPAWNER,
    MINECART_TNT,
    MULE,
    MUSHROOM_COW,
    OCELOT,
    PAINTING,
    PANDA,
    PARROT,
    PHANTOM,
    PIG,
    PIG_ZOMBIE,
    PILLAGER,
    PLAYER,
    POLAR_BEAR,
    PRIMTED_TNT,
    PUFFERFISH,
    RABBIT,
    RAVAGER,
    SALMON,
    SHEEP,
    SHULKER,
    SHULKER_BULLET,
    SILVERFISH,
    SKELETON,
    SKELETON_HORSE,
    SLIME,
    SMALL_FIREBALL,
    SNOWBALL,
    SNOWMAN,
    SPECTRAL_ARROW,
    SPIDER,
    SPLASH_POTION,
    SQUID,
    STRAY,
    THROWN_EXP_BOTTLE,
    TRADER_LLAMA,
    TRIDENT,
    TROPICAL_FISH,
    TURTLE,
    UNKNOWN,
    VEX,
    VILLAGER,
    VINDICATOR,
    WANDERING_TRADER,
    WITCH,
    WITHER,
    WITHER_SKELETON,
    WITHER_SKULL,
    WOLF,
    ZOMBIE,
    ZOMBIE_HORSE,
    ZOMBIE_VILLAGER,
  }

  export interface AbstractArrow {}

  export interface AbstractHorse {}

  export interface AbstractVillager {}

  export interface Ageable {}

  export interface Ambient {}

  export interface Animals {}

  export interface AnimalTamer {
    getName(): string;
    getUniqueId(): UUID;
  }

  export interface AreaEffectCloud {}

  export interface ArmorStand {}

  export interface Arrow {}

  export interface Bat {}

  export interface Bee {}

  export interface Blaze {}

  export interface Boat {}

  export interface Boss {}

  export interface Cat {}

  export interface CaveSpider {}

  export interface ChestedHorse {}

  export interface Chicken {}

  export interface Cod {}

  export interface ComplexEntityPart {}

  export interface Cow {}

  export interface Creature {}

  export interface Creeper {}

  export interface Damageable extends Entity {}

  export interface Dolphin {}

  export interface Donkey {}

  export interface DragonFireball {}

  export interface Drowned {}

  export interface Egg {}

  export interface ElderGuardian {}

  export interface EnderDragon {}

  export interface EnderDragonPart {}

  export interface Enderman {}

  export interface Endermite {}

  export interface EnderPearl {}

  export interface EnderSignal {}

  export interface Evoker {}

  export interface EvokerFangs {}

  export interface ExperienceOrb {}

  export interface Explosive {}

  export interface FallingBlock {}

  export interface Fireball {}

  export interface Firework {}

  export interface Fish {}

  export interface FishHook {}

  export interface Flying {}

  export interface Fox {}

  export interface Ghast {}

  export interface Giant {}

  export interface Golem {}

  export interface Guardian {}

  export interface Hanging extends Entity, Attachable {
    setFacingDirection(face: BlockFace, force: boolean): boolean;
  }

  export interface Hoglin {}

  export interface Horse {}

  export interface HumanEntity
    extends LivingEntity,
      InventoryHolder,
      AnimalTamer {
    closeInventory(): void;
    discoverRecipe(recipe: Bukkit.NamespacedKey): boolean;
    discoverRecipes(recipes: Bukkit.NamespacedKey[]): number;
    getAttackCooldown(): number;
    getBedLocation(): Bukkit.Location;
    getCooldown(material: Bukkit.Material): number;
    getDiscoveredRecipes(): Set<Bukkit.NamespacedKey>;
    getEnderChest(): Inventory;
    getExpToLevel(): number;
    getGameMode(): Bukkit.GameMode;
    getInventory(): PlayerInventory;
    /**
     * @deprecated players can now dual wield
     */
    getItemInHand(): ItemStack;
    getItemOnCursor(): ItemStack;
    getMainHand(): MainHand;
    getName(): string;
    getOpenInventory(): InventoryView;
    getShoulderEntityLeft(): Entity;
    getShoulderEntityRight(): Entity;
    getSleepTicks(): number;
    hasCooldown(material: Bukkit.Material): boolean;
    hasDiscoveredRecipe(recipe: Bukkit.NamespacedKey): boolean;
    isBlocking(): boolean;
    isHandRaised(): boolean;
    openEnchanting(location: Bukkit.Location, force: boolean): InventoryView;
    openInventory(inventory: Inventory): InventoryView;
    openInventory(inventoryView: InventoryView): void;
    openMerchent(trader: Villager, force: boolean): InventoryView;
    openMerchent(merchant: Merchant): InventoryView;
    openWorkbench(location: Bukkit.Location, force: boolean): InventoryView;
    setCooldown(material: Bukkit.Material, ticks: number): void;
    setGameMode(mode: Bukkit.GameMode): void;
    /**
     *
     * @param item
     * @deprecated players can now dual wield
     */
    setItemInHand(item: ItemStack): void;
    setItemOnCursor(item: ItemStack): void;
    setShoulderEntityLeft(entity: Entity): void;
    setShoulderEntityRight(entity: Entity): void;
    setWindowProperty(prop: InventoryView.Property, value: number): boolean;
    sleep(location: Bukkit.Location, force: boolean): boolean;
    undiscoverRecipe(recipes: Bukkit.NamespacedKey[]): number;
    wakeup(setSpawnLocation: boolean): void;
  }

  export interface Husk {}

  export interface Illager {}

  export interface Illusioner {}

  export interface IronGolem {}

  export interface Item {}

  export interface ItemFrame {}

  export interface LargeFireball {}

  export interface LeashHitch {}

  export interface LightningStrike {}

  export interface LingeringPotion {}

  export interface LivingEntity
    extends Damageable,
      ProjectileSource,
      Attributable {
    addPotionEffect(effect: PotionEffect): boolean;
    addPotionEffect(effect: PotionEffect, force: boolean): boolean;
    addPotionEffects(effects: PotionEffect[]): boolean;
    attack(target: Entity): void;
    getActivePotionEffects(): PotionEffect[];
    getCanPickupItems(): boolean;
    setCollidableExemptions(): Set<UUID>;
    getEquipment(): EntityEquipment;
    getEyeHeight(): number;
    getKiller(): Player;
    getLastDamage(): number;
    getLastTwoTargetBlocks(
      transparent: Set<Bukkit.Material>,
      maxDistance: number
    ): Block;
    getTargetBlockExact(maxDistance: number): Block;
    getTargetBlockExact(
      maxDistance: number,
      fluidCollisionMode: Bukkit.FluidCollisionMode
    ): Block;
    hasAI(): boolean;
    hasLineOfSight(other: Entity): boolean;
    hasPotionEffect(type: PotionEffectType): boolean;
    isCollidable(): boolean;
    isGliding(): boolean;
    isLeashed(): boolean;
    isRiptiding(): boolean;
    isSleeping(): boolean;
    rayTraceBlocks(maxDistance: number): RayTraceResult;
    rayTraceBlocks(
      maxDistance: number,
      fluidCollisionMode: Bukkit.FluidCollisionMode
    ): RayTraceResult;
    removePotionEffect(type: PotionEffectType): void;
    setAI(ai: boolean): void;
    setCanPickupItems(pickup: boolean): void;
    setCollidable(collidable: boolean): void;
    setGliding(gliding: boolean): void;
    setLastDamage(damage: boolean): void;
    setLeashHolder(holder: Entity): boolean;
    setMaximumAir(ticks: number): void;
    setMemory<T>(memoryKey: MemoryKey<T>, value: T): void;
    setNoDamageTicks(ticks: number): void;
    setRemainingAir(ticks: number): void;
    setRemoveWhenFarAway(remove: boolean): void;
    setSwimming(swimming: boolean): void;
    swingMainHand(): void;
    swingOffHand(): void;
  }

  export interface Llama {}

  export interface LlamaSpit {}

  export interface MagmaCube {}

  export interface Minecart {}

  export interface Mob {}

  export interface Monster {}

  export interface Mule {}

  export interface MushroomCow {}

  export interface NPC {}

  export interface Ocelot {}

  export interface Painting {}

  export interface Panda {}

  export interface Parrot {}

  export interface Phantom {}

  export interface Pig {}

  export interface Piglin {}

  export interface PigZombie {}

  export interface Pillager {}

  export interface Player extends HumanEntity, Bukkit.OfflinePlayer {
    canSee(player: Player): boolean;
    chat(msg: string): void;
    getAddress(): InetSocketAddress;
    getAdvancementProgress(advancement: Advancement): AdvancementProgress;
    getAllowFlight(): boolean;
    getBedSpawnLocation(): Bukkit.Location;
    getClientViewDistance(): number;
    getCompassTarget(): Bukkit.Location;
    getDisplayName(): string;
    getExhaustion(): number;
    getExp(): number;
    getFlySpeed(): number;
    getFoodLevel(): number;
    getHealthScale(): number;
    getLevel(): number;
    getLocal(): string;
    getPlayerListFooter(): string;
    getPlayerListHeader(): string;
    getPlayerListName(): string;
    getPlayerTime(): number;
    getPlayerTimeOffset(): number;
    getPlayerWeather(): Bukkit.WeatherType;
    getSaturation(): number;
    getScoreboard(): Scoreboard;
    getSpectatorTarget(): Entity;
    getTotalExperience(): number;
    getWalkSpeed(): number;
    giveExp(amount: number): void;
    giveExpLevels(amount: number): void;
    hidePlayer(player: Player): void;
    isFlying(): boolean;
    isHealthScaled(): boolean;
    isOnGround(): boolean;
    isPlayerTimeRelative(): boolean;
    isSleepingIgnored(): boolean;
    isSneaking(): boolean;
    isSprinting(): boolean;
    kickPlayer(msg: string): void;
    loadData(): void;
    openBook(book: ItemStack): void;
    performCommand(command: string): boolean;
    playEffect(loc: Bukkit.Location, effect: Bukkit.Effect, data: number): void;
    playNote(
      loc: Bukkit.Location,
      instrument: Bukkit.Instrument,
      note: Bukkit.Note
    ): void;
    playSound(
      loc: Bukkit.Location,
      sound: string,
      volume: number,
      pitch: number
    ): void;
    playSound(
      loc: Bukkit.Location,
      sound: string,
      category: Bukkit.SoundCategory,
      volume: number,
      pitch: number
    ): void;
    playSound(
      loc: Bukkit.Location,
      sound: Bukkit.Sound,
      volume: number,
      pitch: number
    ): void;
    playSound(
      loc: Bukkit.Location,
      sound: Bukkit.Sound,
      category: Bukkit.SoundCategory,
      volume: number,
      pitch: number
    ): void;
    resetPlayerTime(): void;
    resetPlayerWeather(): void;
    resetTitle(): void;
    saveData(): void;
    sendBlockChange(loc: Bukkit.Location, block: BlockData): void;
    sendExperienceChange(progress: number): void;
    sendExperienceChange(progress: number, level: number): void;
    sendMap(map: MapView): void;
    sendRawMessage(message: string): void;
    sendSignChange(loc: Bukkit.Location, lines: string[]): void;
    sendSignChange(
      loc: Bukkit.Location,
      lines: string[],
      dyeColor: Bukkit.DyeColor
    );
    sendTitle(title: string, subtitle: string): void;
    sendTitle(
      title: string,
      subtitle: string,
      fadeIn: number,
      stay: number,
      fadeOut: number
    ): void;
    setAllowFlight(flight: boolean): void;
    setBedSpawnLocation(loc: Bukkit.Location): void;
    setBedSpawnLocation(loc: Bukkit.Location, force: boolean): void;
    setCompassTarget(loc: Bukkit.Location): void;
    setDisplayName(name: string): void;
    setExhaustion(value: number): void;
    setExp(exp: number): void;
    setFlying(value: boolean): void;
    setFlySpeed(value: number): void;
    setFoodLevel(value: number): void;
    setHealthScale(value: number): void;
    setHealthScaled(scale: boolean): void;
    setLevel(level: number): void;
    setPlayerListFooter(footer: string): void;
    setPlayerListHeader(header: string): void;
    setPlayerListName(name: string): void;
    setPlayerTime(time: number, relative: boolean): void;
    setPlayerWeather(type: Bukkit.WeatherType): void;
    setResourcePack(url: string): void;
    setResourcePack(url: string, hash: Uint8Array): void;
    setSaturation(value: number): void;
    setScoreboard(scoreboard: Scoreboard): void;
    setSleepingIgnored(isSleeping: boolean): void;
    setSneaking(sneak: boolean): void;
    setSpectatorTarget(entity: Entity): void;
    setSprinting(sprinting: boolean): void;
    setTotalExperience(exp: number): void;
    setWalkSpeed(value: number): void;
    showPlayer(plugin: Plugin, player: Player): void;
    spawnParticle(
      particle: Bukkit.Particle,
      x: number,
      y: number,
      z: number,
      count: number
    );
    spawnParticle(
      particle: Bukkit.Particle,
      x: number,
      y: number,
      z: number,
      count: number,
      offsetX: number,
      offsetY: number,
      offsetZ: number
    ): void;
    spawnParticle(
      particle: Bukkit.Particle,
      x: number,
      y: number,
      z: number,
      count: number,
      offsetX: number,
      offsetY: number,
      offsetZ: number,
      extra: number
    ): void;
    spawnParticle<T>(
      particle: Bukkit.Particle,
      x: number,
      y: number,
      z: number,
      count: number,
      offsetX: number,
      offsetY: number,
      offsetZ: number,
      extra: number,
      data: T
    ): void;
    spawnParticle<T>(
      particle: Bukkit.Particle,
      x: number,
      y: number,
      z: number,
      count: number,
      offsetX: number,
      offsetY: number,
      offsetZ: number,
      data: T
    ): void;
    spawnParticle<T>(
      particle: Bukkit.Particle,
      x: number,
      y: number,
      z: number,
      count: number,
      data: T
    ): void;
    spawnParticle(
      particle: Bukkit.Particle,
      loc: Bukkit.Location,
      count: number
    ): void;
    spawnParticle(
      particle: Bukkit.Particle,
      loc: Bukkit.Location,
      count: number,
      offsetX: number,
      offsetY: number,
      offsetZ: number
    ): void;
    spawnParticle(
      particle: Bukkit.Particle,
      loc: Bukkit.Location,
      count: number,
      offsetX: number,
      offsetY: number,
      offsetZ: number,
      extra: number
    ): void;
    spawnParticle<T>(
      particle: Bukkit.Particle,
      loc: Bukkit.Location,
      count: number,
      offsetX: number,
      offsetY: number,
      offsetZ: number,
      extra: number,
      data: T
    ): void;
    spawnParticle<T>(
      particle: Bukkit.Particle,
      loc: Bukkit.Location,
      count: number,
      offsetX: number,
      offsetY: number,
      offsetZ: number,
      data: T
    ): void;
    spawnParticle<T>(
      particle: Bukkit.Particle,
      loc: Bukkit.Location,
      count: number,
      data: T
    ): void;
    stopSound(sound: string): void;
    stopSound(sound: string, category: Bukkit.SoundCategory): void;
    stopSound(sound: Bukkit.Sound): void;
    stopSound(sound: Bukkit.Sound, category: Bukkit.SoundCategory): void;
    updateCommands(): void;
    updateInventory(): void;
  }

  export interface PolarBear {}

  export interface Projectile {}

  export interface PufferFish {}

  export interface Rabbit {}

  export interface Raider {}

  export interface Ravager {}

  export interface Salmon {}

  export interface Sheep {}

  export interface Shulker {}

  export interface ShulkerBullet {}

  export interface Silverfish {}

  export interface Sittable {}

  export interface SizedFireball {}

  export interface Skeleton {}

  export interface SkeletonHorse {}

  export interface Slime {}

  export interface SmallFireball {}

  export interface Snowball {}

  export interface Snowman {}

  export interface SpectralArrow {}

  export interface Spellcaster {}

  export interface Spider {}

  export interface SplashPotion {}

  export interface Squid {}

  export interface Steerable {}

  export interface Stray {}

  export interface Strider {}

  export interface Tameable {}

  export interface ThrowableProjectile {}

  export interface ThrownExpBottle {}

  export interface TippedArrow {}

  export interface TNTPrimed {}

  export interface TraderLlama {}

  export interface Trident {}

  export interface TropicalFish {}

  export interface Turtle {}

  export interface Vehicle {}

  export interface Vex {}

  export interface Villager {}

  export interface Vindicator {}

  export interface WanderingTrader {}

  export interface WaterMob {}

  export interface Witch {}

  export interface Wither {}

  export interface WitherSkeleton {}

  export interface WitherSkull {}

  export interface Wolf {}

  export interface Zoglin {}

  export interface Zombie {}

  export interface ZombieHorse {}

  export interface ZombieVillager {}

  export module AbstractArrow {
    export enum PickupStatus {}
  }

  export module Cat {
    export enum Type {}
  }

  export module EnderDragon {
    export enum Phase {}
  }

  export module Evoker {
    export enum Spell {}
  }

  export module Fox {
    export enum Type {}
  }

  export module Horse {
    export enum Color {}

    export enum Style {}

    /**
     * @deprecated Different variants are different classes
     */
    export enum Variant {}
  }

  export module Llama {
    export enum Color {}
  }
}

declare module 'bukkit/entity/memory' {}

declare module 'bukkit/entity/minecart' {}

declare module 'bukkit/event' {
  import { RegisteredListener, Plugin, Plugin, Plugin } from 'bukkit/plugin';

  export interface Listener {}
  export interface Cancellable {
    isCancelled(): boolean;
    setCancelled(cancel: boolean): void;
  }
  export interface Event {
    getEventName(): string;
    getHandlers(): HandlerList;
    isAsynchronous(): boolean;
  }
  export module Event {
    export enum Result {
      ALLOW,
      DEFAULT,
      DENY,
    }
  }
  export enum EventPriority {
    HIGH,
    HIGHEST,
    LOW,
    LOWEST,
    MONITOR,
    NORMAL,
  }
  export class HandlerList {
    bake(): void;
    static bakeAll(): void;
    getHandlerLists(): HandlerList[];
    getRegisteredListeners(): RegisteredListener[];
    static getRegisteredListeners(plugin: Plugin): RegisteredListener[];
    register(listener: RegisteredListener): void;
    registerAll(listeners: RegisteredListener[]): void;
    unregister(listener: Listener): void;
    unregister(plugin: Plugin): void;
    unregister(listener: RegisteredListener): void;
    static unregisterAll(): void;
    static unregisterAll(listener: Listener): void;
    static unregisterAll(plugin: Plugin): void;
  }
}

declare module 'bukkit/event/block' {
  import { Event, Cancellable } from 'bukkit/event';
  import { Block, BlockState } from 'bukkit/block';
  import { Player } from 'bukkit/entity';
  import { EquipmentSlot, ItemStack } from 'bukkit/inventory';

  export enum Action {
    LEFT_CLICK_AIR,
    LEFT_CLICK_BLOCK,
    PHYSICAL,
    RIGHT_CLICK_AIR,
    RIGHT_CLICK_BLOCK,
  }

  export interface BlockEvent extends Event, Cancellable {
    getBlock(): Block;
  }

  export interface BlockBreakEvent extends BlockEvent {
    constructor(block: Block, player: Player): BlockBreakEvent;
    getPlayer(): Player;
    isDropItems(): boolean;
    setDropItems(dropItems: boolean): void;
  }
  export interface BlockBurnEvent extends BlockEvent {
    constructor(block: Block): BlockBurnEvent;
    constructor(block: Block, ignitingBlock: Block): BlockBurnEvent;
    getIgnitingBlock(): Block;
  }
  export interface BlockPlaceEvent extends BlockEvent {
    canBuild(): boolean;
    getBlockAgainst(): Block;
    getBlockPlaced(): Block;
    getBlockReplacedState(): BlockState;
    getHand(): EquipmentSlot;
    getItemInHand(): ItemStack;
    getPlayer(): Player;
    setBuild(canBuild: boolean): void;
  }
  export interface BlockCanBuildEvent extends BlockEvent {}
  export interface BlockCookEvent extends BlockEvent {}
  export interface BlockDamageEvent extends BlockEvent {}
  export interface BlockDispenseArmorEvent extends BlockEvent {}
  export interface BlockDispenseEvent extends BlockEvent {}
  export interface BlockDropItemEvent extends BlockEvent {}
  export interface BlockExpEvent extends BlockEvent {}
  export interface BlockExplodeEvent extends BlockEvent {}
  export interface BlockFadeEvent extends BlockEvent {}
  export interface BlockFertilizeEvent extends BlockEvent {}
  export interface BlockFormEvent extends BlockEvent {}
  export interface BlockFromToEvent extends BlockEvent {}
  export interface BlockGrowEvent extends BlockEvent {}
  export interface BlockIgniteEvent extends BlockEvent {}
  export interface BlockMultiPlaceEvent extends BlockEvent {}
  export interface BlockPhysicsEvent extends BlockEvent {}
  export interface BlockPistonExtendEvent extends BlockEvent {}
  export interface BlockPistonRetractEvent extends BlockEvent {}
  export interface BlockRedstoneEvent extends BlockEvent {}
  export interface BlockShearEntityEvent extends BlockEvent {}
  export interface BlockSpreadEvent extends BlockEvent {}
  export interface CauldronLevelChangeEvent extends BlockEvent {}
  export interface EntityBlockFormEvent extends BlockEvent {}
  export interface FluidLevelChangeEvent extends BlockEvent {}
  export interface LeavesDecayEvent extends BlockEvent {}
  export interface MoistureChangeEvent extends BlockEvent {}
  export interface NotePlayEvent extends BlockEvent {}
  export interface SignChangeEvent extends BlockEvent {}
  export interface SpongeAbsorbEvent extends BlockEvent {}
}

declare module 'bukkit/event/enchantment' {
  export interface EnchantItemEvent {}
  export interface PrepareItemEnchantEvent {}
}

declare module 'bukkit/event/entity' {
  import { Event, Cancellable } from 'bukkit/event';
  import { Entity, EntityType, Player } from 'bukkit/entity';

  export interface EntityEvent extends Event, Cancellable {
    getEntity(): Entity;
    getEntityType(): EntityType;
  }

  export interface AreaEffectCloudApplyEvent extends EntityEvent {}
  export interface BatToggleSleepEvent extends EntityEvent {}
  export interface CreatureSpawnEvent extends EntityEvent {}
  export interface CreeperPowerEvent extends EntityEvent {}
  export interface EnderDragonChangePhaseEvent extends EntityEvent {}
  export interface EntityAirChangeEvent extends EntityEvent {}
  export interface EntityBreakDoorEvent extends EntityEvent {}
  export interface EntityBreedEvent extends EntityEvent {}
  export interface EntityChangeBlockEvent extends EntityEvent {}
  export interface EntityCombustByBlockEvent extends EntityEvent {}
  export interface EntityCombustByEntityEvent extends EntityEvent {}
  export interface EntityCombustEvent extends EntityEvent {}
  export interface EntityCreatePortalEvent extends EntityEvent {}
  export interface EntityDamageByBlockEvent extends EntityEvent {}
  export interface EntityDamageByEntityEvent extends EntityEvent {}
  export interface EntityDamageEvent extends EntityEvent {}
  export interface EntityDeathEvent extends EntityEvent {}
  export interface EntityDropItemEvent extends EntityEvent {}
  export interface EntityExplodeEvent extends EntityEvent {}
  export interface EntityInteractEvent extends EntityEvent {}
  export interface EntityPickupItemEvent extends EntityEvent {}
  export interface EntityPlaceEvent extends EntityEvent {}
  export interface EntityPortalEnterEvent extends EntityEvent {}
  export interface EntityPortalEvent extends EntityEvent {}
  export interface EntityPortalExitEvent extends EntityEvent {}
  export interface EntityPoseChangeEvent extends EntityEvent {}
  export interface EntityPotionEffectEvent extends EntityEvent {}
  export interface EntityRegainHealthEvent extends EntityEvent {}
  export interface EntityResurrectEvent extends EntityEvent {}
  export interface EntityShootBowEvent extends EntityEvent {}
  export interface EntitySpawnEvent extends EntityEvent {}
  export interface EntityTameEvent extends EntityEvent {}
  export interface EntityTargetEvent extends EntityEvent {}
  export interface EntityTargetLivingEntityEvent extends EntityEvent {}
  export interface EntityTeleportEvent extends EntityEvent {}
  export interface EntityToggleGlideEvent extends EntityEvent {}
  export interface EntityToggleSwimEvent extends EntityEvent {}
  export interface EntityTransformEvent extends EntityEvent {}
  export interface EntityUnleashEvent extends EntityEvent {}
  export interface ExpBottleEvent extends EntityEvent {}
  export interface ExplosionPrimeEvent extends EntityEvent {}
  export interface FireworkExplodeEvent extends EntityEvent {}
  export interface FoodLevelChangeEvent extends EntityEvent {}
  export interface HorseJumpEvent extends EntityEvent {}
  export interface ItemDespawnEvent extends EntityEvent {}
  export interface ItemMergeEvent extends EntityEvent {}
  export interface ItemSpawnEvent extends EntityEvent {}
  export interface LingeringPotionSplashEvent extends EntityEvent {}
  export interface PigZapEvent extends EntityEvent {}
  export interface PigZombieAngerEvent extends EntityEvent {}
  export interface PlayerDeathEvent extends EntityEvent {
    getDeathMessage(): string;
    getEntity(): Player;
  }
  export interface PlayerLeashEntityEvent extends EntityEvent {}
  export interface PotionSplashEvent extends EntityEvent {}
  export interface ProjectileHitEvent extends EntityEvent {}
  export interface ProjectileLaunchEvent extends EntityEvent {}
  export interface SheepDyeWoolEvent extends EntityEvent {}
  export interface SheepRegrowWoolEvent extends EntityEvent {}
  export interface SlimeSplitEvent extends EntityEvent {}
  export interface SpawnerSpawnEvent extends EntityEvent {}
  export interface VillagerAcquireTradeEvent extends EntityEvent {}
  export interface VillagerCareerChangeEvent extends EntityEvent {}
  export interface VillagerReplenishTradeEvent extends EntityEvent {}
}

declare module 'bukkit/event/hanging' {
  import { Event } from 'bukkit/event';
  import { Hanging } from 'bukkit/entity';

  export interface HangingEvent extends Event {
    getEntity(): Hanging;
  }

  export interface HangingBreakByEntityEvent extends HangingEvent {}
  export interface HangingBreakEvent extends HangingEvent {}
  export interface HangingPlaceEvent extends HangingEvent {}
}

declare module 'bukkit/event/inventory' {
  export interface BrewingStandFuelEvent {}
  export interface CraftItemEvent {}
  export interface FurnaceBurnEvent {}
  export interface FurnaceExtractEvent {}
  export interface FurnaceSmeltEvent {}
  export interface InventoryClickEvent {}
  export interface InventoryCloseEvent {}
  export interface InventoryCreativeEvent {}
  export interface InventoryDragEvent {}
  export interface InventoryInteractEvent {}
  export interface InventoryMoveItemEvent {}
  export interface InventoryOpenEvent {}
  export interface InventoryPickupItemEvent {}
  export interface PrepareAnvilEvent {}
  export interface PrepareItemCraftEvent {}
  export interface TradeSelectEvent {}
}

declare module 'bukkit/event/player' {
  import { Material } from 'bukkit';
  import { Event, Cancellable } from 'bukkit/event';
  import { Player } from 'bukkit/entity';
  import { Action } from 'bukkit/event/block';
  import { Block, BlockFace } from 'bukkit/block';
  import { EquipmentSlot, ItemStack } from 'bukkit/inventory';

  export interface PlayerEvent extends Event, Cancellable {
    getPlayer(): Player;
    getKeepInventory(): boolean;
    getKeepLevel(): boolean;
    getNewExp(): number;
    getNewLevel(): number;
    getNewTotalExp(): number;
    setDeathMessage(deathMessage: string): void;
    setKeepInventory(value: boolean): void;
    setKeepLevel(value: boolean): void;
    setNewExp(exp: number): void;
    setNewLevel(level: number): void;
    setNewTotalExp(totalExp: number): void;
  }

  export interface PlayerAdvancementDoneEvent extends PlayerEvent {}
  export interface PlayerAnimationEvent extends PlayerEvent {}
  export interface PlayerArmorStandManipulateEvent extends PlayerEvent {}
  export interface PlayerBedEnterEvent extends PlayerEvent {}
  export interface PlayerBedLeaveEvent extends PlayerEvent {}
  export interface PlayerBucketEmptyEvent extends PlayerEvent {}
  export interface PlayerBucketFillEvent extends PlayerEvent {}
  export interface PlayerChangedMainHandEvent extends PlayerEvent {}
  export interface PlayerChangedWorldEvent extends PlayerEvent {}
  export interface PlayerChannelEvent extends PlayerEvent {}
  export interface PlayerChatEvent extends PlayerEvent {}
  export interface PlayerChatTabCompleteEvent extends PlayerEvent {}
  export interface PlayerCommandPreprocessEvent extends PlayerEvent {}
  export interface PlayerCommandSendEvent extends PlayerEvent {}
  export interface PlayerDropItemEvent extends PlayerEvent {}
  export interface PlayerEditBookEvent extends PlayerEvent {}
  export interface PlayerEggThrowEvent extends PlayerEvent {}
  export interface PlayerExpChangeEvent extends PlayerEvent {}
  export interface PlayerFishEvent extends PlayerEvent {}
  export interface PlayerGameModeChangeEvent extends PlayerEvent {}
  export interface PlayerInteractAtEntityEvent extends PlayerEvent {}
  export interface PlayerInteractEntityEvent extends PlayerEvent {}
  export interface PlayerInteractEvent extends PlayerEvent {
    getAction(): Action;
    getBlockFace(): BlockFace;
    getClickedBlock(): Block;
    getHand(): EquipmentSlot;
    getItem(): ItemStack;
    getMaterial(): Material;
    hasBlock(): boolean;
    hasItem(): boolean;
    isBlockInHand(): boolean;
  }
  export interface PlayerItemBreakEvent extends PlayerEvent {}
  export interface PlayerItemConsumeEvent extends PlayerEvent {}
  export interface PlayerItemDamageEvent extends PlayerEvent {}
  export interface PlayerItemHeldEvent extends PlayerEvent {}
  export interface PlayerItemMendEvent extends PlayerEvent {}
  export interface PlayerJoinEvent extends PlayerEvent {}
  export interface PlayerKickEvent extends PlayerEvent {}
  export interface PlayerLevelChangeEvent extends PlayerEvent {}
  export interface PlayerLocaleChangeEvent extends PlayerEvent {}
  export interface PlayerLoginEvent extends PlayerEvent {}
  export interface PlayerMoveEvent extends PlayerEvent {}
  export interface PlayerPickupArrowEvent extends PlayerEvent {}
  export interface PlayerPickupItemEvent extends PlayerEvent {}
  export interface PlayerPortalEvent extends PlayerEvent {}
  export interface PlayerPreLoginEvent extends PlayerEvent {}
  export interface PlayerQuitEvent extends PlayerEvent {}
  export interface PlayerRecipeDiscoverEvent extends PlayerEvent {}
  export interface PlayerRegisterChannelEvent extends PlayerEvent {}
  export interface PlayerResourcePackStatusEvent extends PlayerEvent {}
  export interface PlayerRespawnEvent extends PlayerEvent {}
  export interface PlayerRiptideEvent extends PlayerEvent {}
  export interface PlayerStatisticIncrementEvent extends PlayerEvent {}
  export interface PlayerShearEntityEvent extends PlayerEvent {}
  export interface PlayerSwapHandItemsEvent extends PlayerEvent {}
  export interface PlayerTakeLecternBookEvent extends PlayerEvent {}
  export interface PlayerTeleportEvent extends PlayerEvent {}
  export interface PlayerToggleFlightEvent extends PlayerEvent {}
  export interface PlayerToggleSprintEvent extends PlayerEvent {}
  export interface PlayerUnleashEntityEvent extends PlayerEvent {}
  export interface PlayerUnregisterChannelEvent extends PlayerEvent {}
  export interface PlayerVelocityEvent extends PlayerEvent {}
}

declare module 'bukkit/event/raid' {
  export interface RaidFinishEvent {}
  export interface RaidSpawnWaveEvent {}
  export interface RaidStopEvent {}
  export interface RaidTriggerEvent {}
}

declare module 'bukkit/event/server' {
  export interface BroadcastMessageEvent {}
  export interface MapInitializeEvent {}
  export interface PluginDisableEvent {}
  export interface PluginEnableEvent {}
  export interface RemoteServerCommandEvent {}
  export interface ServerCommandEvent {}
  export interface ServerListPingEvent {}
  export interface ServerLoadEvent {}
  export interface ServiceRegisterEvent {}
  export interface ServiceUnregisterEvent {}
  export interface TabCompleteEvent {}
}

declare module 'bukkit/event/vehicle' {
  export interface VehicleBlockCollisionEvent {}
  export interface VehicleCreateEvent {}
  export interface VehicleDamageEvent {}
  export interface VehicleDestroyEvent {}
  export interface VehicleEnterEvent {}
  export interface VehicleEntityCollisionEvent {}
  export interface VehicleExitEvent {}
  export interface VehicleMoveEvent {}
  export interface VehicleUpdateEvent {}
}

declare module 'bukkit/event/weather' {
  export interface LightningStrikeEvent {}
  export interface ThunderChangeEvent {}
  export interface WeatherChangeEvent {}
}

declare module 'bukkit/event/world' {
  export interface ChunkLoadEvent {}
  export interface ChunkPopulateEvent {}
  export interface ChunkUnloadEvent {}
  export interface PortalCreateEvent {}
  export interface SpawnChangeEvent {}
  export interface StructureGrowEvent {}
  export interface WorldInitEvent {}
  export interface WorldLoadEvent {}
  export interface WorldSaveEvent {}
  export interface WorldUnloadEvent {}
}

declare module 'bukkit/generator' {}

declare module 'bukkit/help' {
  import { Command, CommandSender } from 'bukkit/command';
  import { Class } from 'java/lang';

  export interface HelpMap {
    addTopic(topic: HelpTopic): void;
    clear(): void;
    getHelpTopic(topicName: string): HelpTopic;
    getHelpTopics(): HelpTopic[];
    getIgnoredPlugins(): string[];
    registerHelpTopicFactory<T>(
      commandClass: Class<T>,
      factory: HelpTopicFactory<T>
    ): void;
  }

  export interface HelpTopicFactory<T extends Command> {}

  export abstract class HelpTopic {
    amendCanSee(amendedPermission: string): void;
    amendTopic(shortText: string, fullText: string): void;
    abstract canSee(player: CommandSender): boolean;
    getFullText(forWho: CommandSender): string;
    getName(): string;
    getShortText(): string;
  }

  export class HelpTopicComparator {}

  export module HelpTopicComparator {
    export class TopicNameCaparator {}
  }

  export class IndexHelpTopic {}

  export class GenericCommandHelpTopic extends HelpTopic {
    constructor(command: Command);
    canSee(player: CommandSender): boolean;
  }
}

declare module 'bukkit/inventory' {
  import { Material, Location, Keyed, NamespacedKey } from 'bukkit';
  import { Block } from 'bukkit/block';
  import { HumanEntity } from 'bukkit/entity';
  import { Enchantment } from 'bukkit/enchantments';
  import { ItemMeta } from 'bukkit/inventory/meta';

  export class ItemStack {
    addEnchantment(enchantment: Enchantment, level: number): void;
    addEnchantments(enchantments: Map<Enchantment, number>): void;
    addUnsafeEnchantment(enchantment: Enchantment, level: number): void;
    addUnsafeEnchantments(enchantments: Map<Enchantment, number>): void;
    clone(): ItemStack;
    containsEnchantment(enchantment: Enchantment): boolean;
    static deserialize(args: Map<string, object>): ItemStack;
    equals(target: object): boolean;
    getAmount(): number;
    getDurability(): number;
    getEnchantmentLevel(enchantment: Enchantment): number;
    getEnchantments(): Map<Enchantment, number>;
    getItemMeta(): ItemMeta;
    getMaxStackSize(): number;
    getType(): Material;
    hashCode(): number;
    hasItemMeta(): boolean;
    isSimilar(other: ItemStack): boolean;
    removeEnchantment(enchantment: Enchantment): number;
    serialize(): Map<Enchantment, number>;
    setAmount(amount: number): void;
    setDurability(durability: number): void;
    setItemMeta(meta: ItemMeta): void;
    setType(type: Material): void;
    toString(): string;
  }

  export interface InventoryHolder {
    getInventory(): Inventory;
  }

  export interface BlockInventoryHolder extends InventoryHolder {
    getBlock(): Block;
  }

  export interface Inventory extends Iterable<ItemStack> {
    addItem(...stack: ItemStack[]): HashMap<number, ItemStack>;
    all(item: ItemStack | Material): HashMap<number, ItemStack>;
    clear(): void;
    clear(index: number): void;
    contains(item: ItemStack | Material): boolean;
    contains(item: ItemStack | Material, amount: number): boolean;
    containsAtLeast(item: ItemStack | Material): boolean;
    containsAtLeast(item: ItemStack | Material, amount: number): boolean;
    first(item: ItemStack | Material): number;
    firstEmpty(): number;
    getContents(): ItemStack[];
    getHolder(): InventoryHolder;
    getItem(index: number): ItemStack;
    getLocation(): Location;
    getMaxStackSize(): number;
    getSize(): number;
    getStorageContents(): ItemStack[];
    getType(): InventoryType;
    getViewers(): List<HumanEntity>;
    iterator(index: number): ListIterator<ItemStack>;
    remove(item: ItemStack | Material): void;
    removeItem(...stack: ItemStack[]): HashMap<number, ItemStack>;
    setContents(items: ItemStack[]): void;
    setStorageContents(items: ItemStack[]): void;
  }

  export enum EquipmentSlot {
    CHEST,
    FEET,
    HAND,
    HEAD,
    LEGS,
    OFF_HAND,
  }

  export enum MainHand {
    LEFT,
    RIGHT,
  }

  export enum InventoryType {
    ANVIL,
    BARREL,
    BEACON,
    BLAST_FURNACE,
    BREWING,
    CARTOGRAPHY,
    CHEST,
    CRAFTING,
    CREATIVE,
    DISPENSER,
    DROPPER,
    ENCHANTING,
    ENDER_CHEST,
    FURNACE,
    GRINDSTONE,
    HOPPER,
    LECTERN,
    LOOM,
    MERCHANT,
    PLAYER,
    SHULKER_BOX,
    SMITHING,
    SMOKER,
    STONECUTTER,
    WORKBENCH,
  }

  export module InventoryType {
    export enum SlotType {
      ARMOR,
      CONTAINER,
      CRAFTING,
      FUEL,
      OUTSIDE,
      QUICKBAR,
      RESULT,
    }
  }

  export interface PlayerInventory extends Inventory {
    getArmorContents(): ItemStack[];
    getBoots(): ItemStack;
    getChestplate(): ItemStack;
    getExtraContents(): ItemStack[];
    getHeldItemSlot(): number;
    getHelment(): ItemStack;
    getHolder(): HumanEntity;
    getItem(slot: EquipmentSlot): ItemStack;
    /**
     * @deprecated players can now dual wield
     */
    getItemInHand(): ItemStack;
    getItemInMainHand(): ItemStack;
    getItemInOffHand(): ItemStack;
    getLeggings(): ItemStack;
    setArmorContents(items: ItemStack[]): void;
    setBoots(boots: ItemStack): void;
    setChestplate(chestplate: ItemStack): void;
    setExtraContents(contents: ItemStack[]): void;
    setHeldItemSlot(slot: number): void;
    setHelment(helment: ItemStack): void;
    setItem(index: number, item: ItemStack): void;
    setItem(slot: EquipmentSlot, item: ItemStack): void;
    /**
     *
     * @param stack
     * @deprecated players can now dual wield
     */
    setItemInHand(stack: ItemStack): void;
    setItemInMainHand(item: ItemStack): void;
    setItemInOffHand(item: ItemStack): void;
    setLeggings(leggings: ItemStack): void;
  }

  export interface InventoryView {
    close(): void;
    convertSlot(rawSlot: number): number;
    countSlots(): number;
    getBottomInventory(): Inventory;
    getCursor(): ItemStack;
    getInventory(rawSlot: number): Inventory;
    getItem(slot: number): ItemStack;
    getPlayer(): HumanEntity;
    getSlotType(slot: number): InventoryType.SlotType;
    getTitle(): string;
    getTopInventory(): Inventory;
    getType(): InventoryType;
    setCursor(item: ItemStack): void;
    setItem(slot: number, item: ItemStack): void;
    setProperty(prop: InventoryView.Property, value: number): boolean;
  }

  export module InventoryView {
    export enum Property {
      BOOK_PAGE,
      BREW_TIME,
      BURN_TIME,
      COOK_TIME,
      ENCHANT_BUTTON1,
      ENCHANT_BUTTON2,
      ENCHANT_BUTTON3,
      ENCHANT_ID1,
      ENCHANT_ID2,
      ENCHANT_ID3,
      ENCHANT_LEVEL1,
      ENCHANT_LEVEL2,
      ENCHANT_LEVEL3,
      ENCHANT_XP_SEED,
      FUEL_TIME,
      LEVELS,
      PRIMARY_EFFECT,
      REPAIR_COST,
      SECONDARY_EFFECT,
      TICKS_FOR_CURRENT_FUEL,
      TICKS_FOR_CURRENT_SMELTING,
    }
  }

  export abstract class RecipeChoice {
    static ExactChoice: RecipeChoice;
    static MaterialChoice: RecipeChoice;
    test(itemStack: ItemStack): boolean;
  }

  export interface Recipe {
    getResult(): ItemStack;
  }

  export interface ComplexRecipe extends Recipe, Keyed {}

  export class BlastingRecipe extends CookingRecipe<BlastingRecipe> {
    constructor(
      key: NamespacedKey,
      result: ItemStack,
      input: RecipeChoice | Material,
      exp: number,
      cookingTime: number
    );
    getResult(): ItemStack;
  }

  export class CampfireRecipe extends CookingRecipe<CampfireRecipe> {
    constructor(
      key: NamespacedKey,
      result: ItemStack,
      input: RecipeChoice | Material,
      exp: number,
      cookingTime: number
    );
    getResult(): ItemStack;
  }

  export abstract class CookingRecipe<T extends CookingRecipe<T>>
    implements Recipe {
    getResult(): ItemStack;
    getCookingTime(): number;
    getExperience(): number;
    getGroup(): string;
    getInput(): ItemStack;
    getInputChoice(): RecipeChoice;
    getKey(): NamespacedKey;
    setCookingTime(time: number): void;
    setExperience(exp: number): void;
    setGroup(group: string): void;
    setInput(input: Material): CookingRecipe<T>;
    setInputChoice(input: RecipeChoice): T;
  }

  export class FurnaceRecipe extends CookingRecipe<FurnaceRecipe> {
    constructor(
      key: NamespacedKey,
      result: ItemStack,
      input: RecipeChoice | Material,
      exp: number,
      cookingTime: number
    );
    getResult(): ItemStack;
    setInput(input: Material): FurnaceRecipe;
    setInputChoice(input: RecipeChoice): FurnaceRecipe;
  }

  export class MerchantRecipe implements Recipe {
    getResult(): ItemStack;
  }

  export class ShapedRecipe implements Recipe {
    getResult(): ItemStack;
  }

  export class SmithingRecipe implements Recipe {
    getResult(): ItemStack;
  }

  export class SmokingRecipe implements Recipe {
    getResult(): ItemStack;
  }

  export class StonecuttingRecipe implements Recipe {
    getResult(): ItemStack;
  }
}

declare module 'bukkit/inventory/meta' {
  import { PersistentDataHolder } from 'bukkit/persistence';
  import { Enchantment } from 'bukkit/enchantments';
  import { List } from 'java/util';

  export interface Damageable {
    getDamage(): number;
    hasDamage(): number;
    setDamage(): number;
  }

  export interface ItemMeta extends PersistentDataHolder {
    getDisplayName(): string;
    getEnchantLevel(enc: Enchantment): number;
    getLore(): List<string>;
    hasAttributeModifiers(): boolean;
    hasConflictingEnchant(enc: Enchantment): boolean;
    hasCustomModelData(): boolean;
    hasDisplayName(): boolean;
    hasEnchant(enc: Enchantment): boolean;
    hasEnchants(): boolean;
    hasItemFlag(flag: ItemFlag): boolean;
    hasLocalizedName(): boolean;
    hasLore(): boolean;
    isUnbreakable(): boolean;
    setCustomModelData(data: number): void;
    setDisplayName(name: string): void;
    setLocalizedName(name: string): void;
    setLore(lore: string[]): void;
    setUnbreakable(unbreakable: boolean): void;
  }
}

declare module 'bukkit/inventory/meta/tags' {}

declare module 'bukkit/loot' {}

declare module 'bukkit/map' {}

declare module 'bukkit/material' {
  import { BlockFace } from 'bukkit/block';

  export interface Directional {
    getFacing(): BlockFace;
    setFacingDirection(face: BlockFace): void;
  }

  export interface Attachable extends Directional {
    getAttachedFace(): BlockFace;
  }
}

declare module 'bukkit/material/types' {}

declare module 'bukkit/metadata' {
  import { Plugin } from 'bukkit/plugin';

  export class MetadataValue {
    asBoolean(): number;
    asByte(): number;
    asDouble(): number;
    asFloat(): number;
    asInt(): number;
    asLong(): number;
    asShort(): number;
    asString(): string;
    getOwningPlugin(): Plugin;
    invalidate(): void;
    value(): object;
  }

  export class FixedMetadataValue extends MetadataValue {
    constructor(owner: Plugin, value: object);
  }

  export class LazyMetadataValue extends MetadataValue {}

  export module LazyMetadataValue {
    export enum CacheStrategy {
      CACHE_AFTER_FIRST_EVAL,
      CACHE_ETERNALLY,
      NEVER_CACHE,
    }
  }

  export class Metadatable {
    getMetadata(key: string): MetadataValue[];
    hasMetadata(key: string): boolean;
    removeMetadat(key: string, owner: Plugin): void;
    setMetadata(key: string, value: MetadataValue): void;
  }
}

declare module 'bukkit/permissions' {
  export enum PermissionDefault {
    FALSE,
    NOT_OP,
    OP,
    TRUE,
  }

  export class Permission {
    constructor(name: string);
    constructor(name: string, description: string);
    constructor(
      name: string,
      description: string,
      children: Map<string, boolean>
    );
    constructor(
      name: string,
      description: string,
      defaultValue: PermissionDefault
    );
    addParent(name: string, value: boolean): Permission;
    addParent(perm: Permission, value: boolean): void;
    getChildren(): Map<string, boolean>;
    getDefault(): PermissionDefault;
    getDescription(): string;
    getName(): string;
    getPermissibles(): Set<Permissible>;
    static loadPermission(
      name: string,
      data: Map<string, boolean>,
      def: PermissionDefault,
      output: Permission[]
    ): Permission;
    static loadPermission(name: string, data: Map<string, object>): Permission;
    recalculatePermissibles(): void;
    setDefault(value: PermissionDefault): void;
    setDescription(value: string): void;
  }
}

declare module 'bukkit/persistence' {
  import { NamespacedKey } from 'bukkit';

  export class PersistentDataType {
    static BYTE: PersistentDataType;
    static BYTE_ARRAY: PersistentDataType;
    static DOUBLE: PersistentDataType;
    static FLOAT: PersistentDataType;
    static INTEGER: PersistentDataType;
    static INTEGER_ARRAY: PersistentDataType;
    static LONG: PersistentDataType;
    static LONG_ARRAY: PersistentDataType;
    static SHORT: PersistentDataType;
    static STRING: PersistentDataType;
    static TAG_CONTAINER: PersistentDataType;
    static TAG_CONTAINER_ARRAY: PersistentDataType;
  }

  export interface PersistentDataAdapterContext {
    newPersistentDataContainer(): PersistentDataContainer;
  }

  export interface PersistentDataContainer {
    get(key: NamespacedKey, type: PersistentDataType): object;
    getAdapterContext(): PersistentDataAdapterContext;
    getKeys(): Set<NamespacedKey>;
    getOrDefault(
      key: NamespacedKey,
      type: PersistentDataType,
      defaultValue: object
    ): object;
    has(key: NamespacedKey, type: PersistentDataType): boolean;
    remove(key: NamespacedKey): void;
    set(key: NamespacedKey, type: PersistentDataType, value: object): void;
  }

  export interface PersistentDataHolder {
    getPersistentDataContainer(): PersistentDataContainer;
  }
}

declare module 'bukkit/plugin' {
  import { Event, Listener, EventPriority } from 'bukkit/event';
  import { Permission } from 'bukkit/permissions';
  import { Class } from 'java/lang';

  export interface Plugin {}
  export interface RegisteredListener {
    callEvent(event: Event): void;
    getListener(): Listener;
    getPlugin(): Plugin;
    getPriority(): EventPriority;
    isIgnoringCancelled(): boolean;
  }

  export interface PluginManager {
    addPermission(perm: Permission);
    callEvent(event: Event): void;
    clearPlugins(): void;
    disablePlugin(plugin: Plugin): void;
    enablePlugin(plugin: Plugin): void;
    getDefaultPermissions(op: boolean): Set<Permission>;
    getDefaultPermSubscriptions(op: boolean): Set<Permissible>;
    getPermission(name: string): Permission;
    getPermissions(): Set<Permission>;
    getPermissionSubscriptions(permission: string): Set<Permissible>;
    getPlugin(name: string): Plugin;
    getPlugins(): Plugin[];
    isPluginEnabled(name: string): boolean;
    loadPlugin(file: File): Plugin;
    loadPlugins(directory: File): Plugin[];
    recalculatePermissionDefaults(perm: Permission): void;
    registerEvent(
      event: Class<Event>,
      listener: Listener,
      priority: EventPriority,
      executor: EventExecutor,
      plugin: Plugin
    ): void;
  }
}

declare module 'bukkit/plugin/java' {}

declare module 'bukkit/plugin/messaging' {}

declare module 'bukkit/potion' {
  import { ConfigurationSerializable } from 'bukkit/configuration/serialization';
  import { Color } from 'bukkit';
  import { LivingEntity } from 'bukkit/entity';

  export class PotionEffectType {
    protected constructor(id: number);
    createEffect(duration: number, amplifier: number): PotionEffect;
    static getById(id: number): PotionEffectType;
    static getByName(name: string): PotionEffectType;
    getColor(): Color;
    getDurationModifier(): number;
    getId(): number;
    getName(): string;
    hashCode(): number;
    isInstant(): boolean;
    static registerPotionEffectType(type: PotionEffectType): void;
    static stopAcceptingRegistrations(): void;
    toString(): string;
    static values(): PotionEffectType[];

    static ABSORPTION: PotionEffectType;
    static BAD_OMEN: PotionEffectType;
    static BLINDNESS: PotionEffectType;
    static CONDUIT_POWER: PotionEffectType;
    static CONFUSION: PotionEffectType;
    static DAMAGE_RESISTANCE: PotionEffectType;
    static DOLPHINS_GRACE: PotionEffectType;
    static FAST_DIGGING: PotionEffectType;
    static FIRE_RESISTANCE: PotionEffectType;
    static GLOWING: PotionEffectType;
    static HARM: PotionEffectType;
    static HEAL: PotionEffectType;
    static HEALTH_BOOST: PotionEffectType;
    static HERO_OF_THE_VILLAGE: PotionEffectType;
    static HUNGER: PotionEffectType;
    static INCREASE_DAMAGE: PotionEffectType;
    static INVISIBILITY: PotionEffectType;
    static JUMP: PotionEffectType;
    static LEVITATION: PotionEffectType;
    static LUCK: PotionEffectType;
    static NIGHT_VISION: PotionEffectType;
    static POISON: PotionEffectType;
    static REGENERATION: PotionEffectType;
    static SATURATION: PotionEffectType;
    static SLOW: PotionEffectType;
    static SLOW_DIGGING: PotionEffectType;
    static SLOW_FALLING: PotionEffectType;
    static SPEED: PotionEffectType;
    static UNLUCK: PotionEffectType;
    static WATER_BREATHING: PotionEffectType;
    static WEAKNESS: PotionEffectType;
    static WITHER: PotionEffectType;
  }

  export class PotionEffect implements ConfigurationSerializable {
    constructor(map: Map<string, object>);
    constructor(type: PotionEffectType, amplifier: number);
    constructor(type: PotionEffectType, amplifier: number, ambient: boolean);
    constructor(
      type: PotionEffectType,
      amplifier: number,
      ambient: boolean,
      particles: boolean,
      icon: boolean
    );

    apply(entity: LivingEntity): boolean;
    getAmplifier(): number;
    getColor(): Color;
    getDuration(): number;
    getType(): PotionEffectType;
    hashCode(): number;
    hasIcon(): boolean;
    hasParticles(): boolean;
    isAmbient(): boolean;
    serialize(): Map<string, object>;
    toString(): string;
  }
}

declare module 'bukkit/projectiles' {}

declare module 'bukkit/scheduler' {
  import { Plugin } from 'bukkit/plugin';
  import { Runnable } from 'java/lang';
  import { Future, Callable } from 'java/util/concurrent';
  import { Consumer } from 'java/util/function';

  export interface BukkitScheduler {
    /**
     * Calls a method on the main thread and returns a Future object
     *
     * @param plugin
     * @param task
     */
    callSyncMethod<T>(plugin: Plugin, task: Callable<T>): Future<T>;
    /**
     * Removes task from scheduler
     *
     * @param id
     */
    cancelTask(id: number): void;
    /**
     * Removes all tasks associated with a particular plugin from the scheduler
     *
     * @param plugin
     */
    cancelTasks(plugin: Plugin): void;
    /**
     * Checks if the task is currently running
     *
     * @param id
     */
    isCurrentlyRunning(id: number): boolean;
    /**
     * Checks if the task is queued to be run later
     *
     * @param id
     */
    isQueued(id: number): boolean;

    /**
     * Returns a task that will run on the next server tick
     *
     * @param plugin
     * @param task
     */
    runTask(plugin: Plugin, task: Runnable): BukkitTask;
    /**
     * Returns a task that will run on the next server tick
     * @param plugin
     * @param task
     */
    runTask(plugin: Plugin, task: Consumer<BukkitTask>): void;

    /**
     *
     * @param plugin
     * @param task
     */
    runTaskAsynchronously(plugin: Plugin, task: Runnable): BukkitTask;
    runTaskAsynchronously(plugin: Plugin, task: Consumer<BukkitTask>): void;

    runTaskLater(plugin: Plugin, task: Runnable, delay: number): BukkitTask;
    runTaskLater(
      plugin: Plugin,
      task: Consumer<BukkitTask>,
      delay: number
    ): void;

    runTaskLaterAsynchronously(
      plugin: Plugin,
      task: Runnable,
      delay: number
    ): BukkitTask;
    runTaskLaterAsynchronously(
      plugin: Plugin,
      task: Consumer<BukkitTask>,
      delay: number
    ): void;

    runTaskTimer(
      plugin: Plugin,
      task: Runnable,
      delay: number,
      period: number
    ): BukkitTask;
    runTaskTimer(
      plugin: Plugin,
      task: Consumer<BukkitTask>,
      delay: number,
      period: number
    ): void;

    runTaskTimerAsynchronously(
      plugin: Plugin,
      task: Runnable,
      delay: number,
      period: number
    ): BukkitTask;
    runTaskTimerAsynchronously(
      plugin: Plugin,
      task: Consumer<BukkitTask>,
      delay: number,
      period: number
    ): void;

    scheduleSyncDelayedTask(plugin: Plugin, task: Runnable): number;
    scheduleSyncDelayedTask(
      plugin: Plugin,
      task: Runnable,
      delay: number
    ): number;
    scheduleSyncRepeatingTask(
      plugin: Plugin,
      task: Runnable,
      delay: number,
      period: number
    ): number;
  }

  export interface BukkitTask {
    cancel(): void;
    getOwner(): Plugin;
    getTaskId(): number;
    isCancelled(): boolean;
    isSync(): boolean;
  }

  export interface BukkitWorker {
    getOwner(): Plugin;
    getTaskId(): number;
  }

  export class BukkitRunnable {}
}

declare module 'bukkit/scoreboard' {}

declare module 'bukkit/util' {
  import { Block, BlockFace } from 'bukkit/block';
  import { Entity } from 'bukkit/entity';
  import { ConfigurationSerializable } from 'bukkit/configuration/serialization';
  import { World, Location } from 'bukkit';

  export class Vector implements ConfigurationSerializable {
    constructor(x: number, y: number, z: number);

    add(vec: Vector): Vector;
    angle(other: Vector): number;
    checkFinite(): void;
    clone(): Vector;
    copy(vec: Vector): Vector;
    crossProduct(o: Vector): Vector;
    static deserialize(args: Map<string, object>): Vector;
    distance(o: Vector): number;
    distanceSquared(o: Vector): number;
    divide(vec: Vector): Vector;
    dot(other: Vector): number;
    equals(obj: object): boolean;
    getBlockX(): number;
    getBlockY(): number;
    getBlockZ(): number;
    getCrossProduct(o: Vector): Vector;
    static getEpsilon(): number;
    static getMaximum(v1: Vector, v2: Vector): Vector;
    getMidpoint(other: Vector): Vector;
    static getMinimum(v1: Vector, v2: Vector): Vector;
    static getRandom(): Vector;
    getX(): number;
    getY(): number;
    getZ(): number;
    hashCode(): number;
    isInAABB(min: Vector, max: Vector): boolean;
    isInSphere(origin: Vector, radius: number): boolean;
    isNormalized(): boolean;
    length(): number;
    lengthSquared(): number;
    midpoint(other: Vector): Vector;
    multiply(other: Vector): Vector;
    multiply(m: number): Vector;
    normalize(): Vector;
    rotateAroundAxis(axis: Vector, angle: number): Vector;
    rotateAroundNonUnitAxis(axis: Vector, angle: number): Vector;
    rotateAroundX(angle: number): Vector;
    rotateAroundY(angle: number): Vector;
    rotateAroundZ(angle: number): Vector;
    serialize(): Map<string, object>;
    setX(x: number): void;
    setY(y: number): void;
    setZ(z: number): void;
    subtract(vec: Vector): Vector;
    toBlockVector(): BlockVector;
    toLocation(world: World): Location;
    toLocation(world: World, yaw: number, pitch: number): Location;
    toString(): string;
    zero(): Vector;
  }

  export class BlockVector extends Vector {
    constructor(x: number, y: number, z: number);
    constructor(vec: Vector);

    clone(): BlockVector;
    static deserialize(args: Map<string, object>): BlockVector;
  }

  export class RayTraceResult {
    constructor(hitPosition: Vector);
    constructor(hitPosition: Vector, hitBlockFace: BlockFace);
    constructor(hitPosition: Vector, hitBlock: Block, hitBlockFace: BlockFace);
    constructor(hitPosition: Vector, hitEntity: Entity);
    constructor(
      hitPosition: Vector,
      hitEntity: Entity,
      hitBlockFace: BlockFace
    );

    getHitBlock(): Block;
    getHitBlockFace(): BlockFace;
    getHitEntity(): Entity;
    getHitPosition(): Vector;
    hashCode(): number;
    toString(): string;
  }
}

declare module 'bukkit/util/io' {}

declare module 'bukkit/util/permissions' {}

declare module 'spigotmc' {}

declare module 'spigotmc/event/entity' {}

declare module 'spigotmc/event/player' {}

declare module 'java/lang' {
  export class Object {
    constructor();
    getClass(): Class;
    equals(obj: object): boolean;
    hashCode(): number;
    notify(): void;
    notifyAll(): void;
    toString(): string;
    wait(): void;
    wait(timeout: number, nanos?: number): void;
  }

  export class Class<T = any> extends Object {
    asSubclass<U>(clazz: Class<U>): Class<U>;
    cast(obj: object): T;
    desiredAssertionStatus(): boolean;
    static forName(module, name: string): Class;
    static forName(name: string): Class;
  }

  export class Enum<E extends Enum> extends Object implements Comparable<E> {
    protected constructor(name: string, ordinal: number);

    protected clone(): Object;
    protected finalize(): void;
    prototype: null;
    compareTo(o: E): number;
    equals(o: object): boolean;
    getDeclaringClass(): Class<E>;
    hashCode(): number;
    name(): string;
    ordinal(): number;
    toString(): string;
    static valueOf<T extends Enum<T>>(enumType: Class<T>, name: string): T;
  }

  export interface Comparable<T> {
    compareTo(o: T): number;
  }

  export interface Cloneable {
    clone(): object;
  }

  export class Runnable {}
}

declare module 'java/nio' {
  export class ByteBuffer {
    static allocate(capacity: number): ByteBuffer;
    static allocateDirect(capacity: number): ByteBuffer;
    array(): number[];
    arrayOffset(): number;
    asCharBuffer();
    asDoubleBuffer();
    asFloatBuffer();
    asIntBuffer();
    asLongBuffer();
    asReadOnlyBuffer();
    asShortBUffer();
    compareTo(other: ByteBuffer): number;
    duplicate(): ByteBuffer;
    get(): number;
    get(dst: number[]): ByteBuffer;
    get(dst: number[], offset: number, length: number): ByteBuffer;
    static wrap(array: number[]): ByteBuffer;
  }
}

declare module 'java/util' {
  export class UUID {
    toString(): string;
    clockSequence(): number;
    compareTo(val: UUID): number;
    equals(obj: object): boolean;
    static fromString(uuid: string): UUID;
    static randomUUID(): UUID;
  }

  export interface List<T> {
    add(index: number, element: T): void;
    add(element: T): boolean;
    addAll(index: number, elements: T[]): boolean;
    addAll(elements: T[]): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: any[]): boolean;
    get(index: number): T;
    indexOf(o: any): number;
    isEmpty(): boolean;
    lastIndexOf(o: any): number;
    remove(index: number): T;
    remove(o: any): boolean;
    removeAll(c: any[]): boolean;
    set(index: number, element: T): T;
    size(): number;
    toArray(): T[];
  }
}

declare module 'java/util/concurrent' {
  export interface Future<T> {
    cancel(mayInterrupt: boolean): boolean;
    get(): T;
    get(timeout: number, unit: TimeUnit): T;
    isCancelled(): boolean;
    isDone(): boolean;
  }

  export interface Callable<T> {
    call(): T;
  }
}

declare module 'java/util/function' {
  export interface Consumer<T> {
    (t: T): Consumer<T>;
    accept(t: T): void;
    andThen(after: Consumer<T>): Consumer<T>;
  }
}

declare module 'java/util/regex' {
  export class Pattern {}
}

declare module 'bungee/api' {
  import { Pattern } from 'java/util/regex';

  export class ChatColor {
    static ALL_CODES: string;
    static AQUA: ChatColor;
    static BLACK: ChatColor;
    static BLUE: ChatColor;
    static BOLD: ChatColor;
    static COLOR_CHAR: string;
    static DARK_AQUA: ChatColor;
    static DARK_BLUE: ChatColor;
    static DARK_GRAY: ChatColor;
    static DARK_GREEN: ChatColor;
    static DARK_PURPLE: ChatColor;
    static DARK_RED: ChatColor;
    static GOLD: ChatColor;
    static GRAY: ChatColor;
    static GREEN: ChatColor;
    static ITALIC: ChatColor;
    static LIGHT_PURPLE: ChatColor;
    static MAGIC: ChatColor;
    static RED: ChatColor;
    static RESET: ChatColor;
    static STRIKETHROUGH: ChatColor;
    static STRIP_COLOR_PATTERN: Pattern;
    static UNDERLINE: ChatColor;
    static WHITE: ChatColor;
    static YELLOW: ChatColor;

    equals(obj: any): boolean;
    static getByChar(code: string): ChatColor;
    // getColor(): Color;
    getName(): string;
    static of(name: string): ChatColor;
    static stripColor(input: string): string;
    toString(): string;
    static translateAlternateColorCodes(
      altColorCode: string,
      textToTranslate: string
    ): string;
  }
}

declare module 'bungee/api/chat' {
  import { Content } from 'bungee/api/chat/hover/content';
  import { ChatColor } from 'bungee/api';

  export class ItemTag {
    getNbt(): string;
    static ofNbt(nbt: string): ItemTag;
  }

  export module ItemTag {
    export class Serializer {}
  }

  export class ClickEvent {
    constructor(action: ClickEvent.Action, value: string);

    getAction(): ClickEvent.Action;
    getValue(): string;
  }

  export module ClickEvent {
    export enum Action {
      CHANGE_PAGE,
      COPY_TO_CLIPBOARD,
      OPEN_FILE,
      OPEN_URL,
      RUN_COMMAND,
      SUGGEST_COMMAND,
    }
  }

  export class HoverEvent {
    constructor(action: HoverEvent.Action, ...contents: Content[]);

    addContent(content: Content): void;
    getAction(): HoverEvent.Action;
    getContents(): Content[];
    isLegacy(): boolean;
    setLegacy(legacy: boolean): void;
  }

  export module HoverEvent {
    export enum Action {
      SHOW_ENTITY,
      SHOW_ITEM,
      SHOW_TEXT,
    }
  }

  export abstract class BaseComponent {
    addExtra(component: BaseComponent): void;
    addExtra(text: string): void;
    copyFormatting(component: BaseComponent): void;
    copyFormatting(component: BaseComponent, replace: boolean): void;
    getClickevent(): ClickEvent;
    getColor(): ChatColor;
    getColorRaw(): ChatColor;
    getExtra(): BaseComponent[];
    getFont(): string;
    getFontRaw(): string;
    getHoverEvent(): HoverEvent;
    getInsertion(): string;
    hasFormatting(): boolean;
    isBold(): boolean;
    isItalic(): boolean;
    isItalicRaw(): boolean;
    isObfuscated(): boolean;
    isObfuscatedRaw(): boolean;
    isStrikethrough(): boolean;
    isStrikethroughRaw(): boolean;
    isUnderlined(): boolean;
    isUnderlineRaw(): boolean;
    setBold(value: boolean): void;
    setClickEvent(value: ClickEvent): void;
    setColor(value: ChatColor): void;
    setExtra(components: BaseComponent[]): void;
    setFont(value: string): void;
    setHoverEvent(value: HoverEvent): void;
    setInsertion(value: string): void;
    setItalic(value: boolean): void;
    setObfuscated(value: boolean): void;
    setStrikethrough(value: boolean): void;
    setUnderlined(value: boolean): void;
    static toLegacyText(...components: BaseComponent[]): string;
    toPlainText(): string;
    static toPlainText(...components: BaseComponent[]): string;
    toString(): string;
  }

  export class TextComponent extends BaseComponent {
    constructor();
    constructor(...extras: BaseComponent[]);
    constructor(text: string);
    constructor(component: TextComponent);

    duplicate(): TextComponent;
    static fromLegacyText(message: string): BaseComponent[];
    static fromLegacyText(message: string, color: ChatColor): BaseComponent[];
    getText(): string;
    setText(value: string): void;
  }

  export class KeybindComponent extends BaseComponent {
    constructor();
    constructor(origin: KeybindComponent);
    constructor(keybind: string);

    duplicate(): KeybindComponent;
    getKeybind(): string;
    setKeybind(value: string): void;
  }

  export class ScoreComponent extends BaseComponent {
    constructor(original: ScoreComponent);
    constructor(name: string, objective: string);
    constructor(name: string, objective: string, value: string);

    duplicate(): ScoreComponent;
    getName(): string;
    getObjective(): string;
    getValue(): string;

    setName(value: string): void;
    setObjective(value: string): void;
    setValue(value: string): void;
  }

  export class SelectorComponent extends BaseComponent {
    constructor(original: SelectorComponent);
    constructor(selector: string);

    duplicate(): SelectorComponent;
    getSelector(): string;
    setSelector(value: string): void;
  }
}

declare module 'bungee/api/chat/hover/content' {
  import { HoverEvent, BaseComponent, ItemTag } from 'bungee/api/chat';

  export abstract class Content {
    assertAction(input: HoverEvent.Action): void;
    abstract requiredAction(): HoverEvent.Action;
  }

  export class Entity extends Content {
    constructor(type: string, id: string, name: BaseComponent);
    requiredAction(): HoverEvent.Action;
    getId(): string;
    getName(): BaseComponent;
    getType(): string;
    setId(id: string): void;
    setName(name: BaseComponent): void;
    setType(type: string): void;
  }

  export class Item extends Content {
    constructor(id: string, count: number, tag: ItemTag);
    requiredAction(): HoverEvent.Action;
    getCount(): number;
    getId(): string;
    getTag(): ItemTag;
    setCount(count: number): void;
    setId(id: string): void;
    setTag(tag: ItemTag): void;
  }

  export class Text extends Content {
    constructor(value: BaseComponent[]);
    constructor(value: string);
    requiredAction(): HoverEvent.Action;
    getValue(): object;
  }
}
