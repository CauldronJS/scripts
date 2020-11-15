import Rinse from '@cauldronjs/rinse';
import GameModeCommands from './gamemode';
import SetSpawnCommand from './setspawn';
import TeleportCommands from './teleport';
import HomeCommands from './home';
import TimeCommands from './time';
import BackCommand from './back';

const App = () => (
  <>
    <GameModeCommands />
    <SetSpawnCommand />
    <TeleportCommands />
    <HomeCommands />
    <BackCommand />
    <TimeCommands />
  </>
);

export default function () {
  Rinse.mount(<App />, 'essentialsCommands');
}
