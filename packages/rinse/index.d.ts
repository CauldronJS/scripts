declare module '@cauldronjs/rinse' {
  import { CommandSender } from 'bukkit/command';
  import { Permission } from 'bukkit/permissions';
  import { Command as CauldronCommand } from 'cauldronjs';

  export type Rinsed = {};

  export type RinsableProps = {
    children?: Rinsable | any[];
  };

  export interface Rinsable<T = any> {
    (props: RinsableProps & T);
  }

  export type CommandExecutorArgs = {
    sender: CommandSender;
    args: any[];
  };

  export interface CommandExecutor {
    (cmd: CommandExecutorArgs): string | Promise<string>;
  }

  interface HelpFunction {
    (command: CauldronCommand): string | string[];
  }

  export type CommandProps = {
    name: string;
    aliases?: string[];
    permission?: string | Permission;
    isForConsole?: boolean;
    isForPlayer?: boolean;
    description?: string;
    usage?: string;
    help?: string | HelpFunction;
    tabComplete?: (sender: CommandSender, ...args: any[]) => boolean;
    restriction?: 'none' | 'console' | 'player';
    execute: CommandExecutor;
  };

  export function Command(props: CommandProps): Rinsable;

  const RinseContext: any;

  export default RinseContext;
}
