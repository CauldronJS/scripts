declare module 'bukkit' {
  import { ItemStack, Inventory, ItemStack } from 'bukkit/inventory';
  import {
    CommandSender,
    ConsoleCommandSender,
    PluginCommand
  } from 'bukkit/command';
  import { KeyedBossBar, BossBar } from 'bukkit/boss';
  import { UUID } from 'java/util';
  import { Player } from 'bukkit/entity';

  export class Bukkit {
    static addRecipe(recipe: Recipe): boolean;
    static banIP(address: string): void;
    static broadcast(message: string, permission: string): number;
    static broadcastMessage(message: string): number;
    static clearRecipes(): void;
    static createBlockData(data: string): BlockData;
    static createBlockData(material: Material, data: string): BlockData;
    static createBossBar(
      title: string,
      color: BarColor,
      style: BarStyle,
      ...flags: BarFlag
    ): BossBar;
    static createChunkData(world: World): ChunkGenerator.ChunkData;
    static createExplorerMap(
      world: World,
      location: Location,
      structureType: StructureType,
      radius?: number,
      findUnexplored?: boolean
    ): ItemStack;
    static createInventory(
      owner: InventoryHolder,
      size: number,
      title?: string
    ): Inventory;
    static createInventory(
      owner: InventoryHolder,
      type: InventoryType,
      title?: string
    ): Inventory;
    static createMap(world: World): MapView;
    static createMerchant(title: string): Merchant;
    static createWorld(creator: WorldCreator): World;
    static dispatchCommand(sender: CommandSender, commandLine: string): boolean;
    static getAdvancement(key: NamespacedKey): Advancement;
    static getAllowEnd(): boolean;
    static getAllowFlight(): boolean;
    static getAllowNether(): boolean;
    static getAmbientSpawnLimit(): number;
    static getAnimalSpawnLimit(): number;
    static getBanList(type: BanList.Type): BanList;
    static getBannedPlayers(): OfflinePlayer[];
    static getBossBar(key: NamespacedKey): KeyedBossBar;
    static getBossBars(): Iterator<KeyedBossBar>;
    static getBukkitVersion(): string;
    static getCommandAliases(): Map<string, string[]>;
    static getConnectionThrottle(): number;
    static getConsoleSender(): ConsoleCommandSender;
    static getDefaultGameMode(): GameMode;
    static getEntity(uuid: UUID): Entity;
    static getGenerateStructures(): boolean;
    static getHelpMap(): HelpMap;
    static getIdleTimeout(): number;
    static getIp(): string;
    static getIPBans(): string[];
    static getItemFactory(): ItemFactory;
    static getLogger(): Logger;
    static getLootTable(key: NamespacedKey): LootTable;
    static getMap(id: number): MapView;
    static getMaxPlayers(): number;
    static getMessenger(): Messenger;
    static getMonsterSpawnLimit(): number;
    static getMotd(): string;
    static getName(): string;
    static getOfflinePlayer(name: string): OfflinePlayer;
    static getOfflinePlayer(id: UUID): OfflinePlayer;
    static getOnlineMode(): boolean;
    static getOperators(): string[];
    static getPlayer(name: string): Player;
    static getPlayer(id: UUID): Player;
    static getPlayerExact(name: string): Player;
    static getPluginCommand(name: string): PluginCommand;
    static getPluginManager(): PluginManager;
    static getPort(): number;
    static getRecipesFor(result: ItemStack): Recipe[];
    static getScheduler(): BukkitScheduler;
    static getScoreboardManager(): ScoreboardManager;
    static getServer(): Server;
    static getServerIcon(): CachedServerIcon;
    static getServicesManager(): ServicesManager;
    static getShutdownMessage(): string;
    static getSpawnRadius(): number;
    static getTag<T extends Key>(
      registry: string,
      tag: NamespacedKey,
      clazz: Class<T>
    ): Tag<T>;
    static getTags<T extends Key>(registry: string, clazz: Class<T>): Tag<T>;
  }

  export class Color {}

  export class FireworkEffect {}

  export class GameRule {}

  export class Location {}

  export class NamespacedKey {
    static BUKKIT: string;
    static MINECRAFT: string;

    constructor(plugin, key: string);
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

  export interface OfflinePlayer {}

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
    PEACEFUL
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

  export enum GameMode {}

  export enum GrassSpecies {}

  export enum Instrument {}

  export enum Material {
    ACACIA_BOAT,
    ACACIA_BUTTON,
    ACACIA_DOOR,
    ACACIA_FENCE,
    ACACIA_FENCE_GATE,
    ACACIA_LEAVES,
    ACACIA_LOG,
    ACACIA_PLANKS,
    ACACIA_PRESSURE_PLATE,
    ACACIA_SAPLING,
    ACACIA_SIGN,
    ACACIA_SLAB,
    ACACIA_TRAPDOOR,
    ACACIA_WALL_SIGN,
    ACACIA_WOOD,
    ACTIVATOR_RAIL,
    AIR,
    ALLIUM,
    ANDESITE,
    ANDESITE_SLAB,
    ANDESITE_STAIRS,
    ANDESITE_WALL,
    ANVIL,
    APPLE,
    ARMOR_STAND,
    ARROW,
    ATTACHED_MELON_STEM,
    ATTACHED_PUMPKIN_STEM,
    AZURE_BLUET,
    BAKED_POTATO,
    BAMBOO,
    BAMBOO_SAPLING,
    BARREL,
    BARRIER,
    BAT_SPAWN_EGG,
    BEACON,
    BEDROCK,
    BEE_NEST,
    BEE_SPAWN_EGG,
    BEEF,
    BEEHIVE,
    BEETROOT,
    BEETROOT_SEEDS,
    BEETROOT_SOUP,
    BEETROOTS,
    BELL,
    BIRCH_BOAT,
    BIRCH_BUTTON,
    BIRCH_DOOR,
    BIRCH_FENCE,
    BIRCH_FENCE_GATE,
    BIRCH_LEAVES,
    BIRCH_LOG,
    BIRCH_PLANKS,
    BIRCH_PRESSURE_PLATE,
    BIRCH_SAPLING,
    BIRCH_SIGN,
    BIRCH_SLAB,
    BIRCH_STAIRS,
    BIRCH_TRAPDOOR,
    BIRCH_WALL_SIGN,
    BIRCH_WOOD
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

  export enum Statistic {}

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
    ZOMBIE_SPAWN_REINFORCEMENTS
  }
  declare module AttributeModifier {
    export enum Operation {
      ADD_NUMBER,
      ADD_SCALAR,
      MULTIPLY_SCALAR_1
    }
  }
}

declare module 'bukkit/block' {
  import { Enum, Class } from 'java/lang';
  import { Location, World } from 'bukkit';
  import { InventoryHolder, BlockInventoryHolder, Inventory, DoubleChestInventory } from 'bukkit/inventory';
  import { Entity } from 'bukkit/entity';

  export interface Banner {}

  export interface Barrel {}

  export interface Beacon {}

  export interface Bed {}

  export interface Beehive {}

  export interface Bell {}

  export interface BlastFurnace {}

  export interface Block {}

  export interface BlockState {}

  export interface BrewingStand {}

  export interface Campfire {}

  export interface Chest extends BlockInventoryHolder {

  }

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
    constructor(chest: DoubleChestInventory): DoubleChest;

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
    WOODED_MOUNTAINS
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
    WEST_SOUTH_WEST
  }

  export enum PistonMoveReaction {
    BLOCK,
    BREAK,
    IGNORE,
    MOVE,
    PUSH_ONLY
  }
}

