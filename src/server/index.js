import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import master from 'src/server/master';
import participant from 'src/server/participant';
import results from 'src/server/results';

const debug = require('debug')('retro:server');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

master(app);
participant(app);
results(app);

const INDEX_HTML = 'src/client/dist/index.html';
app.use('/', express.static(INDEX_HTML));
app.use('/master', express.static(INDEX_HTML));

app.listen(process.env.PORT || 3000, () => {
  debug('up');
});
