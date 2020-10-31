import Rinse, { Command } from '@cauldronjs/rinse';
import { Bukkit, Location } from 'bukkit';
import colors from '@cauldronjs/colors';
import { getHomeProfile, addHome, deleteHome } from '../services/home-service';
import createClickHandler from '../../callback-text-component';

const locationFromHome = (home) =>
  new Location(Bukkit.getWorld(home.world), home.x, home.y, home.z);

function handleGoHome({ sender, args }) {
  const profile = getHomeProfile(sender);
  if (args[0]) {
    const home = profile.find((h) => h.name === args[0]);
    if (!home) {
      throw new Error('No home found with that name');
    }
    sender.teleport(locationFromHome(home));
    sender.sendMessage(colors.green(`Teleported you to home ${home.name}`));
  } else {
    if (profile.length === 0) {
      return colors.yellow(
        'You have no homes! Use /sethome NAME to get started.'
      );
    }
    return profile.map((home) =>
      createClickHandler(colors.aqua(home.name) + '\n', (sender) => {
        sender.teleport(locationFromHome(home));
        sender.sendMessage(colors.green(`Teleported you to home ${home.name}`));
      })
    );
  }
}

function handleSetHome({ sender, args }) {
  const [name = 'Home'] = args;
  addHome(sender, name, sender.getLocation());
  return colors.green(`Created home ${name}!`);
}

function handleDeleteHome({ sender, args }) {
  const [name] = args;
  if (!args[0]) {
    const homes = getHomeProfile(sender).map((home) =>
      createClickHandler(colors.aqua(home.name) + '\n', (sender) => {
        deleteHome(sender, home.name);
        sender.sendMessage(colors.green(`Deleted home ${home.name}!`));
      })
    );
    if (homes.length === 0) {
      return colors.yellow(
        'You have no homes! Use /sethome NAME to get started.'
      );
    }
    return homes;
  } else {
    deleteHome(sender, name);
    return colors.green(`Deleted home ${name}!`);
  }
}

export const GoHomeCommand = () => (
  <Command name="homes" execute={handleGoHome}>
    <Command name="set" execute={handleSetHome} />
  </Command>
);

export const SetHomeCommand = () => (
  <Command name="sethome" execute={handleSetHome} />
);

export const DeleteHomeCommand = () => (
  <Command name="delhome" execute={handleDeleteHome} />
);
