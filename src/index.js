import Rinse from './rinse';
import Notification from './rinse/components/notification';

const CauldronApp = () => (
  <Notification target={Bukkit.getConsoleSender()}>Hello world!</Notification>
);

Rinse.mount(<CauldronApp />);