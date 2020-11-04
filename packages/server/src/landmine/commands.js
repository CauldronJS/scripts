import Rinse, { Command } from '@cauldronjs/rinse';
import colors from '@cauldronjs/colors';
import { getName, getUuid } from '@cauldronjs/players';
import {
  canClaim,
  claim,
  unclaim,
  unclaimAll,
  doesOwn,
  getProfileFor,
  commitProfiles,
  CLAIM_OPTIONS,
  addMember,
  removeMember,
} from './profile';
import { createClaim, isClaimable, removeClaims, getClaimFor } from './claim';
import {
  getChunkCoordsForEntity,
  getPlayerList,
  getPlayerByName,
  getMembersList,
  getWorldNames,
  getChunkCoordsFromArgs,
} from './utils';
import { ChatColor } from 'bungee/api';
import { ClickEvent, HoverEvent, TextComponent } from 'bungee/api/chat';
import { Text } from 'bungee/api/chat/hover/content';
import createCallbackText from '../callback-text-component';
import { Bukkit } from 'bukkit';
import { getPlayerFromName } from '../essentials/services/user-service';

function executeClaim({ sender, args }) {
  const uuid = sender.getUniqueId().toString();
  const coords =
    args.length === 0
      ? getChunkCoordsForEntity(sender)
      : getChunkCoordsFromArgs(sender, args[0], args[1]);
  const profile = getProfileFor(uuid);

  function trySendMapWith(text) {
    sender.sendMessage(text);
    if (args.indexOf('--show-map') > -1) {
      executeMap({ sender });
    }
  }

  if (profile.claimsAllowed <= profile.claims.length) {
    return trySendMapWith(
      colors.red("[LandMine] You don't have any claims left")
    );
  }
  if (!canClaim(uuid, coords)) {
    return trySendMapWith(
      colors.red(
        `[LandMine] This claim isn't connected to any previous claims (${coords.x}, ${coords.z})`
      )
    );
  }
  if (!isClaimable(coords)) {
    return trySendMapWith(
      colors.red(
        `[LandMine] This chunk has already been claimed (${coords.x}, ${coords.z})`
      )
    );
  }
  createClaim(coords, uuid);
  claim(uuid, coords);

  return trySendMapWith(
    colors.green(`[LandMine] Claimed ${coords.x},${coords.z}`)
  );
}

function executeUnclaim({ sender, args }) {
  const uuid = sender.getUniqueId().toString();
  const coords =
    args.length === 0
      ? getChunkCoordsForEntity(sender)
      : getChunkCoordsFromArgs(sender, args[0], args[1]);
  try {
    function trySendMapWith(text) {
      sender.sendMessage(text);
      if (args.indexOf('--show-map') > -1) {
        executeMap({ sender });
      }
    }

    if (getClaimFor(coords).owner !== uuid) {
      return trySendMapWith(colors.red("[LandMine] You don't own this chunk!"));
    }
    unclaim(uuid, coords);
    removeClaims(coords);
    return trySendMapWith(
      colors.green(`[LandMine] Unclaimed ${coords.x},${coords.z}`)
    );
  } catch (err) {
    return colors.red(`[LandMine] Failed to unclaim: ${err}`);
  }
}

function executeUnclaimAll({ sender }) {
  const uuid = sender.getUniqueId().toString();
  try {
    const unclaimed = unclaimAll(uuid);
    removeClaims(...unclaimed);
    return colors.green(`[LandMine] Unclaimed ${unclaimed.length} chunks`);
  } catch (err) {
    return colors.red(`[LandMine] Failed to unclaim all: ${err}`);
  }
}

