import useStore from '@cauldron/store';
import { Command, events } from '@cauldron';
import Rinse from '@cauldron/rinse';
import { lockUser, unlockUser } from '@cauldron/user-lock';

const [storedHistory, updateStoredHistory] = useStore('adminSession');

const loginUser = ({ sender, args }) => {
  // login the current user
};

const LoginCommand = () => (
  <Command name="auth" permission="nn.auth" execute={loginUser} isForPlayer />
);

Rinse.mount(<LoginCommand />);

class SessionHistory {
  constructor(player) {
    this.uuid = player.getUniqueId();
    this.ip = player.getIpAddress();
    this.lastLogin = null;
  }

  isSessionValid(player) {
    if (player.getIpAddress() !== this.ip) return false;
    // TODO check last login time
    if (!this.lastLogin) return false;
    return true;
  }
}

events.player.on('join', event => {
  // check if player needs to login
  const player = event.getPlayer();
  const uuid = player.getUniqueId();
  const lastSession = storedHistory[uuid] || new SessionHistory(player);
  if (!lastSession.isSessionValid(player)) {
    // push the user to login
    lockUser(player);
  }
});