declare module 'bukkit/block/banner' {
  import { DyeColor } from 'bukkit';

  export class Pattern {
    constructor(map: Map<string, object>): Pattern;
    constructor(color: DyeColor, pattern: PatternType): Pattern;

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
    TRIANGLES_TOP
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
      TOP
    }
  }

  export module FaceAttachable {
    export enum AttachedFace {
      CEILING,
      FLOOR,
      WALL
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
      SOUTH_WEST
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
      SMALL
    }
  }

  export interface Bed {}

  export module Bed {
    export enum Part {
      FOOT,
      HEAD
    }
  }

  export interface Beehive {}

  export interface Bell {}

  export module Bell {
    export enum Attachment {
      CEILING,
      DOUBLE_WALL,
      FLOOR,
      SINGLE_WALL
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
      SINGLE
    }
  }

  export interface Cocoa {}

  export interface CommandBlock {}

  export interface Comparator {}

  export module Comparator {
    export enum Mode {
      COMPARE,
      SUBTRACT
    }
  }

  export interface CoralWallFan {}

  export interface DaylightDetector {}

  export interface Dispenser {}

  export interface Door {}

  export module Door {
    export enum Hinge {
      LEFT,
      RIGHT
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
      WEST_UP
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
      UP
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
      TOP
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
      STRAIGHT
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
      WALL
    }
  }

  export interface TechnicalPiston {}

  export module TechnicalPiston {
    export enum Type {
      NORMAL,
      STICKY
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
    NONE
  }

  export enum StructureRotation {
    CLOCKWISE_180,
    CLOCKWISE_90,
    COUNTERCLOCKWISE_90,
    NONE
  }

  export enum UsageMode {
    CORNER,
    DATA,
    LOAD,
    SAVE
  }
}

declare module 'bukkit/boss' {
  import { Enum } from 'java/lang';
  import { Keyed } from 'bukkit';

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
    YELLOW
  }

  export enum BarFlag {
    CREATE_FOG,
    DARKEN_SKY,
    PLAY_BOSS_MUSIC
  }

  export enum BarStyle {
    SEGMENTED_10,
    SEGMENTED_12,
    SEGMENTED_20,
    SEGMENTED_6,
    SOLID
  }
}

declare module 'bukkit/command' {
  import { Enum } from 'java/lang';

  export interface BlockCommandSender {}

  export interface CommandExecutor {}

  export interface CommandMap {}

  export interface CommandSender {}

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
  import { Command, CommandSender, CommandSender } from 'bukkit/command';

  export class BukkitCommand extends Command {
    protected constructor(
      name: string,
      description?: string,
      usageMessage?: string,
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
    WEARABLE
  }
}

declare module 'bukkit/entity' {
  import { UUID } from 'java/util';
  import { AdvancementProgress, Advancement } from 'bukkit/advancement';
  import { Attributable } from 'bukkit/attribute';
  import { BlockFace, PistonMoveReaction, Block } from 'bukkit/block';
  import { Attachable } from 'bukkit/material';
  import { InventoryHolder, InventoryView, Inventory, ItemStack } from 'bukkit/inventory';
  import { Metadatable } from 'bukkit/metadata';
  import { PersistentDataHolder } from 'bukkit/persistence';
  import { PotionEffect, PotionEffectType } from 'bukkit/potion';
  import { RayTraceResult } from 'bukkit/util';
  import { CommandSender } from 'bukkit/command';
  import * as Bukkit from 'bukkit';

  export interface Entity extends Metadatable, CommandSender, Bukkit.Nameable, PersistentDataHolder {
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
    ZOMBIE_VILLAGER
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
  
  export interface HumanEntity extends LivingEntity, InventoryHolder, AnimalTamer {
    closeInventory(): void;
    discoverRecipe(recipe: Bukkit.NamespacedKey): boolean;
    discoverRecipes(recipes: Bukkit.NamespacedKey[]): number;
    getAttackCooldown(): number;
    getBedLocation(): Bukkit.Location;
    getCooldown(material: Bukkit.Material): number;
    getDiscoveredRecipes(): Set<NamespacedKey>;
    getEnderChest(): Inventory;
    getExpToLevel(): number
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

  export interface LivingEntity extends Damageable, ProjectileSource, Attributable {
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
    getLastTwoTargetBlocks(transparent: Set<Material>, maxDistance: number): Block;
    getTargetBlockExact(maxDistance: number): Block;
    getTargetBlockExact(maxDistance: number, fluidCollisionMode: Bukkit.FluidCollisionMode): Block;
    hasAI(): boolean;
    hasLineOfSight(other: Entity): boolean;
    hasPotionEffect(type: PotionEffectType): boolean;
    isCollidable(): boolean;
    isGliding(): boolean;
    isLeashed(): boolean;
    isRiptiding(): boolean;
    isSleeping(): boolean;
    rayTraceBlocks(maxDistance: number): RayTraceResult;
    rayTraceBlocks(maxDistance: number, fluidCollisionMode: Bukkit.FluidCollisionMode): RayTraceResult;
    removePotionEffect(type: PotionEffectType): void;
    setAI(ai: boolean): void;
    setCanPickupItems(pickup: boolean): void;
    setCollidable(collidable: boolean): void;
    setGliding(gliding: boolean): void;
    setLastDamage(damage: boolean): void;
    setLeashHolder(holder: Entity): boolean;
    setMaximumAir(ticks: number): void;
    setMemory(memoryKey: MemoryKey<T>, value: T): void;
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
    getAdvancementProgress(advancement: Advancment): AdvancementProgress;
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
    playNote(loc: Bukkit.Location,)
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

