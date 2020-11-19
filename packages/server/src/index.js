import Rinse from '@cauldronjs/rinse';
import RtpCommand from './rtp';
import JsCommand from './js';
import StatsCommand from './stats';
import BetterHelpCommand from './better-help';
import BetterReloadCommand from './better-reload';
import FeedbackCommand from './feedback';
import landmine from './landmine';
import { services } from 'cauldronjs';
import essentials from './essentials';
import holidays from './holidays';
import customItems from './custom_items';
import elevators from './elevators';
import treefall from './treefall';
import autofillHand from './autofill-hand';

const App = () => (
  <>
    <RtpCommand />
    <JsCommand />
    <StatsCommand />
    <BetterHelpCommand />
    <BetterReloadCommand />
    <FeedbackCommand />
  </>
);

Rinse.mount(<App />, 'commands');

services.useSync(landmine);
services.useSync(essentials);
// services.useSync(deathbox);
services.use(holidays);
// services.use(customItems);
services.use(elevators);
services.use(treefall);
services.use(autofillHand);

// const app = express();
// app.use(express.static('./site/public'));
// app.use('/css', express.static('./site/public/css'));
// app.use('/js', express.static('./site/public/js'));
// app.use('/images', express.static('./site/public/images'));

// const server = app.listen(25566, () => {
//   const port = server.address().port;
//   console.log(`Web server started on http://localhost:${port}`);
// });
