import Rinse from '@cauldron/rinse';
import RtpCommand from './rtp';
import JsCommand from './js';
import landmine from './landmine';
import { events, services } from 'cauldron';
import essentials from './essentials';
import deathbox from './deathbox';

landmine();
const App = () => {
  return (
    <>
      <RtpCommand />
      <JsCommand />
    </>
  );
};

Rinse.mount(<App />, 'commands');

events.on('playerjoin', (event) => {
  event.getPlayer().setHealthScale(2.0);
});

services.use(essentials);
services.use(deathbox);

// const app = express();
// app.use(express.static('./site/public'));
// app.use('/css', express.static('./site/public/css'));
// app.use('/js', express.static('./site/public/js'));
// app.use('/images', express.static('./site/public/images'));

// const server = app.listen(25566, () => {
//   const port = server.address().port;
//   console.log(`Web server started on http://localhost:${port}`);
// });
