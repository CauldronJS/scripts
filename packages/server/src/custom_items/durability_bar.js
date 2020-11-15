import colors from '@cauldronjs/colors';
import { Bukkit, GameMode, Material, NamespacedKey, Sound } from 'bukkit';
import { BarColor, BarStyle } from 'bukkit/boss';
import { PersistentDataType } from 'bukkit/persistence';
import { PlayerItemBreakEvent } from 'bukkit/event/player';
import { DURABILITY_KEY } from './consts';
import { UUID } from 'java/util';
import { ItemStack } from 'bukkit/inventory';

/**
 * @type {Map<UUID, DurabilityBar>}
 */
const playerDurabilityBars = new Map();

const createBossBar = (playerId, index) =>
  Bukkit.createBossBar(
    new NamespacedKey(
      $$cauldron$$,
      `DURABILITYBAR_${playerId.toString()}_${index}`
    ),
    '',
    BarColor.GREEN,
    BarStyle.SOLID
  );

export default class DurabilityBar {
  /**
   *
   * @param {import('bukkit/entity').Player} player
   */
  constructor(player) {
    this.player = player;
    this.playerId = player.getUniqueId();
    this.bars = [];
    for (let i = 0; i < 9; ++i) {
      const bar = createBossBar(this.playerId, i);
      bar.addPlayer(player);
      this.bars.push(bar);
    }
    this.activeIndex = -1;
  }

  /**
   *
   * @param {number} index
   */
  switchTo(index) {
    this.bars.forEach((bar) => {
      bar?.hide();
    });
    const bar = this.bars[index];
    this.activeIndex = index;
    const itemStack = this.player.getInventory().getContents()[index];
    if (!itemStack) {
      bar?.hide();
      return;
    }
    const meta = itemStack.getItemMeta();
    if (!bar) {
      return;
    }
    if (!meta.getDamage || itemStack.getType().getMaxDurability() === 0) {
      // this item isn't damageable, hide
      bar.hide();
      return;
    }
    if (!meta.isUnbreakable()) {
      // adjust for it
      this.addDamage(0);
    }
  }

  addDamage(damage = 1) {
    const itemStack = this.player.getInventory().getContents()[
      this.activeIndex
    ];
    const bar = this.bars[this.activeIndex];
    if (!itemStack) {
      return false;
    }
    const maxDurability = itemStack.getType().getMaxDurability();
    const newDamage = getStoredDamage(itemStack.getItemMeta()) + damage;

    if (newDamage > maxDurability) {
      const event = new PlayerItemBreakEvent(this.player, itemStack);
      Bukkit.getPluginManager().callEvent(event);
      if (!event.isCancelled?.()) {
        this.player.getInventory().setItem(this.activeIndex, null);
        this.player.playSound(
          this.player.getLocation(),
          Sound.ITEM_SHIELD_BREAK,
          1,
          1
        );
        bar.hide();
      }
      return true;
    }
    const itemMeta = updateDamage(
      itemStack.getItemMeta(),
      newDamage,
      maxDurability
    );
    itemStack.setItemMeta(itemMeta);
    bar.setTitle(getBarTitle(maxDurability - newDamage, maxDurability));
    // bar.setProgress(Math.floor((newDamage / maxDurability) * 100));
    bar.show();
    return true;
  }

  static getDurabilityBarFor(player) {
    const bar =
      playerDurabilityBars.get(player.getUniqueId()) ||
      new DurabilityBar(player);
    playerDurabilityBars.set(player.getUniqueId(), bar);
    return bar;
  }

  dispose() {
    playerDurabilityBars.delete(this.playerId);
  }
}

function getStoredDamage(meta) {
  return (
    meta
      .getPersistentDataContainer()
      .get(DURABILITY_KEY, PersistentDataType.INTEGER) || meta.getDamage() + 0
  );
}

/**
 *
 * @param {import('bukkit/inventory/meta').ItemMeta} meta
 * @param {number} newDamage
 * @param {number} maxDurability
 */
function updateDamage(meta, newDamage, maxDurability) {
  meta
    .getPersistentDataContainer()
    .set(DURABILITY_KEY, PersistentDataType.INTEGER, newDamage);
  const lore = Array.from(meta.getLore()?.toArray() || []).filter(
    (line) => !line.startsWith('Damage:')
  );
  meta.setLore([
    `Damage: ${maxDurability - newDamage}/${maxDurability}`,
    ...lore,
  ]);
  return meta;
}

function getBarTitle(currentDurability, maxDurability) {
  return `${currentDurability}/${maxDurability}`;
}
