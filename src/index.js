import cauldron from '@cauldron';
import Rinse from '@cauldron/rinse';
import RtpCommand from './rtp';
import JsCommand from './js';
import '@cauldron/captcha';

cauldron();
cauldron.events.server.on('listping', ({ setMotd }) => setMotd('Testing'));

Rinse.mount(
  <>
    <RtpCommand />
    <JsCommand />
  </>
);
