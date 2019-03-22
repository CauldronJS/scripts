import Rinse from './rinse';
import Notification from './rinse/components/notification';

const Test = ({ children }) => (
  children('This is a test')
);

const CauldronApp = () => (
  <Test>
    {msg => (
      <Notification target={Bukkit.getConsoleSender()}>{msg}</Notification>
    )}
  </Test>
);

Rinse.mount(<CauldronApp />);
