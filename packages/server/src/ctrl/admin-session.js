import useStore from '@cauldron/store';
import { Command, events } from '@cauldron';
import Rinse from '@cauldron/rinse';
import { lockUser, unlockUser } from '@cauldron/user-lock';
import { differenceInDays } from 'date-fns';

const [storedHistory, updateStoredHistory] = useStore('adminSession');

const loginUser = ({ sender, args }) => {
  // login the current user
};

export const LoginCommand = () => (
  <Command name="auth" permission="nn.auth" execute={loginUser} isForPlayer />
);

const isSessionValid = player => {
  if (!player.hasPlayedBefore()) return false;
  const uuid = player.getUniqueId();
  const address = player.getAddress();
  const lastPlayed = new Date(player.getLastPlayed());
  const today = new Date();
  const daysSinceLastPlayed = differenceInDays(today, lastPlayed);
  if (daysSinceLastPlayed >= 30) return false;
  const lastSession = storedHistory[uuid];
};

const markCurrentSesssion = player => {};

events.on('playerjoin', event => {
  // check if player needs to login
  const player = event.getPlayer();
  const uuid = player.getUniqueId();
  if (isSessionValid(player)) {
    //
  } else {
  }
});
