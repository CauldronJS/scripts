import { BlockBreakEvent, BlockPlaceEvent, BlockCanBuildEvent } from 'bukkit/event/block';

declare module 'cauldron' {
  import { BukkitPlugin } from 'bukkit/plugin/java';
  import { NamespacedKey } from 'bukkit';
  import { EventEmitter } from 'events';
  export interface Command {
    registerCommand(name: string): void;
  }

  interface CancelToken {
    equals(compare: object): boolean;
    unregister(): void;
    cancel(): void;
  }

  interface CauldronEvents extends EventEmitter {
    on(name: 'blockbreak', handler: (event: BlockBreakEvent) => boolean?): CancelToken;
    on(name: 'blockplace', handler: (event: BlockPlaceEvent) => boolean?): CancelToken;
    on(name: 'blockcanbuild', handler: (event: BlockCanBuildEvent) => boolean?): CancelToken;
    on(name: 'playerjoin', handler: (event: Event) => boolean?): CancelToken;
  }

  export const NAMESPACE_KEY: NamespacedKey;
  export const events: CauldronEvents;
  export function getPlugin(name: string): BukkitPlugin;

  export default {
    Command,
    NAMESPACE_KEY,
    events,
    getPlugin
  };
}