  export interface Villager {

  }

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
    export enum PickupStatus {

    }
  }

  export module Cat {
    export enum Type {

    }
  }

  export module EnderDragon {
    export enum Phase {

    }
  }

  export module Evoker {
    export enum Spell {

    }
  }

  export module Fox {
    export enum Type {

    }
  }

  export module Horse {
    export enum Color {

    }

    export enum Style {

    }

    /**
     * @deprecated Different variants are different classes
     */
    export enum Variant {

    }
  }
  
  export module Llama {
    export enum Color {

    }
  }
}

declare module 'bukkit/entity/memory' {}

declare module 'bukkit/entity/minecart' {}

declare module 'bukkit/event' {
  import { RegisteredListener, Plugin, Plugin } from 'bukkit/plugin';

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
      DENY
    }
  }
  export enum EventPriority {
    HIGH,
    HIGHEST,
    LOW,
    LOWEST,
    MONITOR,
    NORMAL
  }
  export interface HandlerList {
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
  import { EquipmentSlot } from 'bukkit/inventory';

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
  import { Event } from 'bukkit/event';
  import { Entity, EntityType } from 'bukkit/entity';

  export interface EntityEvent {
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
  export interface PlayerDeathEvent extends EntityEvent {}
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

  export interface HangingEvent {
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
  import { Event, Cancellable } from 'bukkit/event';
  import { Player } from 'bukkit/entity';

  export interface PlayerEvent extends Event, Cancellable {
    getPlayer(): Player;
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
  export interface PlayerInteractEvent extends PlayerEvent {}
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

declare module 'bukkit/help' {}

declare module 'bukkit/inventory' {
  import { Material, Location } from 'bukkit';
  import { Block } from 'bukkit/block';
  import { HumanEntity } from 'bukkit/entity';

  export interface ItemStack {
    addEnchantment(enchantment: Enchantment, level: number): void;
    addEnchantments(enchantments: Map<Enchantment, number>): void;
    addUnsafeEnchantment(enchantment: Enchantment, level: number): void;
    addUnsafeEnchantments(enchantments: Map<Enchantment, number>): void;
    clone(): ItemStack;
    containsEnchantment(enchantment: Enchantment): boolean;
    static deserialize(args: Map<string, object>): ItemStack;
    equals(target: object): boolean;
    getAmount(): number;
    getData(): MaterialData;
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
    setData(data: MaterialData): void;
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
    addItem(...stack: ItemStack): HashMap<number, ItemStack>;
    all(item: ItemStack|Material): HashMap<number, ItemStack>;
    clear(): void;
    clear(index: number): void;
    contains(item: ItemStack|Material, amount: number?): boolean;
    containsAtLeast(item: ItemStack, amount: number): boolean;
    first(item: ItemStack|Material): number;
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
    iterator(index: number?): ListIterator<ItemStack>;
    remove(item: ItemStack|Material): void;
    removeItem(...stack: ItemStack): HashMap<number, ItemStack>;
    setContents(items: ItemStack[]): void;
    setStorageContents(items: ItemStack[]): void;
  }

  export enum EquipmentSlot {
    CHEST,
    FEET,
    HAND,
    HEAD,
    LEGS,
    OFF_HAND
  }

  export enum MainHand {
    LEFT,
    RIGHT
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
    WORKBENCH
  }

  export module InventoryType {
    export enum SlotType {
      ARMOR,
      CONTAINER,
      CRAFTING,
      FUEL,
      OUTSIDE,
      QUICKBAR,
      RESULT
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
      REPAIR_COST,
      SECONDARY_EFFECT,
      TICKS_FOR_CURRENT_FUEL,
      TICKS_FOR_CURRENT_SMELTING
    }
  }
}

declare module 'bukkit/inventory/meta' {
  export interface Damageable {
    getDamage(): number;
    hasDamage(): number;
    setDamage(): number;
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

  export class FixedMetadataValue implements MetadataValue {
    constructor(owner: Plugin, value: object): FixedMetadataValue;
  }

  export class LazyMetadataValue implements MetadataValue {

  }

  export module LazyMetadataValue {
    export enum CacheStrategy {
      CACHE_AFTER_FIRST_EVAL,
      CACHE_ETERNALLY,
      NEVER_CACHE
    }
  }

  export class Metadatable {
    getMetadata(key: string): MetadataValue[];
    hasMetadata(key: string): boolean;
    removeMetadat(key: string, owner: Plugin): void;
    setMetadata(key: string, value: MetadataValue): void;
  }
}

declare module 'bukkit/permissions' {}

declare module 'bukkit/persistence' {
  import { NamespacedKey } from 'bukkit';

  export interface PersistentDataType {
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
    getOrDefault(key: NamespacedKey, type: PersistentDataType, defaultValue: object): object;
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
  export interface Plugin {

  }
  export interface RegisteredListener {
    callEvent(event: Event): void;
    getListener(): Listener;
    getPlugin(): Plugin;
    getPriority(): EventPriority;
    isIgnoringCancelled(): boolean;
  }
}

declare module 'bukkit/plugin/java' {}

declare module 'bukkit/plugin/messaging' {}

declare module 'bukkit/potion' {
  import { ConfigurationSerializable } from 'bukkit/configuration/serialization';
  import { Color } from 'bukkit';
  import { LivingEntity } from 'bukkit/entity';

  export interface PotionEffectType {
    protected constructor(id: number): PotionEffectType;
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
    constructor(map: Map<string, object>): PotionEffect;
    constructor(type: PotionEffectType, amplifier: number): PotionEffect;
    constructor(type: PotionEffectType, amplifier: number, ambient: boolean): PotionEffect;
    constructor(type: PotionEffectType, amplifier: number, ambient: boolean, particles: boolean, icon: boolean): PotionEffectType;

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

declare module 'bukkit/scheduler' {}

declare module 'bukkit/scoreboard' {}

declare module 'bukkit/util' {
  import { Block, BlockFace } from 'bukkit/block';
  import { Entity } from 'bukkit/entity';
  import { ConfigurationSerializable } from 'bukkit/configuration/serialization';
  import { World, Location } from 'bukkit';

