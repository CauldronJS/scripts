import { Bukkit, NamespacedKey } from 'bukkit';
import { events } from 'cauldronjs';
import DurabilityBar from './durability_bar';

export default function customItemsService() {
  const players = Bukkit.getOnlinePlayers().toArray();

  for (let i = 0; i < players.length; ++i) {
    const player = players[i];
    for (let j = 0; j < 9; ++j) {
      const key = new NamespacedKey(
        $$cauldron$$,
        `DURABILITYBAR_${player.getUniqueId().toString()}_${j}`
      );
      Bukkit.getBossBar(key)?.hide();
      Bukkit.removeBossBar(key);
    }
    // this is causing double bars, don't know why
    // const bar = DurabilityBar.getDurabilityBarFor(player);
    // bar.switchTo(player.getInventory().getHeldItemSlot());
  }

  events.on('playerjoin', (event) => {
    const bar = DurabilityBar.getDurabilityBarFor(event.getPlayer());
    bar.switchTo(event.getPlayer().getInventory().getHeldItemSlot());
  });

  events.on('playerquit', (event) => {
    const bar = DurabilityBar.getDurabilityBarFor(event.getPlayer());
    bar?.dispose();
  });

  events.on('playeritemdamage', (event) => {
    const bar = DurabilityBar.getDurabilityBarFor(event.getPlayer());
    const shouldCancel = bar.addDamage(event.getDamage());
    event.setCancelled(shouldCancel);
  });

  events.on('playeritemheld', (event) => {
    const bar = DurabilityBar.getDurabilityBarFor(event.getPlayer());
    bar.switchTo(event.getNewSlot());
  });

  events.on('playerpickupitem', (event) => {
    const bar = DurabilityBar.getDurabilityBarFor(event.getPlayer());
    setImmediate(() => {
      bar.switchTo(event.getPlayer().getInventory().getHeldItemSlot());
    });
  });

  events.on('playerdropitem', (event) => {
    const bar = DurabilityBar.getDurabilityBarFor(event.getPlayer());
    setImmediate(() => {
      bar.switchTo(event.getPlayer().getInventory().getHeldItemSlot());
    });
  });
}
