import Rinse, { Command } from '@cauldronjs/rinse';
import colors from '@cauldronjs/colors';
import { GameMode, Bukkit } from 'bukkit';

const setGameMode = (gameMode) => ({ sender, args }) => {
  const target = args.length === 0 ? sender : Bukkit.getPlayer(args[0]);
  if (!target) {
    throw new Error(`Cannot find player ${args[0]}`);
  }
  target.setGameMode(gameMode);
  return colors.green(`Gamemode switched to ${gameMode}`);
};

export const GmcCommand = () => (
  <Command
    name="gmc"
    usage="/<command [player]"
    permission="essentials.gamemode.creative"
    execute={setGameMode(GameMode.CREATIVE)}
    description="Sets a players gamemode to creative"
  />
);

export const GmsCommand = () => (
  <Command
    name="gms"
    usage="/<command [player]"
    permission="essentials.gamemode.survival"
    execute={setGameMode(GameMode.SURVIVAL)}
    description="Sets a players gamemode to survival"
  />
);

export const GmaCommand = () => (
  <Command
    name="gma"
    usage="/<command [player]"
    permission="essentials.gamemode.adventure"
    execute={setGameMode(GameMode.ADVENTURE)}
    description="Sets a players gamemode to adventure"
  />
);