  export class Vector implements ConfigurationSerializable {
    constructor(x: number, y: number, z: number): Vector;

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
    constructor(x: number, y: number, z: number): BlockVector;
    constructor(vec: Vector): BlockVector;

    clone(): BlockVector;
    static deserialize(args: Map<string, object>): BlockVector;
  }

  export class RayTraceResult {
    constructor(hitPosition: Vector): RayTraceResult;
    constructor(hitPosition: Vector, hitBlockFace: BlockFace): RayTraceResult;
    constructor(hitPosition: Vector, hitBlock: Block, hitBlockFace: BlockFace): RayTraceResult;
    constructor(hitPosition: Vector, hitEntity: Entity): RayTraceResult;
    constructor(hitPosition: Vector, hitEntity: Entity, hitBlockFace: BlockFace): RayTraceResult;

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

  export class Class<T> extends Object {
    asSubclass<U>(clazz: Class<U>): Class<U>;
    cast(obj: object): T;
    desiredAssertionStatus(): boolean;
    static forName(module, name: string): Class<T>;
    static forName(name: string): Class<T>;
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

  export class Runnable {

  }
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
}

declare module 'me/conji/cauldron' {
  export class Cauldron {
    static isolate(): Cauldron;
    setIsDebugging(value: boolean): void;
    getIsDebugging(): boolean;
    spawn(command: string, directory: string): string;
  }
}

declare module 'me/conji/cauldron/utils' {
  export class PathHelpers {
    static join(path1: string, ...paths: string): string;
    static exists(path1: string, ...paths: string): boolean;
    static resolveLocalPath(path1: string, ...paths: string): Path;
  }
}


declare module 'cauldron' {
  import { Event } from 'bukkit/event';
  import { BlockBreakEvent, BlockPlaceEvent, BlockCanBuildEvent, BlockCookEvent, BlockDamageEvent, BlockDispenseArmorEvent, BlockDispenseEvent, BlockDropItemEvent, BlockExpEvent, BlockExplodeEvent, BlockFadeEvent, BlockFertilizeEvent, BlockFormEvent, BlockFromToEvent, BlockGrowEvent, BlockIgniteEvent, BlockMultiPlaceEvent, BlockPhysicsEvent, BlockPistonExtendEvent, BlockPistonRetractEvent, BlockShearEntityEvent, BlockSpreadEvent, CauldronLevelChangeEvent, EntityBlockFormEvent, FluidLevelChangeEvent, LeavesDecayEvent, MoistureChangeEvent, NotePlayEvent, SignChangeEvent, SpongeAbsorbEvent } from 'bukkit/event/block';
  import { EnchantItemEvent } from 'bukkit/event/enchantment';
  import { AreaEffectCloudApplyEvent, BatToggleSleepEvent, CreatureSpawnEvent, CreeperPowerEvent, EnderDragonChangePhaseEvent, EntityAirChangeEvent, EntityBreakDoorEvent, EntityBreedEvent, EntityChangeBlockEvent, EntityCombustByBlockEvent, EntityCombustByEntityEvent, EntityCombustEvent, EntityCreatePortalEvent, EntityDamageByBlockEvent, EntityDamageByEntityEvent, EntityDamageEvent, EntityDeathEvent, EntityDropItemEvent, EntityExplodeEvent, EntityInteractEvent, EntityPickupItemEvent, EntityPlaceEvent, EntityPortalEnterEvent, EntityPortalEvent, EntityPortalExitEvent, EntityPoseChangeEvent, EntityPotionEffectEvent, EntityRegainHealthEvent, EntityResurrectEvent, EntityShootBowEvent, EntitySpawnEvent, EntityTameEvent, EntityTargetEvent, EntityTeleportEvent, EntityToggleGlideEvent, EntityToggleSwimEvent, EntityTransformEvent, EntityUnleashEvent, ExplosionPrimeEvent, FireworkExplodeEvent, FoodLevelChangeEvent, HorseJumpEvent, ItemDespawnEvent, LingeringPotionSplashEvent, PigZapEvent, PigZombieAngerEvent, PlayerDeathEvent, PlayerLeashEntityEvent, PotionSplashEvent, ProjectileHitEvent, ProjectileLaunchEvent, SheepDyeWoolEvent, SheepRegrowWoolEvent, SlimeSplitEvent, SpawnerSpawnEvent, VillagerAcquireTradeEvent, VillagerCareerChangeEvent, VillagerReplenishTradeEvent } from 'bukkit/event/entity';
  import { HangingBreakByEntityEvent, HangingBreakEvent, HangingPlaceEvent } from 'bukkit/event/hanging';
  import { BrewingStandFuelEvent, CraftItemEvent, FurnaceExtractEvent, FurnaceSmeltEvent, InventoryCloseEvent, InventoryCreativeEvent, InventoryDragEvent, InventoryInteractEvent, InventoryMoveItemEvent, InventoryOpenEvent, PrepareAnvilEvent, PrepareItemCraftEvent, TradeSelectEvent } from 'bukkit/event/inventory';
  import { RaidSpawnWaveEvent, RaidFinishEvent, RaidStopEvent, RaidTriggerEvent } from 'bukkit/event/raid';
  import { PlayerAdvancementDoneEvent, PlayerArmorStandManipulateEvent, PlayerBedEnterEvent, PlayerBedLeaveEvent, PlayerBucketEmptyEvent, PlayerChangedWorldEvent, PlayerChannelEvent, PlayerChatEvent, PlayerChatTabCompleteEvent, PlayerCommandPreprocessEvent, PlayerCommandSendEvent, PlayerDropItemEvent, PlayerEditBookEvent, PlayerEggThrowEvent, PlayerExpChangeEvent, PlayerFishEvent, PlayerGameModeChangeEvent, PlayerInteractAtEntityEvent, PlayerInteractEvent, PlayerInteractEntityEvent, PlayerItemBreakEvent, PlayerItemDamageEvent, PlayerItemHeldEvent, PlayerItemMendEvent, PlayerJoinEvent, PlayerKickEvent, PlayerLevelChangeEvent, PlayerLocaleChangeEvent, PlayerLoginEvent, PlayerMoveEvent, PlayerPickupArrowEvent, PlayerPortalEvent, PlayerPreLoginEvent, PlayerQuitEvent, PlayerRecipeDiscoverEvent, PlayerResourcePackStatusEvent, PlayerRespawnEvent, PlayerRiptideEvent, PlayerShearEntityEvent, PlayerStatisticIncrementEvent, PlayerSwapHandItemsEvent, PlayerTakeLecternBookEvent, PlayerTeleportEvent, PlayerToggleFlightEvent, PlayerToggleSprintEvent, PlayerUnleashEntityEvent, PlayerUnregisterChannelEvent } from 'bukkit/event/player';
  import { BroadcastMessageEvent, PluginDisableEvent, PluginEnableEvent, RemoteServerCommandEvent, ServerCommandEvent, ServerListPingEvent, ServerLoadEvent, ServiceRegisterEvent, ServiceUnregisterEvent, TabCompleteEvent } from 'bukkit/event/server';
  import { VehicleBlockCollision, VehicleBlockCollisionEvent, VehicleCreateEvent, VehicleDamageEvent, VehicleDestroyEvent, VehicleEnterEvent, VehicleEntityCollisionEvent, VehicleExitEvent, VehicleUpdateEvent } from 'bukkit/event/vehicle';
  import { LightningStrikeEvent, ThunderChangeEvent, WeatherChangeEvent } from 'bukkit/event/weather';
  import { ChunkLoadEvent, ChunkPopulateEvent, ChunkUnloadEvent, PortalCreateEvent, SpawnChangeEvent, StructureGrowEvent, WorldLoadEvent, WorldSaveEvent } from 'bukkit/event/world';
  import { BukkitPlugin } from 'bukkit/plugin/java';
  import { NamespacedKey, Server } from 'bukkit';
  import { EventEmitter } from 'events';
  export class Command {
    constructor(name: string, options: object): Command;
    registerCommand(name: string): void;
    register();
    addSubcommand(command: Command): Command;
    static fromPath(path: string): Command;
  }

