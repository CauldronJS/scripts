import Rinse from '@cauldronjs/rinse';
import { GmsCommand, GmcCommand, GmaCommand } from './gamemode';
import SetSpawnCommand from './setspawn';

const App = () => (
  <>
    <GmsCommand />
    <GmcCommand />
    <GmaCommand />
    <SetSpawnCommand />
  </>
);

export default function () {
  Rinse.mount(<App />, 'essentialsCommands');
}
