import useStore from '@cauldron/store';
import { Command, events } from '@cauldron';
import Rinse from '@cauldron/rinse';

const [storedHistory, updateStoredHistory] = useStore('adminSession');

const loginUser = ({ sender, args }) => {
  // login the current user
};

const LoginCommand = () => (
  <Command name="auth" permission="nn.auth" execute={loginUser} />
);

Rinse.mount(<LoginCommand />);

events.player.on('join', () => {
  // check if player needs to login
});