  export module Command {
    export enum CommandRestriction {
      NONE,
      CONSOLE_ONLY,
      PLAYER_ONLY
    }
  }

  interface CancelToken {
    equals(compare: object): boolean;
    unregister(): void;
    cancel(): void;
  }

  interface EventHandler<T extends Event> {
    (event: T): boolean?;
  }

  interface CauldronEvents extends EventEmitter {
    // block
    on(name: 'blockbreak', handler: EventHandler<BlockBreakEvent>): CancelToken;
    on(name: 'blockburn', handler: EventHandler<BlockBurnEvent>): CancelToken;
    on(name: 'blockplace', handler: EventHandler<BlockPlaceEvent>): CancelToken;
    on(name: 'blockcanbuild', handler: EventHandler<BlockCanBuildEvent>): CancelToken;
    on(name: 'blockcook', handler: EventHandler<BlockCookEvent>): CancelToken;
    on(name: 'blockdamage', handler: EventHandler<BlockDamageEvent>): CancelToken;
    on(name: 'blockdispensearmor', handler: EventHandler<BlockDispenseArmorEvent>): CancelToken;
    on(name: 'blockdispense', handler: EventHandler<BlockDispenseEvent>): CancelToken;
    on(name: 'blockdropitem', handler: EventHandler<BlockDropItemEvent>): CancelToken;
    on(name: 'blockexp', handler: EventHandler<BlockExpEvent>): CancelToken;
    on(name: 'blockexplode', handler: EventHandler<BlockExplodeEvent>): CancelToken;
    on(name: 'blockfade', handler: EventHandler<BlockFadeEvent>): CancelToken;
    on(name: 'blockfertilize', handler: EventHandler<BlockFertilizeEvent>): CancelToken;
    on(name: 'blockform', handler: EventHandler<BlockFormEvent>): CancelToken;
    on(name: 'blockfromto', handler: EventHandler<BlockFromToEvent>): CancelToken;
    on(name: 'blockgrow', handler: EventHandler<BlockGrowEvent>): CancelToken;
    on(name: 'blockignite', handler: EventHandler<BlockIgniteEvent>): CancelToken;
    on(name: 'blockmultiplace', handler: EventHandler<BlockMultiPlaceEvent>): CancelToken;
    on(name: 'blockphysics', handler: EventHandler<BlockPhysicsEvent>): CancelToken;
    on(name: 'blockpistonextend', handler: EventHandler<BlockPistonExtendEvent>): CancelToken;
    on(name: 'blockpistonretract', handler: EventHandler<BlockPistonRetractEvent>): CancelToken;
    on(name: 'blockredstone', handler: EventHandler<BlockRedstoneEvent>): CancelToken;
    on(name: 'blockshearentity', handler: EventHandler<BlockShearEntityEvent>): CancelToken;
    on(name: 'blockspread', handler: EventHandler<BlockSpreadEvent>): CancelToken;
    on(name: 'cauldronlevelchange', handler: EventHandler<CauldronLevelChangeEvent>): CancelToken;
    on(name: 'blockentityform', handler: EventHandler<EntityBlockFormEvent>): CancelToken;
    on(name: 'fluidlevelchange', handler: EventHandler<FluidLevelChangeEvent>): CancelToken;
    on(name: 'leavesdecay', handler: EventHandler<LeavesDecayEvent>): CancelToken;
    on(name: 'moisturechange', handler: EventHandler<MoistureChangeEvent>): CancelToken;
    on(name: 'noteplay', handler: EventHandler<NotePlayEvent>): CancelToken;
    on(name: 'signchange', handler: EventHandler<SignChangeEvent>): CancelToken;
    on(name: 'spongeabsorb', handler: EventHandler<SpongeAbsorbEvent>): CancelToken;
    // enchant
    on(name: 'enchant', handler: EventHandler<EnchantItemEvent>): CancelToken;
    on(name: 'prepareenchant', handler: EventHandler<PrepareItemEnchantEvent>): CancelToken;

