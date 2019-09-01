import cauldron from '@cauldron';
import Rinse from '@cauldron/rinse';
import RtpCommand from './rtp';
import JsCommand from './js';
import colors from '@cauldron/colors';
import '@cauldron/captcha';

cauldron();

function setMotd({ setMotd }) {
  setMotd(colors.gold(colors.bold('NamelessNoobs')).green('Survival'));
}

cauldron.events.server.on('listping', setMotd);

const App = () => (
  <>
    <RtpCommand />
    <JsCommand />
  </>
);

Rinse.mount(<App />);
