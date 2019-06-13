import cauldron from '@cauldron';
import Rinse from '@cauldron/rinse';
import RtpCommand from './rtp';
import JsCommand from './js';
import colors from '@cauldron/colors';
import '@cauldron/captcha';

cauldron();
cauldron.events.server.on('listping', ({ setMotd }) =>
  setMotd(colors.yellow('NamelessNoobs ').green('Survival'))
);

const App = () => (
  <>
    <RtpCommand />
    <JsCommand />
  </>
);

Rinse.mount(<App />);