    // entities
    on(name: 'areaeffectcloudapply', handler: EventHandler<AreaEffectCloudApplyEvent>): CancelToken;
    on(name: 'battogglesleep', handler: EventHandler<BatToggleSleepEvent>): CancelToken;
    on(name: 'creaturespawn', handler: EventHandler<CreatureSpawnEvent>): CancelToken;
    on(name: 'creeperpower', handler: EventHandler<CreeperPowerEvent>): CancelToken;
    on(name: 'enderdragonchangephase', handler: EventHandler<EnderDragonChangePhaseEvent>): CancelToken;
    on(name: 'entityairchange', handler: EventHandler<EntityAirChangeEvent>): CancelToken;
    on(name: 'entitybreakdoor', handler: EventHandler<EntityBreakDoorEvent>): CancelToken;
    on(name: 'entitybreed', handler: EventHandler<EntityBreedEvent>): CancelToken;
    on(name: 'entitychangeblock', handler: EventHandler<EntityChangeBlockEvent>): CancelToken;
    on(name: 'entitycombustbyblock', handler: EventHandler<EntityCombustByBlockEvent>): CancelToken;
    on(name: 'entitycombustbyentity', handler: EventHandler<EntityCombustByEntityEvent>): CancelToken;
    on(name: 'entitycombust', handler: EventHandler<EntityCombustEvent>): CancelToken;
    on(name: 'entitycreateportal', handler: EventHandler<EntityCreatePortalEvent>): CancelToken;
    on(name: 'entitydamagebyblock', handler: EventHandler<EntityDamageByBlockEvent>): CancelToken;
    on(name: 'entitydamagebyentity', handler: EventHandler<EntityDamageByEntityEvent>): CancelToken;
    on(name: 'entitydamage', handler: EventHandler<EntityDamageEvent>): CancelToken;
    on(name: 'entitydeath', handler: EventHandler<EntityDeathEvent>): CancelToken;
    on(name: 'entitydropitem', handler: EventHandler<EntityDropItemEvent>): CancelToken;
    on(name: 'entityexplode', handler: EventHandler<EntityExplodeEvent>): CancelToken;
    on(name: 'entityinteract', handler: EventHandler<EntityInteractEvent>): CancelToken;
    on(name: 'entitypickupitem', handler: EventHandler<EntityPickupItemEvent>): CancelToken;
    on(name: 'entityplace', handler: EventHandler<EntityPlaceEvent>): CancelToken;
    on(name: 'entityportalenter', handler: EventHandler<EntityPortalEnterEvent>): CancelToken;
    on(name: 'entityportal', handler: EventHandler<EntityPortalEvent>): CancelToken;
    on(name: 'entityportalexit', handler: EventHandler<EntityPortalExitEvent>): CancelToken;
    on(name: 'entityposechange', handler: EventHandler<EntityPoseChangeEvent>): CancelToken;
    on(name: 'entitypotioneffect', handler: EventHandler<EntityPotionEffectEvent>): CancelToken;
    on(name: 'entityregainhealth', handler: EventHandler<EntityRegainHealthEvent>): CancelToken;
    on(name: 'entityresurrect', handler: EventHandler<EntityResurrectEvent>): CancelToken;
    on(name: 'entityshootbow', handler: EventHandler<EntityShootBowEvent>): CancelToken;
    on(name: 'entityspawn', handler: EventHandler<EntitySpawnEvent>): CancelToken;
    on(name: 'entitytame', handler: EventHandler<EntityTameEvent>): CancelToken;
    on(name: 'entitytarget', handler: EventHandler<EntityTargetEvent>): CancelToken;
    on(name: 'entitytargetlivingentity', handler: EventHandler<EntityTargetLivingEntityEvent>): CancelToken;
    on(name: 'entityteleport', handler: EventHandler<EntityTeleportEvent>): CancelToken;
    on(name: 'entitytoggleglide', handler: EventHandler<EntityToggleGlideEvent>): CancelToken;
    on(name: 'entitytoggleswim', handler: EventHandler<EntityToggleSwimEvent>): CancelToken;
    on(name: 'entitytransform', handler: EventHandler<EntityTransformEvent>): CancelToken;
    on(name: 'entityunleash', handler: EventHandler<EntityUnleashEvent>): CancelToken;
    on(name: 'expbottle', handler: EventHandler<ExpBottleEvent>): CancelToken;
    on(name: 'explosionprime', handler: EventHandler<ExplosionPrimeEvent>): CancelToken;
    on(name: 'fireworkexplode', handler: EventHandler<FireworkExplodeEvent>): CancelToken;
    on(name: 'foodlevelchange', handler: EventHandler<FoodLevelChangeEvent>): CancelToken;
    on(name: 'horsejump', handler: EventHandler<HorseJumpEvent>): CancelToken;
    on(name: 'itemdespawn', handler: EventHandler<ItemDespawnEvent>): CancelToken;
    on(name: 'itemmerge', handler: EventHandler<EnchantItemEvent>): CancelToken;
    on(name: 'lingeringpotionsplash', handler: EventHandler<LingeringPotionSplashEvent>): CancelToken;
    on(name: 'pigzap', handler: EventHandler<PigZapEvent>): CancelToken;
    on(name: 'pigzombieanger', handler: EventHandler<PigZombieAngerEvent>): CancelToken;
    on(name: 'playerdeath', handler: EventHandler<PlayerDeathEvent>): CancelToken;
    on(name: 'playerleashentity', handler: EventHandler<PlayerLeashEntityEvent>): CancelToken;
    on(name: 'potionsplash', handler: EventHandler<PotionSplashEvent>): CancelToken;
    on(name: 'projectilehit', handler: EventHandler<ProjectileHitEvent>): CancelToken;
    on(name: 'projectilelaunch', handler: EventHandler<ProjectileLaunchEvent>): CancelToken;
    on(name: 'sheepdyewool', handler: EventHandler<SheepDyeWoolEvent>): CancelToken;
    on(name: 'sheepregrowwool', handler: EventHandler<SheepRegrowWoolEvent>): CancelToken;
    on(name: 'slimesplit', handler: EventHandler<SlimeSplitEvent>): CancelToken;
    on(name: 'spawnerspawn', handler: EventHandler<SpawnerSpawnEvent>): CancelToken;
    on(name: 'villageracquiretrade', handler: EventHandler<VillagerAcquireTradeEvent>): CancelToken;
    on(name: 'villagercareerchange', handler: EventHandler<VillagerCareerChangeEvent>): CancelToken;
    on(name: 'villagerreplenishtrade', handler: EventHandler<VillagerReplenishTradeEvent>): CancelToken;

