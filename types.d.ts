declare module 'bukkit' {
  import { ItemStack } from 'bukkit/inventory';
  import {
    CommandSender,
    ConsoleCommandSender,
    PluginCommand
  } from 'bukkit/command';
  import { KeyedBossBar, BossBar } from 'bukkit/boss';

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

  export class Difficulty extends Enum<Difficulty> {
    static EASY: Difficulty;
    static HARD: Difficulty;
    static NORMAL: Difficulty;
    static PEACEFUL: Difficulty;
  }

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

declare module 'bukkit/advancement' {}

declare module 'bukkit/attribute' {}

declare module 'bukkit/block' {
  import { Enum, Class } from 'java/lang';
  import { InventoryHolder, BlockInventoryHolder } from 'bukkit/inventory';

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

  export class KeyedBossBar implements BossBar, Keyed {}

  export class BarColor extends Enum<BarColor> {
    static BLUE: BarColor;
    static GREEN: BarColor;
    static PINK: BarColor;
    static PURPLE: BarColor;
    static RED: BarColor;
    static WHITE: BarColor;
    static YELLOW: BarColor;
  }

  export class BarFlag extends Enum<BarFlag> {
    static CREATE_FOG: BarFlag;
    static DARKEN_SKY: BarFlag;
    static PLAY_BOSS_MUSIC: BarFlag;
  }

  export class BarStyle extends Enum<BarStyle> {
    static SEGMENTED_10: BarStyle;
    static SEGMENTED_12: BarStyle;
    static SEGMENTED_20: BarStyle;
    static SEGMENTED_6: BarStyle;
    static SOLID: BarStyle;
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
    export class ConversationState extends Enum<ConversationState> {}
  }
}

declare module 'bukkit/enchantments' {}

declare module 'bukkit/entity' {
  import { UUID } from 'java/util';
  import { BlockFace, PistonMoveReaction } from 'bukkit/block';
  import * as Bukkit from 'bukkit';

  export interface Entity {
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
}

declare module 'bukkit/entity/memory' {}

declare module 'bukkit/entity/minecart' {}

declare module 'bukkit/event' {
  export interface Listener {}
}

declare module 'bukkit/event/block' {
  export interface BlockBreakEvent {}
  export interface BlockPlaceEvent {}
  export interface BlockCanBuildEvent {}
  export interface BlockCookEvent {}
  export interface BlockDamageEvent {}
  export interface BlockDispenseArmorEvent {}
  export interface BlockDispenseEvent {}
  export interface BlockDropItemEvent {}
  export interface BlockExpEvent {}
  export interface BlockExplodeEvent {}
  export interface BlockFadeEvent {}
  export interface BlockFertilizeEvent {}
  export interface BlockFormEvent {}
  export interface BlockFromToEvent {}
  export interface BlockGrowEvent {}
  export interface BlockIgniteEvent {}
  export interface BlockMultiPlaceEvent {}
  export interface BlockPhysicsEvent {}
  export interface BlockPistonExtendEvent {}
  export interface BlockPistonRetractEvent {}
  export interface BlockRedstoneEvent {}
  export interface CauldronLevelChangeEvent {}
  export interface EntityBlockFormEvent {}
  export interface FluidLevelChangeEvent {}
  export interface LeavesDecayEvent {}
  export interface MoistureChangeEvent {}
  export interface NotePlayEvent {}
  export interface SignChangeEvent {}
  export interface SpongeAbsorbEvent {}
}

declare module 'bukkit/event/enchantment' {
  export interface EnchantItemEvent {}
  export interface PrepareItemEnchantEvent {}
}

declare module 'bukkit/event/entity' {
  export interface AreaEffectCloudApplyEvent {}
  export interface BatToggleSleepEvent {}
  export interface CreatureSpawnEvent {}
  export interface CreeperPowerEvent {}
  export interface EnderDragonChangePhaseEvent {}
  export interface EntityAirChangeEvent {}
  export interface EntityBreakDoorEvent {}
  export interface EntityBreedEvent {}
  export interface EntityChangeBlockEvent {}
  export interface EntityCombustByBlockEvent {}
  export interface EntityCombustByEntityEvent {}
  export interface EntityCombustEvent {}
  export interface EntityCreatePortalEvent {}
  export interface EntityDamageByBlockEvent {}
  export interface EntityDamageByEntityEvent {}
  export interface EntityDamageEvent {}
  export interface EntityDeathEvent {}
  export interface EntityDropItemEvent {}
  export interface EntityExplodeEvent {}
  export interface EntityInteractEvent {}
  export interface EntityPickupItemEvent {}
  export interface EntityPlaceEvent {}
  export interface EntityPortalEnterEvent {}
  export interface EntityPortalEvent {}
  export interface EntityPortalExitEvent {}
  export interface EntityPoseChangeEvent {}
  export interface EntityPotionEffectEvent {}
  export interface EntityRegainHealthEvent {}
  export interface EntityResurrectEvent {}
  export interface EntityShootBowEvent {}
  export interface EntitySpawnEvent {}
  export interface EntityTameEvent {}
  export interface EntityTargetEvent {}
  export interface EntityTargetLivingEntityEvent {}
  export interface EntityTeleportEvent {}
  export interface EntityToggleGlideEvent {}
  export interface EntityToggleSwimEvent {}
  export interface EntityTransformEvent {}
  export interface EntityUnleashEvent {}
  export interface ExpBottleEvent {}
  export interface ExplosionPrimeEvent {}
  export interface FireworkExplodeEvent {}
  export interface FoodLevelChangeEvent {}
  export interface HorseJumpEvent {}
  export interface ItemDespawnEvent {}
  export interface ItemMergeEvent {}
  export interface ItemSpawnEvent {}
  export interface LingeringPotionSplashEvent {}
  export interface PigZapEvent {}
  export interface PigZombieAngerEvent {}
  export interface PlayerDeathEvent {}
  export interface PlayerLeashEntityEvent {}
  export interface PotionSplashEvent {}
  export interface ProjectileHitEvent {}
  export interface SheepDyeWoolEvent {}
  export interface SheepRegrowWoolEvent {}
  export interface SlimeSplitEvent {}
  export interface SpawnerSpawnEvent {}
  export interface VillagerAcquireTradeEvent {}
  export interface VillagerCareerChangeEvent {}
  export interface VillagerReplenishTradeEvent {}
}

declare module 'bukkit/event/hanging' {
  export interface HangingBreakByEntityEvent {}
  export interface HangingBreakEvent {}
  export interface HangingPlaceEvent {}
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
  export interface PlayerAdvancementDoneEvent {}
  export interface PlayerAnimationEvent {}
  export interface PlayerArmorStandManipulateEvent {}
  export interface PlayerBedEnterEvent {}
  export interface PlayerBedLeaveEvent {}
  export interface PlayerBucketEmptyEvent {}
  export interface PlayerBucketFillEvent {}
  export interface PlayerChangedMainHandEvent {}
  export interface PlayerChangedWorldEvent {}
  export interface PlayerChannelEvent {}
  export interface PlayerChatEvent {}
  export interface PlayerChatTabCompleteEvent {}
  export interface PlayerCommandPreprocessEvent {}
  export interface PlayerCommandSendEvent {}
  export interface PlayerDropItemEvent {}
  export interface PlayerEditBookEvent {}
  export interface PlayerEggThrowEvent {}
  export interface PlayerExpChangeEvent {}
  export interface PlayerFishEvent {}
  export interface PlayerGameModeChangeEvent {}
  export interface PlayerInteractAtEntityEvent {}
  export interface PlayerINteractEntityEvent {}
  export interface PlayerInteractEvent {}
  export interface PlayerItemBreakEvent {}
  export interface PlayerItemConsumeEvent {}
  export interface PlayerItemDamageEvent {}
  export interface PlayerItemHeldEvent {}
  export interface PlayerItemMendEvent {}
  export interface PlayerJoinEvent {}
  export interface PlayerKickEvent {}
  export interface PlayerLevelChangeEvent {}
  export interface PlayerLocaleChangeEvent {}
  export interface PlayerLoginEvent {}
  export interface PlayerMoveEvent {}
  export interface PlayerPickupArrowEvent {}
  export interface PlayerPickupItemEvent {}
  export interface PlayerPortalEVent {}
  export interface PlayerPreLoginEvent {}
  export interface PlayerQuitEvent {}
  export interface PlayerRecipeDiscoverEvent {}
  export interface PlayerRegisterChannelEvent {}
  export interface PlayerResourcePackStatusEvent {}
  export interface PlayerRespawnEvent {}
  export interface PlayerRiptideEvent {}
  export interface PlayerStatisticIncrementEvent {}
  export interface PlayerShearEntityEvent {}
  export interface PlayerSwapHandItemsEvent {}
  export interface PlayerTakeLecternBookEvent {}
  export interface PlayerTeleportEvent {}
  export interface PlayerToggleFlightEvent {}
  export interface PlayerToggleSprintEvent {}
  export interface PlayerUnleashEntityEvent {}
  export interface PlayerUnregisterChannelEvent {}
  export interface PlayerVelocityEvent {}
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
    static resolveLocalPath(path1: string, ...paths): Path;
  }
}

