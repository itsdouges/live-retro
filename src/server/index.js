import express from 'express';
import bodyParser from 'body-parser';

import master from 'src/server/master';
import participant from 'src/server/participant';
import results from 'src/server/results';

const debug = require('debug')('retro:server');

const app = express();

app.use(bodyParser.json());

master(app);
participant(app);
results(app);

app.use('/', express.static('src/client/dist'));
app.use('/master', express.static('src/client/dist'));

app.listen(process.env.PORT || 3000, () => {
  debug('up');
});
