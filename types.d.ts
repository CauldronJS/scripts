declare module 'bukkit' {
  import { ItemStack } from 'bukkit/inventory';
  import { CommandSender, ConsoleCommandSender } from 'bukkit/command';
  import { KeyedBossBar } from 'bukkit/boss';

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
  }

  export class Color {}

  export class FireworkEffect {}

  export class GameRule {}

  export class Location {}

  export class NamespacedKey {}

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

  export interface Nameable {}

  export interface OfflinePlayer {}

  export interface Raid {}

  export interface Register {}

  export interface Server {}

  export interface Tag {}

  export interface UnsafeValues {}

  export interface World {}

  export interface WorldBorder {}

  export class Achievement extends Enum<Achievement> {}

  export class Art extends Enum<Art> {}

  export class Axis extends Enum<Axis> {}

  export class ChatColor extends Enum<ChatColor> {}

  export class CoalType extends Enum<CoalType> {}

  export class CropState extends Enum<CropState> {}

  export class Difficulty extends Enum<Difficulty> {}

  export class DyeColor extends Enum<DyeColor> {}

  export class Effect extends Enum<Effect> {}

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

  export enum Material {}

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

declare module 'bukkit/advancement' {}

declare module 'bukkit/attribute' {}

declare module 'bukkit/block' {
  import { Enum } from 'java/lang';

  export interface Banner {}

  export interface Barrel {}

  export interface Beacon {}

  export interface Bed {}

  export interface Bell {}

  export interface BlastFurnace {}

  export interface Block {}

  export interface BlockState {}

  export interface BrewingStand {}

  export interface Campfire {}

  export interface Chest {}

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

  export interface FlowerPot {}

  export interface Furnace {}

  export interface Hopper {}

  export interface Jigsaw {}

  export interface Jukebox {}

  export interface Lectern {}

  export interface Lockable {}

  export interface NoteBlock {}

  export interface ShulkerBox {}

  export interface Sign {}

  export interface Skull {}

  export interface Smoker {}

  export interface Structure {}

  export interface TileState {}

  export class DoubleChest {}

  export class Biome extends Enum<Biome> {}

  export class BlockFace extends Enum<BlockFace> {}

  export class PistonMoveReaction extends Enum<PistonMoveReaction> {}
}

declare module 'bukkit/block/banner' {
  import { Enum } from 'java/lang';
  export class Pattern {}

  export class PatternType extends Enum<PatternType> {}
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

  export interface Directional {}

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
    export class Half extends Enum<Half> {}
  }

  export module Rail {
    export class Shape extends Enum<Shape> {}
  }
}

declare module 'bukkit/block/data/type' {
  import { Enum } from 'java/lang';
  export interface Bamboo {}

  export module Bamboo {
    export class Leaves extends Enum<Leaves> {}
  }

  export interface Bed {}

  export module Bed {
    export class Part extends Enum<Part> {}
  }

  export interface Bell {}

  export module Bell {
    export class Bell extends Enum<Bell> {}
  }

  export interface BrewingStand {}

  export interface BubbleColumn {}

  export interface Cake {}

  export interface Campfire {}

  export interface Chest {}

  export module Chest {
    export class Type extends Enum<Type> {}
  }

  export interface Cocoa {}

  export interface CommandBlock {}

  export interface Comparator {}

  export module Comparator {
    export class Mode extends Enum<Mode> {}
  }

  export interface CoralWallFan {}

  export interface DaylightDetector {}

  export interface Dispenser {}

  export interface Door {}

  export module Door {
    export class Hinge extends Enum<Hinge> {}
  }

  export interface EnderChest {}

  export interface EndPortalFrame {}

  export interface Farmland {}

  export interface Fence {}

  export interface Fire {}

  export interface Furnace {}

  export interface Gate {}

  export interface GlassPane {}

  export interface Hopper {}

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
    export class Connection extends Enum<Connection> {}
  }

  export interface Repeater {}

  export interface Sapling {}

  export interface Scaffolding {}

  export interface SeaPickle {}

  export interface Sign {}

  export interface Slab {}

  export module Slab {
    export class Type extends Enum<Type> {}
  }

  export interface Snow {}

  export interface Stairs {}

  export module Stairs {
    export class Shape extends Enum<Shape> {}
  }

  export interface StructureBlock {}

  export module StructureBlock {
    export class Mode extends Enum<Mode> {}
  }

  export interface Switch {}

  export module Switch {
    export class Face extends Enum<Face> {}
  }

  export interface TechnicalPiston {}

  export module TechnicalPiston {
    export class Type extends Enum<Type> {}
  }

  export interface TNT {}

  export interface TrapDoor {}

  export interface Tripwire {}

  export interface TripwireHook {}

  export interface TurtleEgg {}

  export interface WallSign {}
}

declare module 'bukkit/block/structure' {
  import { Enum } from 'java/lang';

  export class Mirror extends Enum<Mirror> {}

  export class StructureRotation extends Enum<StructureRotation> {}

  export class UsageMode extends Enum<UsageMode> {}
}

declare module 'bukkit/boss' {
  import { Enum } from 'java/lang';

  export interface BossBar {}

  export interface KeyedBossBar {}

  export class BarColor extends Enum<BarColor> {}

  export class BarFlag extends Enum<BarFlag> {}

  export class BarStyle extends Enum<BarStyle> {}
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
    export class ConversationState extends Enum<ConversationState> {}
  }
}

declare module 'bukkit/enchantments' {}

declare module 'bukkit/entity' {}

declare module 'bukkit/entity/memory' {}

declare module 'bukkit/entity/minecart' {}

declare module 'bukkit/event' {}

declare module 'bukkit/event/block' {}

declare module 'bukkit/event/enchantment' {}

declare module 'bukkit/event/entity' {}

declare module 'bukkit/event/hanging' {}

declare module 'bukkit/event/inventory' {}

declare module 'bukkit/event/player' {}

declare module 'bukkit/event/raid' {}

declare module 'bukkit/event/server' {}

declare module 'bukkit/event/vehicle' {}

declare module 'bukkit/event/weather' {}

declare module 'bukkit/event/world' {}

declare module 'bukkit/generator' {}

declare module 'bukkit/help' {}

declare module 'bukkit/inventory' {}

declare module 'bukkit/inventory/meta' {}

declare module 'bukkit/inventory/meta/tags' {}

declare module 'bukkit/loot' {}

declare module 'bukkit/map' {}

declare module 'bukkit/material' {}

declare module 'bukkit/material/types' {}

declare module 'bukkit/metadata' {}

declare module 'bukkit/permissions' {}

declare module 'bukkit/persistence' {}

declare module 'bukkit/plugin' {}

declare module 'bukkit/plugin/java' {}

declare module 'bukkit/plugin/messaging' {}

declare module 'bukkit/potion' {}

declare module 'bukkit/projectiles' {}

declare module 'bukkit/scheduler' {}

declare module 'bukkit/scoreboard' {}

declare module 'bukkit/util' {}

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
