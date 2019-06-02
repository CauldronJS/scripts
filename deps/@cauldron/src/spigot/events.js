/* eslint-disable standard/no-callback-literal */
import {
  BlockBreakEvent,
  BlockPlaceEvent,
  BlockCanBuildEvent,
  BlockDamageEvent,
  BlockDispenseEvent,
  BlockExpEvent,
  BlockExplodeEvent,
  BlockFadeEvent,
  BlockFormEvent,
  BlockFromToEvent,
  BlockGrowEvent,
  BlockIgniteEvent,
  BlockMultiPlaceEvent,
  BlockPhysicsEvent,
  BlockPistonExtendEvent,
  BlockPistonRetractEvent,
  BlockRedstoneEvent,
  BlockSpreadEvent,
  CauldronLevelChangeEvent,
  EntityBlockFormEvent,
  FluidLevelChangeEvent,
  LeavesDecayEvent,
  MoistureChangeEvent,
  NotePlayEvent,
  SignChangeEvent,
  SpongeAbsorbEvent
} from '@java/org.bukkit.event.block';
import {
  EnchantItemEvent,
  PrepareItemEnchantEvent
} from '@java/org.bukkit.event.enchantment';
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
  VillagerReplenishTradeEvent
} from '@java/org.bukkit.event.entity';
import {
  HangingBreakByEntityEvent,
  HangingBreakEvent,
  HangingPlaceEvent
} from '@java/org.bukkit.event.hanging';
import {
  BrewingStandFuelEvent,
  CraftItemEvent,
  FurnaceBurnEvent,
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
  PrepareItemCraftEvent
} from '@java/org.bukkit.event.inventory';
import {
  PlayerAchievementAwardedEvent,
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
  PlayerTeleportEvent,
  PlayerToggleFlightEvent,
  PlayerToggleSprintEvent,
  PlayerUnleashEntityEvent,
  PlayerUnregisterChannelEvent,
  PlayerVelocityEvent
} from '@java/org.bukkit.event.player';
import {
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
  TabCompleteEvent
} from '@java/org.bukkit.event.server';
import {
  VehicleBlockCollisionEvent,
  VehicleCreateEvent,
  VehicleDamageEvent,
  VehicleDestroyEvent,
  VehicleEnterEvent,
  VehicleEntityCollisionEvent,
  VehicleExitEvent,
  VehicleMoveEvent,
  VehicleUpdateEvent
} from '@java/org.bukkit.event.vehicle';
import {
  LightningStrikeEvent,
  ThunderChangeEvent,
  WeatherChangeEvent
} from '@java/org.bukkit.event.weather';
import {
  ChunkLoadEvent,
  ChunkPopulateEvent,
  ChunkUnloadEvent,
  PortalCreateEvent,
  SpawnChangeEvent,
  StructureGrowEvent,
  WorldInitEvent,
  WorldLoadEvent,
  WorldSaveEvent,
  WorldUnloadEvent
} from '@java/org.bukkit.event.world';
import { codes as errors } from 'errors';

