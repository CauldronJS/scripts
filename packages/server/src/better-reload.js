import Rinse, { Command } from '@cauldronjs/rinse';
import colors from '@cauldronjs/colors';
import cauldron from 'cauldronjs';
import { Bukkit } from 'bukkit';

function executeReload({ sender }) {
  sender.sendMessage(
    colors.red(
      'Please note that this command is not supported and may cause issues when using some plugins.'
    )
  );
  sender.sendMessage(
    colors.red(
      'If you encounter any issues, please use the /stop command to restart your server.'
    )
  );
  Bukkit.reload();
}

function executeReloadJs({ sender }) {
  cauldron.reload(sender);
}

const BetterReload = () => (
  <Command name="reload" execute={executeReload} op>
    <Command name="js" execute={executeReloadJs} op />
  </Command>
);

export default BetterReload;
