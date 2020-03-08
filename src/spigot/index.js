import Rinse from '@cauldron/rinse';
import RtpCommand from './rtp';
import JsCommand from './js';
import colors from '@cauldron/colors';
import cauldron from 'cauldron';
import axios from 'axios';
// import express from 'express';

function setMotd({ setMotd }) {
  setMotd(colors.green('This server is running Cauldron'));
}

cauldron.events.on('serverlistping', setMotd);

const App = () => (
  <>
    <RtpCommand />
    <JsCommand />
  </>
);

Rinse.mount(<App />);

(async function() {
  try {
    $$isolate$$
      .getAsyncFactory()
      .wait(5000)
      .then(() => console.log('This took 5 seconds to run'));
    $$isolate$$
      .getAsyncFactory()
      .generateAsyncPromise(() =>
        console.log('This ran as quickly as possible')
      );
    const result = await axios.get('https://google.com');
    console.log(result.data);
  } catch (err) {
    console.error(err);
  }
})();

// const app = express();
// app.use(express.static('./site/public'));
// app.use('/css', express.static('./site/public/css'));
// app.use('/js', express.static('./site/public/js'));
// app.use('/images', express.static('./site/public/images'));

// const server = app.listen(25566, () => {
//   const port = server.address().port;
//   console.log(`Web server started on http://localhost:${port}`);
// });