const registeredListeners = Object.create(null);
const registerEvent = (type, handler) => {
  if (!type.class.getName || typeof type.class.getName !== 'function') {
    console.error(`Invalid type ${type}`);
    return;
  }
  __cauldron__.registerNewEventHandler(type.class.getName(), (...args) => {
    try {
      return handler(...args);
    } catch (err) {
      // fail gracefully
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
      registerEvent(levent, event => this.invoke(levent, event));
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
    callbacks.forEach(callback => callback(...args));
  }

  emit(event, ...args) {
    this.invoke(event.toLowerCase(), args);
  }

  registerEvent(name, eventType) {
    const lname = name.toLowerCase();
    this.registeredEventClasses[lname] = eventType;
    registerEvent(eventType, event => this.invoke(lname, event));
    return this;
  }
}

export function registerNewListener(name, eventTypes) {
  if (!name || name.length === 0 || typeof name !== 'string') {
    throw new errors.ERR_INVALID_ARG_VALUE(
      'name',
      name,
      'listener name cannot be empty'
    );
  }

  const listener = new SpigotEmitter(name);
  if (eventTypes) {
    // eslint-disable-next-line prefer-const
    for (let prop in eventTypes) {
      if (!eventTypes.hasOwnProperty(prop)) continue;
      const value = eventTypes[prop];
      listener.registerEvent(prop, value);
    }
  }

  return listener;
}

export function eventHandler(listenerName, event, callback) {
  if (!registeredListeners[listenerName]) return null;
  const listener = registeredListeners[listenerName];
  return listener.on(event, callback);
}

export const block = registerNewListener('block', {
  break: BlockBreakEvent,
  place: BlockPlaceEvent,
  canbuild: BlockCanBuildEvent,
  damage: BlockDamageEvent,
  dispense: BlockDispenseEvent,
  exp: BlockExpEvent,
  explode: BlockExplodeEvent,
  fade: BlockFadeEvent,
  form: BlockFormEvent,
  fromto: BlockFromToEvent,
  grow: BlockGrowEvent,
  ignite: BlockIgniteEvent,
  multiplace: BlockMultiPlaceEvent,
  physics: BlockPhysicsEvent,
  pistonextend: BlockPistonExtendEvent,
  pistonretract: BlockPistonRetractEvent,
  redstone: BlockRedstoneEvent,
  spread: BlockSpreadEvent,
  cauldronlevelchange: CauldronLevelChangeEvent,
  entityform: EntityBlockFormEvent,
  fluidlevelchange: FluidLevelChangeEvent,
  leavesdecay: LeavesDecayEvent,
  moisturechange: MoistureChangeEvent,
  noteplay: NotePlayEvent,
  signchange: SignChangeEvent,
  spongeabsorb: SpongeAbsorbEvent
});

export const enchantment = registerNewListener('enchantment', {
  enchant: EnchantItemEvent,
  prepare: PrepareItemEnchantEvent
});

export const entity = registerNewListener('entity', {
  areaeffectcloudapply: AreaEffectCloudApplyEvent,
  battogglesleep: BatToggleSleepEvent,
  creaturespawn: CreatureSpawnEvent,
  creeperpower: CreeperPowerEvent,
  enderdragonchangephase: EnderDragonChangePhaseEvent,
  airchange: EntityAirChangeEvent,
  breakdoor: EntityBreakDoorEvent,
  breed: EntityBreedEvent,
  changeblock: EntityChangeBlockEvent,
  combustbyblock: EntityCombustByBlockEvent,
  combustbyentity: EntityCombustByEntityEvent,
  combust: EntityCombustEvent,
  createportal: EntityCreatePortalEvent,
  damagebyblock: EntityDamageByBlockEvent,
  damagebyentity: EntityDamageByEntityEvent,
  damage: EntityDamageEvent,
  death: EntityDeathEvent,
  dropitem: EntityDropItemEvent,
  explode: EntityExplodeEvent,
  interact: EntityInteractEvent,
  pickupitem: EntityPickupItemEvent,
  place: EntityPlaceEvent,
  portalenter: EntityPortalEnterEvent,
  portal: EntityPortalEvent,
  portalexit: EntityPortalExitEvent,
  potioneffect: EntityPotionEffectEvent,
  regainhealth: EntityRegainHealthEvent,
  resurrect: EntityResurrectEvent,
  shootbow: EntityShootBowEvent,
  spawn: EntitySpawnEvent,
  tame: EntityTameEvent,
  target: EntityTargetEvent,
  targetlivingentity: EntityTargetLivingEntityEvent,
  teleport: EntityTeleportEvent,
  toggleglide: EntityToggleGlideEvent,
  toggleswim: EntityToggleSwimEvent,
  transform: EntityTransformEvent,
  unleash: EntityUnleashEvent,
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
  villageraquiretrade: VillagerAcquireTradeEvent,
  villagerreplenishtrade: VillagerReplenishTradeEvent
});

export const hanging = registerNewListener('hanging', {
  breakbyentity: HangingBreakByEntityEvent,
  break: HangingBreakEvent,
  place: HangingPlaceEvent
});

export const inventory = registerNewListener('inventory', {
  brewingstandfuel: BrewingStandFuelEvent,
  craftitem: CraftItemEvent,
  furnaceburn: FurnaceBurnEvent,
  furnacesmelt: FurnaceSmeltEvent,
  click: InventoryClickEvent,
  close: InventoryCloseEvent,
  creative: InventoryCreativeEvent,
  drag: InventoryDragEvent,
  interact: InventoryInteractEvent,
  moveitem: InventoryMoveItemEvent,
  open: InventoryOpenEvent,
  pickupitem: InventoryPickupItemEvent,
  prepareanvil: PrepareAnvilEvent,
  prepareitemcraft: PrepareItemCraftEvent
});

export const player = registerNewListener('player', {
  achievementawarded: PlayerAchievementAwardedEvent,
  advancementdone: PlayerAdvancementDoneEvent,
  animation: PlayerAnimationEvent,
  armorstandmanipulate: PlayerArmorStandManipulateEvent,
  bedenter: PlayerBedEnterEvent,
  bedleave: PlayerBedLeaveEvent,
  bucketempty: PlayerBucketEmptyEvent,
  bucketfill: PlayerBucketFillEvent,
  changedmainhand: PlayerChangedMainHandEvent,
  changedworld: PlayerChangedWorldEvent,
  channel: PlayerChannelEvent,
  chat: PlayerChatEvent,
  chattabcomplete: PlayerChatTabCompleteEvent,
  commandpreprocess: PlayerCommandPreprocessEvent,
  commandsend: PlayerCommandSendEvent,
  dropitem: PlayerDropItemEvent,
  editbook: PlayerEditBookEvent,
  eggthrow: PlayerEggThrowEvent,
  expchange: PlayerExpChangeEvent,
  fish: PlayerFishEvent,
  gamemodechange: PlayerGameModeChangeEvent,
  interactatentity: PlayerInteractAtEntityEvent,
  interactentity: PlayerInteractEntityEvent,
  interact: PlayerInteractEvent,
  itembreak: PlayerItemBreakEvent,
  itemconsume: PlayerItemConsumeEvent,
  itemdamage: PlayerItemDamageEvent,
  itemheld: PlayerItemHeldEvent,
  itemmend: PlayerItemMendEvent,
  join: PlayerJoinEvent,
  kick: PlayerKickEvent,
  levelchange: PlayerLevelChangeEvent,
  localechange: PlayerLocaleChangeEvent,
  login: PlayerLoginEvent,
  move: PlayerMoveEvent,
  pickuparrow: PlayerPickupArrowEvent,
  pickupitem: PlayerPickupItemEvent,
  portal: PlayerPortalEvent,
  prelogin: PlayerPreLoginEvent,
  quit: PlayerQuitEvent,
  recipediscover: PlayerRecipeDiscoverEvent,
  registerchannel: PlayerRegisterChannelEvent,
  resourcepackstatus: PlayerResourcePackStatusEvent,
  respawn: PlayerRespawnEvent,
  riptide: PlayerRiptideEvent,
  shearentity: PlayerShearEntityEvent,
  statisticincrement: PlayerStatisticIncrementEvent,
  swaphanditems: PlayerSwapHandItemsEvent,
  teleport: PlayerTeleportEvent,
  toggleflight: PlayerToggleFlightEvent,
  togglesprint: PlayerToggleSprintEvent,
  unleashentity: PlayerUnleashEntityEvent,
  unregisterchannel: PlayerUnregisterChannelEvent,
  velocity: PlayerVelocityEvent
});

export const server = registerNewListener('server', {
  broadcastmessage: BroadcastMessageEvent,
  mapinitialize: MapInitializeEvent,
  plugindisable: PluginDisableEvent,
  pluginenable: PluginEnableEvent,
  remotecommand: RemoteServerCommandEvent,
  command: ServerCommandEvent,
  listping: ServerListPingEvent,
  load: ServerLoadEvent,
  serviceregister: ServiceRegisterEvent,
  serviceunregister: ServiceUnregisterEvent,
  tabcomplete: TabCompleteEvent
});

export const vehicle = registerNewListener('vehicle', {
  blockcollision: VehicleBlockCollisionEvent,
  create: VehicleCreateEvent,
  damage: VehicleDamageEvent,
  destroy: VehicleDestroyEvent,
  enter: VehicleEnterEvent,
  entitycollision: VehicleEntityCollisionEvent,
  exit: VehicleExitEvent,
  move: VehicleMoveEvent,
  update: VehicleUpdateEvent
});

export const weather = registerNewListener('weather', {
  lightningstrike: LightningStrikeEvent,
  thunderchange: ThunderChangeEvent,
  change: WeatherChangeEvent
});

export const world = registerNewListener('world', {
  chunkload: ChunkLoadEvent,
  chunkpopulate: ChunkPopulateEvent,
  chunkunload: ChunkUnloadEvent,
  portalcreate: PortalCreateEvent,
  spawnchange: SpawnChangeEvent,
  structuregrow: StructureGrowEvent,
  init: WorldInitEvent,
  load: WorldLoadEvent,
  save: WorldSaveEvent,
  unload: WorldUnloadEvent
});
