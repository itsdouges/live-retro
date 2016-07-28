import state from 'src/server/state';

const debug = require('debug')('retro:master');

const FALLBACK_KEY = 'super-secret';
const RESET_AFTER = 60 * 60 * 1000; // 60 minutes

let masterKey = null;

function getKey() {
  return Date.now();
}

function resetKey() {
  debug('no more master');
  masterKey = null;
}

export default (app) => {
  app.get('/master', (req, res) => {
    if (masterKey) {
      debug('we already have a master', masterKey);
      res.status(401).send('We already have a master');
      return;
    }
    masterKey = getKey();
    debug('we have a new master', masterKey);
    state.reset();
    res.send(`You da master now! ${masterKey}`);
    setTimeout(resetKey, RESET_AFTER);
  });

  app.use('/api/master/*', (req, res, next) => {
    const receivedKey = req.get('master-key');
    if (!masterKey) {
      res.status(500).send('There is no master');
      return;
    }
    if (receivedKey !== masterKey && receivedKey !== FALLBACK_KEY) {
      res.status(401).send("You're not the master");
      return;
    }
    next();
  });

  app.get('/api/master/state', (req, res) => {
    res.send(state.get());
  });

  app.post('/api/master/state', (req, res) => {
    if (req.body.stage) {
      state.setStage(req.body.stage);
    }
    res.send(state.get());
  });

  app.delete('/api/master/state', (req, res) => {
    state.reset();
    resetKey();
    res.send(state.get());
  });
};
