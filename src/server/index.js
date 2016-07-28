import express from 'express';

import master from 'src/server/master';
import participant from 'src/server/participant';

const debug = require('debug')('retro:server');
const app = express();

master(app);
participant(app);

app.listen(3000, () => {
  debug('up');
});
