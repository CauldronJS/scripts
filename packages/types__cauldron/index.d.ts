declare module 'cauldronjs' {
  import { Event } from 'bukkit/event';
  import {
    BlockBreakEvent,
    BlockBurnEvent,
    BlockPlaceEvent,
    BlockCanBuildEvent,
    BlockCookEvent,
    BlockDamageEvent,
    BlockDispenseArmorEvent,
    BlockDispenseEvent,
    BlockDropItemEvent,
    BlockExpEvent,
    BlockExplodeEvent,
    BlockFadeEvent,
    BlockFertilizeEvent,
    BlockFormEvent,
    BlockFromToEvent,
    BlockGrowEvent,
    BlockIgniteEvent,
    BlockMultiPlaceEvent,
    BlockPhysicsEvent,
    BlockPistonExtendEvent,
    BlockPistonRetractEvent,
    BlockShearEntityEvent,
    BlockSpreadEvent,
    CauldronLevelChangeEvent,
    EntityBlockFormEvent,
    FluidLevelChangeEvent,
    LeavesDecayEvent,
    MoistureChangeEvent,
    NotePlayEvent,
    SignChangeEvent,
    SpongeAbsorbEvent,
  } from 'bukkit/event/block';
  import { EnchantItemEvent } from 'bukkit/event/enchantment';
  import {
    AreaEffectCloudApplyEvent,
    BatToggleSleepEvent,
    CreatureSpawnEvent,
    CreeperPowerEvent,
    EnderDragonChangePhaseEvent,
    EntityAirChangeEvent,
    EntityBreakDoorEvent,
    EntityBreedEvent,
    EntityChangeBlockEvent,
    EntityCombustByBlockEvent,
    EntityCombustByEntityEvent,
    EntityCombustEvent,
    EntityCreatePortalEvent,
    EntityDamageByBlockEvent,
    EntityDamageByEntityEvent,
    EntityDamageEvent,
    EntityDeathEvent,
    EntityDropItemEvent,
    EntityExplodeEvent,
    EntityInteractEvent,
    EntityPickupItemEvent,
    EntityPlaceEvent,
    EntityPortalEnterEvent,
    EntityPortalEvent,
    EntityPortalExitEvent,
    EntityPoseChangeEvent,
    EntityPotionEffectEvent,
    EntityRegainHealthEvent,
    EntityResurrectEvent,
    EntityShootBowEvent,
    EntitySpawnEvent,
    EntityTameEvent,
    EntityTargetEvent,
    EntityTeleportEvent,
    EntityToggleGlideEvent,
    EntityToggleSwimEvent,
    EntityTransformEvent,
    EntityUnleashEvent,
    ExplosionPrimeEvent,
    FireworkExplodeEvent,
    FoodLevelChangeEvent,
    HorseJumpEvent,
    ItemDespawnEvent,
    LingeringPotionSplashEvent,
    PigZapEvent,
    PigZombieAngerEvent,
    PlayerDeathEvent,
    PlayerLeashEntityEvent,
    PotionSplashEvent,
    ProjectileHitEvent,
    ProjectileLaunchEvent,
    SheepDyeWoolEvent,
    SheepRegrowWoolEvent,
    SlimeSplitEvent,
    SpawnerSpawnEvent,
    VillagerAcquireTradeEvent,
    VillagerCareerChangeEvent,
    VillagerReplenishTradeEvent,
  } from 'bukkit/event/entity';
  import {
    HangingBreakByEntityEvent,
    HangingBreakEvent,
    HangingPlaceEvent,
  } from 'bukkit/event/hanging';
  import {
    BrewingStandFuelEvent,
    CraftItemEvent,
    FurnaceExtractEvent,
    FurnaceSmeltEvent,
    InventoryCloseEvent,
    InventoryCreativeEvent,
    InventoryDragEvent,
    InventoryInteractEvent,
    InventoryMoveItemEvent,
    InventoryOpenEvent,
    PrepareAnvilEvent,
    PrepareItemCraftEvent,
    TradeSelectEvent,
  } from 'bukkit/event/inventory';
  import {
    RaidSpawnWaveEvent,
    RaidFinishEvent,
    RaidStopEvent,
    RaidTriggerEvent,
  } from 'bukkit/event/raid';
  import {
    PlayerAdvancementDoneEvent,
    PlayerArmorStandManipulateEvent,
    PlayerBedEnterEvent,
    PlayerBedLeaveEvent,
    PlayerBucketEmptyEvent,
    PlayerChangedWorldEvent,
    PlayerChannelEvent,
    PlayerChatEvent,
    PlayerChatTabCompleteEvent,
    PlayerCommandPreprocessEvent,
    PlayerCommandSendEvent,
    PlayerDropItemEvent,
    PlayerEditBookEvent,
    PlayerEggThrowEvent,
    PlayerExpChangeEvent,
    PlayerFishEvent,
    PlayerGameModeChangeEvent,
    PlayerInteractAtEntityEvent,
    PlayerInteractEvent,
    PlayerInteractEntityEvent,
    PlayerItemBreakEvent,
    PlayerItemDamageEvent,
    PlayerItemHeldEvent,
    PlayerItemMendEvent,
    PlayerJoinEvent,
    PlayerKickEvent,
    PlayerLevelChangeEvent,
    PlayerLocaleChangeEvent,
    PlayerLoginEvent,
    PlayerMoveEvent,
    PlayerPickupArrowEvent,
    PlayerPortalEvent,
    PlayerPreLoginEvent,
    PlayerQuitEvent,
    PlayerRecipeDiscoverEvent,
    PlayerResourcePackStatusEvent,
    PlayerRespawnEvent,
    PlayerRiptideEvent,
    PlayerShearEntityEvent,
    PlayerStatisticIncrementEvent,
    PlayerSwapHandItemsEvent,
    PlayerTakeLecternBookEvent,
    PlayerTeleportEvent,
    PlayerToggleFlightEvent,
    PlayerToggleSprintEvent,
    PlayerUnleashEntityEvent,
    PlayerUnregisterChannelEvent,
  } from 'bukkit/event/player';
  import {
    BroadcastMessageEvent,
    PluginDisableEvent,
    PluginEnableEvent,
    RemoteServerCommandEvent,
    ServerCommandEvent,
    ServerListPingEvent,
    ServerLoadEvent,
    ServiceRegisterEvent,
    ServiceUnregisterEvent,
    TabCompleteEvent,
  } from 'bukkit/event/server';
  import {
    VehicleBlockCollisionEvent,
    VehicleCreateEvent,
    VehicleDamageEvent,
    VehicleDestroyEvent,
    VehicleEnterEvent,
    VehicleEntityCollisionEvent,
    VehicleExitEvent,
    VehicleUpdateEvent,
  } from 'bukkit/event/vehicle';
  import {
    LightningStrikeEvent,
    ThunderChangeEvent,
    WeatherChangeEvent,
  } from 'bukkit/event/weather';
  import {
    ChunkLoadEvent,
    ChunkPopulateEvent,
    ChunkUnloadEvent,
    PortalCreateEvent,
    SpawnChangeEvent,
    StructureGrowEvent,
    WorldLoadEvent,
    WorldSaveEvent,
  } from 'bukkit/event/world';
  import { Plugin } from 'bukkit/plugin';
  import { NamespacedKey, Server } from 'bukkit';
  import { EventEmitter } from 'events';

  export class Command {
    constructor(name: string, options: object);
    registerCommand(name: string): void;
    register(): void;
    addSubcommand(command: Command): Command;
    static fromPath(path: string): Command;
  }

  export module Command {
    export enum CommandRestriction {
      NONE,
      CONSOLE_ONLY,
      PLAYER_ONLY,
    }
  }

  interface CancelToken {
    equals(compare: object): boolean;
    unregister(): void;
    cancel(): void;
  }

  interface EventHandler<T extends Event> {
    (event: T): boolean;
  }

  interface CauldronEvents extends EventEmitter {
    // block
    on(name: 'blockbreak', handler: EventHandler<BlockBreakEvent>): CancelToken;
    on(name: 'blockburn', handler: EventHandler<BlockBurnEvent>): CancelToken;
    on(name: 'blockplace', handler: EventHandler<BlockPlaceEvent>): CancelToken;
    on(
      name: 'blockcanbuild',
      handler: EventHandler<BlockCanBuildEvent>
    ): CancelToken;
    on(name: 'blockcook', handler: EventHandler<BlockCookEvent>): CancelToken;
    on(
      name: 'blockdamage',
      handler: EventHandler<BlockDamageEvent>
    ): CancelToken;
    on(
      name: 'blockdispensearmor',
      handler: EventHandler<BlockDispenseArmorEvent>
    ): CancelToken;
    on(
      name: 'blockdispense',
      handler: EventHandler<BlockDispenseEvent>
    ): CancelToken;
    on(
      name: 'blockdropitem',
      handler: EventHandler<BlockDropItemEvent>
    ): CancelToken;
    on(name: 'blockexp', handler: EventHandler<BlockExpEvent>): CancelToken;
    on(
      name: 'blockexplode',
      handler: EventHandler<BlockExplodeEvent>
    ): CancelToken;
    on(name: 'blockfade', handler: EventHandler<BlockFadeEvent>): CancelToken;
    on(
      name: 'blockfertilize',
      handler: EventHandler<BlockFertilizeEvent>
    ): CancelToken;
    on(name: 'blockform', handler: EventHandler<BlockFormEvent>): CancelToken;
    on(
      name: 'blockfromto',
      handler: EventHandler<BlockFromToEvent>
    ): CancelToken;
    on(name: 'blockgrow', handler: EventHandler<BlockGrowEvent>): CancelToken;
    on(
      name: 'blockignite',
      handler: EventHandler<BlockIgniteEvent>
    ): CancelToken;
    on(
      name: 'blockmultiplace',
      handler: EventHandler<BlockMultiPlaceEvent>
    ): CancelToken;
    on(
      name: 'blockphysics',
      handler: EventHandler<BlockPhysicsEvent>
    ): CancelToken;
    on(
      name: 'blockpistonextend',
      handler: EventHandler<BlockPistonExtendEvent>
    ): CancelToken;
    on(
      name: 'blockpistonretract',
      handler: EventHandler<BlockPistonRetractEvent>
    ): CancelToken;
    on(
      name: 'blockredstone',
      handler: EventHandler<BlockRedstoneEvent>
    ): CancelToken;
    on(
      name: 'blockshearentity',
      handler: EventHandler<BlockShearEntityEvent>
    ): CancelToken;
    on(
      name: 'blockspread',
      handler: EventHandler<BlockSpreadEvent>
    ): CancelToken;
    on(
      name: 'cauldronlevelchange',
      handler: EventHandler<CauldronLevelChangeEvent>
    ): CancelToken;
    on(
      name: 'blockentityform',
      handler: EventHandler<EntityBlockFormEvent>
    ): CancelToken;
    on(
      name: 'fluidlevelchange',
      handler: EventHandler<FluidLevelChangeEvent>
    ): CancelToken;
    on(
      name: 'leavesdecay',
      handler: EventHandler<LeavesDecayEvent>
    ): CancelToken;
    on(
      name: 'moisturechange',
      handler: EventHandler<MoistureChangeEvent>
    ): CancelToken;
    on(name: 'noteplay', handler: EventHandler<NotePlayEvent>): CancelToken;
    on(name: 'signchange', handler: EventHandler<SignChangeEvent>): CancelToken;
    on(
      name: 'spongeabsorb',
      handler: EventHandler<SpongeAbsorbEvent>
    ): CancelToken;
    // enchant
    on(name: 'enchant', handler: EventHandler<EnchantItemEvent>): CancelToken;
    on(
      name: 'prepareenchant',
      handler: EventHandler<PrepareItemEnchantEvent>
    ): CancelToken;

    // entities
    on(
      name: 'areaeffectcloudapply',
      handler: EventHandler<AreaEffectCloudApplyEvent>
    ): CancelToken;
    on(
      name: 'battogglesleep',
      handler: EventHandler<BatToggleSleepEvent>
    ): CancelToken;
    on(
      name: 'creaturespawn',
      handler: EventHandler<CreatureSpawnEvent>
    ): CancelToken;
    on(
      name: 'creeperpower',
      handler: EventHandler<CreeperPowerEvent>
    ): CancelToken;
    on(
      name: 'enderdragonchangephase',
      handler: EventHandler<EnderDragonChangePhaseEvent>
    ): CancelToken;
    on(
      name: 'entityairchange',
      handler: EventHandler<EntityAirChangeEvent>
    ): CancelToken;
    on(
      name: 'entitybreakdoor',
      handler: EventHandler<EntityBreakDoorEvent>
    ): CancelToken;
    on(
      name: 'entitybreed',
      handler: EventHandler<EntityBreedEvent>
    ): CancelToken;
    on(
      name: 'entitychangeblock',
      handler: EventHandler<EntityChangeBlockEvent>
    ): CancelToken;
    on(
      name: 'entitycombustbyblock',
      handler: EventHandler<EntityCombustByBlockEvent>
    ): CancelToken;
    on(
      name: 'entitycombustbyentity',
      handler: EventHandler<EntityCombustByEntityEvent>
    ): CancelToken;
    on(
      name: 'entitycombust',
      handler: EventHandler<EntityCombustEvent>
    ): CancelToken;
    on(
      name: 'entitycreateportal',
      handler: EventHandler<EntityCreatePortalEvent>
    ): CancelToken;
    on(
      name: 'entitydamagebyblock',
      handler: EventHandler<EntityDamageByBlockEvent>
    ): CancelToken;
    on(
      name: 'entitydamagebyentity',
      handler: EventHandler<EntityDamageByEntityEvent>
    ): CancelToken;
    on(
      name: 'entitydamage',
      handler: EventHandler<EntityDamageEvent>
    ): CancelToken;
    on(
      name: 'entitydeath',
      handler: EventHandler<EntityDeathEvent>
    ): CancelToken;
    on(
      name: 'entitydropitem',
      handler: EventHandler<EntityDropItemEvent>
    ): CancelToken;
    on(
      name: 'entityexplode',
      handler: EventHandler<EntityExplodeEvent>
    ): CancelToken;
    on(
      name: 'entityinteract',
      handler: EventHandler<EntityInteractEvent>
    ): CancelToken;
    on(
      name: 'entitypickupitem',
      handler: EventHandler<EntityPickupItemEvent>
    ): CancelToken;
    on(
      name: 'entityplace',
      handler: EventHandler<EntityPlaceEvent>
    ): CancelToken;
    on(
      name: 'entityportalenter',
      handler: EventHandler<EntityPortalEnterEvent>
    ): CancelToken;
    on(
      name: 'entityportal',
      handler: EventHandler<EntityPortalEvent>
    ): CancelToken;
    on(
      name: 'entityportalexit',
      handler: EventHandler<EntityPortalExitEvent>
    ): CancelToken;
    on(
      name: 'entityposechange',
      handler: EventHandler<EntityPoseChangeEvent>
    ): CancelToken;
    on(
      name: 'entitypotioneffect',
      handler: EventHandler<EntityPotionEffectEvent>
    ): CancelToken;
    on(
      name: 'entityregainhealth',
      handler: EventHandler<EntityRegainHealthEvent>
    ): CancelToken;
    on(
      name: 'entityresurrect',
      handler: EventHandler<EntityResurrectEvent>
    ): CancelToken;
    on(
      name: 'entityshootbow',
      handler: EventHandler<EntityShootBowEvent>
    ): CancelToken;
    on(
      name: 'entityspawn',
      handler: EventHandler<EntitySpawnEvent>
    ): CancelToken;
    on(name: 'entitytame', handler: EventHandler<EntityTameEvent>): CancelToken;
    on(
      name: 'entitytarget',
      handler: EventHandler<EntityTargetEvent>
    ): CancelToken;
    on(
      name: 'entitytargetlivingentity',
      handler: EventHandler<EntityTargetLivingEntityEvent>
    ): CancelToken;
    on(
      name: 'entityteleport',
      handler: EventHandler<EntityTeleportEvent>
    ): CancelToken;
    on(
      name: 'entitytoggleglide',
      handler: EventHandler<EntityToggleGlideEvent>
    ): CancelToken;
    on(
      name: 'entitytoggleswim',
      handler: EventHandler<EntityToggleSwimEvent>
    ): CancelToken;
    on(
      name: 'entitytransform',
      handler: EventHandler<EntityTransformEvent>
    ): CancelToken;
    on(
      name: 'entityunleash',
      handler: EventHandler<EntityUnleashEvent>
    ): CancelToken;
    on(name: 'expbottle', handler: EventHandler<ExpBottleEvent>): CancelToken;
    on(
      name: 'explosionprime',
      handler: EventHandler<ExplosionPrimeEvent>
    ): CancelToken;
    on(
      name: 'fireworkexplode',
      handler: EventHandler<FireworkExplodeEvent>
    ): CancelToken;
    on(
      name: 'foodlevelchange',
      handler: EventHandler<FoodLevelChangeEvent>
    ): CancelToken;
    on(name: 'horsejump', handler: EventHandler<HorseJumpEvent>): CancelToken;
    on(
      name: 'itemdespawn',
      handler: EventHandler<ItemDespawnEvent>
    ): CancelToken;
    on(name: 'itemmerge', handler: EventHandler<EnchantItemEvent>): CancelToken;
    on(
      name: 'lingeringpotionsplash',
      handler: EventHandler<LingeringPotionSplashEvent>
    ): CancelToken;
    on(name: 'pigzap', handler: EventHandler<PigZapEvent>): CancelToken;
    on(
      name: 'pigzombieanger',
      handler: EventHandler<PigZombieAngerEvent>
    ): CancelToken;
    on(
      name: 'playerdeath',
      handler: EventHandler<PlayerDeathEvent>
    ): CancelToken;
    on(
      name: 'playerleashentity',
      handler: EventHandler<PlayerLeashEntityEvent>
    ): CancelToken;
    on(
      name: 'potionsplash',
      handler: EventHandler<PotionSplashEvent>
    ): CancelToken;
    on(
      name: 'projectilehit',
      handler: EventHandler<ProjectileHitEvent>
    ): CancelToken;
    on(
      name: 'projectilelaunch',
      handler: EventHandler<ProjectileLaunchEvent>
    ): CancelToken;
    on(
      name: 'sheepdyewool',
      handler: EventHandler<SheepDyeWoolEvent>
    ): CancelToken;
    on(
      name: 'sheepregrowwool',
      handler: EventHandler<SheepRegrowWoolEvent>
    ): CancelToken;
    on(name: 'slimesplit', handler: EventHandler<SlimeSplitEvent>): CancelToken;
    on(
      name: 'spawnerspawn',
      handler: EventHandler<SpawnerSpawnEvent>
    ): CancelToken;
    on(
      name: 'villageracquiretrade',
      handler: EventHandler<VillagerAcquireTradeEvent>
    ): CancelToken;
    on(
      name: 'villagercareerchange',
      handler: EventHandler<VillagerCareerChangeEvent>
    ): CancelToken;
    on(
      name: 'villagerreplenishtrade',
      handler: EventHandler<VillagerReplenishTradeEvent>
    ): CancelToken;

    // hanging
    on(
      name: 'hangingbreakbyentity',
      handler: EventHandler<HangingBreakByEntityEvent>
    ): CancelToken;
    on(
      name: 'hangingbreak',
      handler: EventHandler<HangingBreakEvent>
    ): CancelToken;
    on(
      name: 'hangingplace',
      handler: EventHandler<HangingPlaceEvent>
    ): CancelToken;

    // inventory
    on(
      name: 'brewingstandfuel',
      handler: EventHandler<BrewingStandFuelEvent>
    ): CancelToken;
    on(name: 'craftitem', handler: EventHandler<CraftItemEvent>): CancelToken;
    on(
      name: 'furnaceburn',
      handler: EventHandler<FurnaceBurnEvent>
    ): CancelToken;
    on(
      name: 'furnaceextract',
      handler: EventHandler<FurnaceExtractEvent>
    ): CancelToken;
    on(
      name: 'furnacesmelt',
      handler: EventHandler<FurnaceSmeltEvent>
    ): CancelToken;
    on(
      name: 'inventoryclick',
      handler: EventHandler<InventoryClickEvent>
    ): CancelToken;
    on(
      name: 'inventoryclose',
      handler: EventHandler<InventoryCloseEvent>
    ): CancelToken;
    on(
      name: 'inventorycreative',
      handler: EventHandler<InventoryCreativeEvent>
    ): CancelToken;
    on(
      name: 'inventorydrag',
      handler: EventHandler<InventoryDragEvent>
    ): CancelToken;
    on(
      name: 'inventoryinteract',
      handler: EventHandler<InventoryInteractEvent>
    ): CancelToken;
    on(
      name: 'inventorymoveitem',
      handler: EventHandler<InventoryMoveItemEvent>
    ): CancelToken;
    on(
      name: 'inventoryopen',
      handler: EventHandler<InventoryOpenEvent>
    ): CancelToken;
    on(
      name: 'inventorypickupitem',
      handler: EventHandler<InventoryPickupItemEvent>
    ): CancelToken;
    on(
      name: 'prepareanvil',
      handler: EventHandler<PrepareAnvilEvent>
    ): CancelToken;
    on(
      name: 'prepareitemcraft',
      handler: EventHandler<PrepareItemCraftEvent>
    ): CancelToken;
    on(
      name: 'tradeselect',
      handler: EventHandler<TradeSelectEvent>
    ): CancelToken;

    // player
    on(
      name: 'playeradvancementdone',
      handler: EventHandler<PlayerAdvancementDoneEvent>
    ): CancelToken;
    on(
      name: 'playeranimation',
      handler: EventHandler<PlayerAnimationEvent>
    ): CancelToken;
    on(
      name: 'playerarmorstandmanipulate',
      handler: EventHandler<PlayerArmorStandManipulateEvent>
    ): CancelToken;
    on(
      name: 'playerbedenter',
      handler: EventHandler<PlayerBedEnterEvent>
    ): CancelToken;
    on(
      name: 'playerbedleave',
      handler: EventHandler<PlayerBedLeaveEvent>
    ): CancelToken;
    on(
      name: 'playerbucketempty',
      handler: EventHandler<PlayerBucketEmptyEvent>
    ): CancelToken;
    on(
      name: 'playerbucketfill',
      handler: EventHandler<PlayerBucketFillEvent>
    ): CancelToken;
    on(
      name: 'playerchangedmainhand',
      handler: EventHandler<PlayerChangedMainHandEvent>
    ): CancelToken;
    on(
      name: 'playerchangedworld',
      handler: EventHandler<PlayerChangedWorldEvent>
    ): CancelToken;
    on(
      name: 'playerchannel',
      handler: EventHandler<PlayerChannelEvent>
    ): CancelToken;
    on(name: 'playerchat', handler: EventHandler<PlayerChatEvent>): CancelToken;
    on(
      name: 'playerchattabcomplete',
      handler: EventHandler<PlayerChatTabCompleteEvent>
    ): CancelToken;
    on(
      name: 'playercommandpreprocess',
      handler: EventHandler<PlayerCommandPreprocessEvent>
    ): CancelToken;
    on(
      name: 'playercommandsend',
      handler: EventHandler<PlayerCommandSendEvent>
    ): CancelToken;
    on(
      name: 'playerdropitem',
      handler: EventHandler<PlayerDropItemEvent>
    ): CancelToken;
    on(
      name: 'playereditbook',
      handler: EventHandler<PlayerEditBookEvent>
    ): CancelToken;
    on(
      name: 'playereggthrow',
      handler: EventHandler<PlayerEggThrowEvent>
    ): CancelToken;
    on(
      name: 'playerexpchange',
      handler: EventHandler<PlayerExpChangeEvent>
    ): CancelToken;
    on(name: 'playerfish', handler: EventHandler<PlayerFishEvent>): CancelToken;
    on(
      name: 'playergamemodechange',
      handler: EventHandler<PlayerGameModeChangeEvent>
    ): CancelToken;
    on(
      name: 'playerinteractatentity',
      handler: EventHandler<PlayerInteractAtEntityEvent>
    ): CancelToken;
    on(
      name: 'playerinteractentity',
      handler: EventHandler<PlayerInteractEntityEvent>
    ): CancelToken;
    on(
      name: 'playerinteract',
      handler: EventHandler<PlayerInteractEvent>
    ): CancelToken;
    on(
      name: 'playeritembreak',
      handler: EventHandler<PlayerItemBreakEvent>
    ): CancelToken;
    on(
      name: 'playeritemconsume',
      handler: EventHandler<PlayerItemConsumeEvent>
    ): CancelToken;
    on(
      name: 'playeritemdamage',
      handler: EventHandler<PlayerItemDamageEvent>
    ): CancelToken;
    on(
      name: 'playeritemheld',
      handler: EventHandler<PlayerItemHeldEvent>
    ): CancelToken;
    on(
      name: 'playeritemmend',
      handler: EventHandler<PlayerItemMendEvent>
    ): CancelToken;
    on(name: 'playerjoin', handler: EventHandler<PlayerJoinEvent>): CancelToken;
    on(name: 'playerkick', handler: EventHandler<PlayerKickEvent>): CancelToken;
    on(
      name: 'playerlevelchange',
      handler: EventHandler<PlayerLevelChangeEvent>
    ): CancelToken;
    on(
      name: 'playerlocalechange',
      handler: EventHandler<PlayerLocaleChangeEvent>
    ): CancelToken;
    on(
      name: 'playerlogin',
      handler: EventHandler<PlayerLoginEvent>
    ): CancelToken;
    on(name: 'playermove', handler: EventHandler<PlayerMoveEvent>): CancelToken;
    on(
      name: 'playerpickuparrow',
      handler: EventHandler<PlayerPickupArrowEvent>
    ): CancelToken;
    on(
      name: 'playerpickupitem',
      handler: EventHandler<PlayerPickupItemEvent>
    ): CancelToken;
    on(
      name: 'playerportal',
      handler: EventHandler<PlayerPortalEvent>
    ): CancelToken;
    on(
      name: 'playerprelogin',
      handler: EventHandler<PlayerPreLoginEvent>
    ): CancelToken;
    on(name: 'playerquit', handler: EventHandler<PlayerQuitEvent>): CancelToken;
    on(
      name: 'playerrecipediscover',
      handler: EventHandler<PlayerRecipeDiscoverEvent>
    ): CancelToken;
    on(
      name: 'playerregisterchannel',
      handler: EventHandler<EnchantItemEvent>
    ): CancelToken;
    on(
      name: 'playerresourcepackstatus',
      handler: EventHandler<PlayerResourcePackStatusEvent>
    ): CancelToken;
    on(
      name: 'playerrespawn',
      handler: EventHandler<PlayerRespawnEvent>
    ): CancelToken;
    on(
      name: 'playerriptide',
      handler: EventHandler<PlayerRiptideEvent>
    ): CancelToken;
    on(
      name: 'playershearentity',
      handler: EventHandler<PlayerShearEntityEvent>
    ): CancelToken;
    on(
      name: 'playerstatisticincrement',
      handler: EventHandler<PlayerStatisticIncrementEvent>
    ): CancelToken;
    on(
      name: 'playerspawnhanditems',
      handler: EventHandler<PlayerSwapHandItemsEvent>
    ): CancelToken;
    on(
      name: 'playertakelecternbook',
      handler: EventHandler<PlayerTakeLecternBookEvent>
    ): CancelToken;
    on(
      name: 'playerteleport',
      handler: EventHandler<PlayerTeleportEvent>
    ): CancelToken;
    on(
      name: 'playertoggleflight',
      handler: EventHandler<PlayerToggleFlightEvent>
    ): CancelToken;
    on(
      name: 'playertogglesprint',
      handler: EventHandler<PlayerToggleSprintEvent>
    ): CancelToken;
    on(
      name: 'playerunleashentity',
      handler: EventHandler<PlayerUnleashEntityEvent>
    ): CancelToken;
    on(
      name: 'playerunregisterchannel',
      handler: EventHandler<PlayerUnregisterChannelEvent>
    ): CancelToken;
    on(
      name: 'playervelocity',
      handler: EventHandler<PlayerVelocityEvent>
    ): CancelToken;
    on(name: 'playerquit', handler: EventHandler<PlayerQuitEvent>): CancelToken;

    // raid
    on(name: 'raidfinish', handler: EventHandler<RaidFinishEvent>): CancelToken;
    on(
      name: 'raidspawnwave',
      handler: EventHandler<RaidSpawnWaveEvent>
    ): CancelToken;
    on(name: 'raidstop', handler: EventHandler<RaidStopEvent>): CancelToken;
    on(
      name: 'raidtrigger',
      handler: EventHandler<RaidTriggerEvent>
    ): CancelToken;

    // server
    on(
      name: 'broadcastmessage',
      handler: EventHandler<BroadcastMessageEvent>
    ): CancelToken;
    on(
      name: 'mapinitialize',
      handler: EventHandler<MapInitializeEvent>
    ): CancelToken;
    on(
      name: 'plugindisable',
      handler: EventHandler<PluginDisableEvent>
    ): CancelToken;
    on(
      name: 'pluginenable',
      handler: EventHandler<PluginEnableEvent>
    ): CancelToken;
    on(
      name: 'remotecommand',
      handler: EventHandler<RemoteServerCommandEvent>
    ): CancelToken;
    on(
      name: 'servercommand',
      handler: EventHandler<ServerCommandEvent>
    ): CancelToken;
    on(
      name: 'serverlistping',
      handler: EventHandler<ServerListPingEvent>
    ): CancelToken;
    on(name: 'serverload', handler: EventHandler<ServerLoadEvent>): CancelToken;
    on(
      name: 'serviceregister',
      handler: EventHandler<ServiceRegisterEvent>
    ): CancelToken;
    on(
      name: 'serviceunregister',
      handler: EventHandler<ServiceUnregisterEvent>
    ): CancelToken;
    on(
      name: 'tabcomplete',
      handler: EventHandler<TabCompleteEvent>
    ): CancelToken;

    // vehicle
    on(
      name: 'vehicleblockcollision',
      handler: EventHandler<VehicleBlockCollisionEvent>
    ): CancelToken;
    on(
      name: 'vehiclecreate',
      handler: EventHandler<VehicleCreateEvent>
    ): CancelToken;
    on(
      name: 'vehicledamage',
      handler: EventHandler<VehicleDamageEvent>
    ): CancelToken;
    on(
      name: 'vehicledestroy',
      handler: EventHandler<VehicleDestroyEvent>
    ): CancelToken;
    on(
      name: 'vehicleenter',
      handler: EventHandler<VehicleEnterEvent>
    ): CancelToken;
    on(
      name: 'vehicleentitycollision',
      handler: EventHandler<VehicleEntityCollisionEvent>
    ): CancelToken;
    on(
      name: 'vehicleexit',
      handler: EventHandler<VehicleExitEvent>
    ): CancelToken;
    on(
      name: 'vehiclemove',
      handler: EventHandler<VehicleMoveEvent>
    ): CancelToken;
    on(
      name: 'vehicleupdate',
      handler: EventHandler<VehicleUpdateEvent>
    ): CancelToken;

    // weather
    on(
      name: 'lightningstrike',
      handler: EventHandler<LightningStrikeEvent>
    ): CancelToken;
    on(
      name: 'thunderchange',
      handler: EventHandler<ThunderChangeEvent>
    ): CancelToken;
    on(
      name: 'weatherchange',
      handler: EventHandler<WeatherChangeEvent>
    ): CancelToken;

    // world
    on(name: 'chunkload', handler: EventHandler<ChunkLoadEvent>): CancelToken;
    on(
      name: 'chunkpopulate',
      handler: EventHandler<ChunkPopulateEvent>
    ): CancelToken;
    on(
      name: 'chunkunload',
      handler: EventHandler<ChunkUnloadEvent>
    ): CancelToken;
    on(
      name: 'portalcreate',
      handler: EventHandler<PortalCreateEvent>
    ): CancelToken;
    on(
      name: 'spawnchange',
      handler: EventHandler<SpawnChangeEvent>
    ): CancelToken;
    on(
      name: 'structuregrow',
      handler: EventHandler<StructureGrowEvent>
    ): CancelToken;
    on(name: 'worldinit', handler: EventHandler<WorldInitEvent>): CancelToken;
    on(name: 'worldload', handler: EventHandler<WorldLoadEvent>): CancelToken;
    on(name: 'worldsave', handler: EventHandler<WorldSaveEvent>): CancelToken;
    on(
      name: 'worldunload',
      handler: EventHandler<WorldUnloadEvent>
    ): CancelToken;
  }

  export interface CauldronService {
    (server: Server): boolean;
  }

  interface CauldronServiceLoader {
    /**
     * Immediately loads the service to be used immediately. This is not recommend
     * in the case the service relies on external plugins a they may not have been
     * loaded yet.
     *
     * @param handler
     */
    useSync(handler: CauldronService): CauldronServiceLoader;
    /**
     * Loads the service once server initialization is complete. This is recommended
     * if you plan on relying on external plugins.
     *
     * @param handler
     */
    use(handler: CauldronService): CauldronServiceLoader;
  }

  export const NAMESPACE_KEY: NamespacedKey;
  export const events: CauldronEvents;
  export function getPlugin(name: string): Plugin;
  export const services: CauldronServiceLoader;
  export const $$cauldron$$: import('me/conji/cauldron').CauldronAPI;
  export const $$isolate$$: Isolate;
}

declare module 'me/conji/cauldron' {
  import { Runnable } from 'java/lang';
  export class Cauldron {
    static isolate(): Cauldron;
    setIsDebugging(value: boolean): void;
    getIsDebugging(): boolean;
    spawn(command: string, directory: string): string;
  }

  export interface CauldronAPI {
    isDebugging(): boolean;
    scheduleRepeatingTask(
      fn: Runnable,
      interval: number,
      timeout: number
    ): number;
    scheduleTask(fn: Runnable, timeout: number): number;
    cancelTask(id: number): void;
  }
}

declare module 'me/conji/cauldron/utils' {
  export class PathHelpers {
    static join(path1: string, ...paths: string): string;
    static exists(path1: string, ...paths: string): boolean;
    static resolveLocalPath(path1: string, ...paths: string): Path;
  }
}
