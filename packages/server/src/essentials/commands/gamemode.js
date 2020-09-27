import Rinse, { Command } from '@cauldron/rinse';
import { GameMode, Bukkit } from 'bukkit';

const setGameMode = (gameMode) => ({ sender, args }) => {
  const target = args.length === 0 ? sender : Bukkit.getPlayer(args[0]);
  if (!target) {
    throw new Error(`Cannot find player ${args[0]}`);
  }
  target.setGameMode(gameMode);
};

export const GmcCommand = () => (
  <Command
    name="gmc"
    permission="essentials.gamemode.creative"
    execute={setGameMode(GameMode.CREATIVE)}
    description="Sets a players gamemode to creative"
  />
);

export const GmsCommand = () => (
  <Command
    name="gms"
    permission="essentials.gamemode.survival"
    execute={setGameMode(GameMode.SURVIVAL)}
    description="Sets a players gamemode to survival"
  />
);

export const GmaCommand = () => (
  <Command
    name="gma"
    permission="essentials.gamemode.adventure"
    execute={setGameMode(GameMode.ADVENTURE)}
    description="Sets a players gamemode to adventure"
  />
);
