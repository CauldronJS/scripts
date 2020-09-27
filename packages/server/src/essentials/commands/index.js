import Rinse from '@cauldron/rinse';
import { GmsCommand, GmcCommand, GmaCommand } from './gamemode';

const App = () => (
  <>
    <GmsCommand />
    <GmcCommand />
    <GmaCommand />
  </>
);

export default function () {
  Rinse.mount(<App />, 'essentialsCommands');
}
