const {
  BlockBreakEvent,
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
  BlockRedstoneEvent,
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
} = require('bukkit/event/block');
const {
  EnchantItemEvent,
  PrepareItemEnchantEvent,
} = require('bukkit/event/enchantment');
const {
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
  EntityTargetLivingEntityEvent,
  EntityTeleportEvent,
  EntityToggleGlideEvent,
  EntityToggleSwimEvent,
  EntityTransformEvent,
  EntityUnleashEvent,
  ExpBottleEvent,
  ExplosionPrimeEvent,
  FireworkExplodeEvent,
  FoodLevelChangeEvent,
  HorseJumpEvent,
  ItemDespawnEvent,
  ItemMergeEvent,
  ItemSpawnEvent,
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
} = require('bukkit/event/entity');
const {
  HangingBreakByEntityEvent,
  HangingBreakEvent,
  HangingPlaceEvent,
} = require('bukkit/event/hanging');
const {
  BrewingStandFuelEvent,
  CraftItemEvent,
  FurnaceBurnEvent,
  FurnaceExtractEvent,
  FurnaceSmeltEvent,
  InventoryClickEvent,
  InventoryCloseEvent,
  InventoryCreativeEvent,
  InventoryDragEvent,
  InventoryInteractEvent,
  InventoryMoveItemEvent,
  InventoryOpenEvent,
  InventoryPickupItemEvent,
  PrepareAnvilEvent,
  PrepareItemCraftEvent,
  TradeSelectEvent,
} = require('bukkit/event/inventory');
const {
  PlayerAdvancementDoneEvent,
  PlayerAnimationEvent,
  PlayerArmorStandManipulateEvent,
  PlayerBedEnterEvent,
  PlayerBedLeaveEvent,
  PlayerBucketEmptyEvent,
  PlayerBucketFillEvent,
  PlayerChangedMainHandEvent,
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
  PlayerInteractEntityEvent,
  PlayerInteractEvent,
  PlayerItemBreakEvent,
  PlayerItemConsumeEvent,
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
  PlayerPickupItemEvent,
  PlayerPortalEvent,
  PlayerPreLoginEvent,
  PlayerQuitEvent,
  PlayerRecipeDiscoverEvent,
  PlayerRegisterChannelEvent,
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
  PlayerToggleSneakEvent,
  PlayerUnleashEntityEvent,
  PlayerUnregisterChannelEvent,
  PlayerVelocityEvent,
} = require('bukkit/event/player');
const {
  RaidFinishEvent,
  RaidSpawnWaveEvent,
  RaidStopEvent,
  RaidTriggerEvent,
} = require('bukkit/event/raid');
const {
  BroadcastMessageEvent,
  MapInitializeEvent,
  PluginDisableEvent,
  PluginEnableEvent,
  RemoteServerCommandEvent,
  ServerCommandEvent,
  ServerListPingEvent,
  ServerLoadEvent,
  ServiceRegisterEvent,
  ServiceUnregisterEvent,
  TabCompleteEvent,
} = require('bukkit/event/server');
const {
  VehicleBlockCollisionEvent,
  VehicleCreateEvent,
  VehicleDamageEvent,
  VehicleDestroyEvent,
  VehicleEnterEvent,
  VehicleEntityCollisionEvent,
  VehicleExitEvent,
  VehicleMoveEvent,
  VehicleUpdateEvent,
} = require('bukkit/event/vehicle');
const {
  LightningStrikeEvent,
  ThunderChangeEvent,
  WeatherChangeEvent,
} = require('bukkit/event/weather');
const {
  ChunkLoadEvent,
  ChunkPopulateEvent,
  ChunkUnloadEvent,
  PortalCreateEvent,
  SpawnChangeEvent,
  StructureGrowEvent,
  WorldInitEvent,
  WorldLoadEvent,
  WorldSaveEvent,
  WorldUnloadEvent,
} = require('bukkit/event/world');
const { codes: errors } = require('errors');

const BukkitBridge = internalBinding('BukkitBridge');

const registeredListeners = Object.create(null);
const registerEvent = (type, handler) => {
  if (!type.class.getName || typeof type.class.getName !== 'function') {
    console.error(`Invalid type ${type}`);
    return;
  }
  BukkitBridge.registerNewEventHandler($$cauldron$$, type.class, (event) => {
    try {
      const result = handler(event);
      if (event.setCancelled && result === false) {
        event.setCancelled(true);
      }
      return !!result;
    } catch (err) {
      // fail gracefully
      console.log(
        `An error occured when calling event of type ${type}: ${err}`
      );
      console.trace(err);
      return true;
    }
  });
};

