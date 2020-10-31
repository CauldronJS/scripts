import Rinse from '@cauldronjs/rinse';
import { GmsCommand, GmcCommand, GmaCommand } from './gamemode';
import SetSpawnCommand from './setspawn';
import { TeleportCommand, TeleportRequestCommand } from './teleport';
import { GoHomeCommand, SetHomeCommand, DeleteHomeCommand } from './home';

const App = () => (
  <>
    <GmsCommand />
    <GmcCommand />
    <GmaCommand />
    <SetSpawnCommand />
    <TeleportCommand />
    <TeleportRequestCommand />
    <GoHomeCommand />
    <SetHomeCommand />
    <DeleteHomeCommand />
  </>
);

export default function () {
  Rinse.mount(<App />, 'essentialsCommands');
}