function executeMap({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const coords = getChunkCoordsForEntity(sender);
  const mapWidth = 10;
  const mapHeight = 3;
  const atlas = new TextComponent(
    `${colors.green('Owned')} ${colors.yellow('Resident')} ${colors.red(
      'Claimed'
    )} ${colors.white('Available')}\n`
  );
  const location = new TextComponent(
    colors.yellow(`=====${coords.world}: ${coords.x},${coords.z}=====\n`)
  );
  const components = [atlas, location];
  for (let x = -mapHeight; x <= mapHeight; ++x) {
    for (let z = -mapWidth; z <= mapWidth; ++z) {
      const char = x === 0 && z === 0 ? '-' : '+';
      const claimX = coords.x + x;
      const claimZ = coords.z + z;
      const claim = getClaimFor({
        x: claimX,
        z: claimZ,
        world: coords.world,
      });
      const textComponent = new TextComponent(char);
      let isOwned = false;
      if (claim) {
        if (claim.owner === uuid) {
          isOwned = true;
          textComponent.setColor(ChatColor.GREEN);
        } else if (claim.residents.indexOf(uuid) > -1) {
          textComponent.setColor(ChatColor.YELLOW);
        } else {
          textComponent.setColor(ChatColor.RED);
        }
      }
      const hoverEvent = new HoverEvent(
        HoverEvent.Action.SHOW_TEXT,
        new Text(`${claimX};${claimZ}`)
      );
      const clickEvent = new ClickEvent(
        ClickEvent.Action.RUN_COMMAND,
        `/lm ${isOwned ? 'unclaim' : 'claim'} ${claimX} ${claimZ} --show-map`
      );
      textComponent.setHoverEvent(hoverEvent);
      textComponent.setClickEvent(clickEvent);
      components.push(textComponent);
    }
    components.push(new TextComponent('\n'));
  }
  sender.spigot().sendMessage(...components);
}

function executeInfo({ sender }) {
  const coords = getChunkCoordsForEntity(sender);
  const claim = getClaimFor(coords);
  if (claim) {
    return colors.yellow('[LandMine] This chunk has already been claimed');
  } else {
    return colors.green('[LandMine] This chunk has not been claimed');
  }
}

function executeModify({ sender, args }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
  if (!profile) return colors.red('You have no claims to modify');
  for (let i = 0; i < args.length; i += 2) {
    const name = args[i];
    const value = args[i + 1];
    if (!value) {
      return colors.red(
        `[LandMine] You must provide a value with the rule ${name}`
      );
    }
    if (value === 'allow' || value === true) {
      profile.rules[name] = true;
    } else if (value === 'deny' || value === false) {
      profile.rules[name] = false;
    } else {
      return colors.red(
        `[LandMine] Unknown value "${value}". Must be allow/deny/true/false`
      );
    }
  }

  commitProfiles();

  return colors.green('[LandMine] Successfully updated rules for all claims');
}

function executeMembersInfo({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
  return profile.members.map((member) =>
    Bukkit.getOfflinePlayer(member).getName()
  );
}

function executeMembersAdd({ sender, args }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
  if (args.length === 0) {
    throw new Error(
      'Please supply a player name (they must currently be online)'
    );
  }
  const invitee = getPlayerFromName(args[0]);
  if (!invitee.isOnline()) {
    return colors.red('The requested player is not online');
  }
  const header = new TextComponent(
    `${colors.aqua(
      sender.getDisplayName()
    )} has invited you to their town. Would you like to join?\n`
  );
  const yesButton = createCallbackText(colors.green('Yes'), (invitee) => {
    sender.sendMessage(
      `Your invite request to ${invitee.getDisplayName()} has been accepted`
    );
    addMember(profile, invitee.getUniqueId().toString());
    invitee.sendMessage(`You have joined ${sender.getDisplayName()}'s town!`);
  });
  const splitter = new TextComponent(' | ');
  const noButton = createCallbackText(colors.red('No'), (invitee) => {
    sender.sendMessage(
      `Your invite request to ${invitee.getDisplayName()} has been rejected`
    );
    invitee.sendMessage(
      `You have rejected ${sender.getDisplayName()}'s join request.`
    );
  });
  invitee.spigot().sendMessage(header, yesButton, splitter, noButton);
  return `Your invite request has been sent to ${invitee.getDisplayName()}`;
}

function executeMembersRemove({ sender, args }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
  if (args.length === 0) {
    throw new Error('Please supply a player name');
  }
  const toRemove = getPlayerFromName(args[0], true);
  removeMember(profile, toRemove.getUniqueId().toString());
  if (toRemove.isOnline()) {
    toRemove.sendMessage(
      `You have been removed from ${sender.getDisplayName()}'s claims`
    );
  }
  return `You have successfully removed ${toRemove.getName()} from your claims`;
}

function executeGiveBonus({ args }) {
  const [playername, amount] = args;
  if (!playername) {
    return colors.red('[LandMine] You must provide a player name');
  } else if (!amount) {
    return colors.red('[LandMine] You must provide an amount');
  } else if (isNaN(amount)) {
    return colors.red('[LandMine] Invalid number');
  }
  const uuid = getUuid(playername);
  if (!uuid) {
    return colors.red(
      `[LandMine] No player found with the name ${playername}. Ensure this is not a nickname`
    );
  }
  const profile = getProfileFor(uuid);
  profile.bonusClaims += parseInt(amount);
  return colors.green(
    `[LandMine] Granted ${playername} ${amount} bonus claims`
  );
}

export const LandmineCommands = () => (
  <Command name="landmine" aliases={['lm']}>
    <Command name="claim" aliases={['c']} execute={executeClaim} isForPlayer />
    <Command
      name="unclaim"
      aliases={['delete', 'remove', 'r', 'u']}
      execute={executeUnclaim}
    >
      <Command
        name="all"
        execute={executeUnclaimAll}
        tabComplete={getWorldNames}
      />
    </Command>
    <Command name="map" aliases={['m']} execute={executeMap} />
    <Command name="info" aliases={['i']} execute={executeInfo} />
    <Command
      name="modify"
      execute={executeModify}
      tabComplete={(sender, ...args) => {
        if (args.length % 2 === 0) {
          return ['allow', 'deny'];
        } else {
          return Object.values(CLAIM_OPTIONS);
        }
      }}
    />
    <Command name="members" execute={executeMembersInfo}>
      <Command
        name="add"
        execute={executeMembersAdd}
        tabComplete={getPlayerList}
      />
      <Command
        name="remove"
        execute={executeMembersRemove}
        tabComplete={getMembersList}
      />
    </Command>
    <Command
      name="givebonus"
      permission="landmine.givebonus"
      execute={executeGiveBonus}
      tabComplete={getPlayerList}
    />
  </Command>
);