class CancelToken {
  constructor(listener, eventName) {
    this._baseToken = new java.lang.Object();
    this.listener = listener;
    this.eventName = eventName;
  }

  equals(compare) {
    return compare._baseToken === this._baseToken;
  }

  unregister() {
    const callbacks = this.listener.callbacks[this.eventName];
    for (let i = 0; i < callbacks.length; ++i) {
      const callback = callbacks[i];
      if (this.equals(callback.cancelToken)) {
        callbacks.splice(i, 1);
        return;
      }
    }
  }

  cancel() {
    this.unregister();
  }
}

class SpigotEmitter {
  constructor(name) {
    this.registeredEventClasses = {};
    this.callbacks = Object.create(null);
    this._linkedTypes = Object.create(null);
    registeredListeners[name] = this;
  }

  on(event, callback) {
    if (!event) {
      throw new errors.ERR_INVALID_ARG_VALUE(
        'event',
        event,
        'event name cannot be empty'
      );
    }
    const levent = event.toLowerCase();
    if (!this.callbacks[levent]) {
      this.callbacks[levent] = [];
    }
    const cancelToken = new CancelToken(this, levent);
    callback.cancelToken = cancelToken;
    this.callbacks[levent].push(callback);
    return cancelToken;
  }

  once(event, callback) {
    if (!event) {
      throw new errors.ERR_INVALID_ARG_VALUE(
        'event',
        event,
        'event name cannot be empty'
      );
    }
    const levent = event.toLowerCase();
    if (!this.callbacks[levent]) {
      this.callbacks[levent] = [];
      registerEvent(levent, (event) => this.invoke(levent, event));
    }
    const cancelToken = new CancelToken(this, levent);
    const onceCallback = (...args) => {
      callback(...args);
      cancelToken.unregister();
    };
    onceCallback.cancelToken = cancelToken;
    this.callbacks[levent].push(onceCallback);
    return cancelToken;
  }

  invoke(event, ...args) {
    if (!event) {
      throw new errors.ERR_INVALID_ARG_VALUE(
        'event',
        event,
        'event name cannot be empty'
      );
    }
    const callbacks = this.callbacks[event.toLowerCase()];
    if (!callbacks || callbacks.length === 0) return;
    callbacks.forEach((callback) => callback(...args));
  }

  emit(event, ...args) {
    this.invoke(event.toLowerCase(), args);
  }

  registerEvent(name, eventType) {
    if (!eventType) {
      console.error(`Failed to register handler for type ${name}`);
      return this;
    }
    const lname = name.toLowerCase();
    this.registeredEventClasses[lname] = eventType;
    registerEvent(eventType, (event) => this.invoke(lname, event));
    return this;
  }
}

const serverEmitter = new SpigotEmitter(Symbol('spigot'));

function registerEventType(eventTypes) {
  for (const name in eventTypes) {
    serverEmitter.registerEvent(name, eventTypes[name]);
  }
}