    // hanging
    on(name: 'hangingbreakbyentity', handler: EventHandler<HangingBreakByEntityEvent>): CancelToken;
    on(name: 'hangingbreak', handler: EventHandler<HangingBreakEvent>): CancelToken;
    on(name: 'hangingplace', handler: EventHandler<HangingPlaceEvent>): CancelToken;

    // inventory
    on(name: 'brewingstandfuel', handler: EventHandler<BrewingStandFuelEvent>): CancelToken;
    on(name: 'craftitem', handler: EventHandler<CraftItemEvent>): CancelToken;
    on(name: 'furnaceburn', handler: EventHandler<FurnaceBurnEvent>): CancelToken;
    on(name: 'furnaceextract', handler: EventHandler<FurnaceExtractEvent>): CancelToken;
    on(name: 'furnacesmelt', handler: EventHandler<FurnaceSmeltEvent>): CancelToken;
    on(name: 'inventoryclick', handler: EventHandler<InventoryClickEvent>): CancelToken;
    on(name: 'inventoryclose', handler: EventHandler<InventoryCloseEvent>): CancelToken;
    on(name: 'inventorycreative', handler: EventHandler<InventoryCreativeEvent>): CancelToken;
    on(name: 'inventorydrag', handler: EventHandler<InventoryDragEvent>): CancelToken;
    on(name: 'inventoryinteract', handler: EventHandler<InventoryInteractEvent>): CancelToken;
    on(name: 'inventorymoveitem', handler: EventHandler<InventoryMoveItemEvent>): CancelToken;
    on(name: 'inventoryopen', handler: EventHandler<InventoryOpenEvent>): CancelToken;
    on(name: 'inventorypickupitem', handler: EventHandler<InventoryPickupItemEvent>): CancelToken;
    on(name: 'prepareanvil', handler: EventHandler<PrepareAnvilEvent>): CancelToken;
    on(name: 'prepareitemcraft', handler: EventHandler<PrepareItemCraftEvent>): CancelToken;
    on(name: 'tradeselect', handler: EventHandler<TradeSelectEvent>): CancelToken;

    // player
    on(name: 'playeradvancementdone', handler: EventHandler<PlayerAdvancementDoneEvent>): CancelToken;
    on(name: 'playeranimation', handler: EventHandler<PlayerAnimationEvent>): CancelToken;
    on(name: 'playerarmorstandmanipulate', handler: EventHandler<PlayerArmorStandManipulateEvent>): CancelToken;
    on(name: 'playerbedenter', handler: EventHandler<PlayerBedEnterEvent>): CancelToken;
    on(name: 'playerbedleave', handler: EventHandler<PlayerBedLeaveEvent>): CancelToken;
    on(name: 'playerbucketempty', handler: EventHandler<PlayerBucketEmptyEvent>): CancelToken;
    on(name: 'playerbucketfill', handler: EventHandler<PlayerBucketFillEvent>): CancelToken;
    on(name: 'playerchangedmainhand', handler: EventHandler<PlayerChangedMainHandEvent>): CancelToken;
    on(name: 'playerchangedworld', handler: EventHandler<PlayerChangedWorldEvent>): CancelToken;
    on(name: 'playerchannel', handler: EventHandler<PlayerChannelEvent>): CancelToken;
    on(name: 'playerchat', handler: EventHandler<PlayerChatEvent>): CancelToken;
    on(name: 'playerchattabcomplete', handler: EventHandler<PlayerChatTabCompleteEvent>): CancelToken;
    on(name: 'playercommandpreprocess', handler: EventHandler<PlayerCommandPreprocessEvent>): CancelToken;
    on(name: 'playercommandsend', handler: EventHandler<PlayerCommandSendEvent>): CancelToken;
    on(name: 'playerdropitem', handler: EventHandler<PlayerDropItemEvent>): CancelToken;
    on(name: 'playereditbook', handler: EventHandler<PlayerEditBookEvent>): CancelToken;
    on(name: 'playereggthrow', handler: EventHandler<PlayerEggThrowEvent>): CancelToken;
    on(name: 'playerexpchange', handler: EventHandler<PlayerExpChangeEvent>): CancelToken;
    on(name: 'playerfish', handler: EventHandler<PlayerFishEvent>): CancelToken;
    on(name: 'playergamemodechange', handler: EventHandler<PlayerGameModeChangeEvent>): CancelToken;
    on(name: 'playerinteractatentity', handler: EventHandler<PlayerInteractAtEntityEvent>): CancelToken;
    on(name: 'playerinteractentity', handler: EventHandler<PlayerInteractEntityEvent>): CancelToken;
    on(name: 'playerinteract', handler: EventHandler<PlayerInteractEvent>): CancelToken;
    on(name: 'playeritembreak', handler: EventHandler<PlayerItemBreakEvent>): CancelToken;
    on(name: 'playeritemconsume', handler: EventHandler<PlayerItemConsumeEvent>): CancelToken;
    on(name: 'playeritemdamage', handler: EventHandler<PlayerItemDamageEvent>): CancelToken;
    on(name: 'playeritemheld', handler: EventHandler<PlayerItemHeldEvent>): CancelToken;
    on(name: 'playeritemmend', handler: EventHandler<PlayerItemMendEvent>): CancelToken;
    on(name: 'playerjoin', handler: EventHandler<PlayerJoinEvent>): CancelToken;
    on(name: 'playerkick', handler: EventHandler<PlayerKickEvent>): CancelToken;
    on(name: 'playerlevelchange', handler: EventHandler<PlayerLevelChangeEvent>): CancelToken;
    on(name: 'playerlocalechange', handler: EventHandler<PlayerLocaleChangeEvent>): CancelToken;
    on(name: 'playerlogin', handler: EventHandler<PlayerLoginEvent>): CancelToken;
    on(name: 'playermove', handler: EventHandler<PlayerMoveEvent>): CancelToken;
    on(name: 'playerpickuparrow', handler: EventHandler<PlayerPickupArrowEvent>): CancelToken;
    on(name: 'playerpickupitem', handler: EventHandler<PlayerPickupItemEvent>): CancelToken;
    on(name: 'playerportal', handler: EventHandler<PlayerPortalEvent>): CancelToken;
    on(name: 'playerprelogin', handler: EventHandler<PlayerPreLoginEvent>): CancelToken;
    on(name: 'playerquit', handler: EventHandler<PlayerQuitEvent>): CancelToken;
    on(name: 'playerrecipediscover', handler: EventHandler<PlayerRecipeDiscoverEvent>): CancelToken;
    on(name: 'playerregisterchannel', handler: EventHandler<EnchantItemEvent>): CancelToken;
    on(name: 'playerresourcepackstatus', handler: EventHandler<PlayerResourcePackStatusEvent>): CancelToken;
    on(name: 'playerrespawn', handler: EventHandler<PlayerRespawnEvent>): CancelToken;
    on(name: 'playerriptide', handler: EventHandler<PlayerRiptideEvent>): CancelToken;
    on(name: 'playershearentity', handler: EventHandler<PlayerShearEntityEvent>): CancelToken;
    on(name: 'playerstatisticincrement', handler: EventHandler<PlayerStatisticIncrementEvent>): CancelToken;
    on(name: 'playerspawnhanditems', handler: EventHandler<PlayerSwapHandItemsEvent>): CancelToken;
    on(name: 'playertakelecternbook', handler: EventHandler<PlayerTakeLecternBookEvent>): CancelToken;
    on(name: 'playerteleport', handler: EventHandler<PlayerTeleportEvent>): CancelToken;
    on(name: 'playertoggleflight', handler: EventHandler<PlayerToggleFlightEvent>): CancelToken;
    on(name: 'playertogglesprint', handler: EventHandler<PlayerToggleSprintEvent>): CancelToken;
    on(name: 'playerunleashentity', handler: EventHandler<PlayerUnleashEntityEvent>): CancelToken;
    on(name: 'playerunregisterchannel', handler: EventHandler<PlayerUnregisterChannelEvent>): CancelToken;
    on(name: 'playervelocity', handler: EventHandler<PlayerVelocityEvent>): CancelToken;
    on(name: 'playerquit', handler: EventHandler<PlayerQuitEvent>): CancelToken;

