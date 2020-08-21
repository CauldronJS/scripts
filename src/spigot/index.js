import Rinse, { useState, useEffect } from '@cauldron/rinse';
import RtpCommand from './rtp';
import JsCommand from './js';
import landmine from './landmine';
import express from 'express';

landmine();
const App = () => {
  const [test, setTest] = useState(42);
  return (
    <>
      <RtpCommand />
      <JsCommand />
    </>
  );
};

Rinse.mount(<App />, 'commands');

// const app = express();
// app.use(express.static('./site/public'));
// app.use('/css', express.static('./site/public/css'));
// app.use('/js', express.static('./site/public/js'));
// app.use('/images', express.static('./site/public/images'));

// const server = app.listen(25566, () => {
//   const port = server.address().port;
//   console.log(`Web server started on http://localhost:${port}`);
// });
