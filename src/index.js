import cauldron from '@cauldron';
import Rinse from '@cauldron/rinse';
import RtpCommand from './rtp';
import JsCommand from './js';
import colors from '@cauldron/colors';
import async from 'async';
import { Bukkit } from 'bukkit';
// import Axios from 'axios';
// import express from 'express';

cauldron();

function setMotd({ setMotd }) {
  setMotd(colors.green('Running Cauldron'));
}

cauldron.events.on('serverlistping', setMotd);

// const App = () => (
//   <>
//     <RtpCommand />
//     <JsCommand />
//   </>
// );

// Rinse.mount(<App />);
setTimeout(Bukkit.shutdown, 5000);
// const app = express();
// app.use(express.static('./site/public'));
// app.use('/css', express.static('./site/public/css'));
// app.use('/js', express.static('./site/public/js'));
// app.use('/images', express.static('./site/public/images'));

// const server = app.listen(25566, () => {
//   const port = server.address().port;
//   console.log(`Web server started on http://localhost:${port}`);
// });
