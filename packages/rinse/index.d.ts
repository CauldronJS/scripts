declare module '@cauldron/rinse' {
  import { CommandSender } from 'bukkit/command';
  import { Permission } from 'bukkit/permissions';

  export type Rinsed = {};

  export type RinsableProps = {
    children?: Rinsable | any[];
  };

  export interface Rinsable<T = any> {
    (props: RinsableProps & T);
  }

  export type CommandExecutor = {
    sender: CommandSender;
    args: any[];
  };

  export type CommandProps = {
    name: string;
    aliases?: string[];
    permission?: string | Permission;
    isForConsole?: boolean;
    isForPlayer?: boolean;
    description?: string;
    usage?: string;
    tabComplete?: (sender: CommandSender, ...args: any[]) => boolean;
    restriction?: 'none' | 'console' | 'player';
    execute: (cmd: CommandExecutor) => string;
  };

  export function Command(props: CommandProps): Rinsable;
}