registerEventType({
  // blocks
  blockbreak: BlockBreakEvent,
  blockplace: BlockPlaceEvent,
  blockcanbuild: BlockCanBuildEvent,
  blockcook: BlockCookEvent,
  blockdamage: BlockDamageEvent,
  blockdispensearmor: BlockDispenseArmorEvent,
  blockdispense: BlockDispenseEvent,
  blockdropitem: BlockDropItemEvent,
  blockexp: BlockExpEvent,
  blockexplode: BlockExplodeEvent,
  blockfade: BlockFadeEvent,
  blockfertilize: BlockFertilizeEvent,
  blockform: BlockFormEvent,
  blockfromto: BlockFromToEvent,
  blockgrow: BlockGrowEvent,
  blockignite: BlockIgniteEvent,
  blockmultiplace: BlockMultiPlaceEvent,
  blockphysics: BlockPhysicsEvent,
  blockpistonextend: BlockPistonExtendEvent,
  blockpistonretract: BlockPistonRetractEvent,
  blockredstone: BlockRedstoneEvent,
  blockshearentity: BlockShearEntityEvent,
  blockspread: BlockSpreadEvent,
  cauldronlevelchange: CauldronLevelChangeEvent,
  blockentityform: EntityBlockFormEvent,
  fluidlevelchange: FluidLevelChangeEvent,
  leavesdecay: LeavesDecayEvent,
  moisturechange: MoistureChangeEvent,
  noteplay: NotePlayEvent,
  signchange: SignChangeEvent,
  spongeabsorb: SpongeAbsorbEvent,
  // enchantments
  enchant: EnchantItemEvent,
  prepareenchant: PrepareItemEnchantEvent,
  // entities
  areaeffectcloudapply: AreaEffectCloudApplyEvent,
  battogglesleep: BatToggleSleepEvent,
  creaturespawn: CreatureSpawnEvent,
  creeperpower: CreeperPowerEvent,
  enderdragonchangephase: EnderDragonChangePhaseEvent,
  entityairchange: EntityAirChangeEvent,
  entitybreakdoor: EntityBreakDoorEvent,
  entitybreed: EntityBreedEvent,
  entitychangeblock: EntityChangeBlockEvent,
  entitycombustbyblock: EntityCombustByBlockEvent,
  entitycombustbyentity: EntityCombustByEntityEvent,
  entitycombust: EntityCombustEvent,
  entitycreateportal: EntityCreatePortalEvent,
  entitydamagebyblock: EntityDamageByBlockEvent,
  entitydamagebyentity: EntityDamageByEntityEvent,
  entitydamage: EntityDamageEvent,
  entitydeath: EntityDeathEvent,
  entitydropitem: EntityDropItemEvent,
  entityexplode: EntityExplodeEvent,
  entityinteract: EntityInteractEvent,
  entitypickupitem: EntityPickupItemEvent,
  entityplace: EntityPlaceEvent,
  entityportalenter: EntityPortalEnterEvent,
  entityportal: EntityPortalEvent,
  entityportalexit: EntityPortalExitEvent,
  entityposechange: EntityPoseChangeEvent,
  entitypotioneffect: EntityPotionEffectEvent,
  entityregainhealth: EntityRegainHealthEvent,
  entityresurrect: EntityResurrectEvent,
  entityshootbow: EntityShootBowEvent,
  entityspawn: EntitySpawnEvent,
  entitytame: EntityTameEvent,
  entitytarget: EntityTargetEvent,
  entitytargetlivingentity: EntityTargetLivingEntityEvent,
  entityteleport: EntityTeleportEvent,
  entitytoggleglide: EntityToggleGlideEvent,
  entitytoggleswim: EntityToggleSwimEvent,
  entitytransform: EntityTransformEvent,
  entityunleash: EntityUnleashEvent,
  expbottle: ExpBottleEvent,
  explosionprime: ExplosionPrimeEvent,
  fireworkexplode: FireworkExplodeEvent,
  foodlevelchange: FoodLevelChangeEvent,
  horsejump: HorseJumpEvent,
  itemdespawn: ItemDespawnEvent,
  itemmerge: ItemMergeEvent,
  itemspawn: ItemSpawnEvent,
  lingeringpotionsplash: LingeringPotionSplashEvent,
  pigzap: PigZapEvent,
  pigzombieanger: PigZombieAngerEvent,
  playerdeath: PlayerDeathEvent,
  playerleashentity: PlayerLeashEntityEvent,
  potionsplash: PotionSplashEvent,
  projectilehit: ProjectileHitEvent,
  projectilelaunch: ProjectileLaunchEvent,
  sheepdyewool: SheepDyeWoolEvent,
  sheepregrowwool: SheepRegrowWoolEvent,
  slimesplit: SlimeSplitEvent,
  spawnerspawn: SpawnerSpawnEvent,
  villageracquiretrade: VillagerAcquireTradeEvent,
  villagercareerchange: VillagerCareerChangeEvent,
  villagerreplenishtrade: VillagerReplenishTradeEvent,
  // hanging
  hangingbreakbyentity: HangingBreakByEntityEvent,
  hangingbreak: HangingBreakEvent,
  hangingplace: HangingPlaceEvent,
  // inventory
  brewingstandfuel: BrewingStandFuelEvent,
  craftitem: CraftItemEvent,
  furnaceburn: FurnaceBurnEvent,
  furnaceextract: FurnaceExtractEvent,
  furnacesmelt: FurnaceSmeltEvent,
  inventoryclick: InventoryClickEvent,
  inventoryclose: InventoryCloseEvent,
  inventorycreative: InventoryCreativeEvent,
  inventorydrag: InventoryDragEvent,
  inventoryinteract: InventoryInteractEvent,
  inventorymoveitem: InventoryMoveItemEvent,
  inventoryopen: InventoryOpenEvent,
  inventorypickupitem: InventoryPickupItemEvent,
  prepareanvil: PrepareAnvilEvent,
  prepareitemcraft: PrepareItemCraftEvent,
  tradeselect: TradeSelectEvent,
  // player
  playeradvancementdone: PlayerAdvancementDoneEvent,
  playeranimation: PlayerAnimationEvent,
  playerarmorstandmanipulate: PlayerArmorStandManipulateEvent,
  playerbedenter: PlayerBedEnterEvent,
  playerbedleave: PlayerBedLeaveEvent,
  playerbucketempty: PlayerBucketEmptyEvent,
  playerbucketfill: PlayerBucketFillEvent,
  playerchangedmainhand: PlayerChangedMainHandEvent,
  playerchangedworld: PlayerChangedWorldEvent,
  playerchannel: PlayerChannelEvent,
  playerchat: PlayerChatEvent,
  playerchattabcomplete: PlayerChatTabCompleteEvent,
  playercommandpreprocess: PlayerCommandPreprocessEvent,
  playercommandsend: PlayerCommandSendEvent,
  playerdropitem: PlayerDropItemEvent,
  playereditbook: PlayerEditBookEvent,
  playereggthrow: PlayerEggThrowEvent,
  playerexpchange: PlayerExpChangeEvent,
  playerfish: PlayerFishEvent,
  playergamemodechange: PlayerGameModeChangeEvent,
  playerinteractatentity: PlayerInteractAtEntityEvent,
  playerinteractentity: PlayerInteractEntityEvent,
  playerinteract: PlayerInteractEvent,
  playeritembreak: PlayerItemBreakEvent,
  playeritemconsume: PlayerItemConsumeEvent,
  playeritemdamage: PlayerItemDamageEvent,
  playeritemheld: PlayerItemHeldEvent,
  playeritemmend: PlayerItemMendEvent,
  playerjoin: PlayerJoinEvent,
  playerkick: PlayerKickEvent,
  playerlevelchange: PlayerLevelChangeEvent,
  playerlocalechange: PlayerLocaleChangeEvent,
  playerlogin: PlayerLoginEvent,
  playermove: PlayerMoveEvent,
  playerpickuparrow: PlayerPickupArrowEvent,
  playerpickupitem: PlayerPickupItemEvent,
  playerportal: PlayerPortalEvent,
  playerprelogin: PlayerPreLoginEvent,
  playerquit: PlayerQuitEvent,
  playerrecipediscover: PlayerRecipeDiscoverEvent,
  playerregisterchannel: PlayerRegisterChannelEvent,
  playerresourcepackstatus: PlayerResourcePackStatusEvent,
  playerrespawn: PlayerRespawnEvent,
  playerriptide: PlayerRiptideEvent,
  playershearentity: PlayerShearEntityEvent,
  playerstatisticincrement: PlayerStatisticIncrementEvent,
  playerswaphanditems: PlayerSwapHandItemsEvent,
  playertakelecternbook: PlayerTakeLecternBookEvent,
  playerteleport: PlayerTeleportEvent,
  playertoggleflight: PlayerToggleFlightEvent,
  playertogglesprint: PlayerToggleSprintEvent,
  playertogglesneak: PlayerToggleSneakEvent,
  playerunleashentity: PlayerUnleashEntityEvent,
  playerunregisterchannel: PlayerUnregisterChannelEvent,
  playervelocity: PlayerVelocityEvent,
  // raid
  raidfinish: RaidFinishEvent,
  raidspawnwave: RaidSpawnWaveEvent,
  raidstop: RaidStopEvent,
  raidtrigger: RaidTriggerEvent,
  // server
  broadcastmessage: BroadcastMessageEvent,
  mapinitialize: MapInitializeEvent,
  plugindisable: PluginDisableEvent,
  pluginenable: PluginEnableEvent,
  remotecommand: RemoteServerCommandEvent,
  servercommand: ServerCommandEvent,
  serverlistping: ServerListPingEvent,
  serverload: ServerLoadEvent,
  serviceregister: ServiceRegisterEvent,
  serviceunregister: ServiceUnregisterEvent,
  tabcomplete: TabCompleteEvent,
  // vehicle
  vehicleblockcollision: VehicleBlockCollisionEvent,
  vehiclecreate: VehicleCreateEvent,
  vehicledamage: VehicleDamageEvent,
  vehicledestroy: VehicleDestroyEvent,
  vehicleenter: VehicleEnterEvent,
  vehicleentitycollision: VehicleEntityCollisionEvent,
  vehicleexit: VehicleExitEvent,
  vehiclemove: VehicleMoveEvent,
  vehicleupdate: VehicleUpdateEvent,
  // weather
  lightningstrike: LightningStrikeEvent,
  thunderchange: ThunderChangeEvent,
  weatherchange: WeatherChangeEvent,
  // world
  chunkload: ChunkLoadEvent,
  chunkpopulate: ChunkPopulateEvent,
  chunkunload: ChunkUnloadEvent,
  portalcreate: PortalCreateEvent,
  spawnchange: SpawnChangeEvent,
  structuregrow: StructureGrowEvent,
  worldinit: WorldInitEvent,
  worldload: WorldLoadEvent,
  worldsave: WorldSaveEvent,
  worldunload: WorldUnloadEvent,
});

module.exports = serverEmitter;
