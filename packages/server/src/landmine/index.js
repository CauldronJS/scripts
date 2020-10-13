import Rinse from '@cauldronjs/rinse';
import { LandmineCommands } from './commands';
import registerEvents from './events';

export default function landmineService() {
  registerEvents();

  const LandmineApp = () => <LandmineCommands />;

  Rinse.mount(<LandmineApp />);
}