    // raid
    on(name: 'raidfinish', handler: EventHandler<RaidFinishEvent>): CancelToken;
    on(name: 'raidspawnwave', handler: EventHandler<RaidSpawnWaveEvent>): CancelToken;
    on(name: 'raidstop', handler: EventHandler<RaidStopEvent>): CancelToken;
    on(name: 'raidtrigger', handler: EventHandler<RaidTriggerEvent>): CancelToken;

    // server
    on(name: 'broadcastmessage', handler: EventHandler<BroadcastMessageEvent>): CancelToken;
    on(name: 'mapinitialize', handler: EventHandler<MapInitializeEvent>): CancelToken;
    on(name: 'plugindisable', handler: EventHandler<PluginDisableEvent>): CancelToken;
    on(name: 'pluginenable', handler: EventHandler<PluginEnableEvent>): CancelToken;
    on(name: 'remotecommand', handler: EventHandler<RemoteServerCommandEvent>): CancelToken;
    on(name: 'servercommand', handler: EventHandler<ServerCommandEvent>): CancelToken;
    on(name: 'serverlistping', handler: EventHandler<ServerListPingEvent>): CancelToken;
    on(name: 'serverload', handler: EventHandler<ServerLoadEvent>): CancelToken;
    on(name: 'serviceregister', handler: EventHandler<ServiceRegisterEvent>): CancelToken;
    on(name: 'serviceunregister', handler: EventHandler<ServiceUnregisterEvent>): CancelToken;
    on(name: 'tabcomplete', handler: EventHandler<TabCompleteEvent>): CancelToken;

    // vehicle
    on(name: 'vehicleblockcollision', handler: EventHandler<VehicleBlockCollisionEvent>): CancelToken;
    on(name: 'vehiclecreate', handler: EventHandler<VehicleCreateEvent>): CancelToken;
    on(name: 'vehicledamage', handler: EventHandler<VehicleDamageEvent>): CancelToken;
    on(name: 'vehicledestroy', handler: EventHandler<VehicleDestroyEvent>): CancelToken;
    on(name: 'vehicleenter', handler: EventHandler<VehicleEnterEvent>): CancelToken;
    on(name: 'vehicleentitycollision', handler: EventHandler<VehicleEntityCollisionEvent>): CancelToken;
    on(name: 'vehicleexit', handler: EventHandler<VehicleExitEvent>): CancelToken;
    on(name: 'vehiclemove', handler: EventHandler<VehicleMoveEvent>): CancelToken;
    on(name: 'vehicleupdate', handler: EventHandler<VehicleUpdateEvent>): CancelToken;

    // weather
    on(name: 'lightningstrike', handler: EventHandler<LightningStrikeEvent>): CancelToken;
    on(name: 'thunderchange', handler: EventHandler<ThunderChangeEvent>): CancelToken;
    on(name: 'weatherchange', handler: EventHandler<WeatherChangeEvent>): CancelToken;

    // world
    on(name: 'chunkload', handler: EventHandler<ChunkLoadEvent>): CancelToken;
    on(name: 'chunkpopulate', handler: EventHandler<ChunkPopulateEvent>): CancelToken;
    on(name: 'chunkunload', handler: EventHandler<ChunkUnloadEvent>): CancelToken;
    on(name: 'portalcreate', handler: EventHandler<PortalCreateEvent>): CancelToken;
    on(name: 'spawnchange', handler: EventHandler<SpawnChangeEvent>): CancelToken;
    on(name: 'structuregrow', handler: EventHandler<StructureGrowEvent>): CancelToken;
    on(name: 'worldinit', handler: EventHandler<WorldInitEvent>): CancelToken;
    on(name: 'worldload', handler: EventHandler<WorldLoadEvent>): CancelToken;
    on(name: 'worldsave', handler: EventHandler<WorldSaveEvent>): CancelToken;
    on(name: 'worldunload', handler: EventHandler<WorldUnloadEvent>): CancelToken;
  }

  export const NAMESPACE_KEY: NamespacedKey;
  export const events: CauldronEvents;
  export function getPlugin(name: string): BukkitPlugin;
  export function use(listener: (server: Server) => void): void;

  export default {
    Command,
    NAMESPACE_KEY,
    events,
    getPlugin
  };
}